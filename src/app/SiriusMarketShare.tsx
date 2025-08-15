"use client";
import React, { useEffect, useRef, useState } from "react";

type DataRow = {
  halbjahr: string;
  branche: number;
  sirius: number;
};

type MarketShareRow = DataRow & { marketShare: number };

const data: DataRow[] = [
  { halbjahr: "1. Halbj. 01", branche: 20.0, sirius: 1.6 },
  { halbjahr: "2. Halbj. 01", branche: 26.8, sirius: 2.5 },
  { halbjahr: "1. Halbj. 02", branche: 21.7, sirius: 2.6 },
  { halbjahr: "2. Halbj. 02", branche: 29.6, sirius: 3.5 },
  { halbjahr: "1. Halbj. 03", branche: 24.4, sirius: 3.6 },
  { halbjahr: "2. Halbj. 03", branche: 32.6, sirius: 4.0 },
];

function calculateMarketShares(): MarketShareRow[] {
  return data.map((row) => ({
    ...row,
    marketShare: (row.sirius / row.branche) * 100,
  }));
}

function findMaxMarketShare(marketShares: MarketShareRow[]): MarketShareRow {
  return marketShares.reduce(
    (max: MarketShareRow, curr: MarketShareRow) => (curr.marketShare > max.marketShare ? curr : max),
    marketShares[0]
  );
}

type MaxIncrease = {
  from: MarketShareRow | null;
  to: MarketShareRow | null;
  increase: number;
};

function findMaxIncrease(marketShares: MarketShareRow[]): MaxIncrease {
  let maxInc: MaxIncrease = { from: null, to: null, increase: -Infinity };
  for (let i = 1; i < marketShares.length; i++) {
    const inc = marketShares[i].marketShare - marketShares[i - 1].marketShare;
    if (inc > maxInc.increase) {
      maxInc = {
        from: marketShares[i - 1],
        to: marketShares[i],
        increase: inc,
      };
    }
  }
  return maxInc;
}

function useTypingEffect(text: string, speed = 50) {
  const [displayed, setDisplayed] = React.useState("");
  const index = useRef(0);

  useEffect(() => {
    const startTyping = () => {
      setDisplayed("");
      index.current = 0;
      const interval = setInterval(() => {
        if (index.current < text.length) {
          setDisplayed(text.substring(0, index.current + 1));
          index.current++;
        } else {
          clearInterval(interval);
          // Wait 2 seconds then restart the typing effect
          setTimeout(() => {
            startTyping();
          }, 2000);
        }
      }, speed);
    };

    startTyping();
  }, [text, speed]);

  return displayed;
}

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

