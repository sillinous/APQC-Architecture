'use client';

import { useState } from 'react';
import { architecturePrinciples, ArchitecturePrinciple } from '@/data/principles';

export default function PrinciplesLibrary() {
  const [selectedPrinciple, setSelectedPrinciple] = useState<ArchitecturePrinciple | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, Record<number, boolean>>>({});

  const toggleCheck = (principleId: string, index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [principleId]: {
        ...(prev[principleId] || {}),
        [index]: !(prev[principleId]?.[index])
      }
    }));
  };

  const checklistItems = [
    "Design reviews must reference this principle",
    "Automated tests must verify compliance",
    "Deviations require formal justification"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-emerald-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Architecture Principles Library</h1>
          <p className="text-emerald-100">
            Governing principles for the APQC-aligned AI agent ecosystem.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Principles List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Core Principles</h2>
              {architecturePrinciples.map((principle) => (
                <button
                  key={principle.id}
                  onClick={() => setSelectedPrinciple(principle)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    selectedPrinciple?.id === principle.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-md'
                      : 'border-white dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                    style={{ backgroundColor: `${principle.color}20`, color: principle.color }}
                  >
                    {principle.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white leading-tight">
                      {principle.name}
                    </h3>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      Principle {principle.id}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Principle Detail */}
            <div className="lg:col-span-2">
              {selectedPrinciple ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-24">
                  <div 
                    className="p-8 text-white relative overflow-hidden"
                    style={{ backgroundColor: selectedPrinciple.color }}
                  >
                    <div className="absolute -right-10 -bottom-10 text-[180px] opacity-10 pointer-events-none">
                      {selectedPrinciple.icon}
                    </div>
                    <div className="relative z-10">
                      <div className="text-sm font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit mb-4">
                        Principle {selectedPrinciple.id}
                      </div>
                      <h2 className="text-4xl font-bold mb-4">{selectedPrinciple.name}</h2>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-10">
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Principle Statement</h3>
                      <p className="text-xl text-gray-900 dark:text-white font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-6">
                        "{selectedPrinciple.statement}"
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Rationale</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {selectedPrinciple.rationale}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Implications</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {selectedPrinciple.implications}
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100 dark:border-gray-700">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Compliance Checklist</h3>
                      <div className="space-y-3">
                        {checklistItems.map((item, i) => (
                          <button 
                            key={i} 
                            onClick={() => toggleCheck(selectedPrinciple.id, i)}
                            className="flex items-center gap-3 text-sm text-left w-full group transition-colors"
                          >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                              checkedItems[selectedPrinciple.id]?.[i]
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-gray-300 dark:border-gray-600 group-hover:border-emerald-400'
                            }`}>
                              {checkedItems[selectedPrinciple.id]?.[i] && (
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={checkedItems[selectedPrinciple.id]?.[i] ? 'text-gray-400 line-through' : 'text-gray-600 dark:text-gray-300'}>
                              {item}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-20 text-center border-4 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center h-full">
                  <div className="text-6xl mb-6 grayscale opacity-30">📐</div>
                  <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500">
                    Select a principle from the library to view details
                  </h3>
                  <p className="text-gray-400 dark:text-gray-600 max-w-sm mt-2">
                    These principles provide the foundation for our architectural decisions.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
