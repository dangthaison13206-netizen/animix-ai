import lionButterflyImg from '../assets/lion_butterfly.png';
import penguinSharkImg from '../assets/penguin_shark.png';
import monkeyDragonImg from '../assets/monkey_dragon.png';
import sheepDinosaurImg from '../assets/sheep_dinosaur.png';

export const presetHybrids = {
  'butterfly-lion': {
    name: 'Sư Điệp Vương',
    image: lionButterflyImg,
    description: 'Là chúa tể nhưng lại thích bay lượn ngắm hoa. Sở hữu đôi cánh sặc sỡ lấp lánh và chiếc bờm dũng mãnh, Sư Điệp Vương là loài thú có trái tim ngọt ngào nhất thế giới hoạt hình.',
    stats: { attack: 75, speed: 90, defense: 50, magic: 85 },
    personality: 'dễ thương, thích hoa và hay cười lớn "Ha ha meo meo"',
    frequency: 523.25 // Nốt Đô (C5)
  },
  'penguin-shark': {
    name: 'Cánh Cụt Mập',
    image: penguinSharkImg,
    description: 'Một chú cá mập khoác bộ đồ chim cánh cụt, hoặc chim cánh cụt mọc vây cá mập. Vừa có khả năng trượt băng siêu tốc vừa bơi lặn vượt trội dưới biển sâu để tìm cá ngon.',
    stats: { attack: 65, speed: 85, defense: 70, magic: 60 },
    personality: 'vui nhộn, háu ăn, thích cá và hay kêu "ngoạp ngoạp"',
    frequency: 587.33 // Nốt Rê (D5)
  },
  'dragon-monkey': {
    name: 'Thân Long Hầu',
    image: monkeyDragonImg,
    description: 'Sự kết hợp giữa trí thông minh lém lỉnh của khỉ và vảy rồng phun lửa dũng mãnh. Thân Long Hầu thích chuyền cành cây bằng đuôi rồng và ném những quả chuối lửa vui vẻ.',
    stats: { attack: 85, speed: 95, defense: 60, magic: 80 },
    personality: 'tinh nghịch, hiếu động, thích ném chuối lửa và kêu "khẹc khẹc"',
    frequency: 659.25 // Nốt Mi (E5)
  },
  'dinosaur-sheep': {
    name: 'Cừu Khủng Long',
    image: sheepDinosaurImg,
    description: 'Sở hữu bộ lông xốp mềm như kẹo bông gòn nhưng lại có gai lưng và đuôi của khủng long tiền sử. Loài thú này cực kỳ thích ôm ấp và có thể lăn tròn như bóng để di chuyển.',
    stats: { attack: 60, speed: 70, defense: 90, magic: 55 },
    personality: 'hiền lành, chậm chạp, thích ôm ấp và kêu "beee beee gừrr"',
    frequency: 698.46 // Nốt Pha (F5)
  }
};

const baseAnimalDetails = {
  lion: { emoji: '🦁', color: '#ffeaa7', colorDark: '#fdcb6e', element: 'Lửa', pattern: 'fire' },
  butterfly: { emoji: '🦋', color: '#ff7979', colorDark: '#fd79a8', element: 'Gió', pattern: 'stars' },
  penguin: { emoji: '🐧', color: '#74b9ff', colorDark: '#0984e3', element: 'Băng', pattern: 'snow' },
  shark: { emoji: '🦈', color: '#81ecec', colorDark: '#00cec9', element: 'Nước', pattern: 'bubbles' },
  monkey: { emoji: '🐒', color: '#e8a7ff', colorDark: '#a29bfe', element: 'Đất', pattern: 'leaves' },
  dragon: { emoji: '🐉', color: '#ff7675', colorDark: '#d63031', element: 'Rồng', pattern: 'fire' },
  sheep: { emoji: '🐑', color: '#ffffff', colorDark: '#b2bec3', element: 'Ánh Sáng', pattern: 'clouds' },
  dinosaur: { emoji: '🦖', color: '#55efc4', colorDark: '#00b894', element: 'Cổ Đại', pattern: 'forest' }
};

