import React, { useState, useEffect } from 'react';
import IslandMap from './components/IslandMap';
import FusionLab from './components/FusionLab';
import CreatureCard from './components/CreatureCard';
import CreatureChat from './components/CreatureChat';
import { presetHybrids } from './data/presetHybrids';
import { Home, Sparkles, BookOpen, Volume2, VolumeX } from 'lucide-react';

function App() {
  const [view, setView] = useState('island'); // 'island', 'lab', 'collection', 'chat'
  const [myCreatures, setMyCreatures] = useState(() => {
    const saved = localStorage.getItem('animix_my_creatures');
    if (saved) return JSON.parse(saved);
    // Prepopulate with a default cute pet so the island is alive
    const defaultPet = {
      id: 'default-fusion',
      parentA: 'lion',
      parentB: 'butterfly',
      ...presetHybrids['butterfly-lion'],
      dateCreated: new Date().toLocaleDateString()
    };
    return [defaultPet];
  });
  
  const [selectedCreature, setSelectedCreature] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    localStorage.setItem('animix_my_creatures', JSON.stringify(myCreatures));
  }, [myCreatures]);

  // Audio Context Synthesizer for Retro Beep Sound Effects
  const playTone = (freq = 440, type = 'sine', duration = 0.2) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Lỗi phát âm thanh:", e);
    }
  };

  const handleSelectFromIsland = (creature) => {
    playTone(392); // G4 Note
    setSelectedCreature(creature);
    setView('collection');
  };

  return (
    <div className="mobile-container">
      {/* Header Info */}
      <header className="flex justify-between items-center py-4 px-2 w-full z-10">
        <div className="flex items-center gap-1.5">
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-2 rounded-2xl border-2 border-slate-800 shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-slate-800 flex items-center gap-1">
              AniMix<span className="text-pink-500">AI</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Đảo thú ma thuật</p>
          </div>
        </div>

        <button 
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (!soundEnabled) {
              // Play a quick chime to indicate sound is turned on
              setTimeout(() => playTone(523.25, 'sine', 0.1), 0);
              setTimeout(() => playTone(659.25, 'sine', 0.1), 100);
            }
          }}
          className="btn-toy p-2.5 rounded-full"
          style={{ padding: '10px', boxShadow: '0 4px 0 #2c3e50' }}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
        </button>
      </header>

      {/* Main Content screens */}
      <main className="flex-1 w-full my-4 flex flex-col justify-center items-center">
        {view === 'island' && (
          <IslandMap 
            myCreatures={myCreatures} 
            onSelectCreature={handleSelectFromIsland} 
          />
        )}

        {view === 'lab' && (
          <FusionLab 
            myCreatures={myCreatures} 
            setMyCreatures={setMyCreatures} 
            playTone={playTone}
            onFuseComplete={(newCreature) => {
              setSelectedCreature(newCreature);
              setView('collection');
            }} 
          />
        )}

        {view === 'collection' && selectedCreature && (
          <CreatureCard 
            creature={selectedCreature} 
            playTone={playTone}
            onClose={() => setView('island')} 
            onChat={() => {
              playTone(440);
              setView('chat');
            }}
            onDelete={(id) => {
              if (window.confirm("Bé có chắc chắn muốn thả chú thú cưng này về rừng tự nhiên không?")) {
                setMyCreatures(prev => prev.filter(c => c.id !== id));
                setView('island');
                playTone(220, 'sine', 0.4);
              }
            }}
          />
        )}

        {view === 'chat' && selectedCreature && (
          <CreatureChat 
            creature={selectedCreature} 
            onClose={() => setView('collection')} 
          />
        )}
      </main>

      {/* Navigation Footer */}
      {view !== 'chat' && view !== 'collection' && (
        <nav className="flex justify-around items-center py-4 bg-white/80 border-4 border-slate-800 rounded-3xl shadow-xl w-full z-10 backdrop-blur-md">
          <button
            onClick={() => { playTone(261.63); setView('island'); }}
            className={`flex flex-col items-center gap-1 font-bold text-xs p-2 rounded-xl transition-transform ${view === 'island' ? 'text-pink-500 scale-110' : 'text-slate-500'}`}
          >
            <Home className="w-6 h-6" />
            <span>Đảo Thú</span>
          </button>
          
          <button
            onClick={() => { playTone(293.66); setView('lab'); }}
            className="btn-toy btn-toy-primary flex items-center justify-center p-3 rounded-full -translate-y-6 shadow-lg shadow-pink-900/10 border-4 border-slate-800"
            style={{ width: '60px', height: '60px', borderRadius: '50%', boxShadow: '0 6px 0 #2c3e50' }}
            title="Dung Hợp Thú AI"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={() => {
              playTone(329.63);
              if (myCreatures.length > 0) {
                setSelectedCreature(myCreatures[0]);
                setView('collection');
              } else {
                alert("Bé chưa có thú lai nào, hãy vào phòng Lab để chế tạo nhé!");
              }
            }}
            className={`flex flex-col items-center gap-1 font-bold text-xs p-2 rounded-xl transition-transform ${view === 'collection' ? 'text-pink-500 scale-110' : 'text-slate-500'}`}
          >
            <BookOpen className="w-6 h-6" />
            <span>Vườn Thú</span>
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;
