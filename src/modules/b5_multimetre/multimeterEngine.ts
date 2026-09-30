import { MultimeterScale } from './types';

export interface MultimeterReading {
  displayValue: string;
  displayUnit: string;
  isOverload: boolean;
  isNegative: boolean;
  statusMessage?: string;
  measuredNumber: number | null;
}

export function computeMultimeterReading(
  scale: MultimeterScale,
  redProbe: string | null,
  blackProbe: string | null,
  activeBoard: 'resistors' | 'series' | 'ohm-challenge',
  isSwitchClosed: boolean = true
): MultimeterReading {
  if (scale === 'OFF') {
    return {
      displayValue: '',
      displayUnit: '',
      isOverload: false,
      isNegative: false,
      statusMessage: 'Multímetre apagat. Gira el commutador.',
      measuredNumber: null,
    };
  }

  // If probes are not connected
  if (!redProbe || !blackProbe) {
    if (scale.startsWith('RES')) {
      return {
        displayValue: '1 .',
        displayUnit: getUnitForScale(scale),
        isOverload: true,
        isNegative: false,
        statusMessage: 'Circuit obert (sondes a l\'aire)',
        measuredNumber: null,
      };
    } else {
      return {
        displayValue: '0.00',
        displayUnit: getUnitForScale(scale),
        isOverload: false,
        isNegative: false,
        statusMessage: 'Connecta les dues puntes per mesurar tensió',
        measuredNumber: 0,
      };
    }
  }

  // Same test point connected with both probes
  if (redProbe === blackProbe) {
    if (scale.startsWith('RES')) {
      return {
        displayValue: formatValue(0, scale),
        displayUnit: getUnitForScale(scale),
        isOverload: false,
        isNegative: false,
        statusMessage: 'Curtcircuit directe entre puntes (0.0 Ω)',
        measuredNumber: 0,
      };
    } else {
      return {
        displayValue: formatValue(0, scale),
        displayUnit: getUnitForScale(scale),
        isOverload: false,
        isNegative: false,
        statusMessage: 'Mateix punt de prova (diferència de potencial nul·la)',
        measuredNumber: 0,
      };
    }
  }

  // --- RESISTANCE MEASUREMENT LOGIC ---
  if (scale.startsWith('RES')) {
    // Check if user is trying to measure resistance on active powered circuits!
    if (activeBoard === 'series' && isSwitchClosed) {
      return {
        displayValue: '-Err',
        displayUnit: '',
        isOverload: false,
        isNegative: false,
        statusMessage: '⚠️ ALERTA: No mesuris resistència amb el circuit en tensió!',
        measuredNumber: null,
      };
    }

    if (activeBoard === 'ohm-challenge') {
      return {
        displayValue: '-Err',
        displayUnit: '',
        isOverload: false,
        isNegative: false,
        statusMessage: '⚠️ Alerta: El banc de la Llei d\'Ohm té tensió activa (12V). Usa el voltímetre!',
        measuredNumber: null,
      };
    }

    // Board 1: Resistors
    if (activeBoard === 'resistors') {
      const pair = [redProbe, blackProbe].sort().join('&');
      let resistanceOhms: number | null = null;
      let resistorName = '';

      if (pair === ['TP-R1A', 'TP-R1B'].sort().join('&')) {
        resistanceOhms = 219.2; // ~220 Ω
        resistorName = 'R1 (220 Ω)';
      } else if (pair === ['TP-R2A', 'TP-R2B'].sort().join('&')) {
        resistanceOhms = 998.0; // ~1 kΩ
        resistorName = 'R2 (1 kΩ)';
      } else if (pair === ['TP-R3A', 'TP-R3B'].sort().join('&')) {
        resistanceOhms = 4690.0; // ~4.7 kΩ
        resistorName = 'R3 (4.7 kΩ)';
      } else if (pair === ['TP-R4A', 'TP-R4B'].sort().join('&')) {
        resistanceOhms = 10040.0; // ~10 kΩ
        resistorName = 'R4 (10 kΩ)';
      }

      if (resistanceOhms === null) {
        return {
          displayValue: '1 .',
          displayUnit: getUnitForScale(scale),
          isOverload: true,
          isNegative: false,
          statusMessage: 'Puntes connectades a components diferents (circuit obert)',
          measuredNumber: null,
        };
      }

      return formatResistance(resistanceOhms, scale, resistorName);
    }

    // Default open circuit
    return {
      displayValue: '1 .',
      displayUnit: getUnitForScale(scale),
      isOverload: true,
      isNegative: false,
      statusMessage: 'Circuit obert',
      measuredNumber: null,
    };
  }

  // --- VOLTAGE (DCV) MEASUREMENT LOGIC ---
  if (scale.startsWith('DCV')) {
    let vRed = 0;
    let vBlack = 0;

    if (activeBoard === 'resistors') {
      // Disconnected resistors have 0V
      vRed = 0;
      vBlack = 0;
    } else if (activeBoard === 'series') {
      const getSeriesPotential = (tp: string): number => {
        if (tp === 'TP-BAT-NEG' || tp === 'TP-GND-RETURN') return 0;
        if (tp === 'TP-BAT-POS') return 9.0;
        if (!isSwitchClosed) return 0; // If switch open, circuit after switch is at 0V
        if (tp === 'TP-SW-OUT' || tp === 'TP-R1-IN') return 9.0;
        if (tp === 'TP-MID-NODE' || tp === 'TP-MID-NODE-2') return 6.8; // drop across R1 is 2.2V -> 9 - 2.2 = 6.8V
        return 0;
      };

      vRed = getSeriesPotential(redProbe);
      vBlack = getSeriesPotential(blackProbe);
    } else if (activeBoard === 'ohm-challenge') {
      const getOhmPotential = (tp: string): number => {
        if (tp === 'TP-OHM-GND' || tp === 'TP-RX-OUT') return 0;
        if (tp === 'TP-OHM-VCC' || tp === 'TP-RX-IN') return 12.0;
        return 0;
      };

      vRed = getOhmPotential(redProbe);
      vBlack = getOhmPotential(blackProbe);
    }

    const diff = vRed - vBlack;
    const isNegative = diff < 0;
    const absDiff = Math.abs(diff);

    return formatVoltage(absDiff, isNegative, scale);
  }

  return {
    displayValue: '---',
    displayUnit: '',
    isOverload: false,
    isNegative: false,
    measuredNumber: null,
  };
}

