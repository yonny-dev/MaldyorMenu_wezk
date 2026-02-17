import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';

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
  tags?: string[];
}

// --- UTILS ---
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US').format(price);
};

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
  'Fish': '🐟', 'Juice & Shakes': '🍹', 'Hot Drinks': '☕', 'Drinks': '🍺',
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
  // Soup Section
  { id: 's1', nameEn: 'Vegetable soup', nameAm: 'አትክልት ሾርባ', price: 200, category: 'Soup',tags: ['Fasting', 'Popular'] },
  { id: 's2', nameEn: 'Minestrone soup', nameAm: 'ምስር ሾርባ', price: 200, category: 'Soup', tags: ['Fasting'] },
  { id: 's3', nameEn: 'Chicken soup', nameAm: 'ዶሮ ሾርባ', price: 300, category: 'Soup' },
  { id: 's4', nameEn: 'Fish soup', nameAm: 'አሳ ሾርባ', price: 300, category: 'Soup', tags: ['Fish'] },
  { id: 's5', nameEn: 'Spinach soup', nameAm: 'ቆስጣ ሾርባ', price: 200, category: 'Soup', tags: ['Fasting'] },
  // Salad Section
  { id: 'sl1', nameEn: 'Special salad', nameAm: 'ስፔሻል ሳላድ', price: 300, category: 'Salad', tags: ['Popular'] },
  { id: 'sl2', nameEn: 'Mixed salad', nameAm: 'ሚክስድ ሳላድ', price: 250, category: 'Salad', tags: ['Fasting'] },
  { id: 'sl3', nameEn: 'Chicken salad', nameAm: 'ችክን ሳላድ', price: 350, category: 'Salad' },
  { id: 'sl4', nameEn: 'Fruit punch', nameAm: 'ፍሩት ፓንች', price: 300, category: 'Salad', tags: ['Fasting'] },
  // Traditional Food Section
  { id: 't1', nameEn: 'Lamp tibs', nameAm: 'የበግ ጥብስ', price: 500, category: 'Traditional Food', tags: ['Meat','Popular'] },
  { id: 't2', nameEn: 'Beef tibs', nameAm: 'የበሬ ስጋ ጥብስ', price: 450, category: 'Traditional Food', tags: ['Meat'] },
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
  { id: 'hd8', nameEn: 'Peanut tea', nameAm: 'የለውዝ ሻይ', price: 60, category: 'Hot Drinks' },
  { id: 'hd9', nameEn: 'Milk with coffee', nameAm: 'ወተት በቡና', price: 70, category: 'Hot Drinks' },
  { id: 'hd10', nameEn: 'Mango tea', nameAm: 'ማንጎ ሻይ', price: 60, category: 'Hot Drinks' },
  { id: 'hd11', nameEn: 'Hot chocolate', nameAm: 'ሆት ቸኮሌት', price: 80, category: 'Hot Drinks' },
  { id: 'hd12', nameEn: 'Ginger Tea', nameAm: 'ቀሽር ሻይ', price: 50, category: 'Hot Drinks' },
  { id: 'hd13', nameEn: 'Ice tea', nameAm: 'የበረዶ ሻይ', price: 60, category: 'Hot Drinks' },
  { id: 'hd14', nameEn: 'Ice coffee', nameAm: 'የበረዶ ቡና', price: 70, category: 'Hot Drinks' },
  { id: 'hd15', nameEn: 'Ice milk', nameAm: 'የበረዶ ወተት', price: 80, category: 'Hot Drinks' },
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
  { id: 'dr12', nameEn: 'Guder small', nameAm: 'ጉደር (ትንሽ)', price: 300, category: 'Drinks',tags: ['Wine'] },
  { id: 'dr13', nameEn: 'Guder big', nameAm: 'ጉደር (ትልቅ)', price: 600, category: 'Drinks',tags: ['Wine'] },
  { id: 'dr14', nameEn: 'Awash', nameAm: 'አዋሽ', price: 600, category: 'Drinks',tags: ['Wine'] },
  { id: 'dr15', nameEn: 'Axumite', nameAm: 'አክሱማይት', price: 1000, category: 'Drinks',tags: ['Wine'] },
  { id: 'dr16', nameEn: 'Awash Tekeshno', nameAm: 'አዋሽ ተከሽኖ', price: 800, category: 'Drinks' },
  { id: 'dr17', nameEn: 'Kemila', nameAm: 'ከሚላ', price: 1000, category: 'Drinks',tags: ['Wine'] },
  { id: 'dr18', nameEn: 'Acacia', nameAm: 'አካሲያ', price: 1700, category: 'Drinks',tags: ['Wine'] },
  { id: 'dr19', nameEn: 'Rift valley', nameAm: 'ሪፍት ቫሊ', price: 1700, category: 'Drinks',tags: ['Wine'] },
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

