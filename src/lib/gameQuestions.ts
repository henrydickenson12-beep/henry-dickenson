import { GameQuestion } from "./types";

export const mathQuestions: Record<string, GameQuestion[]> = {
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
  ],
  preschool: [
    { id: "p1", question: "How many apples? 🍎🍎🍎", options: ["1", "2", "3", "4"], correctAnswer: "3", explanation: "Count them: 1, 2, 3! Three apples! 🎉", topic: "Counting" },
    { id: "p2", question: "What comes after 4?", options: ["3", "5", "6", "2"], correctAnswer: "5", explanation: "4, then 5! Great counting! ⭐", topic: "Numbers" },
    { id: "p3", question: "2 + 2 = ?", options: ["3", "4", "5", "6"], correctAnswer: "4", explanation: "2 + 2 = 4! Well done! 🌟", topic: "Addition" },
    { id: "p4", question: "Which is bigger? 🐘 or 🐭", options: ["🐘 Elephant", "🐭 Mouse", "Same size", "I don't know"], correctAnswer: "🐘 Elephant", explanation: "Elephants are HUGE! Much bigger than mice! 🐘", topic: "Comparing" },
    { id: "p5", question: "How many stars? ⭐⭐⭐⭐⭐", options: ["3", "4", "5", "6"], correctAnswer: "5", explanation: "Count: 1, 2, 3, 4, 5 stars! ⭐", topic: "Counting" },
  ],
};

export const scienceQuestions: Record<string, GameQuestion[]> = {
  primary: [
    { id: "sc1", question: "What do plants need to make food?", options: ["Rain and darkness", "Sunlight and water", "Wind and soil", "Air and darkness"], correctAnswer: "Sunlight and water", explanation: "Plants use sunlight and water (plus CO₂) in photosynthesis!", topic: "Plants" },
    { id: "sc2", question: "Which animal is a mammal?", options: ["Salmon", "Eagle", "Dolphin", "Frog"], correctAnswer: "Dolphin", explanation: "Dolphins are mammals — they breathe air and feed their babies milk!", topic: "Animals" },
    { id: "sc3", question: "What state of matter is ice?", options: ["Gas", "Liquid", "Solid", "Plasma"], correctAnswer: "Solid", explanation: "Ice is water in its solid state.", topic: "Matter" },
    { id: "sc4", question: "How many bones are in the human body?", options: ["106", "206", "306", "256"], correctAnswer: "206", explanation: "Adults have 206 bones!", topic: "Human Body" },
    { id: "sc5", question: "What is the closest star to Earth?", options: ["Sirius", "Alpha Centauri", "The Sun", "Polaris"], correctAnswer: "The Sun", explanation: "Our Sun is the closest star — about 150 million km away!", topic: "Space" },
  ],
  secondary: [
    { id: "scs1", question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correctAnswer: "Au", explanation: "Au comes from the Latin 'Aurum'", topic: "Chemistry" },
    { id: "scs2", question: "What is Newton's Second Law?", options: ["F = ma", "E = mc²", "F = mv", "P = mv"], correctAnswer: "F = ma", explanation: "Force = mass × acceleration", topic: "Physics" },
    { id: "scs3", question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Cell Wall"], correctAnswer: "Mitochondria", explanation: "Mitochondria produce ATP energy for the cell.", topic: "Biology" },
    { id: "scs4", question: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: "Carbon Dioxide", explanation: "Plants absorb CO₂ and release O₂ during photosynthesis.", topic: "Biology" },
    { id: "scs5", question: "What is the atomic number of Carbon?", options: ["4", "6", "8", "12"], correctAnswer: "6", explanation: "Carbon has 6 protons, giving it atomic number 6.", topic: "Chemistry" },
  ],
  preschool: [
    { id: "psc1", question: "What does the sun give us? ☀️", options: ["Rain", "Light and warmth", "Wind", "Snow"], correctAnswer: "Light and warmth", explanation: "The sun gives us light and warmth! ☀️🌟", topic: "Nature" },
    { id: "psc2", question: "What sound does a dog make? 🐶", options: ["Meow", "Moo", "Woof", "Oink"], correctAnswer: "Woof", explanation: "Dogs go WOOF! 🐶", topic: "Animals" },
    { id: "psc3", question: "Where does a fish live? 🐟", options: ["In a tree", "In the sky", "In the water", "In the ground"], correctAnswer: "In the water", explanation: "Fish live in water! 🐟💧", topic: "Animals" },
  ],
};