function getUnitForScale(scale: MultimeterScale): string {
  switch (scale) {
    case 'DCV_200m': return 'mV';
    case 'DCV_2':
    case 'DCV_20':
    case 'DCV_200': return 'V';
    case 'RES_200': return 'Ω';
    case 'RES_2k':
    case 'RES_20k':
    case 'RES_200k': return 'kΩ';
    case 'RES_2M': return 'MΩ';
    default: return '';
  }
}

function formatResistance(ohms: number, scale: MultimeterScale, name: string): MultimeterReading {
  switch (scale) {
    case 'RES_200':
      // Range: 0 - 200 Ω
      if (ohms > 200) {
        return {
          displayValue: '1 .',
          displayUnit: 'Ω',
          isOverload: true,
          isNegative: false,
          statusMessage: `Sobrecàrrega: ${name} supera l'escala de 200 Ω. Puja a 2kΩ!`,
          measuredNumber: ohms,
        };
      }
      return {
        displayValue: ohms.toFixed(1),
        displayUnit: 'Ω',
        isOverload: false,
        isNegative: false,
        statusMessage: `Mesurant ${name}`,
        measuredNumber: ohms,
      };

    case 'RES_2k':
      // Range: 0 - 2000 Ω (display in kΩ with 3 decimals: e.g. 0.219 or in Ohms)
      if (ohms > 2000) {
        return {
          displayValue: '1 .',
          displayUnit: 'kΩ',
          isOverload: true,
          isNegative: false,
          statusMessage: `Sobrecàrrega: ${name} supera els 2.000 Ω. Puja d'escala!`,
          measuredNumber: ohms,
        };
      }
      return {
        displayValue: (ohms / 1000).toFixed(3),
        displayUnit: 'kΩ',
        isOverload: false,
        isNegative: false,
        statusMessage: `Mesurant ${name} a escala 2kΩ`,
        measuredNumber: ohms,
      };

    case 'RES_20k':
      // Range: 0 - 20 kΩ
      if (ohms > 20000) {
        return {
          displayValue: '1 .',
          displayUnit: 'kΩ',
          isOverload: true,
          isNegative: false,
          statusMessage: `Sobrecàrrega: ${name} supera els 20 kΩ.`,
          measuredNumber: ohms,
        };
      }
      return {
        displayValue: (ohms / 1000).toFixed(2),
        displayUnit: 'kΩ',
        isOverload: false,
        isNegative: false,
        statusMessage: `Mesurant ${name} a escala 20kΩ`,
        measuredNumber: ohms,
      };

    case 'RES_200k':
      if (ohms > 200000) {
        return {
          displayValue: '1 .',
          displayUnit: 'kΩ',
          isOverload: true,
          isNegative: false,
          statusMessage: `Sobrecàrrega: supera els 200 kΩ.`,
          measuredNumber: ohms,
        };
      }
      return {
        displayValue: (ohms / 1000).toFixed(1),
        displayUnit: 'kΩ',
        isOverload: false,
        isNegative: false,
        statusMessage: `Mesurant ${name} a escala 200kΩ`,
        measuredNumber: ohms,
      };

    case 'RES_2M':
      return {
        displayValue: (ohms / 1000000).toFixed(3),
        displayUnit: 'MΩ',
        isOverload: false,
        isNegative: false,
        statusMessage: `Mesurant ${name} a escala 2MΩ`,
        measuredNumber: ohms,
      };

    default:
      return {
        displayValue: '1 .',
        displayUnit: 'Ω',
        isOverload: true,
        isNegative: false,
        measuredNumber: null,
      };
  }
}

