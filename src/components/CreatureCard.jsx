import React, { useEffect } from 'react';
import { MessageCircle, ShieldAlert, Sparkles, X } from 'lucide-react';

function CreatureCard({ creature, playTone, onClose, onChat, onDelete }) {
  
  // Play the creature's unique sound when card is viewed
  useEffect(() => {
    if (creature && creature.frequency) {
      // Play a short double tone (melodic chime)
      playTone(creature.frequency, 'sine', 0.25);
      setTimeout(() => playTone(creature.frequency * 1.25, 'sine', 0.2), 150);
    }
  }, [creature]);

  const statColors = {
    attack: '#ff7675',
    speed: '#74b9ff',
    defense: '#55efc4',
    magic: '#a29bfe'
  };

  return (
    <div className="w-full max-w-sm holo-card p-6 flex flex-col items-center gap-6 relative select-none">
      
      {/* Close button */}
      <button 
        onClick={() => { playTone(220); onClose(); }}
        className="absolute top-4 right-4 btn-toy p-1.5 border-2 rounded-full shadow-none"
        style={{ padding: '6px', boxShadow: 'none' }}
      >
        <X className="w-4 h-4 text-slate-800" />
      </button>

      {/* Title & Sparkle */}
      <div className="text-center mt-2">
        <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span>Sinh Vật Thần Thoại</span>
        </span>
        <h3 className="text-2xl font-extrabold text-slate-800 tracking-wide mt-1">
          {creature.name}
        </h3>
        <p className="text-[9px] text-slate-400 font-bold font-mono">Lai tạo ngày: {creature.dateCreated}</p>
      </div>

      {/* Animal Image inside Glowing frame */}
      <div className="w-44 h-44 rounded-full border-4 border-slate-800 bg-white p-2 glow-avatar shadow-lg flex items-center justify-center relative overflow-hidden">
        <img 
          src={creature.image} 
          alt={creature.name} 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Story */}
      <p className="text-xs text-slate-500 font-bold italic leading-relaxed text-justify bg-slate-100 p-3 rounded-2xl border-2 border-slate-200 w-full">
        "{creature.description}"
      </p>

      {/* Stats Section */}
      <div className="w-full space-y-3 bg-white p-4 rounded-2xl border-2 border-slate-800">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 border-b-2 border-slate-100 pb-1.5">
          CHỈ SỐ SỨC MẠNH
        </h4>

        {Object.entries(creature.stats).map(([stat, val]) => (
          <div key={stat} className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 uppercase">
              <span>{stat === 'attack' ? '⚔️ TẤN CÔNG' : stat === 'speed' ? '⚡ TỐC ĐỘ' : stat === 'defense' ? '🛡️ PHÒNG THỦ' : '🔮 PHÉP THUẬT'}</span>
              <span>{val}/100</span>
            </div>
            <div className="stat-bar-bg">
              <div 
                className="stat-bar-fill" 
                style={{ 
                  width: `${val}%`, 
                  backgroundColor: statColors[stat] 
                }} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full mt-2">
        <button
          onClick={onChat}
          className="btn-toy btn-toy-accent flex-1 justify-center py-3 text-sm font-extrabold"
        >
          <MessageCircle className="w-4.5 h-4.5" />
          <span>TRÒ CHUYỆN</span>
        </button>

        <button
          onClick={() => onDelete(creature.id)}
          className="btn-toy border-red-500 text-red-500 hover:bg-red-50 py-3 justify-center shadow-none border-2"
          style={{ width: '50px', padding: '12px', boxShadow: 'none', border: '2px solid #ef4444' }}
          title="Thả thú về rừng"
        >
          <ShieldAlert className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}

export default CreatureCard;