function Tooltip({ text, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 transition-all duration-300 ease-in-out">
          <div className="bg-black/70 backdrop-blur-md text-white text-sm rounded-lg p-3 max-w-xs shadow-2xl border border-green-800/30">
            <div className="whitespace-pre-wrap">{text}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/70"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiriusMarketShare() {
  const marketShares = calculateMarketShares();
  const maxShare = findMaxMarketShare(marketShares);
  const maxInc = findMaxIncrease(marketShares);
  const title = useTypingEffect("Sirius AG Marktanteil Analyse", 60);
  
  // State for interactive revelation
  const [showProblem, setShowProblem] = React.useState(false);
  const [showSolutionA, setShowSolutionA] = React.useState(false);
  const [showSolutionB, setShowSolutionB] = React.useState(false);
  const [showCompleteAnalysis, setShowCompleteAnalysis] = React.useState(false);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tektur:wght@400;700&display=swap');
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(34, 197, 94, 0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Header */}
        <header className="relative z-10 pt-8 pb-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-green-400 font-[Tektur,monospace] tracking-widest drop-shadow-2xl mb-2" style={{fontFamily: 'Tektur, monospace'}}>
              {title}
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-gray-600 mx-auto rounded-full"></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Data Table Section */}
            <section className="mb-8">
              <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-green-800/30">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-green-300 font-[Tektur,monospace]">
                    Umsatzdaten & Marktanteile
                  </h2>
                  <Tooltip text="Diese Tabelle zeigt die Umsätze der Branche und der Sirius AG für jedes Halbjahr sowie den berechneten Marktanteil. Der Marktanteil wird als (Sirius AG Umsatz / Branchenumsatz) × 100 berechnet.">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30 hover:bg-green-500/30 transition-all duration-200">
                      <span className="text-green-400 text-sm font-bold">i</span>
                    </div>
                  </Tooltip>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-gray-200 border-separate border-spacing-y-1">
                    <thead>
                      <tr className="text-green-400 text-lg">
                        <th className="p-4 text-left">Halbjahr</th>
                        <th className="p-4 text-right">Branche (€ Mio)</th>
                        <th className="p-4 text-right">Sirius AG (€ Mio)</th>
                        <th className="p-4 text-right">Marktanteil (%)</th>
                        <th className="p-4 text-right">Anstieg (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketShares.map((row, index) => {
                        const percentageIncrease = index === 0 ? null : 
                          ((row.marketShare - marketShares[index - 1].marketShare) / marketShares[index - 1].marketShare) * 100;
                        
                        return (
                          <tr
                            key={row.halbjahr}
                            className={`transition-all duration-200 hover:scale-[1.02] ${
                              row.halbjahr === maxShare.halbjahr
                                ? "bg-green-900/60 text-green-200 font-bold shadow-lg"
                                : maxInc.to && row.halbjahr === maxInc.to.halbjahr
                                ? "bg-gray-700/60 text-gray-100 shadow-md"
                                : "bg-gray-800/40 hover:bg-gray-700/50"
                            }`}
                          >
                            <td className="p-4 rounded-l-lg font-medium">{row.halbjahr}</td>
                            <td className="p-4 text-right">{row.branche.toFixed(1)}</td>
                            <td className="p-4 text-right">{row.sirius.toFixed(1)}</td>
                            <td className="p-4 text-right font-bold">{row.marketShare.toFixed(2)}</td>
                            <td className="p-4 rounded-r-lg text-right">
                              {percentageIncrease === null ? 
                                <span className="text-gray-500">—</span> : 
                                <span className={`font-bold ${percentageIncrease >= 0 ? "text-green-400" : "text-red-400"}`}>
                                  {percentageIncrease >= 0 ? "+" : ""}{percentageIncrease.toFixed(2)}%
                                </span>
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Results Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              
              {/* Result A */}
              <section className="bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-green-800/30 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-green-300 font-[Tektur,monospace]">
                    a) Höchster Marktanteil
                  </h3>
                  <Tooltip text="Das Halbjahr mit dem höchsten Marktanteil wird ermittelt, indem alle berechneten Marktanteile verglichen werden. Der höchste Wert zeigt die stärkste Marktposition der Sirius AG im Betrachtungszeitraum.">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30 hover:bg-green-500/30 transition-all duration-200">
                      <span className="text-green-400 text-sm font-bold">i</span>
                    </div>
                  </Tooltip>
                </div>
                
                <div className="bg-green-900/30 rounded-xl p-4 mb-4">
                  <div className="text-4xl font-bold text-green-400 mb-2 font-[Tektur,monospace]">
                    {maxShare.marketShare.toFixed(2)}%
                  </div>
                  <div className="text-green-300 text-lg">
                    {maxShare.halbjahr}
                  </div>
                </div>
                
                <p className="text-gray-100 text-base leading-relaxed">
                  Das <span className="text-green-400 font-bold">{maxShare.halbjahr}</span> hatte 
                  den höchsten Marktanteil mit <span className="text-green-400 font-bold">{maxShare.marketShare.toFixed(2)}%</span>.
                </p>
              </section>

              {/* Result B */}
              <section className="bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-green-800/30 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-green-300 font-[Tektur,monospace]">
                    b) Größte Steigerung
                  </h3>
                  <Tooltip text="Die größte prozentuale Steigerung wird berechnet, indem die Differenz der Marktanteile zwischen aufeinanderfolgenden Halbjahren ermittelt wird. Die größte positive Differenz zeigt den bedeutendsten Sprung im Marktanteil.">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30 hover:bg-green-500/30 transition-all duration-200">
                      <span className="text-green-400 text-sm font-bold">i</span>
                    </div>
                  </Tooltip>
                </div>
                
                {maxInc.from && maxInc.to ? (
                  <>
                    <div className="bg-gray-700/30 rounded-xl p-4 mb-4">
                      <div className="text-4xl font-bold text-green-400 mb-2 font-[Tektur,monospace]">
                        +{maxInc.increase.toFixed(2)}
                      </div>
                      <div className="text-gray-300 text-sm">
                        Prozentpunkte
                      </div>
                    </div>
                    
                    <p className="text-gray-100 text-base leading-relaxed">
                      Die größte Steigerung erfolgte von <span className="text-green-400 font-bold">{maxInc.from.halbjahr}</span> zu{" "}
                      <span className="text-green-400 font-bold">{maxInc.to.halbjahr}</span>.
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400">Nicht verfügbar.</p>
                )}
              </section>
            </div>

            {/* Process Explanation */}
            <section className="bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-green-800/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-green-300 font-[Tektur,monospace]">
                  Lösungsweg
                </h3>
                <Tooltip text="Dieser Abschnitt erklärt jeden Schritt der Analyse von der Datensammlung bis zur Visualisierung der Ergebnisse. Jeder Schritt baut auf dem vorherigen auf und führt zu den finalen Antworten.">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30 hover:bg-green-500/30 transition-all duration-200">
                    <span className="text-green-400 text-sm font-bold">i</span>
                  </div>
                </Tooltip>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    step: "1",
                    title: "Datenaufnahme",
                    desc: "Umsätze der Branche und Sirius AG für jedes Halbjahr sammeln",
                    tooltip: "In diesem Schritt werden die Rohdaten aus der Statistik extrahiert und in eine strukturierte Form gebracht. Die Daten umfassen Branchenumsatz und Sirius AG Umsatz für sechs Halbjahre."
                  },
                  {
                    step: "2",
                    title: "Marktanteil berechnen",
                    desc: "Formel: (Sirius AG Umsatz ÷ Branchenumsatz) × 100",
                    tooltip: "Der Marktanteil wird für jedes Halbjahr einzeln berechnet. Die Formel gibt den prozentualen Anteil der Sirius AG am Gesamtmarkt an."
                  },
                  {
                    step: "3",
                    title: "Maximum ermitteln",
                    desc: "Das Halbjahr mit dem höchsten Marktanteil identifizieren",
                    tooltip: "Durch Vergleich aller berechneten Marktanteile wird das Halbjahr mit dem höchsten Wert bestimmt. Dies beantwortet Aufgabe a)."
                  },
                  {
                    step: "4",
                    title: "Steigerungen berechnen",
                    desc: "Differenzen zwischen aufeinanderfolgenden Halbjahren",
                    tooltip: "Für jedes Halbjahr wird die Veränderung zum vorherigen berechnet. Die größte positive Veränderung ist die gesuchte Steigerung."
                  },
                  {
                    step: "5",
                    title: "Visualisierung",
                    desc: "Ergebnisse in farblich gestalteter Tabelle darstellen",
                    tooltip: "Die wichtigsten Ergebnisse werden visuell hervorgehoben: Höchster Marktanteil in grün, größte Steigerung in grau."
                  },
                  {
                    step: "6",
                    title: "Interpretation",
                    desc: "Bedeutung der Ergebnisse für das Unternehmen erläutern",
                    tooltip: "Die Ergebnisse werden in den Kontext der Unternehmensleistung eingeordnet und ihre Bedeutung für die Marktposition erklärt."
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-gray-800/40 rounded-xl p-4 hover:bg-gray-700/50 transition-all duration-200 border border-gray-700/30">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30 flex-shrink-0">
                        <span className="text-green-400 font-bold text-sm">{item.step}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-100 text-sm">{item.title}</h4>
                          <Tooltip text={item.tooltip}>
                            <div className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30 hover:bg-green-500/30 transition-all duration-200">
                              <span className="text-green-400 text-xs font-bold">i</span>
                            </div>
                          </Tooltip>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}