// Fix: Typing Tag as React.FC to handle React-standard props like 'key' in list renderings
const Tag: React.FC<{ text: string }> = ({ text }) => {
  const isFasting = text === 'Fasting';
  const isMeat = text === 'Meat';
  const isPopular = text === 'Popular';
  const isMalt = text === 'Malt';
  const isBeer = text === 'Beer';
  const isAgeRelated = text.includes('Years-old');
  const isRoomOnly = text.includes('room customer');
  const isTakeaway = text.includes('Takeaway');

  let colors = 'text-gray-500 border-white/10';
  if (isFasting) colors = 'text-green-500 border-green-500/20 bg-green-500/5';
  if (isMeat) colors = 'text-orange-500 border-orange-500/20 bg-orange-500/5';
  if (isPopular) colors = 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5';
  if (isMalt || isBeer) colors = 'text-blue-400 border-blue-400/20 bg-blue-400/5';
  if (isAgeRelated) colors = 'text-purple-400 border-purple-400/20 bg-purple-400/5';
  if (isRoomOnly) colors = 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5';
  if (isTakeaway) colors = 'text-pink-400 border-pink-400/20 bg-pink-400/5';
  
  return (
    <span className={`text-[8px] uppercase font-black px-1.5 py-0.5 rounded-lg border tracking-wider flex items-center gap-1 ${colors}`}>
      {isPopular && '⭐'} {text}
    </span>
  );
};

