import { MenuItem, Category } from './types';

export const CATEGORIES: Category[] = [
  'Breakfast',
  'Soup',
  'Salad',
  'Traditional Food',
  'Spaghetti / Rice / Maccoroni',
  'Sandwich',
  'Rap',
  'Stake',
  'Curry',
  'Chicken',
  'Pizza',
  'Burger',
  'Fish',
  'Juice & Shakes',
  'Hot Drinks',
  'Drinks',
  'Alcohol Drinks(Bottle)',
  'Continental Breakfast',
  'Extra'
];

export const MENU_ITEMS: MenuItem[] = [
  // Page 2: Breakfast
  { id: 'b1', nameEn: 'Scramble egg', nameAm: 'እንቁላል ፍርፍር', price: 250, category: 'Breakfast' },
  { id: 'b2', nameEn: 'Omlet', nameAm: 'ኦምሌት', price: 250, category: 'Breakfast' },
  { id: 'b3', nameEn: 'French toast', nameAm: 'ፍሬንች ቶስት', price: 250, category: 'Breakfast' },
  { id: 'b4', nameEn: 'Fasting firfer', nameAm: 'የፆም ፍርፍር', price: 250, category: 'Breakfast', tags: ['Vegetarian'] },
  { id: 'b5', nameEn: 'Egg Sandwich', nameAm: 'እንቁላል ሳንዱች', price: 250, category: 'Breakfast' },
  { id: 'b6', nameEn: 'Egg with meat', nameAm: 'እንቁላል በስጋ', price: 400, category: 'Breakfast', tags: ['Meat'] },
  { id: 'b7', nameEn: 'Chechebsa', nameAm: 'ጨጨብሳ በማር', price: 250, category: 'Breakfast', tags: ['Popular'] },
  { id: 'b8', nameEn: 'Chechebsa', nameAm: 'ጨጨብሳ በእንቁላል', price: 300, category: 'Breakfast' },
  { id: 'b9', nameEn: 'Fetira with honey', nameAm: 'ፈጢራ በማር', price: 250, category: 'Breakfast' },
  { id: 'b10', nameEn: 'Fetira with egg', nameAm: 'ፈጢራ በእንቁላል በማር', price: 300, category: 'Breakfast' },
  { id: 'b11', nameEn: 'Tibis Firfer', nameAm: 'ጥብስ ፍርፍር', price: 450, category: 'Breakfast', tags: ['Meat'] },
  { id: 'b12', nameEn: 'Quanta firfer', nameAm: 'ቋንጣ ፍርፍር', price: 500, category: 'Breakfast', tags: ['Meat', 'Popular'] },
  { id: 'b13', nameEn: 'Meat firfer', nameAm: 'ስጋ ፍርፍር', price: 350, category: 'Breakfast', tags: ['Meat'] },
  { id: 'b14', nameEn: 'Bread firfer', nameAm: 'ዳቦ ፍርፍር', price: 200, category: 'Breakfast' },

  // Soup Section (Standalone Category)
  { id: 's1', nameEn: 'Vegetable soup', nameAm: 'አትክልት ሾርባ', price: 200, category: 'Soup', tags: ['Vegetarian'] },
  { id: 's2', nameEn: 'Ministroni soup', nameAm: 'ምስር ሾርባ', price: 200, category: 'Soup' },
  { id: 's3', nameEn: 'Chicken soup', nameAm: 'ዶሮ ሾርባ', price: 250, category: 'Soup' },
  { id: 's4', nameEn: 'Fish soup', nameAm: 'አሳ ሾርባ', price: 250, category: 'Soup', tags: ['Fish'] },
  { id: 's5', nameEn: 'Spinach soup', nameAm: 'ቆስጣ ሾርባ', price: 200, category: 'Soup', tags: ['Vegetarian'] },

  // Salad Section (Standalone Category)
  { id: 'sl1', nameEn: 'Special salad', nameAm: 'ስፔሻል ሳላድ', price: 300, category: 'Salad', tags: ['Popular'] },
  { id: 'sl2', nameEn: 'Mixed salad', nameAm: 'ሚክስድ ሳላድ', price: 250, category: 'Salad' },
  { id: 'sl3', nameEn: 'Chicken salad', nameAm: 'ችክን ሳላድ', price: 350, category: 'Salad' },
  { id: 'sl4', nameEn: 'Fruit punch', nameAm: 'ፍሩት ፓንች', price: 300, category: 'Salad' },

  // Traditional Food Section
  { id: 't1', nameEn: 'Lamp Tibis', nameAm: 'የበግ ጥብስ', price: 500, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't2', nameEn: 'Beef tibs', nameAm: 'ቢፍ ጥብስ', price: 450, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't3', nameEn: 'Chikena Tibs', nameAm: 'ጭቅና ጥብስ', price: 500, category: 'Traditional Food', tags: ['Meat', 'Popular'] },
  { id: 't4', nameEn: 'Derek tibs', nameAm: 'ደረቅ ጥብስ', price: 600, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't5', nameEn: 'Combo', nameAm: 'የፍስግ ኮምቦ', price: 1000, category: 'Traditional Food', tags: ['Meat', 'Popular'] },
  { id: 't6', nameEn: 'Kitfo', nameAm: 'ክትፎ', price: 600, category: 'Traditional Food', tags: ['Meat', 'Popular'] },
  { id: 't7', nameEn: 'Shekla tibs', nameAm: 'ሸክላ ጥብስ', price: 600, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't8', nameEn: 'Dulet', nameAm: 'ዱለት', price: 250, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't9', nameEn: 'Tegabino', nameAm: 'ተጋቢኖ', price: 300, category: 'Traditional Food', tags: ['Vegetarian'] },
  { id: 't10', nameEn: 'Shiro', nameAm: 'ሽሮ', price: 250, category: 'Traditional Food', tags: ['Vegetarian'] },
  { id: 't11', nameEn: 'Bozena shiro', nameAm: 'ቦዘና ሽሮ', price: 350, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't12', nameEn: 'Misr bedsit', nameAm: 'ምስር በድስት', price: 300, category: 'Traditional Food', tags: ['Vegetarian'] },
  { id: 't13', nameEn: 'Miser Besga', nameAm: 'ምስር በስጋ', price: 350, category: 'Traditional Food', tags: ['Meat'] },
  { id: 't14', nameEn: 'Fasting combo', nameAm: 'የፆም ኮምቦ', price: 500, category: 'Traditional Food', tags: ['Vegetarian'] },
  { id: 't15', nameEn: 'Suf fitft', nameAm: 'ሱፍ ፍትፍት', price: 200, category: 'Traditional Food', tags: ['Vegetarian'] },
  { id: 't16', nameEn: 'Selit fift', nameAm: 'ሰሊጥ ፍትፍት', price: 200, category: 'Traditional Food', tags: ['Vegetarian'] },

  // Spaghetti / Rice / Maccoroni Section
  { id: 'pr1', nameEn: 'Spaghetti with tomatto', nameAm: 'ፓስታ በቲማቲም', price: 250, category: 'Spaghetti / Rice / Maccoroni' },
  { id: 'pr2', nameEn: 'Spaghetti with meat', nameAm: 'ፓስታ በስጋ', price: 350, category: 'Spaghetti / Rice / Maccoroni', tags: ['Meat'] },
  { id: 'pr3', nameEn: 'Spaghetti with vegetable', nameAm: 'ፓስታ በአትክልት', price: 250, category: 'Spaghetti / Rice / Maccoroni', tags: ['Vegetarian'] },
  { id: 'pr4', nameEn: 'Rice with tomatto', nameAm: 'ሩዝ በቲማቲም', price: 250, category: 'Spaghetti / Rice / Maccoroni' },
  { id: 'pr5', nameEn: 'Rice with meat', nameAm: 'ሩዝ በስጋ', price: 350, category: 'Spaghetti / Rice / Maccoroni', tags: ['Meat'] },
  { id: 'pr6', nameEn: 'Rice with vegetable', nameAm: 'ሩዝ በአትክልት', price: 250, category: 'Spaghetti / Rice / Maccoroni', tags: ['Vegetarian'] },

  // Sandwich Category
  { id: 'sw1', nameEn: 'Egg sandwich', nameAm: 'እንቁላል ሳንዱች', price: 250, category: 'Sandwich' },
  { id: 'sw2', nameEn: 'Club sandwich', nameAm: 'ክለብ ሳንዱች', price: 400, category: 'Sandwich', tags: ['Popular'] },
  { id: 'sw3', nameEn: 'Fish sandwich', nameAm: 'አሳ ሳንዱች', price: 450, category: 'Sandwich', tags: ['Fish'] },
  { id: 'sw4', nameEn: 'Chicken sandwich', nameAm: 'ዶሮ ሳንዱች', price: 450, category: 'Sandwich' },
  { id: 'sw5', nameEn: 'French fries', nameAm: 'ችብስ', price: 250, category: 'Sandwich', tags: ['Vegetarian'] },

  // Rap Category
  { id: 'rp1', nameEn: 'Chicken rap', nameAm: 'ችክን ራፕ', price: 450, category: 'Rap' },
  { id: 'rp2', nameEn: 'Beef rap', nameAm: 'ቢፍ ራፕ', price: 400, category: 'Rap', tags: ['Meat'] },
  { id: 'rp3', nameEn: 'Vegetable rap', nameAm: 'ቬጅቴብል ራፕ', price: 300, category: 'Rap', tags: ['Vegetarian'] },

  // Stake Category
  { id: 'st1', nameEn: 'Grilled stake', nameAm: 'ግሪል ስቴክ', price: 500, category: 'Stake' },
  { id: 'st2', nameEn: 'Stake albismark', nameAm: 'ስቴክ አልቢስማርክ', price: 500, category: 'Stake' },
  { id: 'st3', nameEn: 'Grilled chicken', nameAm: 'ግሪል ችክን', price: 500, category: 'Stake' },

  // Curry Category
  { id: 'cy1', nameEn: 'Lamb curry', nameAm: 'ላምብ ኬሪ', price: 550, category: 'Curry', tags: ['Meat'] },
  { id: 'cy2', nameEn: 'Beef curry', nameAm: 'ቢፍ ኬሪ', price: 500, category: 'Curry', tags: ['Meat'] },
  { id: 'cy3', nameEn: 'Chicken curry', nameAm: 'ችክን ኬሪ', price: 550, category: 'Curry' },
  { id: 'cy4', nameEn: 'Chicken tender', nameAm: 'ችክን ቴንደር', price: 550, category: 'Curry' },
  { id: 'cy5', nameEn: 'Stir fried fish', nameAm: 'ስቲር ፍራይድ ፊሽ', price: 550, category: 'Curry', tags: ['Fish'] },
  { id: 'cy6', nameEn: 'Stir fried beef', nameAm: 'ስቲር ፍራይድ ቢፍ', price: 550, category: 'Curry', tags: ['Meat'] },
  { id: 'cy7', nameEn: 'Stir fried chicken', nameAm: 'ስቲር ፍራይድ ችክን', price: 550, category: 'Curry' },

  // Chicken Category
  { id: 'ch1', nameEn: 'Chicken brust', nameAm: 'ችክን ብረስት', price: 550, category: 'Chicken' },
  { id: 'ch2', nameEn: 'Chicken leg', nameAm: 'ችክን ሌግ', price: 450, category: 'Chicken' },
  { id: 'ch3', nameEn: 'Chicken roast full', nameAm: 'ሙሉ ዶሮ', price: 2400, category: 'Chicken', tags: ['Popular'] },
  { id: 'ch4', nameEn: 'Half chicken roast', nameAm: 'ግማሽ ዶሮ', price: 1200, category: 'Chicken' },

  // Pizza Category
  { id: 'pz6', nameEn: 'Maldyor special Pizza', nameAm: 'ማልድዮር ስፔሻል ፒዛ', price: 600, category: 'Pizza', tags: ['Popular'] },
  { id: 'pz1', nameEn: 'Beef pizza', nameAm: 'ቢፍ ፒዛ', price: 450, category: 'Pizza', tags: ['Meat'] },
  { id: 'pz2', nameEn: 'Margarita pizza', nameAm: 'ማርጋሪታ ፒዛ', price: 550, category: 'Pizza', tags: ['Vegetarian'] },
  { id: 'pz3', nameEn: 'Vegetable Pizza', nameAm: 'አትክልት ፒዛ', price: 400, category: 'Pizza', tags: ['Vegetarian'] },
  { id: 'pz4', nameEn: 'Tuna Pizza', nameAm: 'ቱና ፒዛ', price: 550, category: 'Pizza', tags: ['Fish'] },
  { id: 'pz5', nameEn: 'Chicken pizza', nameAm: 'ችክን ፒዛ', price: 550, category: 'Pizza' },

  // Burger Category
  { id: 'bg1', nameEn: 'Beef Burger', nameAm: 'ቢፍ በርገር', price: 450, category: 'Burger', tags: ['Meat'] },
  { id: 'bg2', nameEn: 'Cheese Burger', nameAm: 'ችዝ በርገር', price: 500, category: 'Burger', tags: ['Meat', 'Popular'] },
  { id: 'bg3', nameEn: 'Double Burger', nameAm: 'ደብል በርገር', price: 850, category: 'Burger', tags: ['Meat'] },
  { id: 'bg4', nameEn: 'Special Burger', nameAm: 'ስፔሻል በርገር', price: 600, category: 'Burger', tags: ['Popular'] },

  // Fish Category
  { id: 'fs1', nameEn: 'Fish goulash', nameAm: 'አሳ ጉላሽ', price: 500, category: 'Fish', tags: ['Fish'] },
  { id: 'fs2', nameEn: 'Fish wet', nameAm: 'አሳ ወጥ', price: 450, category: 'Fish', tags: ['Fish'] },
  { id: 'fs3', nameEn: 'Fried fish', nameAm: 'ፍራይድ ፊሽ', price: 500, category: 'Fish', tags: ['Fish', 'Popular'] },
  { id: 'fs4', nameEn: 'Fish cutlet', nameAm: 'አሳ ኮተሌት', price: 500, category: 'Fish', tags: ['Fish'] },

  // Juice & Shakes
  { id: 'ju1', nameEn: 'Mango juice', nameAm: 'ማንጎ ጁስ', price: 200, category: 'Juice & Shakes' },
  { id: 'ju2', nameEn: 'Avocado juice', nameAm: 'አቮካዶ ጁስ', price: 200, category: 'Juice & Shakes' },
  { id: 'ju3', nameEn: 'Papaya juice', nameAm: 'ፓፓያ ጁስ', price: 200, category: 'Juice & Shakes' },
  { id: 'ju4', nameEn: 'Spris juice', nameAm: 'ስፕሪሰ ጁስ', price: 200, category: 'Juice & Shakes' },
  { id: 'ju5', nameEn: 'Water Millon juice', nameAm: 'ሃብሃብ ጁስ', price: 200, category: 'Juice & Shakes' },
  { id: 'ju6', nameEn: 'Special juice', nameAm: 'ስፔሻል ጁስ', price: 300, category: 'Juice & Shakes', tags: ['Popular'] },
  { id: 'sh1', nameEn: 'Avocado shake', nameAm: 'አቨካዶ ሼክ', price: 300, category: 'Juice & Shakes' },
  { id: 'sh2', nameEn: 'Mango shake', nameAm: 'ማንጎ ሼክ', price: 300, category: 'Juice & Shakes' },
  { id: 'sh3', nameEn: 'Banana shake', nameAm: 'ሙዝ ሼክ', price: 300, category: 'Juice & Shakes' },
  { id: 'sh4', nameEn: 'Papaya shake', nameAm: 'ፓፓያ ሼክ', price: 300, category: 'Juice & Shakes' },

  // Hot Drinks
  { id: 'hd1', nameEn: 'Tea', nameAm: 'ሻይ', price: 40, category: 'Hot Drinks' },
  { id: 'hd2', nameEn: 'Coffee', nameAm: 'ቡና', price: 60, category: 'Hot Drinks' },
  { id: 'hd3', nameEn: 'Spris', nameAm: 'ስፕሪስ', price: 60, category: 'Hot Drinks' },
  { id: 'hd4', nameEn: 'Makiato', nameAm: 'ማኪያቶ', price: 60, category: 'Hot Drinks' },
  { id: 'hd5', nameEn: 'Special tea', nameAm: 'ስፔሻል ሻይ', price: 70, category: 'Hot Drinks' },
  { id: 'hd6', nameEn: 'Orange tea', nameAm: 'ብርቱካን ሻይ', price: 60, category: 'Hot Drinks' },
  { id: 'hd7', nameEn: 'Milk', nameAm: 'ወተት', price: 70, category: 'Hot Drinks' },
  { id: 'hd8', nameEn: 'Lewz', nameAm: 'ለውዝ', price: 60, category: 'Hot Drinks' },
  { id: 'hd9', nameEn: 'Milk with coffee', nameAm: 'ወተት በቡና', price: 70, category: 'Hot Drinks' },
  { id: 'hd10', nameEn: 'Mango tea', nameAm: 'ማንጎ ሻይ', price: 60, category: 'Hot Drinks' },
  { id: 'hd11', nameEn: 'Hot chocolate', nameAm: 'ሆት ቸኮሌት', price: 80, category: 'Hot Drinks' },
  { id: 'hd12', nameEn: 'Keshir', nameAm: 'ቀሽር', price: 50, category: 'Hot Drinks' },
  { id: 'hd13', nameEn: 'Ice tea', nameAm: 'አይስ ቲ', price: 60, category: 'Hot Drinks' },
  { id: 'hd14', nameEn: 'Ice coffee', nameAm: 'አይስ ኮፊ', price: 70, category: 'Hot Drinks' },
  { id: 'hd15', nameEn: 'Ice milk', nameAm: 'አይስ ሚልክ', price: 80, category: 'Hot Drinks' },

  // Drinks
  { id: 'dr1', nameEn: '0.5 litter water', nameAm: '0.5 ሊትር ውሃ', price: 30, category: 'Drinks' },
  { id: 'dr2', nameEn: '1 litter water', nameAm: '1 ሊትር ውሃ', price: 50, category: 'Drinks' },
  { id: 'dr3', nameEn: '2 litter water', nameAm: '2 ሊትር ውሃ', price: 60, category: 'Drinks' },
  { id: 'dr4', nameEn: 'Soft drinks', nameAm: 'ለስላሳ መጠጦች', price: 50, category: 'Drinks' },
  { id: 'dr5', nameEn: 'Ambo water', nameAm: 'አምቦ ውሃ', price: 50, category: 'Drinks' },
  { id: 'dr6', nameEn: 'Nigus malt', nameAm: 'ንጉስ ማልት', price: 90, category: 'Drinks' },
  { id: 'dr7', nameEn: 'Sinq malt', nameAm: 'ስንቅ ማልት', price: 90, category: 'Drinks' },
  { id: 'dr8', nameEn: 'Sofi malt', nameAm: 'ሶፊ ማልት', price: 90, category: 'Drinks' },
  { id: 'dr9', nameEn: 'Beer', nameAm: 'ቢራ', price: 100, category: 'Drinks' },
  { id: 'dr10', nameEn: 'Heiniken', nameAm: 'ሃይኒከን', price: 120, category: 'Drinks' },
  { id: 'dr11', nameEn: 'Bedele special', nameAm: 'በደሌ ስፔሻል', price: 120, category: 'Drinks' },
  { id: 'dr12', nameEn: 'Guder small', nameAm: 'ጉደር (ትንሽ)', price: 300, category: 'Drinks' },
  { id: 'dr13', nameEn: 'Guder big', nameAm: 'ጉደር (ትልቅ)', price: 600, category: 'Drinks' },
  { id: 'dr14', nameEn: 'Awash', nameAm: 'አዋሽ', price: 600, category: 'Drinks' },
  { id: 'dr15', nameEn: 'Axumite', nameAm: 'አክሱማይት', price: 1000, category: 'Drinks' },
  { id: 'dr16', nameEn: 'Awash mixed', nameAm: 'አዋሽ ሚክስድ', price: 600, category: 'Drinks' },
  { id: 'dr17', nameEn: 'Kemila', nameAm: 'ከሚላ', price: 1000, category: 'Drinks' },
  { id: 'dr18', nameEn: 'Acacia', nameAm: 'አካሲያ', price: 1700, category: 'Drinks' },
  { id: 'dr19', nameEn: 'Rift valley', nameAm: 'ሪፍት ቫሊ', price: 1700, category: 'Drinks' },

  // Alcohol Drinks(Bottle)
  { id: 'ab1', nameEn: 'Champagne', nameAm: 'ሻምፓኝ', price: 10000, category: 'Alcohol Drinks(Bottle)', tags: ['Popular'] },
  { id: 'ab2', nameEn: 'Tekila', nameAm: 'ተኪላ', price: 12000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab3', nameEn: 'Stolchinia vodka (0.3 L)', nameAm: 'ስቶልችኒያ ቮድካ (0.3 ሊ)', price: 4000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab4', nameEn: 'Stolchinia vodka (0.5 L)', nameAm: 'ስቶልችኒያ ቮድካ (0.5 ሊ)', price: 6000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab5', nameEn: 'Stolchinia vodka (0.75 L)', nameAm: 'ስቶልችኒያ ቮድካ (0.75 ሊ)', price: 7000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab6', nameEn: 'Stolchinia vodka (1 L)', nameAm: 'ስቶልችኒያ ቮድካ (1 ሊ)', price: 9000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab7', nameEn: 'Absolute vodka bottle', nameAm: 'አብሰሉት ቮድካ', price: 10000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab8', nameEn: 'Malibu', nameAm: 'ማሊቡ', price: 10000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab9', nameEn: 'Winter palace', nameAm: 'ዊንተር ፓላስ', price: 9000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab10', nameEn: 'Black label bottle', nameAm: 'ብላክ ሌብል ጠርሙስ', price: 15000, category: 'Alcohol Drinks(Bottle)', tags: ['Popular'] },
  { id: 'ab11', nameEn: 'Double black label', nameAm: 'ደብል ብላክ ሌብል', price: 20000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab12', nameEn: 'Gold label', nameAm: 'ጎልድ ሌብል', price: 20000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab13', nameEn: 'Chivas bottle', nameAm: 'ቺቫስ', price: 15000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab14', nameEn: 'Amarula', nameAm: 'አማሩላ', price: 10000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab15', nameEn: 'Glenffidich 15', nameAm: 'ግሌንፊዲክ 15', price: 20000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab16', nameEn: 'Glenffidich 18', nameAm: 'ግሌንፊዲክ 18', price: 25000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab17', nameEn: 'Hennessy', nameAm: 'ሄነሲ', price: 20000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab18', nameEn: 'Jack Daniel', nameAm: 'ጃክ ዳንኤል', price: 15000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab19', nameEn: 'XO Cognac', nameAm: 'ኤክስኦ ኮኛክ', price: 50000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab20', nameEn: 'Gorden dry gin', nameAm: 'ጎርደን ድራይ ጂን', price: 1000, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab21', nameEn: 'Tekila cc', nameAm: 'ተኪላ በሲሲ', price: 350, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab22', nameEn: 'Double black (cc)', nameAm: 'ደብል ብላክ በሲሲ', price: 400, category: 'Alcohol Drinks(Bottle)' },
  { id: 'ab23', nameEn: 'Gorden dry gin (cc)', nameAm: 'ጎርደን ድራይ ጂን በሲሲ', price: 250, category: 'Alcohol Drinks(Bottle)' },

  // Continental Breakfast
  { id: 'cb1', nameEn: 'Egg scrambled', nameAm: 'እንቁላል ፍርፍር', price: 250, category: 'Continental Breakfast' },
  { id: 'cb2', nameEn: 'Omelet', nameAm: 'ኦምሌት', price: 250, category: 'Continental Breakfast' },
  { id: 'cb3', nameEn: 'French toast', nameAm: 'ፍሬንች ቶስት', price: 250, category: 'Continental Breakfast' },
  { id: 'cb4', nameEn: 'Enjera firifir', nameAm: 'እንጀራ ፍርፍር', price: 250, category: 'Continental Breakfast' },
  { id: 'cb5', nameEn: 'Egg sandwich', nameAm: 'እንቁላል ሳንዱች', price: 250, category: 'Continental Breakfast' },
  { id: 'cb6', nameEn: 'Vegetable sandwich', nameAm: 'አትክልት ሳንዱች', price: 200, category: 'Continental Breakfast', tags: ['Vegetarian'] },
  { id: 'cb7', nameEn: 'Pan cake', nameAm: 'ፓን ኬክ', price: 250, category: 'Continental Breakfast' },
  { id: 'cb8', nameEn: 'Oats', nameAm: 'አጃ', price: 250, category: 'Continental Breakfast' },
  { id: 'cb9', nameEn: 'Fetira with honey', nameAm: 'ፈጢራ በማር', price: 250, category: 'Continental Breakfast' },
  { id: 'cb10', nameEn: 'Fetira with egg & honey', nameAm: 'ፈጢራ በእንቁላል በማር', price: 300, category: 'Continental Breakfast' },
  { id: 'cb11', nameEn: 'Papaya juice', nameAm: 'ፓፓያ ጁስ', price: 200, category: 'Continental Breakfast' },
  { id: 'cb12', nameEn: 'Water Millon juice', nameAm: 'ሃብሃብ ጁስ', price: 200, category: 'Continental Breakfast' },
  { id: 'cb13', nameEn: 'Tea', nameAm: 'ሻይ', price: 40, category: 'Continental Breakfast' },
  { id: 'cb14', nameEn: 'Milk', nameAm: 'ወተት', price: 70, category: 'Continental Breakfast' },
  { id: 'cb15', nameEn: 'Coffee', nameAm: 'ቡና', price: 60, category: 'Continental Breakfast' },

  // Extra Section
  { id: 'ot1', nameEn: 'Extra enjera', nameAm: 'ተጨማሪ እንጀራ', price: 40, category: 'Extra' },
  { id: 'ot2', nameEn: 'Extra bread', nameAm: 'ተጨማሪ ዳቦ', price: 20, category: 'Extra' },
  { id: 'ot3', nameEn: 'Extra cheese', nameAm: 'ተጨማሪ ቺዝ', price: 50, category: 'Extra' },
  { id: 'ot4', nameEn: 'Extra kachap', nameAm: 'ተጨማሪ ካቻፕ', price: 20, category: 'Extra' },
  { id: 'ot5', nameEn: 'Alluminium', nameAm: 'አልሙኒየም', price: 20, category: 'Extra' },
  { id: 'ot6', nameEn: 'Take away box / burger box', nameAm: 'ቴክ አዌይ ቦክስ / የበርገር ሳጥን', price: 50, category: 'Extra' },
  { id: 'ot7', nameEn: 'Pizza box', nameAm: 'የፒዛ ሳጥን', price: 50, category: 'Extra' }
];