function formatVoltage(volts: number, isNegative: boolean, scale: MultimeterScale): MultimeterReading {
  switch (scale) {
    case 'DCV_200m':
      const mv = volts * 1000;
      if (mv > 200) {
        return {
          displayValue: '1 .',
          displayUnit: 'mV',
          isOverload: true,
          isNegative,
          statusMessage: `Tensió superior a 200 mV. Puja el selector a 2V o 20V!`,
          measuredNumber: volts,
        };
      }
      return {
        displayValue: mv.toFixed(1),
        displayUnit: 'mV',
        isOverload: false,
        isNegative,
        statusMessage: 'Tensió contínua en mil·livolts',
        measuredNumber: volts,
      };

    case 'DCV_2':
      if (volts > 2) {
        return {
          displayValue: '1 .',
          displayUnit: 'V',
          isOverload: true,
          isNegative,
          statusMessage: `Sobrecàrrega: La tensió mesurada és major que 2V. Canvia a 20V!`,
          measuredNumber: volts,
        };
      }
      return {
        displayValue: volts.toFixed(3),
        displayUnit: 'V',
        isOverload: false,
        isNegative,
        statusMessage: 'Tensió mesurada amb màxima precisió (fins a 2V)',
        measuredNumber: volts,
      };

    case 'DCV_20':
      if (volts > 20) {
        return {
          displayValue: '1 .',
          displayUnit: 'V',
          isOverload: true,
          isNegative,
          statusMessage: `Sobrecàrrega: tensió superior a 20V.`,
          measuredNumber: volts,
        };
      }
      return {
        displayValue: volts.toFixed(2),
        displayUnit: 'V',
        isOverload: false,
        isNegative,
        statusMessage: isNegative ? 'Polaritat invertida (negativa): Vermella a menor potencial que Negra' : 'Tensió mesurada a escala 20V',
        measuredNumber: volts,
      };

    case 'DCV_200':
      if (volts > 200) {
        return {
          displayValue: '1 .',
          displayUnit: 'V',
          isOverload: true,
          isNegative,
          statusMessage: 'Sobrecàrrega: tensió superior a 200V.',
          measuredNumber: volts,
        };
      }
      return {
        displayValue: volts.toFixed(1).padStart(4, '0'),
        displayUnit: 'V',
        isOverload: false,
        isNegative,
        statusMessage: 'Tensió a escala 200V',
        measuredNumber: volts,
      };

    default:
      return {
        displayValue: '0.00',
        displayUnit: 'V',
        isOverload: false,
        isNegative: false,
        measuredNumber: 0,
      };
  }
}

function formatValue(num: number, scale: MultimeterScale): string {
  if (scale === 'DCV_200m' || scale === 'RES_200') return '0.0';
  if (scale === 'DCV_2' || scale === 'RES_2k' || scale === 'RES_2M') return '0.000';
  return '0.00';
}
