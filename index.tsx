import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- TYPES ---
type Category = 
  | 'Breakfast' | 'Soup' | 'Salad' | 'Traditional Food' | 'Spaghetti / Rice / Maccoroni'
  | 'Sandwich' | 'Wrap' | 'Steak' | 'Curry' | 'Chicken' | 'Pizza' | 'Burger' | 'Fish'
  | 'Juice & Shakes' | 'Hot Drinks' | 'Drinks' | 'Alcohol Drinks(Bottle)'
  | 'Continental Breakfast' | 'Extra';

interface MenuItem {
  id: string;
  nameEn: string;
  nameAm: string;
  price: number;
  category: Category;
  tags?: ('Vegetarian' | 'Spicy' | 'Meat' | 'Fish' | 'Popular' | 'Fasting' | 'Malt' | 'Beer' | 'Takeaway box' | '12 Years-old' | '15 Years-old' | '18 Years-old' | 'For room customer only')[];
}

// --- CONSTANTS ---
const CATEGORIES: Category[] = [
  'Breakfast', 'Soup', 'Salad', 'Traditional Food', 'Spaghetti / Rice / Maccoroni',
  'Sandwich', 'Wrap', 'Steak', 'Curry', 'Chicken', 'Pizza', 'Burger', 'Fish',
  'Juice & Shakes', 'Hot Drinks', 'Drinks', 'Alcohol Drinks(Bottle)',
  'Continental Breakfast', 'Extra'
];

