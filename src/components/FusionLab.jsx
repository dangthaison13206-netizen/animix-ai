import React, { useState } from 'react';
import { baseAnimals } from '../data/baseAnimals';
import { presetHybrids, generateDynamicHybrid } from '../data/presetHybrids';
import { Sparkles, HelpCircle, Loader2 } from 'lucide-react';

function FusionLab({ myCreatures, setMyCreatures, playTone, onFuseComplete }) {
  const [slotA, setSlotA] = useState(null); // baseAnimal object
  const [slotB, setSlotB] = useState(null); // baseAnimal object
  const [isFusing, setIsFusing] = useState(false);
  const [showSelector, setShowSelector] = useState(null); // 'A' or 'B'

  const handleSelectAnimal = (animal) => {
    playTone(440); // A4 Note
    if (showSelector === 'A') {
      setSlotA(animal);
    } else {
      setSlotB(animal);
    }
    setShowSelector(null);
  };

  const startFusion = () => {
    if (!slotA || !slotB) return;
    setIsFusing(true);
    
    // Play a series of rising tones to simulate the fusion machine charging up
    playTone(261.63, 'sine', 0.2); // C4
    setTimeout(() => playTone(329.63, 'sine', 0.2), 150); // E4
    setTimeout(() => playTone(392.00, 'sine', 0.2), 300); // G4
    setTimeout(() => playTone(523.25, 'sine', 0.2), 450); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.3), 600); // E5
    
    // Shaking loop sound
    const interval = setInterval(() => {
      playTone(Math.random() * 200 + 400, 'sawtooth', 0.05);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      playTone(783.99, 'triangle', 0.5); // Success chord G5

      // Formulate query key: sorted alphabetically
      const sortedIds = [slotA.id, slotB.id].sort();
      const fusionKey = `${sortedIds[0]}-${sortedIds[1]}`;
      
      let newCreatureData;
      if (presetHybrids[fusionKey]) {
        newCreatureData = {
          id: `fusion-${Date.now()}`,
          parentA: slotA.id,
          parentB: slotB.id,
          ...presetHybrids[fusionKey],
          dateCreated: new Date().toLocaleDateString()
        };
      } else {
        // Fallback for custom hybrid combos
        const generated = generateDynamicHybrid(slotA.id, slotB.id, slotA.name, slotB.name);
        newCreatureData = {
          id: `fusion-${Date.now()}`,
          parentA: slotA.id,
          parentB: slotB.id,
          ...generated,
          dateCreated: new Date().toLocaleDateString()
        };
      }

      setMyCreatures(prev => [newCreatureData, ...prev]);
      setIsFusing(false);
      
      // Reset slots
      setSlotA(null);
      setSlotB(null);

      // Trigger reveal
      onFuseComplete(newCreatureData);

    }, 2000);
  };

  return (
    <div className={`w-full max-w-md cartoon-panel ${isFusing ? 'animate-shake' : ''} space-y-6`}>
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-slate-800 flex justify-center items-center gap-1.5">
          <Sparkles className="w-5 h-5 text-yellow-500 animate-spin-slow" />
          <span>PHÒNG LAI TẠO MA THUẬT</span>
        </h3>
        <p className="text-xs text-slate-500 font-semibold">Chọn 2 chú thú cưng để bắt đầu dung hợp gen AI</p>
      </div>

      {/* Slots Section */}
      <div className="flex justify-around items-center py-6 bg-slate-50 rounded-2xl border-4 border-dashed border-slate-300 relative">
        {/* Connection sign */}
        <div className="absolute text-3xl font-extrabold text-slate-400">+</div>

        {/* Slot A */}
        <button
          onClick={() => !isFusing && setShowSelector('A')}
          className={`w-28 h-28 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center gap-1 relative shadow-md transition-all ${
            slotA ? 'bg-white' : 'bg-slate-200 hover:scale-105 animate-bounce-gentle'
          }`}
          disabled={isFusing}
        >
          {slotA ? (
            <>
              <span className="text-4xl">{slotA.emoji}</span>
              <span className="text-xs font-bold text-slate-800">{slotA.name}</span>
            </>
          ) : (
            <>
              <HelpCircle className="w-8 h-8 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500">CHỌN THÚ A</span>
            </>
          )}
        </button>

        {/* Slot B */}
        <button
          onClick={() => !isFusing && setShowSelector('B')}
          className={`w-28 h-28 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center gap-1 relative shadow-md transition-all ${
            slotB ? 'bg-white' : 'bg-slate-200 hover:scale-105 animate-bounce-gentle'
          }`}
          disabled={isFusing}
          style={{ animationDelay: '0.2s' }}
        >
          {slotB ? (
            <>
              <span className="text-4xl">{slotB.emoji}</span>
              <span className="text-xs font-bold text-slate-800">{slotB.name}</span>
            </>
          ) : (
            <>
              <HelpCircle className="w-8 h-8 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500">CHỌN THÚ B</span>
            </>
          )}
        </button>
      </div>

      {/* Action Button */}
      <button
        onClick={startFusion}
        disabled={!slotA || !slotB || isFusing}
        className="btn-toy btn-toy-primary w-full py-3.5 justify-center disabled:opacity-50 disabled:pointer-events-none"
      >
        {isFusing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>ĐANG DUNG HỢP GEN...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-white" />
            <span>DUNG HỢP THÚ AI!</span>
          </>
        )}
      </button>

      {/* Overlay Animal Selector Grid */}
      {showSelector && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cartoon-panel w-full max-w-sm space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center border-b-2 border-slate-200 pb-2">
              <h4 className="font-extrabold text-slate-800">CHỌN THÚ ĐỒNG HÀNH</h4>
              <button 
                onClick={() => { playTone(220); setShowSelector(null); }}
                className="btn-toy p-1 px-2.5 text-xs shadow-none border-2"
                style={{ padding: '4px 10px', boxShadow: 'none' }}
              >
                X
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 overflow-y-auto p-1 flex-1">
              {baseAnimals.map((animal) => (
                <button
                  key={animal.id}
                  onClick={() => handleSelectAnimal(animal)}
                  className="btn-glass p-3 border-2 border-slate-800 hover:border-pink-500 rounded-2xl flex flex-col items-center gap-1.5 bg-white text-center shadow"
                  style={{ background: 'white' }}
                >
                  <span className="text-3xl">{animal.emoji}</span>
                  <span className="text-xs font-bold text-slate-800">{animal.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FusionLab;