const Header = () => (
  <header className="pt-10 md:pt-16 pb-8 md:pb-12 px-6 bg-[#0c0c0c] flex flex-col items-center">
    <div className="relative mb-6 md:mb-10">
      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative">
        <span className="absolute -top-2 md:-top-3 text-[#d4af37] text-base md:text-xl animate-bounce">👑</span>
        <div className="font-black text-[#d4af37] italic flex items-baseline select-none">
          <span className="text-3xl md:text-5xl leading-none">K</span>
          <span className="text-lg md:text-2xl leading-none -ml-1">E</span>
        </div>
        <div className="absolute inset-0 border border-[#d4af37]/30 rounded-full scale-125 md:scale-150 animate-pulse"></div>
      </div>
    </div>
    <div className="text-center">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter text-[#ff3d2e] uppercase leading-none mb-1 md:mb-2">MALDYOR HOTEL</h1>
      <h2 className="font-eth text-lg md:text-2xl lg:text-3xl font-black text-[#ff3d2e] tracking-tight leading-tight">ማልድዮር ሆቴል</h2>
      <div className="mt-3 md:mt-6 flex items-center justify-center gap-3 md:gap-5">
        <span className="h-px w-8 md:w-12 bg-[#ff3d2e]/30"></span>
        <span className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold">ALAMATA</span>
        <span className="h-px w-8 md:w-12 bg-[#ff3d2e]/30"></span>
      </div>
    </div>
  </header>
);

const App = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleItem = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    return MENU_ITEMS.filter(item => {
      const match = item.nameEn.toLowerCase().includes(q) || item.nameAm.toLowerCase().includes(q);
      return q ? match : item.category === activeCategory;
    });
  }, [activeCategory, search]);

  const selectedObjects = useMemo(() => 
    MENU_ITEMS.filter(item => selectedIds.has(item.id)),
    [selectedIds]
  );

  const selectedCount = selectedIds.size;
  const totalPrice = selectedObjects.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex flex-col items-center pb-32">
      {/* Root Layout Container */}
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        {/* SEARCH BAR */}
        <div className="flex justify-center mb-8">
          <div className="relative group w-full max-w-xl">
            <input 
              type="text" 
              placeholder="Search dishes... / ምግቦችን ይፈልጉ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-11 md:pl-14 pr-10 text-[11px] md:text-sm text-white focus:outline-none focus:border-[#ff3d2e]/50 transition-all placeholder:text-gray-700 shadow-2xl"
            />
            <svg className="w-4 h-4 md:w-5 md:h-5 absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#ff3d2e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY NAV */}
        {!search && (
          <nav className="sticky top-0 z-50 sticky-nav py-4 md:py-6 px-4 border-b border-white/5 overflow-x-auto hide-scrollbar flex gap-2.5 md:gap-4 md:justify-center shadow-2xl">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-4 py-2.5 md:px-6 md:py-3.5 rounded-xl whitespace-nowrap text-[9px] md:text-[11px] font-black transition-all duration-300 transform flex items-center gap-1.5 md:gap-2 ${
                  activeCategory === cat ? 'bg-[#ff3d2e] text-white shadow-lg shadow-[#ff3d2e]/20 -translate-y-0.5' : 'bg-white/5 text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className="text-xs md:text-sm">{CATEGORY_EMOJIS[cat]}</span>
                {cat.toUpperCase()}
              </button>
            ))}
          </nav>
        )}

        {/* MENU LIST GRID */}
        <main className="mt-8 md:mt-12">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2 md:gap-3">
              {!search && <span className="opacity-80 text-base md:text-2xl">{CATEGORY_EMOJIS[activeCategory]}</span>}
              {search ? 'Search' : activeCategory}
            </h2>
            <span className="text-gray-700 text-[8px] md:text-[10px] font-black bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg md:rounded-xl uppercase tracking-widest">{filteredItems.length} items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => toggleItem(item.id)}
                className={`menu-card rounded-[1.8rem] md:rounded-[2.2rem] p-5 md:p-6 border transition-all duration-300 active:scale-[0.98] cursor-pointer animate-item flex flex-col gap-3.5 md:gap-5 h-full ${
                  selectedIds.has(item.id) ? 'border-[#ff3d2e]/40 bg-[#ff3d2e]/5 shadow-[0_10px_30px_rgba(255,61,46,0.15)]' : 'border-white/5'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm md:text-base font-black text-white leading-tight mb-0.5">{item.nameEn}</h3>
                    <h4 className="font-eth text-sm md:text-base text-[#ff3d2e] font-black tracking-tight">{item.nameAm}</h4>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xl md:text-2xl font-[1000] text-white tracking-tighter leading-none">{formatPrice(item.price)}</span>
                    <span className="text-[8px] font-black text-gray-600 uppercase mt-1 tracking-widest">ETB</span>
                  </div>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2">
                    {item.tags.map(t => <Tag key={t} text={t} />)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-24 text-center">
              <div className="text-4xl md:text-6xl mb-4 grayscale opacity-40 animate-pulse">🍽️</div>
              <p className="text-gray-700 font-black uppercase tracking-widest text-[10px] md:text-xs">No results matching your search</p>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="mt-24 md:mt-32 pt-16 md:pt-24 pb-32 border-t border-white/5 bg-[#070707] rounded-t-[3rem] md:rounded-t-[4rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-4xl mx-auto px-6 mb-20">
            <div className="text-center md:text-left flex flex-col justify-center">
              <p className="text-[#ff3d2e] text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-3 opacity-70">Comments & Feedback</p>
              <a href="tel:+251938222226" className="inline-block text-white text-xl md:text-3xl font-[1000] tracking-tighter hover:text-[#ff3d2e] transition-colors active:scale-95">
                +251 938 222 226
              </a>
            </div>

            <div className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white/[0.04] border border-white/10 shadow-2xl relative overflow-hidden group text-center">
              <p className="text-[#5c7cfa] text-[8px] md:text-[10px] font-black tracking-[0.5em] mb-3 uppercase opacity-80">Tech Partner</p>
              <h5 className="text-white text-base md:text-lg font-[1000] mb-2 tracking-tighter">WEZK TECHNOLOGIES</h5>
              <div className="space-y-1.5 mb-8">
                <p className="text-gray-400 text-[10px] font-medium italic opacity-90">"If you want any websites contact Us"</p>
                <p className="font-eth text-gray-500 text-[10px] font-medium italic">"ማንኛውንም ድረ-ገጽ ከፈለጉ እኛን ያነጋግሩን"</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a href="https://t.me/yonnyw7" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-3 py-3 rounded-xl text-[9px] font-black text-white hover:bg-[#5c7cfa] transition-all active:scale-90 uppercase">Telegram</a>
                <a href="tel:+251938007979" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-3 py-3 rounded-xl text-[9px] font-black text-white hover:bg-white/10 transition-all active:scale-90 uppercase">Contact</a>
              </div>
            </div>
          </div>

          <p className="text-gray-800 text-[8px] md:text-[10px] font-black text-center uppercase tracking-[0.6em]">&copy; {new Date().getFullYear()} MALDYOR HOTEL</p>
        </footer>
      </div>

      {/* CART MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[120] animate-fade flex items-end md:items-center justify-center" onClick={() => setIsCartOpen(false)}>
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl"></div>
          <div className="absolute bottom-0 md:relative md:bottom-auto left-0 right-0 md:left-auto md:right-auto w-full md:max-w-2xl bg-[#1a1a1a] rounded-t-[2.5rem] md:rounded-[3rem] border-t md:border border-white/10 shadow-2xl p-6 md:p-10 pb-10 animate-item max-h-[85vh] md:max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-6 md:hidden"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">Your Selection</h3>
              <button onClick={() => setIsCartOpen(false)} className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors active:scale-90">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 hide-scrollbar mb-6">
              {selectedObjects.map(item => (
                <div key={item.id} className="flex justify-between items-center group bg-white/5 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-transparent hover:border-white/5 transition-colors">
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm md:text-base leading-tight">{item.nameEn}</p>
                    <p className="font-eth text-[#ff3d2e] font-semibold text-[11px] md:text-sm">{item.nameAm}</p>
                  </div>
                  <div className="flex items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <p className="text-white font-black text-sm md:text-lg">{formatPrice(item.price)}</p>
                      <p className="text-[8px] md:text-[9px] text-gray-500 font-bold uppercase tracking-widest">ETB</p>
                    </div>
                    <button onClick={() => toggleItem(item.id)} className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-lg md:rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors active:scale-90">
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#ff3d2e] rounded-[1.8rem] md:rounded-[2.5rem] p-5 md:p-8 flex justify-between items-center shadow-[0_15px_30px_rgba(255,61,46,0.2)]">
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[10px] font-black text-white/60 uppercase tracking-widest mb-0.5">Total Amount</span>
                <span className="text-xl md:text-3xl font-[1000] text-white tracking-tighter">{formatPrice(totalPrice)} <span className="text-xs md:text-base font-bold">ETB</span></span>
              </div>
              <button onClick={() => { setSelectedIds(new Set()); setIsCartOpen(false); }} className="bg-black text-white px-5 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-xs font-black uppercase tracking-widest active:scale-95 shadow-xl transition-transform hover:scale-105">
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUMMARY TRAY (Floating Center) */}
      {selectedCount > 0 && !isCartOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-5 md:p-8 pointer-events-none animate-fade flex justify-center">
          <div 
            onClick={() => setIsCartOpen(true)}
            className="w-full max-w-[340px] md:max-w-[420px] bg-[#ff3d2e] rounded-[2rem] md:rounded-[3rem] p-5 md:p-6 shadow-[0_20px_50px_rgba(255,61,46,0.4)] flex items-center justify-between pointer-events-auto active:scale-95 transition-all cursor-pointer group hover:bg-[#ff4f40]"
          >
            <div className="flex flex-col">
              <span className="text-[8px] md:text-[10px] font-black text-white/60 uppercase tracking-widest mb-0.5">Selection Total</span>
              <span className="text-xl md:text-3xl font-[1000] text-white tracking-tighter">{formatPrice(totalPrice)} <span className="text-xs md:text-base font-bold opacity-80">ETB</span></span>
            </div>
            <div className="flex items-center gap-3 md:gap-5">
               <span className="bg-black/20 text-white text-[8px] md:text-[10px] font-black px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border border-white/10 group-hover:bg-black/30 transition-colors">
                {selectedCount} {selectedCount === 1 ? 'ITEM' : 'ITEMS'}
               </span>
               <div className="bg-white/20 p-2 md:p-3 rounded-full group-hover:bg-white/30 transition-colors">
                 <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
               </div>
            </div>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
