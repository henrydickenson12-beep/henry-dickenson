import { GameQuestion } from "./types";

export interface TFQuestion { id: string; statement: string; answer: boolean; explanation: string; topic: string; }

// ─── MATH ─────────────────────────────────────────────────────────────────────
export const mathQuestions: Record<string, GameQuestion[]> = {
  preschool: [
    { id: "p1", question: "How many apples? 🍎🍎🍎", options: ["1", "2", "3", "4"], correctAnswer: "3", explanation: "Count them: 1, 2, 3! Three apples! 🎉", topic: "Counting" },
    { id: "p2", question: "What comes after 4?", options: ["3", "5", "6", "2"], correctAnswer: "5", explanation: "4, then 5! Great counting! ⭐", topic: "Numbers" },
    { id: "p3", question: "2 + 2 = ?", options: ["3", "4", "5", "6"], correctAnswer: "4", explanation: "2 + 2 = 4! Well done! 🌟", topic: "Addition" },
    { id: "p4", question: "Which is bigger? 🐘 or 🐭", options: ["🐘 Elephant", "🐭 Mouse", "Same size", "I don't know"], correctAnswer: "🐘 Elephant", explanation: "Elephants are HUGE! Much bigger than mice! 🐘", topic: "Comparing" },
    { id: "p5", question: "How many stars? ⭐⭐⭐⭐⭐", options: ["3", "4", "5", "6"], correctAnswer: "5", explanation: "Count: 1, 2, 3, 4, 5 stars! ⭐", topic: "Counting" },
    { id: "p6", question: "1 + 1 = ?", options: ["1", "2", "3", "4"], correctAnswer: "2", explanation: "1 + 1 = 2! You're a maths superstar! 🌟", topic: "Addition" },
    { id: "p7", question: "How many legs does a dog have?", options: ["2", "3", "4", "6"], correctAnswer: "4", explanation: "Dogs have 4 legs! 🐶", topic: "Numbers" },
    { id: "p8", question: "3 - 1 = ?", options: ["1", "2", "3", "4"], correctAnswer: "2", explanation: "3 take away 1 = 2! 🎈", topic: "Subtraction" },
  ],
  primary: [
    { id: "m1", question: "What is 7 × 8?", options: ["54", "56", "63", "48"], correctAnswer: "56", explanation: "7 × 8 = 56. Think: 7 groups of 8!", topic: "Multiplication" },
    { id: "m2", question: "What is 48 ÷ 6?", options: ["6", "7", "8", "9"], correctAnswer: "8", explanation: "48 ÷ 6 = 8. 6 × 8 = 48!", topic: "Division" },
    { id: "m3", question: "What is ¼ + ¼?", options: ["¼", "½", "¾", "1"], correctAnswer: "½", explanation: "¼ + ¼ = 2/4 = ½", topic: "Fractions" },
    { id: "m4", question: "What is 123 + 456?", options: ["579", "569", "589", "599"], correctAnswer: "579", explanation: "123 + 456 = 579", topic: "Addition" },
    { id: "m5", question: "What is 200 - 75?", options: ["115", "125", "135", "145"], correctAnswer: "125", explanation: "200 - 75 = 125", topic: "Subtraction" },
    { id: "m6", question: "What is 9 × 9?", options: ["72", "81", "90", "63"], correctAnswer: "81", explanation: "9 × 9 = 81", topic: "Multiplication" },
    { id: "m7", question: "Round 347 to the nearest 100.", options: ["300", "350", "400", "340"], correctAnswer: "300", explanation: "347 rounds down to 300 because 4 < 5", topic: "Rounding" },
    { id: "m8", question: "What is 5³?", options: ["15", "25", "125", "150"], correctAnswer: "125", explanation: "5³ = 5 × 5 × 5 = 125", topic: "Powers" },
    { id: "m9", question: "What is 3/4 of 20?", options: ["12", "15", "10", "16"], correctAnswer: "15", explanation: "3/4 × 20 = 15", topic: "Fractions" },
    { id: "m10", question: "What is the perimeter of a square with side 6cm?", options: ["12cm", "18cm", "24cm", "36cm"], correctAnswer: "24cm", explanation: "Perimeter = 4 × side = 4 × 6 = 24cm", topic: "Geometry" },
  ],
  secondary: [
    { id: "ms1", question: "Solve: 3x + 7 = 22", options: ["x = 3", "x = 4", "x = 5", "x = 6"], correctAnswer: "x = 5", explanation: "3x = 22 - 7 = 15, so x = 5", topic: "Algebra" },
    { id: "ms2", question: "What is the area of a circle with radius 4cm? (π ≈ 3.14)", options: ["25.12cm²", "50.24cm²", "12.56cm²", "75.36cm²"], correctAnswer: "50.24cm²", explanation: "Area = π × r² = 3.14 × 16 = 50.24cm²", topic: "Geometry" },
    { id: "ms3", question: "Simplify: 4x² + 3x - 2x² + x", options: ["2x² + 4x", "6x² + 2x", "2x² + 2x", "4x² + 4x"], correctAnswer: "2x² + 4x", explanation: "(4-2)x² + (3+1)x = 2x² + 4x", topic: "Algebra" },
    { id: "ms4", question: "What is sin(30°)?", options: ["0.5", "0.707", "0.866", "1"], correctAnswer: "0.5", explanation: "sin(30°) = 1/2 = 0.5", topic: "Trigonometry" },
    { id: "ms5", question: "What is 15% of 200?", options: ["20", "25", "30", "35"], correctAnswer: "30", explanation: "15% × 200 = 0.15 × 200 = 30", topic: "Percentages" },
    { id: "ms6", question: "What is the gradient of y = 4x - 3?", options: ["3", "-3", "4", "-4"], correctAnswer: "4", explanation: "In y = mx + c, m is the gradient. Here m = 4.", topic: "Algebra" },
    { id: "ms7", question: "If a triangle has sides 3, 4, 5 — what type is it?", options: ["Equilateral", "Right-angled", "Obtuse", "Isosceles"], correctAnswer: "Right-angled", explanation: "3² + 4² = 5² (9+16=25). Pythagoras confirms right angle!", topic: "Geometry" },
  ],
};