const drawParticles = (p1, p2) => {
  let paths = '';
  const drawSinglePattern = (pattern) => {
    switch (pattern) {
      case 'snow':
        return `
          <circle cx="35" cy="50" r="3.5" fill="white" opacity="0.8" />
          <circle cx="150" cy="40" r="2.5" fill="white" opacity="0.9" />
          <circle cx="165" cy="130" r="4.5" fill="white" opacity="0.7" />
          <circle cx="45" cy="155" r="3" fill="white" opacity="0.8" />
        `;
      case 'bubbles':
        return `
          <circle cx="40" cy="135" r="5" fill="none" stroke="white" stroke-width="2" opacity="0.6" />
          <circle cx="30" cy="75" r="3.5" fill="none" stroke="white" stroke-width="1.5" opacity="0.5" />
          <circle cx="165" cy="45" r="6" fill="none" stroke="white" stroke-width="2" opacity="0.7" />
          <circle cx="160" cy="120" r="3" fill="none" stroke="white" stroke-width="1.5" opacity="0.6" />
        `;
      case 'fire':
        return `
          <path d="M 45 45 L 50 35 L 55 45 Z" fill="#ff7675" opacity="0.8" />
          <path d="M 155 140 L 160 130 L 165 140 Z" fill="#e17055" opacity="0.8" />
          <circle cx="145" cy="55" r="4" fill="#d63031" opacity="0.7" />
          <circle cx="35" cy="115" r="3" fill="#ff7675" opacity="0.7" />
        `;
      case 'leaves':
        return `
          <path d="M 30,45 Q 40,35 40,45 Q 40,55 30,45 Z" fill="#55efc4" opacity="0.7" />
          <path d="M 160,130 Q 170,120 170,130 Q 170,140 160,130 Z" fill="#00b894" opacity="0.7" />
          <circle cx="150" cy="55" r="3" fill="#55efc4" opacity="0.6" />
        `;
      case 'clouds':
        return `
          <path d="M 25,45 a 5,5 0 0,1 10,0 a 5,5 0 0,1 10,0 a 5,5 0 0,1 -20,0 Z" fill="white" opacity="0.7" />
          <path d="M 145,125 a 5,5 0 0,1 10,0 a 5,5 0 0,1 10,0 a 5,5 0 0,1 -20,0 Z" fill="white" opacity="0.7" />
        `;
      case 'forest':
        return `
          <polygon points="40,130 45,120 50,130" fill="#00b894" opacity="0.8" />
          <polygon points="150,45 155,35 160,45" fill="#55efc4" opacity="0.8" />
        `;
      case 'stars':
      default:
        return `
          <polygon points="50,40 52,44 57,45 53,48 54,53 50,50 46,53 47,48 43,45 48,44" fill="#ffeaa7" opacity="0.8" />
          <polygon points="150,110 151,113 155,114 152,117 153,121 150,119 147,121 148,117 145,114 149,113" fill="#ffeaa7" opacity="0.8" />
        `;
    }
  };
  return drawSinglePattern(p1) + drawSinglePattern(p2);
};

