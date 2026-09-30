# ⚡ Càpsula d'Aprenentatge d'Electricitat (3 Hores)
### *De l'Àtom al Multímetre: Teoria, Simuladors Interactius i Pràctica de Laboratori*

Aquesta aplicació web interactiva integra en una sola plataforma educativa una **càpsula de 3 hores (180 minuts)** per a l'ensenyament i aprenentatge dels conceptes bàsics d'electricitat, organitzada pedagògicament des dels fonaments físics fins a la mesura i càlculs reals amb multímetre digital.

---

## 🧭 Estructura Didàctica de la Càpsula (180 minuts)

La càpsula està seqüenciada en **5 Blocs Didàctics** progressius:

### **Bloc 1: Què és l'Electricitat? (25 min)**
* **Teoria**: Moviment d'electrons, definició de circuit tancat, diferència entre materials conductors i aïllants.
* **Pràctica 1.1 - ElectroConnecta**: Joc interactiu per tancar circuits connectant diferents materials (metalls, fusta, plàstic, aigua amb sal, grafit).
* **Pràctica 1.2 - ElectroTransforma**: Identificació de com l'energia elèctrica es converteix en altres formes d'energia (llum, calor, moviment, so, química).

### **Bloc 2: Dibuix i Esquemes de Circuits (30 min)**
* **Teoria**: La necessitat de normalitzar la representació de circuits elèctrics.
* **Pràctica 2.1 - ElectroCircuit**: Biblioteca de símbols normalitzats (pila, bombeta, interruptor, polsador, resistència, motor, etc.) i test d'autoavaluació.
* **Pràctica 2.2 - Circuit Màgic**: Simulació interactiva del comportament dels receptors en **sèrie** i en **paral·lel** (què passa si es fon una bombeta? com canvia la brillantor?).

### **Bloc 3: Magnituds i la Llei d'Ohm (40 min)**
* **Teoria**: Definició de Tensió / Voltatge ($V$), Intensitat de corrent ($I$), Resistència ($R$) i Potència ($P$). Ús de prefixos internacionals ($mA$, $k\Omega$, $mV$).
* **Pràctica 3.1 - Conversor d'Unitats Elèctriques**: Teoria, taula de prefixos, exemples pas a pas i mode de pràctica interactiva de conversió.
* **Pràctica 3.2 - Simulador de la Llei d'Ohm**: Simulador visual amb potenciòmetres interactius per experimentar la relació $V = I \cdot R$ i exercicis autocorregibles.

### **Bloc 4: La Resistència com a Component (35 min)**
* **Teoria**: Funció de les resistències com a limitadors del corrent i protecció de components. Lectura del codi de colors de 4 bandes.
* **Pràctica 4.1 - Joc de Codi de Colors**: Simulador de càlcul de resistències i toleràncies a partir de les bandes de color, amb taula de referència i comptador de ratxes.

### **Bloc 5: Tasca Final d'Avaluació: Laboratori amb Multímetre (50 min)**
* **Simulador de Multímetre Digital (Tester)**:
  * Selector rotatori funcional amb posicions `OFF`, escales de Voltatge `DCV` ($200mV$, $2V$, $20V$, $200V$) i escales de Resistència $\Omega$ ($200\Omega$, $2k\Omega$, $20k\Omega$, $200k\Omega$, $2M\Omega$).
  * Puntes de prova vermella ($V/\Omega$) i negra ($COM$) connectables als punts de prova dels circuits.
  * Pantalla LCD amb lectura digital, polaritat negativa ($-$), sobrecàrrega fora de rang ($1\ .$) i alertes de seguretat de laboratori.
* **3 Bancs de Pràctiques Interactius**:
  1. *Banc 1: Mesura d'Ohms en resistències individuals desconnectades* (comprovació del valor real en comparació amb el codi de colors).
  2. *Banc 2: Circuit sèrie amb pila de 9V i caigudes de tensió* (comprovació de la Llei de Kirchhoff: $V_{total} = V_1 + V_2$).
  3. *Banc 3: Repte de càlcul de la Llei d'Ohm* (mesura de la tensió en un component incògnit, lectura del corrent al circuit i càlcul de $R_x = \frac{V}{I}$).
* **Quadern d'Avaluació de l'Alumnat**:
  * 6 reptes i preguntes de mesura i càlcul amb comprovació immediata.
  * Càlcul de la qualificació sobre 10 punts.
  * Botó per generar i imprimir o desar l'informe final en PDF amb les dades de l'alumne/a (nom, grup, data i resultats).

---

## 🚀 Com executar el projecte localment

Per iniciar el servidor de desenvolupament local:

```bash
# Instal·lar les dependències (React 19, Vite, Lucide-React, Canvas-Confetti)
npm install

# Arrencar el servidor de desenvolupament
npm run dev
```

L'aplicació s'obrirà a `http://localhost:3000`.

---

## 📦 Construcció per a producció (GitHub Pages)

Per compilar els fitxers estàtics per a publicació web:

```bash
npm run build
```

El directori `dist/` conté l'aplicació llesta per desplegar-se a GitHub Pages o qualsevol servidor web estàtic.