export const mathTF: Record<string, TFQuestion[]> = {
  preschool: [
    { id: "ptf1", statement: "2 + 2 = 5", answer: false, explanation: "2 + 2 = 4, not 5!", topic: "Addition" },
    { id: "ptf2", statement: "3 is bigger than 1", answer: true, explanation: "Yes! 3 > 1 ✅", topic: "Numbers" },
    { id: "ptf3", statement: "A square has 4 sides", answer: true, explanation: "Correct! Squares have 4 equal sides!", topic: "Shapes" },
    { id: "ptf4", statement: "1 + 1 = 3", answer: false, explanation: "1 + 1 = 2! Count on your fingers!", topic: "Addition" },
  ],
  primary: [
    { id: "mtf1", statement: "7 × 7 = 48", answer: false, explanation: "7 × 7 = 49, not 48!", topic: "Multiplication" },
    { id: "mtf2", statement: "A triangle has 3 sides", answer: true, explanation: "Correct! Tri = three!", topic: "Geometry" },
    { id: "mtf3", statement: "0.5 = ½", answer: true, explanation: "Yes! Half as a decimal is 0.5", topic: "Fractions" },
    { id: "mtf4", statement: "25% = ¼", answer: true, explanation: "25 out of 100 = 1 out of 4 ✅", topic: "Percentages" },
    { id: "mtf5", statement: "The square root of 49 is 8", answer: false, explanation: "√49 = 7, because 7 × 7 = 49", topic: "Powers" },
  ],
  secondary: [
    { id: "stf1", statement: "π is approximately 3.14", answer: true, explanation: "Pi ≈ 3.14159...", topic: "Constants" },
    { id: "stf2", statement: "The equation y = 3x + 2 has gradient 2", answer: false, explanation: "Gradient is 3 (the coefficient of x), not 2!", topic: "Algebra" },
    { id: "stf3", statement: "sin²θ + cos²θ = 1", answer: true, explanation: "This is the Pythagorean trigonometric identity!", topic: "Trigonometry" },
    { id: "stf4", statement: "A negative times a negative gives a positive", answer: true, explanation: "(-3) × (-4) = +12 ✅", topic: "Arithmetic" },
  ],
};