const CATEGORY_EMOJIS: Record<Category, string> = {
  'Breakfast': '🍳', 'Soup': '🥣', 'Salad': '🥗', 'Traditional Food': '🥘',
  'Spaghetti / Rice / Maccoroni': '🍝', 'Sandwich': '🥪', 'Wrap': '🌯',
  'Steak': '🥩', 'Curry': '🍛', 'Chicken': '🍗', 'Pizza': '🍕', 'Burger': '🍔',
  'Fish': '🐟', 'Juice & Shakes': '🍹', 'Hot Drinks': '☕', 'Drinks': '🥤',
  'Alcohol Drinks(Bottle)': '🥃', 'Continental Breakfast': '🥐', 'Extra': '➕'
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

  // Soup Section (Standalone Category)
  { id: 's1', nameEn: 'Vegetable soup', nameAm: 'አትክልት ሾርባ', price: 200, category: 'Soup',tags: ['Fasting', 'Popular'] },
  { id: 's2', nameEn: 'Minestrone soup', nameAm: 'ምስር ሾርባ', price: 200, category: 'Soup', tags: ['Fasting'] },
  { id: 's3', nameEn: 'Chicken soup', nameAm: 'ዶሮ ሾርባ', price: 300, category: 'Soup' },
  { id: 's4', nameEn: 'Fish soup', nameAm: 'አሳ ሾርባ', price: 300, category: 'Soup', tags: ['Fish'] },
  { id: 's5', nameEn: 'Spinach soup', nameAm: 'ቆስጣ ሾርባ', price: 200, category: 'Soup', tags: ['Fasting'] },

  // Salad Section (Standalone Category)
  { id: 'sl1', nameEn: 'Special salad', nameAm: 'ስፔሻል ሳላድ', price: 300, category: 'Salad', tags: ['Popular'] },
  { id: 'sl2', nameEn: 'Mixed salad', nameAm: 'ሚክስድ ሳላድ', price: 250, category: 'Salad', tags: ['Fasting'] },
  { id: 'sl3', nameEn: 'Chicken salad', nameAm: 'ችክን ሳላድ', price: 350, category: 'Salad' },
  { id: 'sl4', nameEn: 'Fruit punch', nameAm: 'ፍሩት ፓንች', price: 300, category: 'Salad', tags: ['Fasting'] },

  // Traditional Food Section
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

  // Spaghetti / Rice Section
  { id: 'pr1', nameEn: 'Spaghetti with tomato', nameAm: 'ፓስታ በቲማቲም', price: 250, category: 'Spaghetti / Rice / Maccoroni', tags: ['Fasting','Popular'] },
  { id: 'pr2', nameEn: 'Spaghetti with meat', nameAm: 'ፓስታ በስጋ', price: 350, category: 'Spaghetti / Rice / Maccoroni', tags: ['Meat'] },
  { id: 'pr3', nameEn: 'Spaghetti with vegetable', nameAm: 'ፓስታ በአትክልት', price: 250, category: 'Spaghetti / Rice / Maccoroni', tags: ['Fasting'] },
  { id: 'pr4', nameEn: 'Rice with tomato', nameAm: 'ሩዝ በቲማቲም', price: 250, category: 'Spaghetti / Rice / Maccoroni', tags: ['Fasting'] },
  { id: 'pr5', nameEn: 'Rice with meat', nameAm: 'ሩዝ በስጋ', price: 350, category: 'Spaghetti / Rice / Maccoroni', tags: ['Meat', 'Popular'] },
  { id: 'pr6', nameEn: 'Rice with vegetable', nameAm: 'ሩዝ በአትክልት', price: 250, category: 'Spaghetti / Rice / Maccoroni', tags: ['Fasting'] },

  // Sandwich Category
  { id: 'sw1', nameEn: 'Egg sandwich', nameAm: 'እንቁላል ሳንዱች', price: 250, category: 'Sandwich' },
  { id: 'sw2', nameEn: 'Club sandwich', nameAm: 'ክለብ ሳንዱች', price: 400, category: 'Sandwich' },
  { id: 'sw3', nameEn: 'Fish sandwich', nameAm: 'አሳ ሳንዱች', price: 450, category: 'Sandwich', tags: ['Fish','Popular'] },
  { id: 'sw4', nameEn: 'Chicken sandwich', nameAm: 'ዶሮ ሳንዱች', price: 450, category: 'Sandwich', tags: ['Popular'] },
  { id: 'sw5', nameEn: 'Veggie sandwich', nameAm: 'አትክልት ሳንዱች', price: 450, category: 'Sandwich' },
  { id: 'sw6', nameEn: 'French fries', nameAm: 'ችብስ', price: 250, category: 'Sandwich', tags: ['Fasting'] },

  // Wrap Category
  { id: 'rp1', nameEn: 'Chicken Wrap', nameAm: 'ችክን ራፕ', price: 450, category: 'Wrap', tags: ['Popular'] },
  { id: 'rp2', nameEn: 'Beef Wrap', nameAm: 'ቢፍ ራፕ', price: 400, category: 'Wrap', tags: ['Meat'] },
  { id: 'rp3', nameEn: 'Veggie Wrap', nameAm: 'ቬጅቴብል ራፕ', price: 300, category: 'Wrap', tags: ['Fasting'] },

  // Steak Category
  { id: 'st1', nameEn: 'Grilled steak', nameAm: 'ግሪል ስቴክ', price: 500, category: 'Steak', tags: ['Popular'] },
  { id: 'st2', nameEn: 'Steak albismark', nameAm: 'ስቴክ አልቢስማርክ', price: 500, category: 'Steak' },

  // Curry Category
  { id: 'cy1', nameEn: 'Lamb curry', nameAm: 'ላምብ ኬሪ', price: 550, category: 'Curry', tags: ['Meat'] },
  { id: 'cy2', nameEn: 'Beef curry', nameAm: 'ቢፍ ኬሪ', price: 500, category: 'Curry', tags: ['Meat'] },
  { id: 'cy3', nameEn: 'Chicken curry', nameAm: 'ችክን ኬሪ', price: 550, category: 'Curry', tags: ['Popular'] },
  { id: 'cy5', nameEn: 'Stir fried fish', nameAm: 'ስቲር ፍራይድ ፊሽ', price: 550, category: 'Curry', tags: ['Fish'] },
  { id: 'cy6', nameEn: 'Stir fried beef', nameAm: 'ስቲር ፍራይድ ቢፍ', price: 550, category: 'Curry', tags: ['Meat'] },

  // Chicken Category
  { id: 'ch1', nameEn: 'Chicken breast', nameAm: 'ችክን ብረስት', price: 550, category: 'Chicken' },
  { id: 'ch2', nameEn: 'Chicken leg', nameAm: 'ችክን ሌግ', price: 450, category: 'Chicken' },
  { id: 'ch3', nameEn: 'Full roasted chicken', nameAm: 'ሙሉ ዶሮ', price: 2400, category: 'Chicken', tags: ['Popular'] },
  { id: 'ch4', nameEn: 'Half roasted chicken', nameAm: 'ግማሽ ዶሮ', price: 1200, category: 'Chicken' },
  { id: 'ch5', nameEn: 'Grilled chicken', nameAm: 'ግሪል ችክን', price: 500, category: 'Chicken' },
  { id: 'ch6', nameEn: 'Chicken tender', nameAm: 'ችክን ቴንደር', price: 550, category: 'Chicken' },
  { id: 'ch7', nameEn: 'Stir fried chicken', nameAm: 'ስቲር ፍራይድ ችክን', price: 550, category: 'Chicken' },

  // Pizza Category
  { id: 'pz6', nameEn: 'Maldyor special Pizza', nameAm: 'ማልድዮር ስፔሻል ፒዛ', price: 600, category: 'Pizza', tags: ['Popular'] },
  { id: 'pz1', nameEn: 'Beef pizza', nameAm: 'ቢፍ ፒዛ', price: 450, category: 'Pizza', tags: ['Meat'] },
  { id: 'pz2', nameEn: 'Margarita pizza', nameAm: 'ማርጋሪታ ፒዛ', price: 550, category: 'Pizza'},
  { id: 'pz3', nameEn: 'Vegetable Pizza', nameAm: 'አትክልት ፒዛ', price: 400, category: 'Pizza'},
  { id: 'pz4', nameEn: 'Tuna Pizza', nameAm: 'ቱና ፒዛ', price: 550, category: 'Pizza', tags: ['Fish','Fasting','Popular'] },
  { id: 'pz5', nameEn: 'Chicken pizza', nameAm: 'ችክን ፒዛ', price: 550, category: 'Pizza' },

  // Burger Category
  { id: 'bg1', nameEn: 'Beef Burger', nameAm: 'ቢፍ በርገር', price: 450, category: 'Burger'},
  { id: 'bg2', nameEn: 'Cheese Burger', nameAm: 'ችዝ በርገር', price: 500, category: 'Burger'},
  { id: 'bg3', nameEn: 'Double Burger', nameAm: 'ደብል በርገር', price: 850, category: 'Burger'},
  { id: 'bg4', nameEn: 'Special Burger', nameAm: 'ስፔሻል በርገር', price: 600, category: 'Burger', tags: ['Popular'] },

  // Fish Category
  { id: 'fs1', nameEn: 'Fish goulash', nameAm: 'አሳ ጉላሽ', price: 500, category: 'Fish', tags: ['Fasting'] },
  { id: 'fs2', nameEn: 'Fish wet', nameAm: 'አሳ ወጥ', price: 450, category: 'Fish', tags: ['Fasting'] },
  { id: 'fs3', nameEn: 'Fried fish', nameAm: 'ፍራይድ ፊሽ', price: 500, category: 'Fish', tags: ['Fasting'] },
  { id: 'fs4', nameEn: 'Fish cutlet', nameAm: 'አሳ ኮተሌት', price: 500, category: 'Fish', tags: ['Fasting', 'Popular'] },

  // Juice & Shakes
  { id: 'ju1', nameEn: 'Mango juice', nameAm: 'ማንጎ ጁስ', price: 200, category: 'Juice & Shakes' },
  { id: 'ju2', nameEn: 'Avocado juice', nameAm: 'አቮካዶ ጁስ', price: 200, category: 'Juice & Shakes' },
  { id: 'ju3', nameEn: 'Papaya juice', nameAm: 'ፓፓያ ጁስ', price: 200, category: 'Juice & Shakes' },
  { id: 'ju4', nameEn: 'Spris juice', nameAm: 'ስፕሪሰ ጁስ', price: 200, category: 'Juice & Shakes' },
  { id: 'ju5', nameEn: 'Watermelon juice', nameAm: 'ሃብሃብ ጁስ', price: 200, category: 'Juice & Shakes' },
  { id: 'ju6', nameEn: 'Special juice', nameAm: 'ስፔሻል ጁስ', price: 300, category: 'Juice & Shakes', tags: ['Popular'] },
  { id: 'sh1', nameEn: 'Avocado Milkshake', nameAm: 'አቨካዶ ሼክ', price: 300, category: 'Juice & Shakes' },
  { id: 'sh2', nameEn: 'Mango Milkshake', nameAm: 'ማንጎ ሼክ', price: 300, category: 'Juice & Shakes' },
  { id: 'sh3', nameEn: 'Banana Milkshake', nameAm: 'ሙዝ ሼክ', price: 300, category: 'Juice & Shakes' },
  { id: 'sh4', nameEn: 'Papaya Milkshake', nameAm: 'ፓፓያ ሼክ', price: 300, category: 'Juice & Shakes' },

  // Hot Drinks
  { id: 'hd1', nameEn: 'Tea', nameAm: 'ሻይ', price: 40, category: 'Hot Drinks' },
  { id: 'hd2', nameEn: 'Coffee', nameAm: 'ቡና', price: 60, category: 'Hot Drinks' },
  { id: 'hd3', nameEn: 'Spris', nameAm: 'ስፕሪስ', price: 60, category: 'Hot Drinks' },
  { id: 'hd4', nameEn: 'Macchiato', nameAm: 'ማኪያቶ', price: 60, category: 'Hot Drinks' },
  { id: 'hd5', nameEn: 'Special tea', nameAm: 'ስፔሻል ሻይ', price: 70, category: 'Hot Drinks' },
  { id: 'hd6', nameEn: 'Orange tea', nameAm: 'ብርቱካን ሻይ', price: 60, category: 'Hot Drinks' },
  { id: 'hd7', nameEn: 'Milk', nameAm: 'ወተት', price: 70, category: 'Hot Drinks' },
  { id: 'hd8', nameEn: 'Peanut tea', nameAm: 'የውዝ ሻይ', price: 60, category: 'Hot Drinks' },
  { id: 'hd9', nameEn: 'Milk with coffee', nameAm: 'ወተት በቡና', price: 70, category: 'Hot Drinks' },
  { id: 'hd10', nameEn: 'Mango tea', nameAm: 'ማንጎ ሻይ', price: 60, category: 'Hot Drinks' },
  { id: 'hd11', nameEn: 'Hot chocolate', nameAm: 'ሆት ቸኮሌት', price: 80, category: 'Hot Drinks' },
  { id: 'hd12', nameEn: 'Keshir', nameAm: 'ቀሽር', price: 50, category: 'Hot Drinks' },
  { id: 'hd13', nameEn: 'Ice tea', nameAm: 'አይስ ቲ', price: 60, category: 'Hot Drinks' },
  { id: 'hd14', nameEn: 'Ice coffee', nameAm: 'አይስ ኮፊ', price: 70, category: 'Hot Drinks' },
  { id: 'hd15', nameEn: 'Ice milk', nameAm: 'አይስ ሚልክ', price: 80, category: 'Hot Drinks' },

  // Drinks
  { id: 'dr1', nameEn: '0.5 liter water', nameAm: '0.5 ሊትር ውሃ', price: 30, category: 'Drinks' },
  { id: 'dr2', nameEn: '1 liter water', nameAm: '1 ሊትር ውሃ', price: 50, category: 'Drinks' },
  { id: 'dr3', nameEn: '2 liter water', nameAm: '2 ሊትር ውሃ', price: 60, category: 'Drinks' },
  { id: 'dr4', nameEn: 'Soft drinks', nameAm: 'ለስላሳ መጠጦች', price: 50, category: 'Drinks' },
  { id: 'dr5', nameEn: 'Ambo water', nameAm: 'አምቦ ውሃ', price: 50, category: 'Drinks' },
  { id: 'dr6', nameEn: 'Nigus', nameAm: 'ንጉስ ማልት', price: 90, category: 'Drinks', tags: ['Malt'] },
  { id: 'dr7', nameEn: 'Sinq', nameAm: 'ስንቅ ማልት', price: 90, category: 'Drinks', tags: ['Malt'] },
  { id: 'dr8', nameEn: 'Sofi', nameAm: 'ሶፊ ማልት', price: 90, category: 'Drinks', tags: ['Malt'] },
  { id: 'dr9', nameEn: 'Beer', nameAm: 'ቢራ', price: 100, category: 'Drinks' },
  { id: 'dr10', nameEn: 'Heiniken', nameAm: 'ሃይኒከን', price: 120, category: 'Drinks',tags: ['Beer'] },
  { id: 'dr11', nameEn: 'Bedele special', nameAm: 'በደሌ ስፔሻል', price: 120, category: 'Drinks',tags: ['Beer'] },
  { id: 'dr12', nameEn: 'Guder small', nameAm: 'ጉደር (ትንሽ)', price: 300, category: 'Drinks' },
  { id: 'dr13', nameEn: 'Guder big', nameAm: 'ጉደር (ትልቅ)', price: 600, category: 'Drinks' },
  { id: 'dr14', nameEn: 'Awash', nameAm: 'አዋሽ', price: 600, category: 'Drinks' },
  { id: 'dr15', nameEn: 'Axumite', nameAm: 'አክሱማይት', price: 1000, category: 'Drinks' },
  { id: 'dr16', nameEn: 'Awash Tekeshno', nameAm: 'አዋሽ ተከሽኖ', price: 800, category: 'Drinks' },
  { id: 'dr17', nameEn: 'Kemila', nameAm: 'ከሚላ', price: 1000, category: 'Drinks' },
  { id: 'dr18', nameEn: 'Acacia', nameAm: 'አካሲያ', price: 1700, category: 'Drinks' },
  { id: 'dr19', nameEn: 'Rift valley', nameAm: 'ሪፍት ቫሊ', price: 1700, category: 'Drinks' },

  // Alcohol Drinks(Bottle)
  { id: 'ab1', nameEn: 'Champagne', nameAm: 'ሻምፓኝ', price: 10000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab2', nameEn: 'Tequila', nameAm: 'ተኪላ', price: 12000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab3', nameEn: 'Stolichnaya vodka (0.3 L)', nameAm: 'ስቶልችኒያ ቮድካ (0.3 ሊ)', price: 4000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab4', nameEn: 'Stolichnaya vodka (0.5 L)', nameAm: 'ስቶልችኒያ ቮድካ (0.5 ሊ)', price: 6000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab5', nameEn: 'Stolichnaya vodka (0.75 L)', nameAm: 'ስቶልችኒያ ቮድካ (0.75 ሊ)', price: 7000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab6', nameEn: 'Stolichnaya vodka (1 L)', nameAm: 'ስቶልችኒያ ቮድካ (1 ሊ)', price: 9000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab7', nameEn: 'Absolute vodka', nameAm: 'አብሰሉት ቮድካ', price: 10000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab8', nameEn: 'Malibu', nameAm: 'ማሊቡ', price: 10000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab9', nameEn: 'Winterpalace', nameAm: 'ዊንተር ፓላስ', price: 9000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab10', nameEn: 'Black label', nameAm: 'ብላክ ሌብል ጠርሙስ', price: 15000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab11', nameEn: 'Double black label', nameAm: 'ደብል ብላክ ሌብል', price: 20000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab12', nameEn: 'Gold label', nameAm: 'ጎልድ ሌብል', price: 20000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab13', nameEn: 'Chivas', nameAm: 'ቺቫስ', price: 15000, category: 'Alcohol Drinks(Bottle)', tags: ['12 Years-old'] },
  { id: 'ab14', nameEn: 'Amarula', nameAm: 'አማሩላ', price: 10000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab15', nameEn: 'Glenfiddich', nameAm: 'ግሌንፊዲክ', price: 20000, category: 'Alcohol Drinks(Bottle)',tags: ['15 Years-old'] },
  { id: 'ab16', nameEn: 'Glenfiddich', nameAm: 'ግሌንፊዲክ', price: 25000, category: 'Alcohol Drinks(Bottle)',tags: ['18 Years-old'] },
  { id: 'ab17', nameEn: 'Hennessy', nameAm: 'ሄነሲ', price: 20000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab18', nameEn: 'Jack Daniel', nameAm: 'ጃክ ዳንኤል', price: 15000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab19', nameEn: 'XO Cognac', nameAm: 'ኤክስኦ ኮኛክ', price: 50000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab20', nameEn: 'Gordon dry gin', nameAm: 'ጎርደን ድራይ ጂን', price: 10000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab21', nameEn: 'Tequila (cc)', nameAm: 'ተኪላ በሲሲ', price: 350, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab22', nameEn: 'Double black (cc)', nameAm: 'ደብል ብላክ በሲሲ', price: 400, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab23', nameEn: 'Gordon dry gin (cc)', nameAm: 'ጎርደን ድራይ ጂን በሲሲ', price: 250, category: 'Alcohol Drinks(Bottle)' },

  // Continental Breakfast
  { id: 'cb1', nameEn: 'Scrambled Egg', nameAm: 'እንቁላል ፍርፍር', price: 250, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb2', nameEn: 'Omelet', nameAm: 'ኦምሌት', price: 250, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb3', nameEn: 'French toast', nameAm: 'ፍሬንች ቶስት', price: 250, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb4', nameEn: 'Enjera firfir', nameAm: 'እንጀራ ፍርፍር', price: 250, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb5', nameEn: 'Egg sandwich', nameAm: 'እንቁላል ሳንዱች', price: 250, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb6', nameEn: 'Vegetable sandwich', nameAm: 'አትክልት ሳንዱች', price: 200, category: 'Continental Breakfast', tags: ['Fasting', 'For room customer only'] },
  { id: 'cb7', nameEn: 'Pancake', nameAm: 'ፓን ኬክ', price: 250, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb8', nameEn: 'Oats', nameAm: 'አጃ', price: 250, category: 'Continental Breakfast', tags: ['Fasting', 'For room customer only'] },
  { id: 'cb9', nameEn: 'Fetira with honey', nameAm: 'ፈጢራ በማር', price: 250, category: 'Continental Breakfast', tags: ['Fasting','For room customer only'] },
  { id: 'cb10', nameEn: 'Fetira with egg & honey', nameAm: 'ፈጢራ በእንቁላል በማር', price: 300, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb11', nameEn: 'Papaya juice', nameAm: 'ፓፓያ ጁስ', price: 200, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb12', nameEn: 'Watermelon juice', nameAm: 'ሃብሃብ ጁስ', price: 200, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb13', nameEn: 'Tea', nameAm: 'ሻይ', price: 40, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb14', nameEn: 'Milk', nameAm: 'ወተት', price: 70, category: 'Continental Breakfast', tags: ['For room customer only'] },
  { id: 'cb15', nameEn: 'Coffee', nameAm: 'ቡና', price: 60, category: 'Continental Breakfast', tags: ['For room customer only'] },

  // Extra Section
  { id: 'ot1', nameEn: 'Extra injera', nameAm: 'ተጨማሪ እንጀራ', price: 40, category: 'Extra' },
  { id: 'ot2', nameEn: 'Extra bread', nameAm: 'ተጨማሪ ዳቦ', price: 10, category: 'Extra' },
  { id: 'ot3', nameEn: 'Extra cheese', nameAm: 'ተጨማሪ ቺዝ', price: 50, category: 'Extra' },
  { id: 'ot4', nameEn: 'Extra ketchup', nameAm: 'ተጨማሪ ካቻፕ', price: 30, category: 'Extra' },
  { id: 'ot5', nameEn: 'Aluminium foil', nameAm: 'አልሙኒየም ፎይል', price: 50, category: 'Extra',tags: ['Takeaway box'] },
  { id: 'ot6', nameEn: 'Burger box', nameAm: 'ቴክ አዌይ ቦክስ / የበርገር ሳጥን', price: 50, category: 'Extra',tags: ['Takeaway box'] },
  { id: 'ot7', nameEn: 'Pizza box', nameAm: 'የፒዛ ሳጥን', price: 50, category: 'Extra',tags: ['Takeaway box'] }
];

// --- COMPONENTS ---

const Header = () => (
  <header className="pt-8 pb-10 px-6 bg-[#0c0c0c] flex flex-col items-center">
    <div className="relative mb-6">
      <div className="flex items-center justify-center">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#d4af37] text-xl">👑</span>
          <div className="flex items-baseline font-black text-[#d4af37] italic select-none">
            <span className="text-5xl leading-none">K</span>
            <span className="text-2xl leading-none -ml-0.5">E</span>
          </div>
          <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-full scale-125"></div>
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
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">ALAMATA</span>
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

const CategoryNav = ({ activeCategory, onSelect }: { activeCategory: Category, onSelect: (c: Category) => void }) => (
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

const TagBadge = ({ tag }: { tag: string; key?: React.Key }) => {
  const getColors = () => {
    switch(tag) {
      case 'Spicy': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Vegetarian':
      case 'Fasting': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Meat': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Fish': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Malt': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Beer': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Takeaway box': return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
      case 'Popular': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };
  return <span className={`text-[9px] uppercase font-black px-2.5 py-1 rounded-lg border ${getColors()} tracking-wider`}>{tag}</span>;
};

const SelectionTray = ({ selectedItems, onClose }: { selectedItems: MenuItem[], onClose: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const total = selectedItems.reduce((acc, item) => acc + item.price, 0);
  
  if (selectedItems.length === 0) return null;

  return (
    <>
      {/* Detail Overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] animate-fadeIn"
          onClick={() => setIsExpanded(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 max-w-lg mx-auto bg-[#1a1a1a] rounded-t-[3rem] p-8 border-t border-white/10 shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8"></div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-[900] text-white uppercase tracking-tight">Your Order / የእርስዎ ትዕዛዝ</h2>
              <button 
                onClick={() => setIsExpanded(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white active:scale-90"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 mb-8 hide-scrollbar">
              {selectedItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-white font-bold text-lg">{item.nameEn}</p>
                    <p className="font-eth text-[#ff3d2e] font-semibold">{item.nameAm}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-xl">{item.price}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">ETB</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#ff3d2e] rounded-3xl p-6 flex justify-between items-center shadow-lg shadow-[#ff3d2e]/20">
              <div>
                <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">Total Amount</p>
                <p className="text-3xl font-black text-white">{total} <span className="text-sm">ETB</span></p>
              </div>
              <button 
                onClick={() => {
                  onClose();
                  setIsExpanded(false);
                }}
                className="bg-black text-white px-8 py-4 rounded-2xl text-xs font-black active:scale-95 shadow-xl"
              >
                RESET ALL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Tray */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none">
        <div 
          onClick={() => setIsExpanded(true)}
          className="max-w-lg mx-auto bg-[#ff3d2e] rounded-[2rem] p-5 shadow-[0_20px_50px_rgba(255,61,46,0.3)] flex items-center justify-between pointer-events-auto cursor-pointer active:scale-95 transition-all"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em]">Summary / ድምር (Tap to view)</span>
            <span className="text-2xl font-[900] text-white">{total} <span className="text-sm font-bold opacity-80">ETB</span></span>
          </div>
          <div className="flex items-center gap-4">
             <span className="bg-white text-[#ff3d2e] text-[10px] font-black px-3 py-1 rounded-full shadow-sm">{selectedItems.length} ITEMS</span>
             <div className="bg-black/20 p-2 rounded-full">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
               </svg>
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
    <div className="min-h-screen pb-40">
      <Header />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      {!searchQuery && <CategoryNav activeCategory={activeCategory} onSelect={setActiveCategory} />}

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
              className={`menu-card rounded-[1.5rem] p-6 border transition-all duration-300 active:scale-[0.98] cursor-pointer animate-item ${
                selectedIds.has(item.id) ? 'border-[#ff3d2e]/40 bg-[#ff3d2e]/5' : 'border-white/5'
              }`}
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white leading-tight mb-0.5">{item.nameEn}</h3>
                  <h4 className="font-eth text-lg text-[#ff3d2e] font-bold">{item.nameAm}</h4>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-2xl font-[900] text-white whitespace-nowrap leading-none">{item.price}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase mt-1">ETB</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {item.tags?.map(tag => <TagBadge key={tag} tag={tag} />)}
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center text-gray-700">
            <p className="font-bold uppercase tracking-widest text-xs">Dish not found</p>
          </div>
        )}
      </main>

      <SelectionTray selectedItems={selectedObjects} onClose={() => setSelectedIds(new Set())} />

      <footer className="mt-24 pt-16 pb-32 border-t border-white/5 text-center bg-[#070707]">
        <div className="mb-6 px-6">
          <p className="text-[#ff3d2e] text-xs font-black uppercase tracking-widest mb-2">For any comments & feedback</p>
          <a href="tel:+251938222226" className="text-white text-lg font-black tracking-tighter hover:text-[#ff3d2e] transition-colors">+251 938 222 226</a>
        </div>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-4 font-black">&copy; {new Date().getFullYear()} MALDYOR HOTEL</p>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
