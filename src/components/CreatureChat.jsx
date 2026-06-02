import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Settings, Key, Gamepad2, BookOpen, Music, Edit3 } from 'lucide-react';

function CreatureChat({ creature, onClose, childName, onRenameCreature, playTone }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('folio_ai_gemini_key') || '');
  
  // States for interactive actions
  const [gameMode, setGameMode] = useState(false); // true if in Rock-Paper-Scissors
  const [isRenaming, setIsRenaming] = useState(false);
  const [newNameInput, setNewNameInput] = useState(creature.name);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Generate initial greeting message based on child's name
    const greetingName = childName ? `bé ${childName}` : 'bạn nhỏ';
    setMessages([
      {
        sender: 'pet',
        text: `Chào ${greetingName} đáng yêu! Tớ là ${creature.name} đây! Tớ là chú linh thú ${creature.personality}. Hôm nay ${greetingName} muốn chơi trò gì cùng tớ nào? 🌟`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [creature, childName]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSaveKey = (e) => {
    e.preventDefault();
    localStorage.setItem('folio_ai_gemini_key', apiKey);
    setShowSettings(false);
    playTone(523.25, 'sine', 0.2);
    alert("Đã kích hoạt trí tuệ Gemini Live cho thú cưng!");
  };

  // 📖 Offline Story Generator
  const generateOfflineStory = () => {
    const baby = childName || 'bạn nhỏ';
    const stories = [
      `Ngày xửa ngày xưa, tại Đảo Kỳ Thú lấp lánh, chú thú cưng ${creature.name} và ${baby} đã cùng nhau đi tìm quả ngọt cầu vồng. Nhờ đôi tai thính và sự ${creature.personality}, hai người bạn đã vượt qua thung lũng bí ẩn và chia nhau những chiếc kẹo dẻo thơm lừng. Thật là một ngày vui vẻ! 🍇🍬`,
      `Một buổi tối lộng gió, ${creature.name} ngồi kể chuyện cho ${baby} nghe về ngọn hải đăng pha lê. Bỗng nhiên ngọn đuốc vụt tắt, ${creature.name} đã dùng phép thuật chiếu sáng rực rỡ để dẫn đường cho đoàn thuyền đom đóm cập bến an toàn. ${baby} đã ôm ${creature.name} thật chặt để cảm ơn! 🕯️🦋`,
      `Trong cuộc đua chạy vượt chướng ngại vật sáng nay trên đảo cát, chú linh thú ${creature.name} đã nhường chiến thắng cho ${baby} vì muốn bạn mình được vui. Cả hai cùng nâng cao chiếc cúp làm bằng vỏ sò màu hồng và cười giòn giã dưới ánh mặt trời rực rỡ! 🏆🐚`
    ];
    // Return a random story
    const randIdx = Math.floor(Math.random() * stories.length);
    return stories[randIdx];
  };

  // 🎵 Play Beep Music melody
  const playBeepSong = () => {
    if (!playTone) return;
    
    // Notes for "Twinkle Twinkle Little Star"
    // C4: 261.63, G4: 392.00, A4: 440.00, F4: 349.23, E4: 329.63, D4: 293.66
    const melody = [
      { f: 261.63, d: 0.2 }, { f: 261.63, d: 0.2 },
      { f: 392.00, d: 0.2 }, { f: 392.00, d: 0.2 },
      { f: 440.00, d: 0.2 }, { f: 440.00, d: 0.2 },
      { f: 392.00, d: 0.4 }
    ];

    melody.forEach((note, index) => {
      setTimeout(() => {
        playTone(note.f, 'sine', note.d);
      }, index * 250);
    });
  };

  const getOfflineResponse = (query) => {
    const q = query.toLowerCase().trim();
    
    if (q.includes('bay') || q.includes('fly')) {
      if (creature.parentA === 'butterfly' || creature.parentB === 'butterfly' || 
          creature.parentA === 'dragon' || creature.parentB === 'dragon') {
        return `Có chứ! Tớ sở hữu đôi cánh ma thuật siêu đẹp và có thể bay vút lên tận chín tầng mây luôn đó nha! 🦋🐉`;
      }
      return `Tớ không biết bay đâu, nhưng bù lại tớ chạy cực nhanh và có thể nhảy nhót nhào lộn rất giỏi đấy! 🤸‍♂️`;
    }

    if (q.includes('ăn') || q.includes('food') || q.includes('thích')) {
      return `Tớ cực kỳ thích ăn kẹo bông gòn bồng bềnh và trái cây ngọt mát trên Đảo Kỳ Thú này đó! Còn cậu thì sao? 🍎🍭`;
    }

    if (q.includes('đùa') || q.includes('joke') || q.includes('cười')) {
      return `Tớ kể cậu nghe một trò đùa nhé: Tại sao chú khủng long không bao giờ bị ướt mưa? Vì chú đã biến mất từ hàng triệu năm trước rồi! Ha ha ngộ nghĩnh quá đi! 🦖😂`;
    }

    if (q.includes('sức mạnh') || q.includes('power') || q.includes('phép')) {
      const magicVal = creature.stats.magic || 50;
      return `Tớ có sức mạnh phun ra tia sáng cầu vồng lấp lánh (chỉ số phép thuật của tớ đạt ${magicVal}/100 cơ mà!). Sức mạnh này giúp các hạt mầm nở thành những bông hoa xinh tươi đó! 🌈🌸`;
    }

    if (q.includes('chào') || q.includes('hello') || q.includes('hi')) {
      return `Chào bạn nhỏ ngoan ngoãn! Rất vui được gặp cậu. Hôm nay của cậu có điều gì vui kể tớ nghe đi! 🥰`;
    }

    return `Ôi câu hỏi "${query}" của cậu thú vị quá! Tớ đang suy nghĩ một tí nè. Cậu hãy hỏi tớ về món ăn yêu thích, sức mạnh phép thuật hoặc bảo tớ kể chuyện cổ tích đi! 🤖✨`;
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'kid',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (apiKey) {
        // Online Mode: Gemini API Live Roleplay for kids
        const babyName = childName ? `bé tên là ${childName}` : 'bạn nhỏ';
        const prompt = `
Bạn là chú thú cưng lai hoạt hình đáng yêu tên là "${creature.name}".
Bạn là loài lai đặc biệt với tính cách: "${creature.personality}".
Dưới đây là lịch sử và mô tả của bạn:
- Nguồn gốc: ${creature.description}
- Các chỉ số: Tấn công ${creature.stats.attack}, Tốc độ ${creature.stats.speed}, Phòng thủ ${creature.stats.defense}, Phép thuật ${creature.stats.magic}.

Hãy đóng vai là chú thú cưng này để nói chuyện với trẻ em (${babyName}). Trả lời cực kỳ đáng yêu, thân thiện, vui vẻ, sử dụng ngôn từ phù hợp với trẻ nhỏ và thêm nhiều emoji ngộ nghĩnh. Trả lời siêu ngắn gọn trong vòng 1-2 câu.

Câu hỏi của trẻ em: ${text}
`;
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          }
        );

        if (!response.ok) throw new Error("API failed");

        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Tớ hơi buồn ngủ một tí rồi, cậu hỏi lại tớ sau nhé!";
        
        setMessages(prev => [...prev, {
          sender: 'pet',
          text: aiText.trim(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

      } else {
        // Offline Mode: Custom simulation
        await new Promise(resolve => setTimeout(resolve, 800));
        let reply = getOfflineResponse(text);
        
        setMessages(prev => [...prev, {
          sender: 'pet',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, {
        sender: 'pet',
        text: `Tớ nghe không rõ lắm vì sóng ma thuật trên đảo hơi yếu. Nhưng tớ vẫn rất yêu cậu! 🌈`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 📖 Trigger Fairy Tale
  const handleFairyTaleAction = async () => {
    setIsLoading(true);
    playTone(392, 'sine', 0.15);
    setTimeout(() => playTone(523.25, 'sine', 0.2), 100);

    const userMsg = {
      sender: 'kid',
      text: "📖 Hãy kể cho tớ nghe một câu chuyện cổ tích nào!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      if (apiKey) {
        const babyName = childName ? `bé đặt tên là ${childName}` : 'bạn nhỏ';
        const prompt = `
Bạn là chú thú cưng lai hoạt hình tên là "${creature.name}" với tính cách: "${creature.personality}".
Hãy viết một câu chuyện cổ tích siêu ngắn gọn dành cho trẻ em (khoảng 3 câu). Câu chuyện kể về cuộc phiêu lưu vui nhộn của bạn và đứa trẻ (${babyName}) trên Đảo Kỳ Thú. Câu chuyện phải cực kỳ đáng yêu, tràn ngập phép thuật lành mạnh và kết thúc vui vẻ. Sử dụng nhiều emoji.
`;
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          }
        );
        const data = await response.json();
        const storyText = data.candidates?.[0]?.content?.parts?.[0]?.text || generateOfflineStory();
        setMessages(prev => [...prev, {
          sender: 'pet',
          text: storyText.trim(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(prev => [...prev, {
          sender: 'pet',
          text: generateOfflineStory(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, {
        sender: 'pet',
        text: generateOfflineStory(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🎵 Trigger Singing Song
  const handleSingAction = () => {
    playTone(261.63);
    const userMsg = {
      sender: 'kid',
      text: "🎵 Hát một bài tặng tớ đi!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      playBeepSong();
      setMessages(prev => [...prev, {
        sender: 'pet',
        text: `La la la... 🎶 Tớ đang dùng sóng nhạc Beep ma thuật để hát tặng cậu bài hát ngôi sao lấp lánh (Twinkle Star) nè! Cậu nghe có hay không? ✨🎤`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsLoading(false);
    }, 1000);
  };

  // 🎮 Trigger Rock-Paper-Scissors
  const handlePlayRPS = (playerChoice) => {
    playTone(440, 'sine', 0.1);
    const choices = ['rock', 'paper', 'scissors'];
    const emojis = { rock: '✊ Búa', paper: '✋ Bao', scissors: '✌️ Kéo' };
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = '';
    let winSound = false;

    if (playerChoice === computerChoice) {
      result = `Tớ cũng ra ${emojis[computerChoice]}! Hòa nhau rồi, chúng mình chơi lại nhé! 🤝`;
    } else if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      result = `Tớ ra ${emojis[computerChoice]}. Ôi, cậu ra ${emojis[playerChoice]} và thắng tớ mất rồi! Cậu giỏi quá đi thôi! 🏆🎉`;
      winSound = true;
    } else {
      result = `Tớ ra ${emojis[computerChoice]}. Ha ha! Tớ thắng rồi nha, chúc cậu may mắn lần sau nhé! 😜🌟`;
    }

    setMessages(prev => [
      ...prev,
      {
        sender: 'kid',
        text: `🎮 Tớ ra ${emojis[playerChoice]}!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        sender: 'pet',
        text: result,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    // Play result sounds
    if (winSound) {
      setTimeout(() => playTone(523.25, 'sine', 0.15), 100);
      setTimeout(() => playTone(659.25, 'sine', 0.15), 250);
      setTimeout(() => playTone(783.99, 'sine', 0.3), 400);
    } else {
      setTimeout(() => playTone(220, 'sawtooth', 0.4), 100);
    }

    setGameMode(false);
  };

  // ✏️ Rename creature handlers
  const handleRenameSubmit = (e) => {
    e.preventDefault();
    if (newNameInput.trim() && newNameInput !== creature.name) {
      onRenameCreature(creature.id, newNameInput.trim());
      playTone(523.25);
      
      setMessages(prev => [
        ...prev,
        {
          sender: 'pet',
          text: `Wow! Từ giờ tớ sẽ có biệt hiệu mới siêu ngầu là: "${newNameInput.trim()}"! Cảm ơn cậu đã đặt cho tớ cái tên đáng yêu này nha! 🥰✨`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
    setIsRenaming(false);
  };

  return (
    <div className="cartoon-panel w-full max-w-sm h-[580px] flex flex-col justify-between overflow-hidden relative p-0 border-4 border-slate-800 shadow-xl">
      
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b-4 border-slate-800 flex justify-between items-center text-white z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={onClose}
            className="btn-toy p-1.5 border-2 rounded-full shadow-none text-white hover:text-cyan-400"
            style={{ padding: '6px', boxShadow: 'none', background: 'transparent', borderColor: 'transparent' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="w-10 h-10 rounded-full border-2 border-slate-700 bg-white flex items-center justify-center p-1">
            <img src={creature.image} alt={creature.name} className="w-full h-full object-contain" />
          </div>

          <div>
            <h4 className="font-extrabold text-sm tracking-wide leading-tight flex items-center gap-1.5">
              <span>{creature.name}</span>
              <button onClick={() => { playTone(330); setIsRenaming(true); }} className="text-slate-400 hover:text-white">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </h4>
            <p className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">Trợ lý linh thú AI</p>
          </div>
        </div>

        <button 
          onClick={() => { playTone(392); setShowSettings(!showSettings); }}
          className={`p-2 rounded-xl border-2 border-slate-800 bg-slate-800 text-slate-400 hover:text-white transition-colors ${showSettings ? 'text-yellow-400 border-yellow-500/30' : ''}`}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Settings Form for Gemini Key */}
      {showSettings && (
        <form onSubmit={handleSaveKey} className="p-4 bg-slate-900 text-white border-b-4 border-slate-800 space-y-2 animate-fade-in text-left z-20 absolute top-[72px] left-0 right-0">
          <div className="flex items-center gap-1 text-xs font-bold text-yellow-400">
            <Key className="w-3.5 h-3.5" />
            <span>Kết nối Trí tuệ Gemini (Cho bố mẹ)</span>
          </div>
          <p className="text-[9px] text-slate-400">
            Nhập Gemini API Key để kích hoạt trí tuệ Live. Trò chuyện tự do không giới hạn với linh thú. Key lưu trữ an toàn trên thiết bị của anh.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Nhập API Key..."
              className="glass-input text-xs flex-1 bg-slate-800 text-white border-slate-700 p-2"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button type="submit" className="btn-toy btn-toy-primary text-xs py-1 px-3 shadow-none border-2">
              Lưu
            </button>
          </div>
        </form>
      )}

      {/* Rename Modal Popup */}
      {isRenaming && (
        <div className="modal-overlay z-50">
          <div className="modal-content p-6 space-y-4">
            <h4 className="font-extrabold text-slate-800 text-center text-sm">✏️ ĐỔI TÊN THÚ CƯNG CỦA BÉ</h4>
            <form onSubmit={handleRenameSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Đặt biệt hiệu mới..."
                className="glass-input w-full py-2 px-3 text-xs"
                value={newNameInput}
                onChange={(e) => setNewNameInput(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2.5">
                <button 
                  type="button" 
                  onClick={() => { playTone(220); setIsRenaming(false); }}
                  className="btn-toy flex-1 py-1.5 text-xs shadow-none border-2 justify-center"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="btn-toy btn-toy-primary flex-1 py-1.5 text-xs shadow-none border-2 justify-center"
                >
                  Lưu tên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sky-50/50 flex flex-col">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${msg.sender === 'kid' ? 'items-end' : 'items-start'} space-y-1`}
          >
            <div className={msg.sender === 'kid' ? 'speech-bubble-kid' : 'speech-bubble-pet'}>
              <p className="text-xs font-bold leading-relaxed">{msg.text}</p>
            </div>
            <span className="text-[8px] text-slate-400 px-1 font-bold">{msg.time}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start space-y-1">
            <div className="speech-bubble-pet flex items-center gap-1 py-3 px-4">
              <span className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Interactive Controls Overlay for Rock-Paper-Scissors */}
      {gameMode && (
        <div className="p-4 bg-yellow-50 border-t-4 border-slate-800 space-y-3 z-10 text-center animate-pop-up">
          <p className="text-xs font-extrabold text-yellow-600">🎮 Bé hãy chọn một chiếc đòn nào:</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => handlePlayRPS('rock')} className="rps-button" title="Búa">✊</button>
            <button onClick={() => handlePlayRPS('scissors')} className="rps-button" title="Kéo">✌️</button>
            <button onClick={() => handlePlayRPS('paper')} className="rps-button" title="Bao">✋</button>
          </div>
          <button 
            onClick={() => { playTone(220); setGameMode(false); }}
            className="text-[10px] text-slate-400 font-extrabold underline hover:text-slate-600"
          >
            Thoát game
          </button>
        </div>
      )}

      {/* Action Chips Shortcut Panel */}
      {!gameMode && (
        <div className="px-3 py-2 bg-slate-100/70 border-t-2 border-slate-200 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap z-10">
          <button
            onClick={handleFairyTaleAction}
            disabled={isLoading}
            className="text-[9px] font-extrabold px-3 py-1.5 rounded-full bg-white border-2 border-slate-800 hover:border-pink-500 hover:text-pink-500 flex items-center gap-1 transition-colors"
          >
            <BookOpen className="w-3 h-3" />
            <span>Kể chuyện cổ tích</span>
          </button>
          
          <button
            onClick={() => { playTone(329.63); setGameMode(true); }}
            disabled={isLoading}
            className="text-[9px] font-extrabold px-3 py-1.5 rounded-full bg-white border-2 border-slate-800 hover:border-pink-500 hover:text-pink-500 flex items-center gap-1 transition-colors"
          >
            <Gamepad2 className="w-3 h-3" />
            <span>Chơi Oẳn Tù Tì</span>
          </button>

          <button
            onClick={handleSingAction}
            disabled={isLoading}
            className="text-[9px] font-extrabold px-3 py-1.5 rounded-full bg-white border-2 border-slate-800 hover:border-pink-500 hover:text-pink-500 flex items-center gap-1 transition-colors"
          >
            <Music className="w-3 h-3" />
            <span>Hát một bài</span>
          </button>

          <button
            onClick={() => { playTone(330); setIsRenaming(true); }}
            disabled={isLoading}
            className="text-[9px] font-extrabold px-3 py-1.5 rounded-full bg-white border-2 border-slate-800 hover:border-pink-500 hover:text-pink-500 flex items-center gap-1 transition-colors"
          >
            <Edit3 className="w-3 h-3" />
            <span>Đổi tên tớ</span>
          </button>
        </div>
      )}

      {/* Footer TextInput */}
      {!gameMode && (
        <div className="p-3 bg-white border-t-4 border-slate-800 flex gap-2 items-center z-10">
          <input
            type="text"
            placeholder="Nhắn tin với tớ đi..."
            className="glass-input flex-1 py-2 px-3 text-xs font-bold border-2 border-slate-800 rounded-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="btn-toy btn-toy-primary p-2.5 rounded-xl border-2 flex items-center justify-center disabled:opacity-50"
            style={{ padding: '8px 12px', boxShadow: '0 3px 0 #2c3e50' }}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

    </div>
  );
}

export default CreatureChat;