// ─── SCIENCE ──────────────────────────────────────────────────────────────────
export const scienceQuestions: Record<string, GameQuestion[]> = {
  preschool: [
    { id: "psc1", question: "What does the sun give us? ☀️", options: ["Rain", "Light and warmth", "Wind", "Snow"], correctAnswer: "Light and warmth", explanation: "The sun gives us light and warmth! ☀️🌟", topic: "Nature" },
    { id: "psc2", question: "What sound does a dog make? 🐶", options: ["Meow", "Moo", "Woof", "Oink"], correctAnswer: "Woof", explanation: "Dogs go WOOF! 🐶", topic: "Animals" },
    { id: "psc3", question: "Where does a fish live? 🐟", options: ["In a tree", "In the sky", "In the water", "In the ground"], correctAnswer: "In the water", explanation: "Fish live in water! 🐟💧", topic: "Animals" },
    { id: "psc4", question: "What colour is the sky on a sunny day? ☀️", options: ["Green", "Red", "Blue", "Pink"], correctAnswer: "Blue", explanation: "The sky is blue! 💙", topic: "Nature" },
    { id: "psc5", question: "Which of these can fly? 🐦", options: ["Dog", "Cat", "Bird", "Fish"], correctAnswer: "Bird", explanation: "Birds have wings and can fly! 🐦", topic: "Animals" },
  ],
  primary: [
    { id: "sc1", question: "What do plants need to make food?", options: ["Rain and darkness", "Sunlight and water", "Wind and soil", "Air and darkness"], correctAnswer: "Sunlight and water", explanation: "Plants use sunlight and water (plus CO₂) in photosynthesis!", topic: "Plants" },
    { id: "sc2", question: "Which animal is a mammal?", options: ["Salmon", "Eagle", "Dolphin", "Frog"], correctAnswer: "Dolphin", explanation: "Dolphins are mammals — they breathe air and feed their babies milk!", topic: "Animals" },
    { id: "sc3", question: "What state of matter is ice?", options: ["Gas", "Liquid", "Solid", "Plasma"], correctAnswer: "Solid", explanation: "Ice is water in its solid state.", topic: "Matter" },
    { id: "sc4", question: "How many bones are in the human body?", options: ["106", "206", "306", "256"], correctAnswer: "206", explanation: "Adults have 206 bones!", topic: "Human Body" },
    { id: "sc5", question: "What is the closest star to Earth?", options: ["Sirius", "Alpha Centauri", "The Sun", "Polaris"], correctAnswer: "The Sun", explanation: "Our Sun is the closest star — about 150 million km away!", topic: "Space" },
    { id: "sc6", question: "What is the chemical formula for water?", options: ["H₂O", "CO₂", "O₂", "NaCl"], correctAnswer: "H₂O", explanation: "Water = 2 hydrogen atoms + 1 oxygen atom = H₂O", topic: "Chemistry" },
    { id: "sc7", question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars", explanation: "Mars appears red due to iron oxide (rust) on its surface!", topic: "Space" },
  ],
  secondary: [
    { id: "scs1", question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correctAnswer: "Au", explanation: "Au comes from the Latin 'Aurum'", topic: "Chemistry" },
    { id: "scs2", question: "What is Newton's Second Law?", options: ["F = ma", "E = mc²", "F = mv", "P = mv"], correctAnswer: "F = ma", explanation: "Force = mass × acceleration", topic: "Physics" },
    { id: "scs3", question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Cell Wall"], correctAnswer: "Mitochondria", explanation: "Mitochondria produce ATP energy for the cell.", topic: "Biology" },
    { id: "scs4", question: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: "Carbon Dioxide", explanation: "Plants absorb CO₂ and release O₂ during photosynthesis.", topic: "Biology" },
    { id: "scs5", question: "What is the atomic number of Carbon?", options: ["4", "6", "8", "12"], correctAnswer: "6", explanation: "Carbon has 6 protons, giving it atomic number 6.", topic: "Chemistry" },
    { id: "scs6", question: "What type of wave is light?", options: ["Mechanical", "Electromagnetic", "Longitudinal", "Sound"], correctAnswer: "Electromagnetic", explanation: "Light is an electromagnetic wave — it doesn't need a medium to travel!", topic: "Physics" },
  ],
};

export const scienceTF: Record<string, TFQuestion[]> = {
  preschool: [
    { id: "psctf1", statement: "The sun is a star", answer: true, explanation: "Yes! Our Sun is a huge ball of burning gas — a star! ☀️", topic: "Space" },
    { id: "psctf2", statement: "Fish can live on land", answer: false, explanation: "Fish need water to breathe! 🐟💧", topic: "Animals" },
    { id: "psctf3", statement: "Cats go 'Woof'", answer: false, explanation: "Cats go 'Meow'! Dogs go 'Woof'! 🐱", topic: "Animals" },
  ],
  primary: [
    { id: "sctf1", statement: "Oxygen is needed for burning", answer: true, explanation: "Fire needs oxygen to burn — blow on a campfire to make it bigger!", topic: "Chemistry" },
    { id: "sctf2", statement: "Humans have 2 lungs", answer: true, explanation: "Correct! We have a left and right lung. ✅", topic: "Human Body" },
    { id: "sctf3", statement: "Sound travels faster than light", answer: false, explanation: "Light travels at 300,000 km/s — much faster than sound!", topic: "Physics" },
    { id: "sctf4", statement: "Plants make food using sunlight", answer: true, explanation: "This process is called photosynthesis! 🌱☀️", topic: "Plants" },
  ],
  secondary: [
    { id: "scstf1", statement: "DNA stands for Deoxyribonucleic Acid", answer: true, explanation: "Correct! DNA carries our genetic information. ✅", topic: "Biology" },
    { id: "scstf2", statement: "Electrons have a positive charge", answer: false, explanation: "Electrons are negatively charged! Protons are positive.", topic: "Chemistry" },
    { id: "scstf3", statement: "The speed of light in a vacuum is about 3×10⁸ m/s", answer: true, explanation: "Yes! c ≈ 299,792,458 m/s ≈ 3×10⁸ m/s", topic: "Physics" },
  ],
};

// ─── ENGLISH ──────────────────────────────────────────────────────────────────
export const englishQuestions: Record<string, GameQuestion[]> = {
  preschool: [
    { id: "pe1", question: "Which word rhymes with 'cat'?", options: ["Dog", "Hat", "Sun", "Big"], correctAnswer: "Hat", explanation: "Cat and hat both end in '-at'! They rhyme! 🎩🐱", topic: "Rhyming" },
    { id: "pe2", question: "What letter does 'Apple' start with?", options: ["B", "C", "A", "D"], correctAnswer: "A", explanation: "Apple starts with A! 🍎", topic: "Alphabet" },
    { id: "pe3", question: "Which of these is a colour?", options: ["Jump", "Red", "Run", "Big"], correctAnswer: "Red", explanation: "Red is a colour! 🔴", topic: "Words" },
    { id: "pe4", question: "How many letters are in the word 'CAT'?", options: ["1", "2", "3", "4"], correctAnswer: "3", explanation: "C-A-T: three letters! 🐱", topic: "Spelling" },
    { id: "pe5", question: "Which word means the opposite of BIG?", options: ["Huge", "Giant", "Small", "Tall"], correctAnswer: "Small", explanation: "Small is the opposite of big — it's an antonym!", topic: "Opposites" },
  ],
  primary: [
    { id: "en1", question: "What is a synonym for 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correctAnswer: "Joyful", explanation: "Joyful means the same as happy — it's a synonym!", topic: "Synonyms" },
    { id: "en2", question: "What is the plural of 'child'?", options: ["Childs", "Childes", "Children", "Childrens"], correctAnswer: "Children", explanation: "Child → Children is an irregular plural!", topic: "Grammar" },
    { id: "en3", question: "Which is a proper noun?", options: ["dog", "city", "London", "book"], correctAnswer: "London", explanation: "London is a proper noun — it names a specific place and is capitalised.", topic: "Nouns" },
    { id: "en4", question: "What does the prefix 'un-' mean?", options: ["Again", "Not", "Before", "After"], correctAnswer: "Not", explanation: "Un- means 'not'. Unhappy = not happy!", topic: "Prefixes" },
    { id: "en5", question: "Which sentence uses the correct punctuation?", options: ["I love cats", "i love cats.", "I love cats.", "I love cats!."], correctAnswer: "I love cats.", explanation: "Sentences start with a capital letter and end with a full stop!", topic: "Punctuation" },
    { id: "en6", question: "What type of word is 'quickly'?", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Adverb", explanation: "Quickly describes HOW something is done — that makes it an adverb!", topic: "Grammar" },
    { id: "en7", question: "What is an antonym for 'ancient'?", options: ["Old", "Historic", "Modern", "Aged"], correctAnswer: "Modern", explanation: "Modern (new) is the opposite of ancient (old)!", topic: "Antonyms" },
  ],
  secondary: [
    { id: "ens1", question: "What literary device is 'the wind whispered through the trees'?", options: ["Simile", "Personification", "Metaphor", "Alliteration"], correctAnswer: "Personification", explanation: "Giving the wind a human quality (whispering) = personification!", topic: "Literary Devices" },
    { id: "ens2", question: "What is a protagonist?", options: ["The villain", "The setting", "The main character", "The narrator"], correctAnswer: "The main character", explanation: "The protagonist is the central character in a story.", topic: "Narrative" },
    { id: "ens3", question: "Which is an example of alliteration?", options: ["She sings sweetly", "Fast as lightning", "The howling storm", "Soft moonlight"], correctAnswer: "She sings sweetly", explanation: "Alliteration = repeated consonant sounds at the start of words: S-S-S!", topic: "Literary Devices" },
    { id: "ens4", question: "What is the effect of a rhetorical question?", options: ["To confuse the reader", "To engage the reader and make them think", "To provide facts", "To tell a story"], correctAnswer: "To engage the reader and make them think", explanation: "Rhetorical questions don't need answers — they make the reader reflect!", topic: "Persuasive Writing" },
    { id: "ens5", question: "Which word means 'ambiguous or unclear in meaning'?", options: ["Vivid", "Concise", "Equivocal", "Explicit"], correctAnswer: "Equivocal", explanation: "Equivocal = having more than one possible meaning.", topic: "Vocabulary" },
    { id: "ens6", question: "What is iambic pentameter?", options: ["10 syllables per line, alternating stressed/unstressed", "Rhyming couplets", "Repetition of vowel sounds", "A type of poem with 14 lines"], correctAnswer: "10 syllables per line, alternating stressed/unstressed", explanation: "da-DUM da-DUM da-DUM da-DUM da-DUM — used by Shakespeare!", topic: "Poetry" },
  ],
};

export const englishTF: Record<string, TFQuestion[]> = {
  preschool: [
    { id: "petf1", statement: "CAT has 3 letters", answer: true, explanation: "C-A-T = 3 letters! ✅", topic: "Spelling" },
    { id: "petf2", statement: "'Dog' and 'log' rhyme", answer: true, explanation: "Dog and log both end in '-og'! They rhyme! 🐶📦", topic: "Rhyming" },
    { id: "petf3", statement: "The alphabet starts with B", answer: false, explanation: "The alphabet starts with A! A-B-C-D...", topic: "Alphabet" },
  ],
  primary: [
    { id: "entf1", statement: "A noun is a doing word", answer: false, explanation: "Nouns are naming words. Verbs are doing words!", topic: "Grammar" },
    { id: "entf2", statement: "'Quickly' is an adverb", answer: true, explanation: "Yes! Adverbs describe HOW something is done. ✅", topic: "Grammar" },
    { id: "entf3", statement: "Every sentence needs a capital letter at the start", answer: true, explanation: "Correct! Always start sentences with a capital letter. ✅", topic: "Punctuation" },
    { id: "entf4", statement: "A simile compares using 'like' or 'as'", answer: true, explanation: "'As fast as lightning' — that's a simile! ✅", topic: "Literary Devices" },
  ],
  secondary: [
    { id: "enstf1", statement: "A sonnet has 14 lines", answer: true, explanation: "Correct! Shakespeare's sonnets all have 14 lines. ✅", topic: "Poetry" },
    { id: "enstf2", statement: "Onomatopoeia means words that sound like what they describe", answer: true, explanation: "Buzz, sizzle, crash — they all sound like what they mean! ✅", topic: "Literary Devices" },
    { id: "enstf3", statement: "A metaphor uses 'like' or 'as' to compare", answer: false, explanation: "Similes use 'like/as'. Metaphors say something IS something else!", topic: "Literary Devices" },
  ],
};

// ─── HISTORY ──────────────────────────────────────────────────────────────────
export const historyQuestions: Record<string, GameQuestion[]> = {
  preschool: [
    { id: "ph1", question: "What did knights wear to protect themselves?", options: ["Pyjamas", "Armour", "Raincoats", "Swimsuits"], correctAnswer: "Armour", explanation: "Knights wore metal armour to protect themselves in battle! ⚔️", topic: "Medieval" },
    { id: "ph2", question: "Where did kings and queens live?", options: ["In a tent", "In a flat", "In a castle", "In a shop"], correctAnswer: "In a castle", explanation: "Kings and queens lived in big, strong castles! 🏰👑", topic: "Royalty" },
    { id: "ph3", question: "How did people travel before cars?", options: ["By rocket", "By horse", "By submarine", "By escalator"], correctAnswer: "By horse", explanation: "Before cars, people rode horses or went in horse-drawn carriages! 🐴", topic: "Transport" },
    { id: "ph4", question: "What is a pyramid? 🏛️", options: ["A type of pizza", "An ancient building", "A swimming pool", "A forest"], correctAnswer: "An ancient building", explanation: "Pyramids are ancient buildings! The most famous ones are in Egypt! 🇪🇬", topic: "Ancient Egypt" },
  ],
  primary: [
    { id: "hi1", question: "In which year did the Battle of Hastings take place?", options: ["1066", "1086", "1166", "1046"], correctAnswer: "1066", explanation: "1066 is one of the most famous dates in English history! William conquered England.", topic: "Medieval Britain" },
    { id: "hi2", question: "Who was the first person to walk on the Moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Alan Shepard"], correctAnswer: "Neil Armstrong", explanation: "Neil Armstrong stepped on the Moon on 20 July 1969: 'One small step for man...'", topic: "Space Race" },
    { id: "hi3", question: "Which ancient wonder was in Egypt?", options: ["Colosseum", "Great Wall", "The Pyramids of Giza", "Machu Picchu"], correctAnswer: "The Pyramids of Giza", explanation: "The Great Pyramid of Giza is the only ancient wonder still standing!", topic: "Ancient Egypt" },
    { id: "hi4", question: "What year did World War 2 end?", options: ["1939", "1942", "1945", "1950"], correctAnswer: "1945", explanation: "WW2 ended in 1945 with Allied victory in Europe (May) and the Pacific (September).", topic: "World War 2" },
    { id: "hi5", question: "Who invented the telephone?", options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Benjamin Franklin"], correctAnswer: "Alexander Graham Bell", explanation: "Alexander Graham Bell made the first telephone call in 1876!", topic: "Inventions" },
    { id: "hi6", question: "What ship sank in 1912?", options: ["Lusitania", "Bounty", "Titanic", "Mayflower"], correctAnswer: "Titanic", explanation: "The RMS Titanic sank on 15 April 1912 after hitting an iceberg.", topic: "Disasters" },
    { id: "hi7", question: "Who was Henry VIII?", options: ["A French emperor", "An English king", "A Roman soldier", "An American president"], correctAnswer: "An English king", explanation: "Henry VIII was King of England from 1509 to 1547, famous for his six wives!", topic: "Tudor England" },
  ],
  secondary: [
    { id: "his1", question: "What was the main cause of World War 1?", options: ["The assassination of Archduke Franz Ferdinand", "The invasion of Poland", "The Wall Street Crash", "Napoleon's return"], correctAnswer: "The assassination of Archduke Franz Ferdinand", explanation: "The assassination in Sarajevo in June 1914 triggered the alliance system and WW1.", topic: "World War 1" },
    { id: "his2", question: "The French Revolution began in which year?", options: ["1776", "1789", "1804", "1815"], correctAnswer: "1789", explanation: "1789 — the storming of the Bastille on 14 July marks the start!", topic: "French Revolution" },
    { id: "his3", question: "What was the name of the policy of racial segregation in South Africa?", options: ["Apartheid", "Segregation", "Jim Crow", "Colonialism"], correctAnswer: "Apartheid", explanation: "Apartheid was the system of institutionalised racial segregation in South Africa (1948–1991).", topic: "Modern History" },
    { id: "his4", question: "The Berlin Wall fell in which year?", options: ["1979", "1985", "1989", "1991"], correctAnswer: "1989", explanation: "The Berlin Wall fell on 9 November 1989, symbolising the end of the Cold War.", topic: "Cold War" },
    { id: "his5", question: "What document did King John sign in 1215?", options: ["The Bill of Rights", "The Magna Carta", "The Declaration of Independence", "The Treaty of Versailles"], correctAnswer: "The Magna Carta", explanation: "The Magna Carta limited royal power and is a foundation of modern democracy!", topic: "Medieval Britain" },
    { id: "his6", question: "Which empire was known as 'the empire on which the sun never sets'?", options: ["Roman Empire", "Ottoman Empire", "British Empire", "Mongol Empire"], correctAnswer: "British Empire", explanation: "At its peak, the British Empire covered 1/4 of the world's land area!", topic: "Empires" },
  ],
};

export const historyTF: Record<string, TFQuestion[]> = {
  preschool: [
    { id: "phtf1", statement: "Kings and Queens lived in castles", answer: true, explanation: "Yes! Castles were homes for royalty! 🏰👑", topic: "Royalty" },
    { id: "phtf2", statement: "Cars have been around for 1000 years", answer: false, explanation: "Cars were only invented in the late 1800s — less than 200 years ago! 🚗", topic: "Transport" },
  ],
  primary: [
    { id: "hitf1", statement: "WW2 started in 1939", answer: true, explanation: "WW2 began on 1 September 1939 when Germany invaded Poland. ✅", topic: "World War 2" },
    { id: "hitf2", statement: "The Titanic was a flying ship", answer: false, explanation: "The Titanic was an ocean liner — a ship that sailed on water!", topic: "Disasters" },
    { id: "hitf3", statement: "Neil Armstrong was the first man on the moon", answer: true, explanation: "Neil Armstrong stepped on the Moon on 20 July 1969! ✅", topic: "Space Race" },
    { id: "hitf4", statement: "Henry VIII had 3 wives", answer: false, explanation: "Henry VIII had SIX wives! Remember: divorced, beheaded, died, divorced, beheaded, survived!", topic: "Tudor England" },
  ],
  secondary: [
    { id: "histf1", statement: "The Cold War involved direct military conflict between the USA and USSR", answer: false, explanation: "The Cold War was a political and ideological rivalry — they never fought directly!", topic: "Cold War" },
    { id: "histf2", statement: "Apartheid ended in South Africa in the 1990s", answer: true, explanation: "Apartheid was dismantled between 1990–1994 with Nelson Mandela becoming president. ✅", topic: "Modern History" },
    { id: "histf3", statement: "The Magna Carta was signed in 1215", answer: true, explanation: "King John signed the Magna Carta at Runnymede on 15 June 1215. ✅", topic: "Medieval Britain" },
  ],
};

// ─── GEOGRAPHY ────────────────────────────────────────────────────────────────
export const geographyQuestions: Record<string, GameQuestion[]> = {
  preschool: [
    { id: "pg1", question: "What do we call a very large area of water? 🌊", options: ["A pond", "An ocean", "A puddle", "A river"], correctAnswer: "An ocean", explanation: "Oceans are huge! The biggest is the Pacific Ocean 🌊", topic: "Water" },
    { id: "pg2", question: "What is the tallest type of land? ⛰️", options: ["A hill", "A valley", "A mountain", "A beach"], correctAnswer: "A mountain", explanation: "Mountains are the tallest! The tallest is Mount Everest! ⛰️", topic: "Landforms" },
    { id: "pg3", question: "Which is the hottest place? 🌵", options: ["The North Pole", "A desert", "A forest", "The ocean"], correctAnswer: "A desert", explanation: "Deserts are very hot and dry! 🌵☀️", topic: "Climates" },
    { id: "pg4", question: "What shape is the Earth? 🌍", options: ["Flat", "Square", "Round (sphere)", "Triangle"], correctAnswer: "Round (sphere)", explanation: "The Earth is round like a ball — a sphere! 🌍", topic: "Planet Earth" },
  ],
  primary: [
    { id: "ge1", question: "What is the capital city of France?", options: ["Lyon", "Nice", "Paris", "Marseille"], correctAnswer: "Paris", explanation: "Paris is the capital and largest city of France! 🇫🇷🗼", topic: "Capitals" },
    { id: "ge2", question: "What is the longest river in the world?", options: ["Amazon", "Mississippi", "Nile", "Yangtze"], correctAnswer: "Nile", explanation: "The Nile (6,650 km) is generally considered the world's longest river!", topic: "Rivers" },
    { id: "ge3", question: "On which continent is Brazil?", options: ["Africa", "Europe", "Asia", "South America"], correctAnswer: "South America", explanation: "Brazil is the largest country in South America! 🇧🇷", topic: "Continents" },
    { id: "ge4", question: "What is the largest ocean in the world?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correctAnswer: "Pacific", explanation: "The Pacific is the largest ocean — it covers more than 30% of Earth's surface!", topic: "Oceans" },
    { id: "ge5", question: "What is the capital city of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Hiroshima"], correctAnswer: "Tokyo", explanation: "Tokyo is the capital of Japan and one of the world's largest cities! 🇯🇵", topic: "Capitals" },
    { id: "ge6", question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "South Korea", "Vietnam"], correctAnswer: "Japan", explanation: "Japan is called the Land of the Rising Sun — its name (日本) means 'origin of the sun'!", topic: "Countries" },
    { id: "ge7", question: "What is the highest mountain in the world?", options: ["K2", "Kilimanjaro", "Mont Blanc", "Mount Everest"], correctAnswer: "Mount Everest", explanation: "Mount Everest (8,849 m) is the tallest mountain on Earth, in the Himalayas!", topic: "Mountains" },
  ],
  secondary: [
    { id: "ges1", question: "What is the name for the imaginary line at 0° longitude?", options: ["The Equator", "The Prime Meridian", "The Tropic of Cancer", "The Arctic Circle"], correctAnswer: "The Prime Meridian", explanation: "The Prime Meridian passes through Greenwich, London — it's 0° longitude!", topic: "Coordinates" },
    { id: "ges2", question: "Which type of rock forms from cooling magma?", options: ["Sedimentary", "Metamorphic", "Igneous", "Limestone"], correctAnswer: "Igneous", explanation: "Igneous rocks form from cooled magma or lava (e.g. granite, basalt).", topic: "Geology" },
    { id: "ges3", question: "What causes earthquakes?", options: ["Heavy rainfall", "Tectonic plate movement", "Volcanic eruptions", "Ocean currents"], correctAnswer: "Tectonic plate movement", explanation: "Earthquakes are caused by the movement of tectonic plates in Earth's crust!", topic: "Natural Hazards" },
    { id: "ges4", question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Brisbane", "Canberra"], correctAnswer: "Canberra", explanation: "Canberra is the capital of Australia — many people guess Sydney but it's wrong!", topic: "Capitals" },
    { id: "ges5", question: "The Amazon rainforest is located in which continent?", options: ["Africa", "Asia", "South America", "North America"], correctAnswer: "South America", explanation: "The Amazon covers 5.5 million km² across 9 South American countries!", topic: "Biomes" },
    { id: "ges6", question: "What is the Tropic of Cancer?", options: ["A type of cloud", "A line at 23.5°N latitude", "The edge of the Arctic", "A deep ocean trench"], correctAnswer: "A line at 23.5°N latitude", explanation: "The Tropic of Cancer is at 23.5°N — the sun is directly overhead here at summer solstice.", topic: "Coordinates" },
  ],
};

export const geographyTF: Record<string, TFQuestion[]> = {
  preschool: [
    { id: "pgtf1", statement: "The Earth is flat", answer: false, explanation: "The Earth is round like a ball! 🌍", topic: "Planet Earth" },
    { id: "pgtf2", statement: "Deserts are very dry places", answer: true, explanation: "Yes! Deserts get very little rain. 🌵✅", topic: "Climates" },
  ],
  primary: [
    { id: "getf1", statement: "The capital of Australia is Sydney", answer: false, explanation: "The capital is Canberra, not Sydney! 🇦🇺", topic: "Capitals" },
    { id: "getf2", statement: "The Pacific is the largest ocean", answer: true, explanation: "The Pacific Ocean covers more than 30% of Earth! ✅", topic: "Oceans" },
    { id: "getf3", statement: "Mount Everest is in the Himalayas", answer: true, explanation: "Everest sits on the Nepal-Tibet border in the Himalayan range. ✅", topic: "Mountains" },
    { id: "getf4", statement: "Brazil is in Europe", answer: false, explanation: "Brazil is in South America! 🇧🇷", topic: "Continents" },
  ],
  secondary: [
    { id: "gestf1", statement: "Earthquakes are caused by tectonic plate movement", answer: true, explanation: "Correct — plates shifting along faults cause earthquakes. ✅", topic: "Natural Hazards" },
    { id: "gestf2", statement: "The Prime Meridian passes through New York", answer: false, explanation: "The Prime Meridian passes through Greenwich, London (0° longitude)!", topic: "Coordinates" },
    { id: "gestf3", statement: "The Amazon rainforest is the largest on Earth", answer: true, explanation: "The Amazon is the world's largest tropical rainforest. ✅", topic: "Biomes" },
  ],
};

// ─── Question Router ───────────────────────────────────────────────────────────
export const allQuizQuestions: Record<string, Record<string, GameQuestion[]>> = {
  math: mathQuestions, science: scienceQuestions, english: englishQuestions,
  history: historyQuestions, geography: geographyQuestions,
};

export const allTFQuestions: Record<string, Record<string, TFQuestion[]>> = {
  math: mathTF, science: scienceTF, english: englishTF,
  history: historyTF, geography: geographyTF,
};

export function getQuizQuestions(subject: string, level: string): GameQuestion[] {
  return allQuizQuestions[subject]?.[level] ?? allQuizQuestions[subject]?.primary ?? mathQuestions.primary;
}

export function getTFQuestions(subject: string, level: string): TFQuestion[] {
  return allTFQuestions[subject]?.[level] ?? allTFQuestions[subject]?.primary ?? mathTF.primary;
}
