# ⚡ Càpsula d'Aprenentatge d'Electricitat (3 Hores)
### *De l'Àtom al Multímetre: Teoria, Simuladors Interactius i Pràctica de Laboratori*

Aquesta aplicació web interactiva integra en una sola plataforma educativa una **càpsula de 3 hores (180 minuts)** per a l'ensenyament i aprenentatge dels conceptes bàsics d'electricitat, organitzada de manera **estrictament seqüencial** en tons clars, amables i pensats per a l'aula de secundària i cicles formatius.

---

## 🧭 Estructura Didàctica de la Càpsula (6 Blocs Seqüencials • 180 minuts)

### **Bloc 1: Què és l'Electricitat? L'Àtom, Conductors i Aïllants (25 min)**
* **Teoria Fonamental**:
  * Què és la matèria i l'àtom: protons (+), neutrons (neutres) al nucli i electrons (-) a les òrbites.
  * Què és un electró lliure: per què els metalls deixen escapar electrons fàcilment.
  * Què és el corrent elèctric: el moviment ordenat d'electrons empesos per un generador o pila.
  * Sentit real (d'electrons, de $-$ a $+$) vs sentit convencional (de $+$ a $-$).
* **Pràctica Interactiva - ElectroConnecta**: Experimentar amb materials conductors (coure, ferro, grafit, aigua amb sal) i aïllants (fusta, plàstic, goma) per tancar el circuit i encendre la bombeta.

### **Bloc 2: Com fem servir l'Electricitat? Les Transformacions d'Energia (25 min)**
* **Teoria**:
  * Principi de conservació de l'energia: l'electricitat no es crea ni es destrueix, es transforma.
  * Energia lluminosa (bombetes LED, pantalles).
  * Energia tèrmica (calor, Efecte Joule: estufes, torradores, planxes).
  * Energia mecànica (moviment, motors: cotxe elèctric, ventiladors, batedores).
  * Energia sonora (altaveus, timbres).
  * Energia química (recàrrega de bateries, acumuladors).
* **Pràctica Interactiva - ElectroTransforma**: Joc interactiu de preguntes i targetes per relacionar aparells quotidians amb les transformacions d'energia.

### **Bloc 3: Simbologia i Tipus de Circuits (30 min)**
* **Teoria**: La necessitat de normalitzar la representació gràfica dels circuits (norma IEC).
* **Pràctica 3.1 - ElectroCircuit**: Biblioteca de símbols normalitzats (pila, bombeta, interruptor, polsador, resistència, motor...) i test d'autoavaluació.
* **Pràctica 3.2 - Circuit Màgic**: Simulació interactiva del comportament dels receptors en **sèrie** i en **paral·lel** (què passa si es fon una bombeta? com canvia la brillantor?).

### **Bloc 4: Magnituds Elèctriques i la Llei d'Ohm (35 min)**
* **Teoria**: Definició de Voltatge / Tensió ($V$), Intensitat ($I$), Resistència ($R$) i Potència ($P$). Ús de prefixos internacionals ($mA$, $k\Omega$, $mV$).
* **Pràctica 4.1 - Conversor d'Unitats Elèctriques**: Taula de prefixos, explicacions pas a pas i mode de pràctica interactiva de conversió.
* **Pràctica 4.2 - Simulador de la Llei d'Ohm**: Simulador visual amb potenciòmetres interactius per experimentar la relació $V = I \cdot R$ i exercicis autocorregibles.

### **Bloc 5: La Resistència com a Component i Codi de Colors (25 min)**
* **Teoria**: Funció de les resistències com a limitadors del corrent i protecció de components sensibles (LEDs, xips). Lectura del codi de colors de 4 bandes.
* **Pràctica 5.1 - Joc de Codi de Colors**: Simulador de càlcul de resistències i toleràncies a partir de les bandes de color, amb taula de referència interactiva i comptador de ratxes.

### **Bloc 6: Tasca Final d'Avaluació: Laboratori amb Multímetre (40 min)**
* **Simulador de Multímetre Digital (Tester)**:
  * Selector rotatori funcional amb posicions `OFF`, escales de Voltatge `DCV` ($200mV$, $2V$, $20V$, $200V$) i escales de Resistència $\Omega$ ($200\Omega$, $2k\Omega$, $20k\Omega$, $200k\Omega$, $2M\Omega$).
  * Puntes de prova vermella ($V/\Omega$) i negra ($COM$) connectables amb un clic als circuits.
  * Pantalla LCD amb lectura digital, polaritat negativa ($-$), sobrecàrrega fora de rang ($1\ .$) i alertes de laboratori.
* **3 Bancs de Pràctiques Interactius**:
  1. *Banc 1:* Mesura d'Ohms en resistències individuals desconnectades.
  2. *Banc 2:* Circuit sèrie amb pila de 9V i caigudes de tensió (comprovació $V_{total} = V_1 + V_2$).
  3. *Banc 3:* Repte de càlcul de la Llei d'Ohm (mesura de la tensió en un component incògnit $R_x$ amb corrent conegut i càlcul de $R_x = \frac{V}{I}$).
* **Quadern d'Avaluació de l'Alumnat**:
  * 6 reptes i preguntes de mesura i càlcul amb comprovació immediata.
  * Càlcul de la nota sobre 10 punts.
  * Botó per generar i imprimir o desar l'informe final en PDF per lliurar al professorat.

---

## 🔒 Identificació Obligatòria i Autosave Continu
- L'alumnat ha d'introduir obligatòriament el seu **nom i cognoms** i seleccionar el seu **grup classe** (`1r A`, `1r B`, `2n A`, `2n B`, `3r A`, `3r B`).
- Totes les dades, el bloc actual i les respostes es guarden automàticament a `localStorage` (autosave en temps real).

---

## 🚀 Com executar el projecte localment

```bash
# Instal·lar dependències
npm install

# Arrencar el servidor local
npm run dev
```

L'aplicació s'obrirà a `http://localhost:3000`.

---

## 📦 Construcció per a producció (GitHub Pages)

```bash
npm run build
```

El directori `dist/` conté l'aplicació llesta per desplegar-se a GitHub Pages o qualsevol hosting estàtic.
