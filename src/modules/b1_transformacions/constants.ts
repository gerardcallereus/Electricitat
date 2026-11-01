import { Question, TransformationType } from './types';

export const APP_TITLE = "ElectroTransforma";

// Database of questions with real photographs of appliances
export const QUESTIONS_DB: Question[] = [
  {
    id: 1,
    objectName: "Bombeta Incandescent",
    description: "Un dispositiu clàssic que il·lumina una habitació quan el filament s'escalfa.",
    correctType: TransformationType.LUMINOUS,
    options: [TransformationType.LUMINOUS, TransformationType.MECHANICAL, TransformationType.CHEMICAL, TransformationType.SOUND],
    explanation: "El corrent elèctric passa pel filament de tungstè i el fa brillar intensament, transformant l'energia elèctrica en lluminosa (i també molta tèrmica!).",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    objectName: "Ventilador",
    description: "Té aspes que giren ràpidament per moure l'aire.",
    correctType: TransformationType.MECHANICAL,
    options: [TransformationType.MECHANICAL, TransformationType.THERMAL, TransformationType.CHEMICAL, TransformationType.LUMINOUS],
    explanation: "El motor elèctric converteix l'electricitat en moviment giratori (energia mecànica cinètica).",
    imageUrl: "https://images.unsplash.com/photo-1618941716939-553df3c6c278?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    objectName: "Torradora",
    description: "S'utilitza a la cuina per escalfar i torrar pa.",
    correctType: TransformationType.THERMAL,
    options: [TransformationType.THERMAL, TransformationType.MECHANICAL, TransformationType.SOUND, TransformationType.CHEMICAL],
    explanation: "Les resistències internes de crom-níquel s'escalfen envermellides en passar-hi corrent, transformant electricitat en calor (efecte Joule).",
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    objectName: "Bateria de Mòbil (carregant)",
    description: "Quan connectes el teu telèfon intel·ligent al carregador.",
    correctType: TransformationType.CHEMICAL,
    options: [TransformationType.CHEMICAL, TransformationType.MECHANICAL, TransformationType.LUMINOUS, TransformationType.SOUND],
    explanation: "L'energia elèctrica del carregador produeix una reacció química reversible dins les cel·les de liti per emmagatzemar energia.",
    imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    objectName: "Altaveu",
    description: "Equip de so utilitzat per reproduir música o veu.",
    correctType: TransformationType.SOUND,
    options: [TransformationType.SOUND, TransformationType.THERMAL, TransformationType.CHEMICAL, TransformationType.LUMINOUS],
    explanation: "El senyal elèctric arriba a un electroimant que fa vibrar una membrana o con metàl·lic, generant ones sonores a l'aire.",
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    objectName: "Forn Elèctric",
    description: "Electrodomèstic per coure o daurar aliments.",
    correctType: TransformationType.THERMAL,
    options: [TransformationType.THERMAL, TransformationType.MECHANICAL, TransformationType.LUMINOUS, TransformationType.CHEMICAL],
    explanation: "Grans resistències elèctriques blindades s'escalfen fins a 250 °C per transferir calor als aliments.",
    imageUrl: "https://images.unsplash.com/photo-1584990347449-a292431df1a3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    objectName: "Batedora",
    description: "Eina elèctrica amb fulles d'acer per triturar aliments.",
    correctType: TransformationType.MECHANICAL,
    options: [TransformationType.MECHANICAL, TransformationType.THERMAL, TransformationType.SOUND, TransformationType.CHEMICAL],
    explanation: "El motor elèctric fa girar l'eix i les fulles a milers de revolucions per minut (energia mecànica cinètica).",
    imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    objectName: "Semàfor LED",
    description: "Senyal de trànsit que regula la circulació emetent colors vermell, ambre i verd.",
    correctType: TransformationType.LUMINOUS,
    options: [TransformationType.LUMINOUS, TransformationType.THERMAL, TransformationType.MECHANICAL, TransformationType.SOUND],
    explanation: "Els díodes emissors de llum (LED) converteixen el corrent directament en fotons de llum amb altíssima eficiència.",
    imageUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    objectName: "Timbre de Porta",
    description: "Dispositiu que avisa acústicament quan algú prem el polsador de casa.",
    correctType: TransformationType.SOUND,
    options: [TransformationType.SOUND, TransformationType.LUMINOUS, TransformationType.CHEMICAL, TransformationType.THERMAL],
    explanation: "El corrent activa un brunzidor piezoelèctric o un electroimant que colpeja una campana creant una ona sonora.",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    objectName: "Electròlisi de l'aigua",
    description: "Procés electroquímic de laboratori per descompondre l'aigua en hidrogen i oxigen.",
    correctType: TransformationType.CHEMICAL,
    options: [TransformationType.CHEMICAL, TransformationType.THERMAL, TransformationType.MECHANICAL, TransformationType.LUMINOUS],
    explanation: "El corrent continu trenca els enllaços químics de les molècules d'aigua (H2O), transformant electricitat en energia química emmagatzemada en gas hidrogen.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    objectName: "Planxa de Roba",
    description: "Aparell per allisar la roba mitjançant una sola d'alumini molt calenta.",
    correctType: TransformationType.THERMAL,
    options: [TransformationType.THERMAL, TransformationType.SOUND, TransformationType.LUMINOUS, TransformationType.CHEMICAL],
    explanation: "Una potent resistència escalfa la base metàl·lica a més de 150 °C (energia tèrmica) per eliminar plecs.",
    imageUrl: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    objectName: "Cotxe Elèctric (Motor)",
    description: "Vehicle que es propulsa sense emetre fums gràcies a la tracció elèctrica.",
    correctType: TransformationType.MECHANICAL,
    options: [TransformationType.MECHANICAL, TransformationType.THERMAL, TransformationType.CHEMICAL, TransformationType.SOUND],
    explanation: "El motor d'inducció o imants permanents converteix l'electricitat en un parell de forces que fa girar les rodes (energia mecànica).",
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 13,
    objectName: "Trepant (Taladradora)",
    description: "Eina per perforar fusta, paret o metall amb una broca giratòria.",
    correctType: TransformationType.MECHANICAL,
    options: [TransformationType.MECHANICAL, TransformationType.LUMINOUS, TransformationType.THERMAL, TransformationType.CHEMICAL],
    explanation: "El motor elèctric fa girar la broca amb gran força i velocitat per foradar materials.",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 14,
    objectName: "Estufa de Quars",
    description: "Calefactor amb tubs de vidre que es tornen vermells incandescents.",
    correctType: TransformationType.THERMAL,
    options: [TransformationType.THERMAL, TransformationType.MECHANICAL, TransformationType.CHEMICAL, TransformationType.SOUND],
    explanation: "Els filaments interns irradien calor per radiació infraroja i convecció d'aire (energia tèrmica).",
    imageUrl: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 15,
    objectName: "Auriculars",
    description: "Dispositius personals per escoltar àudio directament a les orelles.",
    correctType: TransformationType.SOUND,
    options: [TransformationType.SOUND, TransformationType.CHEMICAL, TransformationType.THERMAL, TransformationType.LUMINOUS],
    explanation: "Transductors minúsculs fan vibrar una membrana magnètica creant micro-ones sonores que detecta l'oïda.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 16,
    objectName: "Tub Fluorescent",
    description: "Làmpada de descàrrega en gas que il·lumina aules, garatges i cuines.",
    correctType: TransformationType.LUMINOUS,
    options: [TransformationType.LUMINOUS, TransformationType.MECHANICAL, TransformationType.THERMAL, TransformationType.CHEMICAL],
    explanation: "Els electrons exciten el vapor de mercuri de l'interior, el qual emet llum ultraviolada que la capa blanca de fòsfor converteix en llum visible.",
    imageUrl: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 17,
    objectName: "Soldador d'Estany",
    description: "Eina manual amb punta metàl·lica per unir components electrònics a circuits impresos.",
    correctType: TransformationType.THERMAL,
    options: [TransformationType.THERMAL, TransformationType.MECHANICAL, TransformationType.SOUND, TransformationType.LUMINOUS],
    explanation: "La resistència ceràmica interna escalfa la punta de coure fins a 350 °C per fondre l'aliatge d'estany.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 18,
    objectName: "Ascensor",
    description: "Cabina mecànica que desplaça persones verticalment entre les plantes d'un edifici.",
    correctType: TransformationType.MECHANICAL,
    options: [TransformationType.MECHANICAL, TransformationType.THERMAL, TransformationType.CHEMICAL, TransformationType.LUMINOUS],
    explanation: "Un gran motor elèctric de tracció fa girar les politges que eleven la cabina mitjançant cables d'acer.",
    imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 19,
    objectName: "Bateria de Patinet (Càrrega)",
    description: "Procés de recàrrega de la bateria d'un patinet elèctric en un endoll de paret.",
    correctType: TransformationType.CHEMICAL,
    options: [TransformationType.CHEMICAL, TransformationType.MECHANICAL, TransformationType.SOUND, TransformationType.LUMINOUS],
    explanation: "L'electricitat de la xarxa s'emmagatzema com a energia potencial química als àtoms de liti de la bateria.",
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 20,
    objectName: "Sirena d'Ambulància",
    description: "Dispositiu acústic d'emergència que emet un to molt potent i agut.",
    correctType: TransformationType.SOUND,
    options: [TransformationType.SOUND, TransformationType.THERMAL, TransformationType.CHEMICAL, TransformationType.MECHANICAL],
    explanation: "Converteix els polsos elèctrics ràpids en potents variacions de pressió d'aire audibles a centenars de metres.",
    imageUrl: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80"
  }
];
