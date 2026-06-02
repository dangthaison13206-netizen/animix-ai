import React, { useState } from 'react';
import { Search, Sparkles, MessageCircle, Eye, Trash2 } from 'lucide-react';

function CreatureCollection({ myCreatures, onSelectCreature, onChatCreature, onDeleteCreature, playTone }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterElement, setFilterElement] = useState('all');

  const elements = [
    { id: 'all', label: '🌟 Tất cả' },
    { id: 'fire', label: '🔥 Lửa (Sư tử/Rồng)' },
    { id: 'water', label: '💧 Nước (Cá mập)' },
    { id: 'ice', label: '❄️ Băng (Cánh cụt)' },
    { id: 'wind', label: '🍃 Gió (Bướm)' },
    { id: 'earth', label: '🌱 Đất (Khỉ)' },
    { id: 'light', label: '✨ Ánh Sáng (Cừu)' },
    { id: 'dino', label: '🦖 Cổ Đại (Khủng long)' }
  ];

  // Helper to map parent systems to filter categories
  const matchesElement = (creature, elementId) => {
    if (elementId === 'all') return true;
    const parents = [creature.parentA, creature.parentB];
    
    switch (elementId) {
      case 'fire':
        return parents.includes('lion') || parents.includes('dragon');
      case 'water':
        return parents.includes('shark');
      case 'ice':
        return parents.includes('penguin');
      case 'wind':
        return parents.includes('butterfly');
      case 'earth':
        return parents.includes('monkey');
      case 'light':
        return parents.includes('sheep');
      case 'dino':
        return parents.includes('dinosaur');
      default:
        return true;
    }
  };

  const filteredCreatures = myCreatures.filter(creature => {
    const matchesSearch = creature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          creature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = matchesElement(creature, filterElement);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-md cartoon-panel flex flex-col space-y-4 max-h-[80vh]">
      
      {/* Header Statistics */}
      <div className="text-center space-y-1.5">
        <h3 className="text-lg font-bold text-slate-800 flex justify-center items-center gap-1.5">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span>VƯỜN THÚ CỦA BÉ</span>
        </h3>
        <div className="inline-block bg-pink-100 text-pink-600 font-extrabold text-[11px] px-3 py-1 rounded-full border-2 border-pink-200">
          🏆 Sưu tập: {myCreatures.length} / 28 loài thú lai!
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Tìm tên thú cưng của bé..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="glass-input w-full py-2.5 pl-10 pr-4 text-xs"
        />
        <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
      </div>

      {/* Filter Elements Scrollbar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none whitespace-nowrap">
        {elements.map((el) => (
          <button
            key={el.id}
            onClick={() => { playTone(349.23); setFilterElement(el.id); }}
            className={`text-[10px] font-bold px-3 py-1.5 rounded-full border-2 transition-colors ${
              filterElement === el.id
                ? 'bg-slate-800 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-800'
            }`}
          >
            {el.label}
          </button>
        ))}
      </div>

      {/* Grid container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2">
        {filteredCreatures.length > 0 ? (
          <div className="collection-grid">
            {filteredCreatures.map((creature) => (
              <div 
                key={creature.id}
                className="collection-item flex flex-col justify-between"
              >
                {/* Header elements showing parents */}
                <div className="collection-item-header flex items-center justify-center gap-1">
                  <span>Thần thú</span>
                </div>

                {/* Creature visual */}
                <div 
                  onClick={() => onSelectCreature(creature)}
                  className="collection-item-image hover:scale-105 transition-transform"
                >
                  <img src={creature.image} alt={creature.name} className="w-full h-full object-contain" />
                </div>

                {/* Creature Name */}
                <h4 className="collection-item-name leading-tight truncate">{creature.name}</h4>

                {/* Quick actions */}
                <div className="flex items-center gap-1.5 mt-1 justify-center">
                  <button
                    onClick={() => { playTone(392); onSelectCreature(creature); }}
                    className="p-1.5 bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-xl border-2 border-sky-300"
                    title="Xem chi tiết"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => { playTone(440); onChatCreature(creature); }}
                    className="p-1.5 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-xl border-2 border-pink-300"
                    title="Trò chuyện"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteCreature(creature.id)}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl border-2 border-red-200"
                    title="Thả thú về rừng"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 border-4 border-dashed border-slate-200 rounded-2xl p-4">
            <p className="text-xs text-slate-500 font-bold">Không tìm thấy linh thú nào phù hợp! 🐾</p>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">Bé hãy thử thay đổi bộ lọc hoặc ghép thêm nhiều cặp thú mới trong phòng Lab nhé.</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default CreatureCollection;
