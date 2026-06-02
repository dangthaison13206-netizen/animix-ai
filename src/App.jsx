import React, { useState, useEffect } from 'react';
import IslandMap from './components/IslandMap';
import FusionLab from './components/FusionLab';
import CreatureCard from './components/CreatureCard';
import CreatureChat from './components/CreatureChat';
import CreatureCollection from './components/CreatureCollection';
import { presetHybrids } from './data/presetHybrids';
import { Home, Sparkles, BookOpen, Volume2, VolumeX, Settings, X, RefreshCw } from 'lucide-react';

function App() {
  const [view, setView] = useState('island'); // 'island', 'lab', 'collection_list', 'collection', 'chat'
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
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Child's Name states
  const [childName, setChildName] = useState(() => localStorage.getItem('animix_child_name') || '');
  const [childNameInput, setChildNameInput] = useState(() => localStorage.getItem('animix_child_name') || '');

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

  const handleRenameCreature = (id, newName) => {
    setMyCreatures(prev => prev.map(c => c.id === id ? { ...c, name: newName } : c));
    setSelectedCreature(prev => prev && prev.id === id ? { ...prev, name: newName } : prev);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const cleanName = childNameInput.trim();
    localStorage.setItem('animix_child_name', cleanName);
    setChildName(cleanName);
    setShowSettingsModal(false);
    playTone(523.25);
  };

  const handleResetGame = () => {
    if (window.confirm("Bố mẹ có chắc chắn muốn xóa hết vườn thú để bé bắt đầu lại cuộc phiêu lưu từ đầu không?")) {
      const defaultPet = {
        id: 'default-fusion',
        parentA: 'lion',
        parentB: 'butterfly',
        ...presetHybrids['butterfly-lion'],
        dateCreated: new Date().toLocaleDateString()
      };
      setMyCreatures([defaultPet]);
      localStorage.removeItem('animix_my_creatures');
      setView('island');
      setShowSettingsModal(false);
      playTone(220, 'sawtooth', 0.4);
    }
  };

  const handleDeleteCreature = (id) => {
    if (window.confirm("Bé có chắc chắn muốn thả chú linh thú cưng này về rừng tự nhiên không?")) {
      setMyCreatures(prev => prev.filter(c => c.id !== id));
      if (selectedCreature && selectedCreature.id === id) {
        setSelectedCreature(null);
      }
      playTone(220, 'sine', 0.4);
    }
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

        {/* Action controls in header */}
        <div className="flex gap-2">
          <button 
            onClick={() => {
              playTone(392);
              setChildNameInput(childName);
              setShowSettingsModal(true);
            }}
            className="btn-toy p-2.5 rounded-full"
            style={{ padding: '10px', boxShadow: '0 4px 0 #2c3e50' }}
            title="Cài đặt của bố mẹ"
          >
            <Settings className="w-5 h-5 text-slate-700" />
          </button>

          <button 
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) {
                setTimeout(() => playTone(523.25, 'sine', 0.1), 0);
                setTimeout(() => playTone(659.25, 'sine', 0.1), 100);
              }
            }}
            className="btn-toy p-2.5 rounded-full"
            style={{ padding: '10px', boxShadow: '0 4px 0 #2c3e50' }}
            title="Âm thanh"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>
      </header>

      {/* Parent Settings Modal */}
      {showSettingsModal && (
        <div className="modal-overlay">
          <div className="modal-content p-6 space-y-5">
            <div className="flex justify-between items-center border-b-2 border-slate-200 pb-2">
              <h3 className="font-extrabold text-slate-800 text-sm">⚙️ GÓC CỦA BỐ MẸ</h3>
              <button 
                onClick={() => { playTone(220); setShowSettingsModal(false); }}
                className="btn-toy p-1 px-2.5 text-xs shadow-none border-2"
                style={{ padding: '3px 8px', boxShadow: 'none' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-slate-600 block">Tên của bé yêu:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Minh, Chi, Vy..."
                  className="glass-input w-full py-2 px-3 text-xs"
                  value={childNameInput}
                  onChange={(e) => setChildNameInput(e.target.value)}
                />
                <p className="text-[9px] text-slate-400">Tên của bé sẽ được linh thú AI gọi thân mật khi trò chuyện.</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleResetGame}
                  className="btn-toy border-red-500 text-red-500 hover:bg-red-50 text-xs py-2 px-3 shadow-none border-2 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Chơi lại từ đầu
                </button>

                <button 
                  type="submit" 
                  className="btn-toy btn-toy-primary flex-1 py-2 text-xs shadow-none border-2 justify-center"
                >
                  Lưu thiết lập
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

        {view === 'collection_list' && (
          <CreatureCollection 
            myCreatures={myCreatures}
            onSelectCreature={(creature) => {
              setSelectedCreature(creature);
              setView('collection');
            }}
            onChatCreature={(creature) => {
              setSelectedCreature(creature);
              setView('chat');
            }}
            onDeleteCreature={handleDeleteCreature}
            playTone={playTone}
          />
        )}

        {view === 'collection' && selectedCreature && (
          <CreatureCard 
            creature={selectedCreature} 
            playTone={playTone}
            onClose={() => setView('collection_list')} 
            onChat={() => {
              playTone(440);
              setView('chat');
            }}
            onDelete={(id) => {
              handleDeleteCreature(id);
              setView('collection_list');
            }}
          />
        )}

        {view === 'chat' && selectedCreature && (
          <CreatureChat 
            creature={selectedCreature} 
            childName={childName}
            onRenameCreature={handleRenameCreature}
            playTone={playTone}
            onClose={() => setView('collection_list')} 
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
              setView('collection_list');
            }}
            className={`flex flex-col items-center gap-1 font-bold text-xs p-2 rounded-xl transition-transform ${view === 'collection_list' ? 'text-pink-500 scale-110' : 'text-slate-500'}`}
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
