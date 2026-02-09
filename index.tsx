import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- TYPES ---
type Category = 
  | 'Breakfast' | 'Soup' | 'Salad' | 'Traditional Food' | 'Pasta, Rice & Macaroni'
  | 'Sandwich' | 'Wrap' | 'Steak' | 'Curry' | 'Chicken' | 'Pizza' | 'Burger' | 'Fish'
  | 'Juice & Shakes' | 'Hot Drinks' | 'Drinks' | 'Alcohol Drinks'
  | 'Continental Breakfast' | 'Extra';

interface MenuItem {
  id: string;
  nameEn: string;
  nameAm: string;
  price: number;
  category: Category;
  tags?: ('Vegetarian' | 'Spicy' | 'Meat' | 'Fish' | 'Popular' | 'Fasting' | 'Malt' | 'Beer' | 'Takeaway box' | '12 Years-old' | '15 Years-old' | '18 Years-old' | 'For room customer only')[];
}

// --- UTILS ---
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US').format(price);
};

// --- CONSTANTS ---
const CATEGORIES: Category[] = [
  'Breakfast', 'Soup', 'Salad', 'Traditional Food', 'Pasta, Rice & Macaroni',
  'Sandwich', 'Wrap', 'Steak', 'Curry', 'Chicken', 'Pizza', 'Burger', 'Fish',
  'Juice & Shakes', 'Hot Drinks', 'Drinks', 'Alcohol Drinks',
  'Continental Breakfast', 'Extra'
];

const CATEGORY_EMOJIS: Record<Category, string> = {
  'Breakfast': '🍳', 'Soup': '🥣', 'Salad': '🥗', 'Traditional Food': '🥘',
  'Pasta, Rice & Macaroni': '🍝', 'Sandwich': '🥪', 'Wrap': '🌯',
  'Steak': '🥩', 'Curry': '🍛', 'Chicken': '🍗', 'Pizza': '🍕', 'Burger': '🍔',
  'Fish': '🐟', 'Juice & Shakes': '🍹', 'Hot Drinks': '☕', 'Drinks': '🥤',
  'Alcohol Drinks': '🥃', 'Continental Breakfast': '🥐', 'Extra': '➕'
};