// Hàm helper sinh mã SVG động
const generateSVG = (idA, idB, parentA, parentB) => {
  // SVG Template với hiệu ứng lấp lánh ma thuật
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="grad-${idA}-${idB}" cx="35%" cy="35%" r="75%">
      <stop offset="0%" stop-color="${parentA.color}" />
      <stop offset="60%" stop-color="${parentB.color}" />
      <stop offset="100%" stop-color="${parentB.colorDark}" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2c3e50" flood-opacity="0.3" />
    </filter>
  </defs>
  
  <!-- Outer Card body -->
  <rect width="200" height="200" rx="36" fill="url(#grad-${idA}-${idB})" stroke="#2c3e50" stroke-width="7" />
  
  <!-- Inner border ring -->
  <rect x="9" y="9" width="182" height="182" rx="27" fill="none" stroke="white" stroke-width="2.5" stroke-opacity="0.35" />
  
  <!-- Decorative grid lines or shapes -->
  <circle cx="100" cy="100" r="75" fill="none" stroke="white" stroke-width="1" stroke-dasharray="4 6" stroke-opacity="0.2" />
  
  <!-- Interactive particle patterns based on elements -->
  ${drawParticles(parentA.pattern, parentB.pattern)}
  
  <!-- Glowing center pedestal -->
  <circle cx="100" cy="103" r="54" fill="#2c3e50" fill-opacity="0.1" />
  <circle cx="100" cy="100" r="52" fill="white" fill-opacity="0.25" stroke="white" stroke-opacity="0.4" stroke-width="2.5" />
  
  <!-- Primary fused visual composite -->
  <g transform="translate(100, 100)" filter="url(#shadow)">
    <!-- Base decoration wings / tail if relevant -->
    ${parentA.emoji === '🦋' || parentB.emoji === '🦋' ? `
      <!-- Wing A -->
      <text x="-48" y="-8" font-size="46" opacity="0.8" transform="rotate(-15)">🦋</text>
      <!-- Wing B -->
      <text x="6" y="-18" font-size="46" opacity="0.8" transform="scale(-1, 1) rotate(-15)">🦋</text>
    ` : ''}
    ${parentA.emoji === '🐉' || parentB.emoji === '🐉' ? `
      <!-- Flame/Dragon tail tail -->
      <text x="-48" y="24" font-size="40" opacity="0.75" transform="rotate(30)">🔥</text>
    ` : ''}

    <!-- Main animal base body -->
    <text x="0" y="16" font-size="64" text-anchor="middle" dominant-baseline="central">${parentA.emoji}</text>
    
    <!-- Secondary accessory mount (fused item/animal) -->
    <text x="24" y="-22" font-size="34" text-anchor="middle" dominant-baseline="central" transform="rotate(12)">${parentB.emoji}</text>
  </g>
  
  <!-- Magical stars in corner -->
  <path d="M26,26 L27.5,30 L32,30.5 L28.5,33.5 L29.5,38 L26,35.5 L22.5,38 L23.5,33.5 L20,30.5 L24.5,30 Z" fill="#ffeaa7" />
  <path d="M174,174 L175.5,178 L180,178.5 L176.5,181.5 L177.5,186 L174,183.5 L170.5,186 L171.5,181.5 L168,178.5 L172.5,178 Z" fill="#ffeaa7" />
  <circle cx="168" cy="30" r="3.5" fill="white" opacity="0.8" />
  <circle cx="32" cy="168" r="3" fill="white" opacity="0.8" />
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
};

// Hàm helper để sinh ngẫu nhiên khi hai con thú khác chưa có trong preset
export const generateDynamicHybrid = (idA, idB, nameA, nameB) => {
  const seed = `${idA}-${idB}`;
  
  // Tính toán chỉ số dựa trên seed
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const attack = 50 + (hash % 41); // 50 to 90
  const speed = 50 + ((hash * 7) % 41);
  const defense = 50 + ((hash * 13) % 41);
  const magic = 50 + ((hash * 17) % 41);

  // Ghép tên sáng tạo kiểu tiếng Việt ngộ nghĩnh
  const prefix = nameA.substring(0, Math.ceil(nameA.length / 2));
  const suffix = nameB.substring(Math.floor(nameB.length / 2));
  const name = `${prefix}${suffix} Linh Thú`;

  // Lấy chi tiết parent
  const parentA = baseAnimalDetails[idA] || { emoji: '🐾', color: '#a29bfe', colorDark: '#6c5ce7', element: 'Bí Ẩn', pattern: 'stars' };
  const parentB = baseAnimalDetails[idB] || { emoji: '🐾', color: '#fd79a8', colorDark: '#e84393', element: 'Bí Ẩn', pattern: 'stars' };

  // Sinh SVG động thay vì load DiceBear
  const image = generateSVG(idA, idB, parentA, parentB);

  // Tạo cốt truyện sinh vật lai
  const elements = [parentA.element, parentB.element];
  const description = `Sinh vật ma thuật kỳ lạ mang sức mạnh dung hợp của hệ ${elements[0]} và hệ ${elements[1]}. Mang vẻ ngoài ngộ nghĩnh lai giữa ${parentA.emoji} và ${parentB.emoji}, linh thú này thích rong chơi khắp đảo và phát ra hào quang rực rỡ.`;

  // Tính toán note nhạc chirp (tần số 250Hz đến 800Hz)
  const frequency = 261.63 + (hash % 12) * 45;

  const personalities = [
    'tinh nghịch, thích nhào lộn và hay kêu "a-ha!"',
    'hiền lành, thích sưởi nắng và hay cười khúc khích',
    'tò mò, thích khám phá hang động và kêu "chít chít"',
    'điệu đà, thích nhảy múa dưới trăng và kêu "la-la-la"',
    'dũng cảm, thích làm hiệp sĩ bảo vệ bạn bè và kêu "gừrr yaa!"'
  ];
  const personality = personalities[hash % personalities.length];

  return {
    name,
    image,
    description,
    stats: { attack, speed, defense, magic },
    personality,
    frequency
  };
};
