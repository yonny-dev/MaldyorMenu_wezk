import React, { useState, useRef, useMemo } from 'react';
import { CATEGORIES, MENU_ITEMS } from './constants';
import { Category, MenuItem } from './types';

// Emoji mapping for categories to keep the UI engaging
const CATEGORY_EMOJIS: Record<Category, string> = {
  'Breakfast': '🍳',
  'Soup': '🥣',
  'Salad': '🥗',
  'Traditional Food': '🥘',
  'Spaghetti / Rice / Maccoroni': '🍝',
  'Sandwich': '🥪',
  'Rap': '🌯',
  'Stake': '🥩',
  'Curry': '🍛',
  'Chicken': '🍗',
  'Pizza': '🍕',
  'Burger': '🍔',
  'Fish': '🐟',
  'Juice & Shakes': '🍹',
  'Hot Drinks': '☕',
  'Drinks': '🥤',
  'Alcohol Drinks(Bottle)': '🥃',
  'Continental Breakfast': '🥐',
  'Extra': '➕'
};

const Header: React.FC = () => (
  <header className="pt-8 pb-10 px-6 bg-[#0c0c0c] flex flex-col items-center">
    <div className="relative mb-6">
      <div className="flex items-center justify-center">
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Crown */}
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#d4af37] text-xl">👑</span>
          
          {/* Adjusted Monogram: K larger than E */}
          <div className="flex items-baseline font-black text-[#d4af37] italic select-none">
            <span className="text-5xl leading-none">K</span>
            <span className="text-2xl leading-none -ml-0.5">E</span>
          </div>
          
          {/* Circular border accent */}
          <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-full scale-125"></div>
        </div>
      </div>
    </div>
    
    <div className="text-center">
      <h1 className="text-4xl font-[900] tracking-tighter text-[#ff3d2e] uppercase logo-banner leading-none mb-1">
        MALDYOR HOTEL
      </h1>
      <h2 className="font-eth text-3xl font-black text-[#ff3d2e] tracking-tight leading-tight">
        ማልድዮር ሆቴል
      </h2>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-[1px] w-8 bg-[#ff3d2e]/40"></span>
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">ALAMATA</span>
        <span className="h-[1px] w-8 bg-[#ff3d2e]/40"></span>
      </div>
    </div>
  </header>
);

const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <div className="px-5 mb-8">
    <div className="relative group">
      <input
        type="text"
        placeholder="Search dishes... / ምግቦችን ይፈልጉ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#ff3d2e]/50 transition-all placeholder:text-gray-600 shadow-xl"
      />
      <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ff3d2e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  </div>
);

