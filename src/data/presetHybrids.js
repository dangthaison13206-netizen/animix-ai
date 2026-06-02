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

// Hàm helper để sinh ngẫu nhiên khi hai con thú khác chưa có trong preset
export const generateDynamicHybrid = (idA, idB, nameA, nameB) => {
  const seed = `${idA}-${idB}`;
  
  // Tính toán chỉ số dựa trên seed
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const attack = 40 + (hash % 50);
  const speed = 40 + ((hash * 7) % 50);
  const defense = 40 + ((hash * 13) % 50);
  const magic = 40 + ((hash * 17) % 50);

  // Ghép tên sáng tạo
  const prefix = nameA.substring(0, Math.ceil(nameA.length / 2));
  const suffix = nameB.substring(Math.floor(nameB.length / 2));
  const name = `${prefix}${suffix} Ma Thuật`;

  // Sử dụng DiceBear fun-emoji làm ảnh đại diện cho các con thú chưa có ảnh vẽ
  const image = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}`;

  return {
    name,
    image,
    description: `Sinh vật lai đặc biệt được tạo ra từ sức mạnh dung hợp của ${nameA} và ${nameB}. Sở hữu các thuộc tính bí ẩn chưa được khai phá hoàn toàn!`,
    stats: { attack, speed, defense, magic },
    personality: 'tò mò, thân thiện và rất ham học hỏi',
    frequency: 440 // Nốt La (A4)
  };
};
