export interface MatchPair { left: string; right: string; }

export const matchPairs: Record<string, Record<string, MatchPair[]>> = {
  math: {
    preschool: [
      { left: "🍎🍎🍎", right: "3" }, { left: "⭐⭐", right: "2" },
      { left: "🐶🐶🐶🐶", right: "4" }, { left: "5 + 5", right: "10" },
      { left: "4 - 2", right: "2" }, { left: "2 + 2", right: "4" },
    ],
    primary: [
      { left: "6 × 7", right: "42" }, { left: "48 ÷ 6", right: "8" },
      { left: "3²", right: "9" }, { left: "½ of 40", right: "20" },
      { left: "25%", right: "¼" }, { left: "√64", right: "8" },
    ],
    secondary: [
      { left: "sin 30°", right: "0.5" }, { left: "π × r²", right: "Area of circle" },
      { left: "a² + b² = c²", right: "Pythagoras" }, { left: "y = mx + c", right: "Straight line" },
      { left: "n!", right: "Factorial" }, { left: "∑", right: "Sum of" },
    ],
  },
  science: {
    preschool: [
      { left: "🌞", right: "Sun" }, { left: "🐟", right: "Fish" },
      { left: "🌧️", right: "Rain" }, { left: "🌱", right: "Plant" },
      { left: "🔥", right: "Hot" }, { left: "❄️", right: "Cold" },
    ],
    primary: [
      { left: "H₂O", right: "Water" }, { left: "O₂", right: "Oxygen" },
      { left: "CO₂", right: "Carbon Dioxide" }, { left: "Closest star", right: "The Sun" },
      { left: "Largest mammal", right: "Blue Whale" }, { left: "206", right: "Bones in body" },
    ],
    secondary: [
      { left: "Au", right: "Gold" }, { left: "Na", right: "Sodium" },
      { left: "Fe", right: "Iron" }, { left: "F = ma", right: "Newton's 2nd Law" },
      { left: "Mitochondria", right: "Powerhouse of cell" }, { left: "DNA", right: "Genetic code" },
    ],
  },
  english: {
    preschool: [
      { left: "🐱", right: "CAT" }, { left: "🐶", right: "DOG" },
      { left: "🍎", right: "APPLE" }, { left: "hat 🎩", right: "rhymes with: cat" },
      { left: "A B _", right: "C" }, { left: "🔴", right: "RED" },
    ],
    primary: [
      { left: "Happy", right: "Joyful" }, { left: "Big", right: "Enormous" },
      { left: "Fast", right: "Rapid" }, { left: "Smart", right: "Intelligent" },
      { left: "Sad", right: "Miserable" }, { left: "Begin", right: "Commence" },
    ],
    secondary: [
      { left: "Protagonist", right: "Main character" }, { left: "Metaphor", right: "Direct comparison" },
      { left: "Alliteration", right: "Repeated first sound" }, { left: "Onomatopoeia", right: "Sound word (buzz)" },
      { left: "Antonym", right: "Opposite word" }, { left: "Oxymoron", right: "Contradictory phrase" },
    ],
  },
  history: {
    preschool: [
      { left: "👑", right: "King/Queen" }, { left: "🏰", right: "Castle" },
      { left: "⚔️", right: "Knight" }, { left: "🌊🚢", right: "Ship voyage" },
      { left: "🔥", right: "Fire" }, { left: "📜", right: "Scroll/Law" },
    ],
    primary: [
      { left: "1066", right: "Battle of Hastings" }, { left: "1969", right: "Moon Landing" },
      { left: "1912", right: "Titanic sank" }, { left: "1914", right: "WW1 began" },
      { left: "1945", right: "WW2 ended" }, { left: "Neil Armstrong", right: "First man on moon" },
    ],
    secondary: [
      { left: "1789", right: "French Revolution" }, { left: "1848", right: "Year of Revolutions" },
      { left: "Magna Carta", right: "1215" }, { left: "Industrial Revolution", right: "18th–19th century" },
      { left: "Cold War", right: "USA vs USSR" }, { left: "1989", right: "Berlin Wall fell" },
    ],
  },
  geography: {
    preschool: [
      { left: "🌊🌊🌊", right: "Ocean" }, { left: "⛰️", right: "Mountain" },
      { left: "🌵", right: "Desert" }, { left: "🌲🌲", right: "Forest" },
      { left: "🏙️", right: "City" }, { left: "🌍", right: "Earth" },
    ],
    primary: [
      { left: "France 🇫🇷", right: "Paris" }, { left: "Japan 🇯🇵", right: "Tokyo" },
      { left: "Australia 🇦🇺", right: "Canberra" }, { left: "Longest river", right: "Nile" },
      { left: "Largest ocean", right: "Pacific" }, { left: "Highest mountain", right: "Everest" },
    ],
    secondary: [
      { left: "Sweden 🇸🇪", right: "Stockholm" }, { left: "Brazil 🇧🇷", right: "Brasília" },
      { left: "Canada 🇨🇦", right: "Ottawa" }, { left: "Tropic of Cancer", right: "23.5°N" },
      { left: "Tectonic plates", right: "Cause earthquakes" }, { left: "Amazon basin", right: "South America" },
    ],
  },
};

export function getPairs(subject: string, level: string): MatchPair[] {
  return matchPairs[subject]?.[level] ?? matchPairs[subject]?.primary ?? [];
}
