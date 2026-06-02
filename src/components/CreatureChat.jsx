import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Settings, Sparkles, Key } from 'lucide-react';

function CreatureChat({ creature, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('folio_ai_gemini_key') || '');
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Generate initial greeting message based on personality
    setMessages([
      {
        sender: 'pet',
        text: `Chào cậu nha! Tớ là ${creature.name} đây! Tớ là chú thú cưng ${creature.personality}. Hôm nay cậu muốn trò chuyện hay phiêu lưu cùng tớ nào? 🌟`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [creature]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSaveKey = (e) => {
    e.preventDefault();
    localStorage.setItem('folio_ai_gemini_key', apiKey);
    setShowSettings(false);
    alert("Đã kích hoạt trí tuệ Gemini Live cho thú cưng!");
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
      return `Tớ có sức mạnh phun ra tia sáng cầu vồng lấp lánh (chỉ số phép thuật của tớ đạt ${creature.stats.magic}/100 cơ mà!). Sức mạnh này giúp các hạt mầm nở thành những bông hoa xinh tươi đó! 🌈🌸`;
    }

    if (q.includes('chào') || q.includes('hello') || q.includes('hi')) {
      return `Chào bạn nhỏ ngoan ngoãn! Rất vui được gặp cậu. Hôm nay của cậu có điều gì vui kể tớ nghe đi! 🥰`;
    }

    // Fallback response matching personality
    return `Ôi câu hỏi "${query}" của cậu thú vị quá! Tớ đang bận suy nghĩ một chút. Cậu hãy hỏi tớ về món ăn yêu thích, sức mạnh phép thuật hoặc bảo tớ kể chuyện đùa đi! 🤖✨`;
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
        const prompt = `
Bạn là chú thú cưng lai hoạt hình đáng yêu tên là "${creature.name}".
Bạn là loài lai đặc biệt với tính cách: "${creature.personality}".
Dưới đây là lịch sử và mô tả của bạn:
- Nguồn gốc: ${creature.description}
- Các chỉ số: Tấn công ${creature.stats.attack}, Tốc độ ${creature.stats.speed}, Phòng thủ ${creature.stats.defense}, Phép thuật ${creature.stats.magic}.

Hãy đóng vai là chú thú cưng này để nói chuyện với trẻ em. Trả lời cực kỳ đáng yêu, thân thiện, vui vẻ, sử dụng ngôn từ phù hợp với trẻ nhỏ và thêm nhiều emoji ngộ nghĩnh. Trả lời siêu ngắn gọn trong vòng 1-2 câu.

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
        const reply = getOfflineResponse(text);
        setMessages(prev => [...prev, {
          sender: 'pet',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (e) {
      // Fallback in case of error
      setMessages(prev => [...prev, {
        sender: 'pet',
        text: `Tớ nghe không rõ lắm vì sóng ma thuật hơi yếu. Nhưng tớ vẫn rất thích trò chuyện cùng cậu! 🌈`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const chips = [
    "Cậu thích ăn gì?",
    "Cậu biết bay không?",
    "Sức mạnh của cậu là gì?",
    "Kể tớ nghe chuyện cười!"
  ];

  return (
    <div className="cartoon-panel w-full max-w-sm h-[580px] flex flex-col justify-between overflow-hidden relative p-0 border-4 border-slate-800 shadow-xl">
      
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b-4 border-slate-800 flex justify-between items-center text-white">
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
            <h4 className="font-extrabold text-sm tracking-wide leading-tight">{creature.name}</h4>
            <p className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">Trợ lý thú cưng AI</p>
          </div>
        </div>

        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2 rounded-xl border-2 border-slate-800 bg-slate-800 text-slate-400 hover:text-white transition-colors ${showSettings ? 'text-yellow-400 border-yellow-500/30' : ''}`}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Settings Form for Gemini Key */}
      {showSettings && (
        <form onSubmit={handleSaveKey} className="p-4 bg-slate-900 text-white border-b-4 border-slate-800 space-y-2 animate-fade-in text-left z-20">
          <div className="flex items-center gap-1 text-xs font-bold text-yellow-400">
            <Key className="w-3.5 h-3.5" />
            <span>Kết nối Trí tuệ Gemini (Cho bố mẹ)</span>
          </div>
          <p className="text-[9px] text-slate-400">
            Nhập Gemini API Key để bé có thể đàm thoại tự do thời gian thực với thú cưng lai. Key được lưu an toàn tại máy của anh.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Nhập API Key tại đây..."
              className="glass-input text-xs flex-1 bg-slate-800 text-white border-slate-700"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button type="submit" className="btn-toy btn-toy-primary text-xs py-1 px-3 shadow-none border-2">
              Lưu
            </button>
          </div>
        </form>
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

      {/* Suggestion Chips */}
      <div className="px-4 py-2 bg-slate-100/50 border-t-2 border-slate-200 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
        {chips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            disabled={isLoading}
            className="text-[9px] font-bold px-3 py-1.5 rounded-full bg-white border-2 border-slate-800 hover:border-pink-500 hover:text-pink-500 transition-colors disabled:opacity-50"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Footer Input */}
      <div className="p-3 bg-white border-t-4 border-slate-800 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Nói chuyện với tớ đi..."
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

    </div>
  );
}

export default CreatureChat;