const CategoryNav: React.FC<{ activeCategory: Category; onSelect: (cat: Category) => void }> = ({ activeCategory, onSelect }) => (
  <nav className="sticky top-0 z-50 sticky-nav py-5 px-4 border-b border-white/5 overflow-x-auto hide-scrollbar flex gap-3 shadow-2xl">
    {CATEGORIES.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-black transition-all duration-300 transform flex items-center gap-2 ${
          activeCategory === cat 
            ? 'bg-[#ff3d2e] text-white shadow-lg shadow-[#ff3d2e]/20 -translate-y-0.5' 
            : 'bg-white/5 text-gray-500 hover:text-gray-300'
        }`}
      >
        <span className="text-sm">{CATEGORY_EMOJIS[cat]}</span>
        {cat}
      </button>
    ))}
  </nav>
);

const TagBadge: React.FC<{ tag: string }> = ({ tag }) => {
  const getColors = () => {
    switch(tag) {
      case 'Spicy': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Vegetarian': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Meat': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Fish': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };
  return <span className={`text-[9px] uppercase font-black px-2.5 py-1 rounded-lg border ${getColors()} tracking-wider`}>{tag}</span>;
};

const SelectionTray: React.FC<{ selectedItems: MenuItem[]; onClose: () => void }> = ({ selectedItems, onClose }) => {
  const total = selectedItems.reduce((acc, item) => acc + item.price, 0);
  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none">
      <div className="max-w-lg mx-auto bg-[#ff3d2e] rounded-[2rem] p-5 shadow-[0_20px_50px_rgba(255,61,46,0.3)] flex items-center justify-between pointer-events-auto transform transition-all duration-500 animate-in slide-in-from-bottom-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em]">Summary / ድምር</span>
          <span className="text-2xl font-[900] text-white">{total} <span className="text-sm font-bold opacity-80">ETB</span></span>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end">
              <span className="bg-white text-[#ff3d2e] text-[10px] font-black px-3 py-1 rounded-full shadow-sm">{selectedItems.length} ITEMS</span>
           </div>
           <button 
             onClick={onClose}
             className="bg-black text-white px-6 py-3.5 rounded-2xl text-xs font-black active:scale-95 transition-all shadow-xl"
           >
             RESET
           </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
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
    const query = searchQuery.toLowerCase();
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.nameEn.toLowerCase().includes(query) || 
                          item.nameAm.toLowerCase().includes(query);
      return searchQuery ? matchesSearch : (item.category === activeCategory);
    });
  }, [activeCategory, searchQuery]);

  const selectedObjects = useMemo(() => 
    MENU_ITEMS.filter(item => selectedIds.has(item.id)),
    [selectedIds]
  );

  return (
    <div className="min-h-screen pb-40 selection:bg-[#ff3d2e] selection:text-white">
      <Header />
      
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      
      {!searchQuery && (
        <CategoryNav 
          activeCategory={activeCategory} 
          onSelect={(cat) => {
            setActiveCategory(cat);
            const navEl = document.querySelector('nav');
            if (navEl) {
              const rect = navEl.getBoundingClientRect();
              window.scrollBy({ top: rect.top - 20, behavior: 'smooth' });
            }
          }} 
        />
      )}

      <main className="px-5 mt-10 max-w-lg mx-auto space-y-5">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-2xl font-[900] text-white uppercase tracking-tight flex items-center gap-3">
            {!searchQuery && <span className="opacity-80">{CATEGORY_EMOJIS[activeCategory]}</span>}
            {searchQuery ? 'Results' : activeCategory}
          </h2>
          <span className="text-gray-700 text-[10px] font-black bg-white/5 px-2 py-1 rounded-md">{filteredItems.length} ITEMS</span>
        </div>

        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div 
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`menu-card rounded-[1.5rem] p-6 border transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                selectedIds.has(item.id) 
                  ? 'border-[#ff3d2e]/40 bg-[#ff3d2e]/5' 
                  : 'border-white/5'
              }`}
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white leading-tight mb-0.5">{item.nameEn}</h3>
                  <h4 className="font-eth text-lg text-[#ff3d2e] font-bold">{item.nameAm}</h4>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-2xl font-[900] text-white whitespace-nowrap leading-none">
                    {item.price}
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase mt-1">ETB</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {item.tags?.map(tag => <TagBadge key={tag} tag={tag} />)}
                {selectedIds.has(item.id) && (
                  <div className="ml-auto flex items-center gap-1.5 text-[10px] font-black text-[#ff3d2e] uppercase">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    Selected
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center text-gray-700">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <p className="font-bold uppercase tracking-widest text-xs">Dish not found</p>
          </div>
        )}
      </main>

      <SelectionTray 
        selectedItems={selectedObjects} 
        onClose={() => setSelectedIds(new Set())} 
      />

      <footer className="mt-24 pt-16 pb-32 border-t border-white/5 text-center bg-[#070707]">
        <div className="w-16 h-16 rounded-full border border-[#ff3d2e]/10 flex items-center justify-center mx-auto mb-8 opacity-40">
           <svg className="w-6 h-6 text-[#ff3d2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <div className="mb-6 px-6">
          <p className="text-[#ff3d2e] text-xs font-black uppercase tracking-widest mb-2">For any comments & feedback</p>
          <a href="tel:+251938222226" className="text-white text-lg font-black tracking-tighter hover:text-[#ff3d2e] transition-colors">
            +251 938 222 226
          </a>
        </div>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-4 font-black">&copy; {new Date().getFullYear()} MALDYOR HOTEL</p>
        <p className="text-gray-700 text-[10px] font-bold max-w-[240px] mx-auto leading-relaxed uppercase tracking-tighter">
          Traditional Flavors & Modern Elegance in the heart of Alamata.
        </p>
      </footer>
    </div>
  );
}