const MENU_ITEMS: MenuItem[] = [
  // Page 2: Breakfast
  { id: 'b1', nameEn: 'Scrambled egg', nameAm: 'እንቁላል ፍርፍር', price: 250, category: 'Breakfast' },
  { id: 'b2', nameEn: 'Omelet', nameAm: 'ኦምሌት', price: 250, category: 'Breakfast' },
  { id: 'b3', nameEn: 'French toast', nameAm: 'ፍሬንች ቶስት', price: 250, category: 'Breakfast' },
  { id: 'b4', nameEn: 'Fasting firfir', nameAm: 'የፆም ፍርፍር', price: 250, category: 'Breakfast', tags: ['Fasting'] },
  { id: 'b5', nameEn: 'Egg Sandwich', nameAm: 'እንቁላል ሳንዱች', price: 250, category: 'Breakfast' },
  { id: 'b6', nameEn: 'Egg with meat', nameAm: 'እንቁላል በስጋ', price: 400, category: 'Breakfast', tags: ['Meat'] },
  { id: 'b7', nameEn: 'Chechebsa with Honey', nameAm: 'ጨጨብሳ በማር', price: 250, category: 'Breakfast', tags: ['Fasting', 'Popular'] },
  { id: 'b8', nameEn: 'Chechebsa with Egg', nameAm: 'ጨጨብሳ በእንቁላል', price: 300, category: 'Breakfast' },
  { id: 'b9', nameEn: 'Fetira with honey', nameAm: 'ፈጢራ በማር', price: 250, category: 'Breakfast' },
  { id: 'b10', nameEn: 'Fetira with egg', nameAm: 'ፈጢራ በእንቁላል በማር', price: 300, category: 'Breakfast' },
  { id: 'b11', nameEn: 'Tibis Firfir', nameAm: 'ጥብስ ፍርፍር', price: 450, category: 'Breakfast', tags: ['Meat'] },
  { id: 'b12', nameEn: 'Quanta firfir', nameAm: 'ቋንጣ ፍርፍር', price: 500, category: 'Breakfast', tags: ['Meat', 'Popular'] },
  { id: 'b13', nameEn: 'Meat firfir', nameAm: 'ስጋ ፍርፍር', price: 400, category: 'Breakfast', tags: ['Meat'] },
  { id: 'b14', nameEn: 'Bread firfir', nameAm: 'ዳቦ ፍርፍር', price: 200, category: 'Breakfast' },

  // Soup Section
  { id: 's1', nameEn: 'Vegetable soup', nameAm: 'አትክልት ሾርባ', price: 200, category: 'Soup', tags: ['Fasting', 'Popular'] },
  { id: 's2', nameEn: 'Minestrone soup', nameAm: 'ምስር ሾርባ', price: 200, category: 'Soup', tags: ['Fasting'] },
  { id: 's3', nameEn: 'Chicken soup', nameAm: 'ዶሮ ሾርባ', price: 300, category: 'Soup' },
  { id: 's4', nameEn: 'Fish soup', nameAm: 'አሳ ሾርባ', price: 300, category: 'Soup', tags: ['Fish'] },
  { id: 's5', nameEn: 'Spinach soup', nameAm: 'ቆስጣ ሾርባ', price: 200, category: 'Soup', tags: ['Fasting'] },

  // Salad Section
  { id: 'sl1', nameEn: 'Special salad', nameAm: 'ስፔሻል ሳላድ', price: 300, category: 'Salad', tags: ['Popular'] },
  { id: 'sl2', nameEn: 'Mixed salad', nameAm: 'ሚክስድ ሳላድ', price: 250, category: 'Salad', tags: ['Fasting'] },
  { id: 'sl3', nameEn: 'Chicken salad', nameAm: 'ችክን ሳላድ', price: 350, category: 'Salad' },
  { id: 'sl4', nameEn: 'Fruit punch', nameAm: 'ፍሩት ፓንች', price: 300, category: 'Salad', tags: ['Fasting'] },

  // Traditional Food
  { id: 't1', nameEn: 'Lamp tibs', nameAm: 'የበግ ጥብስ', price: 500, category: 'Traditional Food', tags: ['Meat','Popular'] },
  { id: 't2', nameEn: 'Beef tibs', nameAm: 'ቢፍ ጥብስ', price: 450, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't3', nameEn: 'Chikena tibs', nameAm: 'ጭቅና ጥብስ', price: 500, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't4', nameEn: 'Derek tibs', nameAm: 'ደረቅ ጥብስ', price: 600, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't5', nameEn: 'Combo', nameAm: 'የፍስግ ኮምቦ', price: 1000, category: 'Traditional Food', tags: ['Meat', 'Popular'] },
  { id: 't6', nameEn: 'Half Combo', nameAm: 'ግማሽ የፍስግ ኮምቦ', price: 600, category: 'Traditional Food', tags: ['Meat', 'Popular'] },
  { id: 't7', nameEn: 'Kitfo', nameAm: 'ክትፎ', price: 600, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't8', nameEn: 'Shekla tibs', nameAm: 'ሸክላ ጥብስ', price: 600, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't9', nameEn: 'Dulet', nameAm: 'ዱለት', price: 250, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't10', nameEn: 'Tegabino', nameAm: 'ተጋቢኖ', price: 300, category: 'Traditional Food', tags: ['Fasting'] },
  { id: 't11', nameEn: 'Shiro', nameAm: 'ሽሮ', price: 250, category: 'Traditional Food', tags: ['Fasting'] },
  { id: 't12', nameEn: 'Bozena shiro', nameAm: 'ቦዘና ሽሮ', price: 350, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't13', nameEn: 'Misr bedsit', nameAm: 'ምስር በድስት', price: 300, category: 'Traditional Food', tags: ['Fasting'] },
  { id: 't14', nameEn: 'Miser Besga', nameAm: 'ምስር በስጋ', price: 350, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't15', nameEn: 'Fasting combo', nameAm: 'የፆም ኮምቦ', price: 500, category: 'Traditional Food', tags: ['Fasting', 'Popular'] },
  { id: 't16', nameEn: 'Suf fitft', nameAm: 'ሱፍ ፍትፍት', price: 200, category: 'Traditional Food', tags: ['Fasting'] },
  { id: 't17', nameEn: 'Selit fift', nameAm: 'ሰሊጥ ፍትፍት', price: 200, category: 'Traditional Food', tags: ['Fasting'] },

  // Pasta, Rice & Macaroni
  { id: 'pr1', nameEn: 'Spaghetti with tomato', nameAm: 'ፓስታ በቲማቲም', price: 250, category: 'Pasta, Rice & Macaroni', tags: ['Fasting','Popular'] },
  { id: 'pr2', nameEn: 'Spaghetti with meat', nameAm: 'ፓስታ በስጋ', price: 350, category: 'Pasta, Rice & Macaroni', tags: ['Meat'] },
  { id: 'pr3', nameEn: 'Spaghetti with vegetable', nameAm: 'ፓስታ በአትክልት', price: 250, category: 'Pasta, Rice & Macaroni', tags: ['Fasting'] },
  { id: 'pr4', nameEn: 'Rice with tomato', nameAm: 'ሩዝ በቲማቲም', price: 250, category: 'Pasta, Rice & Macaroni', tags: ['Fasting'] },
  { id: 'pr5', nameEn: 'Rice with meat', nameAm: 'ሩዝ በስጋ', price: 350, category: 'Pasta, Rice & Macaroni', tags: ['Meat', 'Popular'] },
  { id: 'pr6', nameEn: 'Rice with vegetable', nameAm: 'ሩዝ በአትክልት', price: 250, category: 'Pasta, Rice & Macaroni', tags: ['Fasting'] },

  // Sandwich
  { id: 'sw1', nameEn: 'Egg sandwich', nameAm: 'እንቁላል ሳንዱች', price: 250, category: 'Sandwich' },
  { id: 'sw2', nameEn: 'Club sandwich', nameAm: 'ክለብ ሳንዱች', price: 400, category: 'Sandwich' },
  { id: 'sw3', nameEn: 'Fish sandwich', nameAm: 'አሳ ሳንዱች', price: 450, category: 'Sandwich', tags: ['Fish','Popular'] },
  { id: 'sw4', nameEn: 'Chicken sandwich', nameAm: 'ዶሮ ሳንዱች', price: 450, category: 'Sandwich', tags: ['Popular'] },
  { id: 'sw5', nameEn: 'Veggie sandwich', nameAm: 'አትክልት ሳንዱች', price: 450, category: 'Sandwich' },
  { id: 'sw6', nameEn: 'French fries', nameAm: 'ችብስ', price: 250, category: 'Sandwich', tags: ['Fasting'] },

  // Wrap
  { id: 'rp1', nameEn: 'Chicken Wrap', nameAm: 'ችክን ራፕ', price: 450, category: 'Wrap', tags: ['Popular'] },
  { id: 'rp2', nameEn: 'Beef Wrap', nameAm: 'ቢፍ ራፕ', price: 400, category: 'Wrap', tags: ['Meat'] },
  { id: 'rp3', nameEn: 'Veggie Wrap', nameAm: 'ቬጅቴብል ራፕ', price: 300, category: 'Wrap', tags: ['Fasting'] },

  // Steak
  { id: 'st1', nameEn: 'Grilled steak', nameAm: 'ግሪል ስቴክ', price: 500, category: 'Steak', tags: ['Popular'] },
  { id: 'st2', nameEn: 'Steak albismark', nameAm: 'ስቴክ አልቢስማርክ', price: 500, category: 'Steak' },

  // Curry
  { id: 'cy1', nameEn: 'Lamb curry', nameAm: 'ላምብ ኬሪ', price: 550, category: 'Curry', tags: ['Meat'] },
  { id: 'cy2', nameEn: 'Beef curry', nameAm: 'ቢፍ ኬሪ', price: 500, category: 'Curry', tags: ['Meat'] },
  { id: 'cy3', nameEn: 'Chicken curry', nameAm: 'ችክን ኬሪ', price: 550, category: 'Curry', tags: ['Popular'] },
  { id: 'cy5', nameEn: 'Stir fried fish', nameAm: 'ስቲር ፍራይድ ፊሽ', price: 550, category: 'Curry', tags: ['Fish'] },
  { id: 'cy6', nameEn: 'Stir fried beef', nameAm: 'ስቲር ፍራይድ ቢፍ', price: 550, category: 'Curry', tags: ['Meat'] },

  // Chicken
  { id: 'ch1', nameEn: 'Chicken breast', nameAm: 'ችክን ብረስት', price: 550, category: 'Chicken' },
  { id: 'ch2', nameEn: 'Chicken leg', nameAm: 'ችክን ሌግ', price: 450, category: 'Chicken' },
  { id: 'ch3', nameEn: 'Full roasted chicken', nameAm: 'ሙሉ ዶሮ', price: 2400, category: 'Chicken', tags: ['Popular'] },
  { id: 'ch4', nameEn: 'Half roasted chicken', nameAm: 'ግማሽ ዶሮ', price: 1200, category: 'Chicken' },
  { id: 'ch5', nameEn: 'Grilled chicken', nameAm: 'ግሪል ችክን', price: 500, category: 'Chicken' },
  { id: 'ch6', nameEn: 'Chicken tender', nameAm: 'ችክን ቴንደር', price: 550, category: 'Chicken' },
  { id: 'ch7', nameEn: 'Stir fried chicken', nameAm: 'ስቲር ፍራይድ ችክን', price: 550, category: 'Chicken' },

  // Pizza
  { id: 'pz6', nameEn: 'Maldyor special Pizza', nameAm: 'ማልድዮር ስፔሻል ፒዛ', price: 600, category: 'Pizza', tags: ['Popular'] },
  { id: 'pz1', nameEn: 'Beef pizza', nameAm: 'ቢፍ ፒዛ', price: 450, category: 'Pizza', tags: ['Meat'] },
  { id: 'pz2', nameEn: 'Margarita pizza', nameAm: 'ማርጋሪታ ፒዛ', price: 550, category: 'Pizza'},
  { id: 'pz3', nameEn: 'Vegetable Pizza', nameAm: 'አትክልት ፒዛ', price: 400, category: 'Pizza'},
  { id: 'pz4', nameEn: 'Tuna Pizza', nameAm: 'ቱና ፒዛ', price: 550, category: 'Pizza', tags: ['Fish','Fasting','Popular'] },
  { id: 'pz5', nameEn: 'Chicken pizza', nameAm: 'ችክን ፒዛ', price: 550, category: 'Pizza' },

  // Burger
  { id: 'bg1', nameEn: 'Beef Burger', nameAm: 'ቢፍ በርገር', price: 450, category: 'Burger'},
  { id: 'bg2', nameEn: 'Cheese Burger', nameAm: 'ችዝ በርገር', price: 500, category: 'Burger'},
  { id: 'bg3', nameEn: 'Double Burger', nameAm: 'ደብል በርገር', price: 850, category: 'Burger'},
  { id: 'bg4', nameEn: 'Special Burger', nameAm: 'ስፔሻል በርገር', price: 600, category: 'Burger', tags: ['Popular'] },

  // Fish
  { id: 'fs1', nameEn: 'Fish goulash', nameAm: 'አሳ ጉላሽ', price: 500, category: 'Fish', tags: ['Fasting'] },
  { id: 'fs2', nameEn: 'Fish wet', nameAm: 'አሳ ወጥ', price: 450, category: 'Fish', tags: ['Fasting'] },
  { id: 'fs3', nameEn: 'Fried fish', nameAm: 'ፍራይድ ፊሽ', price: 500, category: 'Fish', tags: ['Fasting'] },
  { id: 'fs4', nameEn: 'Fish cutlet', nameAm: 'አሳ ኮተሌት', price: 500, category: 'Fish', tags: ['Fasting', 'Popular'] },

  // Drinks & Spirits
  { id: 'dr1', nameEn: '0.5 liter water', nameAm: '0.5 ሊትር ውሃ', price: 30, category: 'Drinks' },
  { id: 'dr6', nameEn: 'Nigus Malt', nameAm: 'ንጉስ ማልት', price: 90, category: 'Drinks', tags: ['Malt'] },
  { id: 'dr10', nameEn: 'Heineken', nameAm: 'ሃይኒከን', price: 120, category: 'Drinks', tags: ['Beer'] },
  { id: 'ab1', nameEn: 'Champagne', nameAm: 'ሻምፓኝ', price: 10000, category: 'Alcohol Drinks' },
  { id: 'ab10', nameEn: 'Black label Bottle', nameAm: 'ብላክ ሌብል ጠርሙስ', price: 15000, category: 'Alcohol Drinks' },
  { id: 'ab19', nameEn: 'XO Cognac', nameAm: 'ኤክስኦ ኮኛክ', price: 50000, category: 'Alcohol Drinks', tags: ['Popular'] },
  { id: 'ab21', nameEn: 'Tequila (Shot)', nameAm: 'ተኪላ በሲሲ', price: 350, category: 'Alcohol Drinks' },

  // Continental Breakfast
  { id: 'cb1', nameEn: 'Scrambled Egg', nameAm: 'እንቁላል ፍርፍር', price: 250, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb7', nameEn: 'Pancake', nameAm: 'ፓን ኬክ', price: 250, category: 'Continental Breakfast', tags: ['For room customer only'] },

  // Extra Section
  { id: 'ot1', nameEn: 'Extra injera', nameAm: 'ተጨማሪ እንጀራ', price: 40, category: 'Extra' },
  { id: 'ot5', nameEn: 'Aluminium foil', nameAm: 'አልሙኒየም ፎይል', price: 50, category: 'Extra', tags: ['Takeaway box'] }
];

// --- COMPONENTS ---

const Header = () => (
  <header className="pt-8 pb-10 px-6 bg-[#0c0c0c] flex flex-col items-center">
    <div className="relative mb-6">
      <div className="flex items-center justify-center">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[#d4af37] text-2xl drop-shadow-lg">👑</span>
          <div className="flex items-baseline font-black text-[#d4af37] italic select-none">
            <span className="text-6xl leading-none">K</span>
            <span className="text-3xl leading-none -ml-0.5">E</span>
          </div>
          <div className="absolute inset-0 border-2 border-[#d4af37]/40 rounded-full scale-125 animate-pulse"></div>
        </div>
      </div>
    </div>
    <div className="text-center">
      <h1 className="text-4xl font-[900] tracking-tighter text-[#ff3d2e] uppercase leading-none mb-1">
        MALDYOR HOTEL
      </h1>
      <h2 className="font-eth text-3xl font-black text-[#ff3d2e] tracking-tight leading-tight">
        ማልድዮር ሆቴል
      </h2>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-[1px] w-8 bg-[#ff3d2e]/40"></span>
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black">ALAMATA</span>
        <span className="h-[1px] w-8 bg-[#ff3d2e]/40"></span>
      </div>
    </div>
  </header>
);

const SearchBar = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
  <div className="px-5 mb-8">
    <div className="relative group">
      <input
        type="text"
        placeholder="Search for your favorite dish..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-[#ff3d2e]/50 transition-all placeholder:text-gray-600 shadow-2xl"
      />
      <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff3d2e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {value && (
        <button 
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/10 text-white active:scale-90"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  </div>
);

const CategoryNav = ({ activeCategory, onSelect }: { activeCategory: Category, onSelect: (c: Category) => void }) => (
  <nav className="sticky top-0 z-50 sticky-nav py-6 px-4 border-b border-white/5 overflow-x-auto hide-scrollbar flex gap-3 shadow-2xl">
    {CATEGORIES.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        className={`px-6 py-3 rounded-2xl whitespace-nowrap text-[11px] font-black transition-all duration-300 transform flex items-center gap-2.5 ${
          activeCategory === cat 
            ? 'bg-[#ff3d2e] text-white shadow-xl shadow-[#ff3d2e]/30 -translate-y-0.5 scale-105' 
            : 'bg-white/5 text-gray-500 hover:text-gray-300 active:scale-95'
        }`}
      >
        <span className="text-base">{CATEGORY_EMOJIS[cat]}</span>
        {cat.toUpperCase()}
      </button>
    ))}
  </nav>
);

const TagBadge = ({ tag }: { tag: string }) => {
  const getColors = () => {
    switch(tag) {
      case 'Spicy': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Vegetarian':
      case 'Fasting': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Meat': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Popular': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };
  return (
    <span className={`text-[9px] uppercase font-black px-2.5 py-1 rounded-lg border ${getColors()} tracking-wider flex items-center gap-1`}>
      {tag === 'Popular' && <span>⭐</span>}
      {tag}
    </span>
  );
};

const SelectionTray = ({ selectedItems, onClose }: { selectedItems: MenuItem[], onClose: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const total = selectedItems.reduce((acc, item) => acc + item.price, 0);
  
  if (selectedItems.length === 0) return null;

  return (
    <>
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[110] animate-fadeIn"
          onClick={() => setIsExpanded(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 max-w-lg mx-auto bg-[#111111] rounded-t-[3.5rem] p-10 border-t border-white/10 shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-1.5 bg-white/20 rounded-full mx-auto mb-10"></div>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-[900] text-white uppercase tracking-tighter">Your Order</h2>
              <button onClick={() => setIsExpanded(false)} className="p-3 rounded-full bg-white/5 text-white active:scale-75">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto pr-4 space-y-6 mb-10 hide-scrollbar">
              {selectedItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex justify-between items-center py-5 border-b border-white/5 last:border-0 group">
                  <div>
                    <p className="text-white font-black text-xl leading-tight group-hover:text-[#ff3d2e] transition-colors">{item.nameEn}</p>
                    <p className="font-eth text-[#ff3d2e] font-bold text-lg">{item.nameAm}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-2xl tracking-tighter">{formatPrice(item.price)}</p>
                    <p className="text-[10px] text-gray-600 font-black uppercase">ETB</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#ff3d2e] to-[#ff5d4e] rounded-[2.5rem] p-8 flex justify-between items-center shadow-2xl shadow-[#ff3d2e]/20">
              <div>
                <p className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em] mb-1">Total Due</p>
                <p className="text-4xl font-black text-white tracking-tighter">{formatPrice(total)} <span className="text-base font-bold">ETB</span></p>
              </div>
              <button onClick={() => { onClose(); setIsExpanded(false); }} className="bg-white text-[#ff3d2e] px-10 py-5 rounded-3xl text-xs font-black active:scale-95 shadow-xl hover:bg-gray-100 transition-all uppercase tracking-widest">
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 pointer-events-none">
        <div 
          onClick={() => setIsExpanded(true)}
          className="max-w-md mx-auto bg-[#ff3d2e] rounded-[2.5rem] p-6 shadow-[0_25px_60px_rgba(255,61,46,0.4)] flex items-center justify-between pointer-events-auto cursor-pointer active:scale-95 transition-all group"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">TAP TO VIEW ORDER</span>
            <span className="text-3xl font-[900] text-white tracking-tighter">{formatPrice(total)} <span className="text-sm font-bold opacity-80">ETB</span></span>
          </div>
          <div className="flex items-center gap-5">
             <span className="bg-black/20 text-white text-xs font-black px-4 py-2 rounded-full backdrop-blur-md border border-white/10">{selectedItems.length} {selectedItems.length === 1 ? 'ITEM' : 'ITEMS'}</span>
             <div className="bg-white/20 p-2.5 rounded-full group-hover:rotate-12 transition-transform">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const toggleItem = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.nameEn.toLowerCase().includes(query) || 
                          item.nameAm.toLowerCase().includes(query);
      return query ? matchesSearch : (item.category === activeCategory);
    });
  }, [activeCategory, searchQuery]);

  const selectedObjects = useMemo(() => 
    MENU_ITEMS.filter(item => selectedIds.has(item.id)),
    [selectedIds]
  );

  return (
    <div className="min-h-screen pb-48 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <Header />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        {!searchQuery && <CategoryNav activeCategory={activeCategory} onSelect={setActiveCategory} />}

        <main className="px-6 mt-12 space-y-6">
          <div className="flex items-center justify-between mb-8 px-1">
            <h2 className="text-3xl font-[900] text-white uppercase tracking-tighter flex items-center gap-4">
              {!searchQuery && <span className="text-3xl opacity-90">{CATEGORY_EMOJIS[activeCategory]}</span>}
              {searchQuery ? 'Search Results' : activeCategory}
            </h2>
            <span className="text-gray-700 text-[10px] font-black bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl uppercase tracking-widest">{filteredItems.length} Products</span>
          </div>

          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div 
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`menu-card rounded-[2.2rem] p-7 border transition-all duration-300 active:scale-[0.97] cursor-pointer animate-item flex flex-col gap-5 ${
                  selectedIds.has(item.id) 
                    ? 'border-[#ff3d2e]/60 bg-[#ff3d2e]/10 shadow-[0_15px_40px_rgba(255,61,46,0.15)]' 
                    : item.tags?.includes('Popular')
                    ? 'border-yellow-500/30 shadow-[0_10px_30px_rgba(234,179,8,0.05)]'
                    : 'border-white/5'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white leading-tight mb-1">{item.nameEn}</h3>
                    <h4 className="font-eth text-xl text-[#ff3d2e] font-black tracking-tight">{item.nameAm}</h4>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl font-[1000] text-white tracking-tighter">{formatPrice(item.price)}</span>
                    </div>
                    <span className="text-[10px] font-black text-gray-600 uppercase mt-1 tracking-widest">ETB</span>
                  </div>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2.5">
                    {item.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-32 text-center">
              <div className="text-5xl mb-6 grayscale opacity-40">🍽️</div>
              <p className="font-black text-gray-700 uppercase tracking-widest text-sm mb-4">No matching dishes found</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[#ff3d2e] font-black text-xs border border-[#ff3d2e]/30 px-6 py-3 rounded-2xl hover:bg-[#ff3d2e]/10 transition-colors"
              >
                BROWSE ALL CATEGORIES
              </button>
            </div>
          )}
        </main>

        <footer className="mt-32 pt-20 pb-40 border-t border-white/5 text-center bg-[#070707] rounded-t-[4rem]">
          <div className="mb-16 px-10">
            <p className="text-[#ff3d2e] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Guest Experience & Feedback</p>
            <a href="tel:+251938222226" className="inline-block text-white text-3xl font-[1000] tracking-tighter hover:text-[#ff3d2e] transition-colors active:scale-95">
              +251 938 222 226
            </a>
          </div>

          <div className="max-w-xs mx-auto mb-14 p-10 rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#5c7cfa]/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
            <p className="text-[#5c7cfa] text-[10px] font-[1000] tracking-[0.25em] mb-4 relative z-10">TECHNOLOGY PARTNER</p>
            <p className="text-white text-lg font-[1000] mb-10 tracking-tighter relative z-10">WEZK TECHNOLOGIES</p>
            
            <div className="flex flex-col gap-4 relative z-10">
              <a 
                href="https://t.me/yonnyw7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-xs font-black text-white hover:bg-[#5c7cfa] transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.96-.75 3.78-1.65 6.31-2.73 7.57-3.24 3.61-1.48 4.36-1.74 4.85-1.75.11 0 .35.03.5.16.13.12.17.28.18.39-.01.07-.01.14-.01.22z"/>
                </svg>
                TELEGRAM CHANNEL
              </a>
              <a 
                href="tel:+251938007979" 
                className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-xs font-black text-white hover:bg-white/10 transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                DIRECT SUPPORT
              </a>
            </div>
          </div>

          <p className="text-gray-700 text-[10px] uppercase font-black tracking-[0.5em]">&copy; {new Date().getFullYear()} MALDYOR HOTEL</p>
        </footer>
      </div>

      <SelectionTray selectedItems={selectedObjects} onClose={() => setSelectedIds(new Set())} />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
