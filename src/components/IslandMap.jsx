import React from 'react';

function IslandMap({ myCreatures, onSelectCreature }) {
  // Define scatter coordinates so pets spawn in different spots on the island
  const positions = [
    { top: '35%', left: '30%' },
    { top: '25%', left: '60%' },
    { top: '55%', left: '25%' },
    { top: '60%', left: '65%' },
    { top: '45%', left: '50%' },
    { top: '15%', left: '42%' }
  ];

  return (
    <div className="w-full max-w-lg aspect-square relative flex items-center justify-center p-4">
      {/* Wave Ring Animation around the Island */}
      <div className="absolute w-[95%] h-[95%] rounded-full border-[6px] border-sky-300/30 animate-pulse pointer-events-none" />
      <div className="absolute w-[90%] h-[90%] rounded-full border-4 border-sky-400/40 animate-ping pointer-events-none" style={{ animationDuration: '4s' }} />

      {/* The Green Island */}
      <div 
        className="w-[85%] h-[85%] rounded-full border-8 border-slate-800 shadow-2xl relative overflow-hidden flex items-center justify-center pointer-events-auto"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #55efc4 0%, #00b894 100%)',
          boxShadow: '0 20px 0 rgba(44, 62, 80, 0.25)'
        }}
      >
        {/* Decorative Nature Elements */}
        <div className="absolute top-[10%] left-[20%] text-xl pointer-events-none">🌴</div>
        <div className="absolute top-[15%] left-[75%] text-2xl pointer-events-none">🌲</div>
        <div className="absolute bottom-[15%] left-[45%] text-xl pointer-events-none">🌸</div>
        <div className="absolute bottom-[20%] right-[15%] text-xl pointer-events-none">🌻</div>
        <div className="absolute top-[48%] left-[12%] text-2xl pointer-events-none">🍄</div>
        
        {/* Pond in the Island */}
        <div 
          className="absolute top-[38%] right-[25%] w-24 h-16 rounded-full border-4 border-slate-800"
          style={{ background: 'linear-gradient(180deg, #74b9ff 0%, #0984e3 100%)' }}
        >
          <div className="absolute top-1 left-2 text-[10px] pointer-events-none">🌊</div>
        </div>

        {/* Fused Animals Roaming around */}
        {myCreatures.map((creature, idx) => {
          // Wrap around positions if there are more than 6 creatures
          const pos = positions[idx % positions.length];
          const animationDelay = `${(idx * 0.5).toFixed(1)}s`;

          return (
            <div
              key={creature.id || idx}
              onClick={() => onSelectCreature(creature)}
              className="absolute cursor-pointer flex flex-col items-center group animate-float"
              style={{
                top: pos.top,
                left: pos.left,
                animationDelay: animationDelay,
                transform: 'translate(-50%, -50%)',
                zIndex: idx + 5
              }}
            >
              {/* Pet Name tag */}
              <div 
                className="bg-white border-2 border-slate-800 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-slate-800 shadow-md transform -translate-y-1 group-hover:scale-110 transition-transform whitespace-nowrap"
                style={{ fontFamily: 'Quicksand' }}
              >
                {creature.name}
              </div>

              {/* Pet Body avatar */}
              <div className="relative w-14 h-14 rounded-full border-2 border-slate-800 overflow-hidden bg-white/90 shadow-lg group-hover:border-pink-500 transition-colors mt-1 flex items-center justify-center p-1">
                <img
                  src={creature.image}
                  alt={creature.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Small shadow below pet */}
              <div className="w-8 h-2 bg-black/10 rounded-full blur-[1px] mt-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IslandMap;
