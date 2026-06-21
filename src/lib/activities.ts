// Interactive learning activities for the student games.
// 5 subjects × 3 types × 4 age bands = 60. Subject ids match the rest of the app
// (Literacy is stored as "english"). Content is age-scaled per band.

export type ActivityType = "written" | "visual" | "vocabulary";
export type ActivityBand = "5-7" | "8-11" | "12-14" | "15-20";

export interface Activity {
  subject: string; // "math" | "science" | "english" | "history" | "geography"
  type: ActivityType;
  ageBand: ActivityBand;
  title: string;
  instructions: string;
  vocabAnswer?: string; // vocabulary only
  materials?: string;
  estimatedTime?: string;
}

export const ACTIVITY_BANDS: ActivityBand[] = ["5-7", "8-11", "12-14", "15-20"];
export const BAND_LABELS: Record<ActivityBand, string> = {
  "5-7": "Ages 5–7",
  "8-11": "Ages 8–11",
  "12-14": "Ages 12–14",
  "15-20": "Ages 15–20",
};

// The student picker has 3 difficulty levels; map them onto the 4 bands.
export function levelToBand(level: string): ActivityBand {
  if (level === "preschool") return "5-7";
  if (level === "secondary") return "12-14";
  return "8-11"; // primary / default
}

export const ACTIVITIES: Activity[] = [
  /* ───────── HISTORY ───────── */
  { subject: "history", type: "written", ageBand: "5-7", title: "A Grown-Up's Favourite Toy", instructions: "Ask a grown-up what their favourite toy was when they were little. Write its name and one sentence about why they liked it.", materials: "paper, pencil", estimatedTime: "15 min" },
  { subject: "history", type: "written", ageBand: "8-11", title: "A Day in the Past", instructions: "Choose a time you've studied (Vikings, Tudors, Ancient Egypt…). Write a 5–6 sentence diary entry as a child living then — what you eat, what you wear, and what you do in a day.", materials: "paper, pen", estimatedTime: "25 min" },
  { subject: "history", type: "written", ageBand: "12-14", title: "Cause and Consequence", instructions: "Pick one historical event you've studied. Write a paragraph explaining one cause and one consequence of it. Use the words 'because' and 'as a result'.", materials: "paper, pen", estimatedTime: "30 min" },
  { subject: "history", type: "written", ageBand: "15-20", title: "Two Sides of the Story", instructions: "Find two accounts of the same event written from different viewpoints. In 250–350 words, compare who wrote each, what each one emphasises or leaves out, and which you find more reliable — and explain why.", materials: "two sources", estimatedTime: "45 min" },
  { subject: "history", type: "visual", ageBand: "5-7", title: "Me, Growing Up", instructions: "Draw three pictures in a row: you as a baby, you today, and you as a grown-up.", materials: "colours", estimatedTime: "15 min" },
  { subject: "history", type: "visual", ageBand: "8-11", title: "Build a Timeline", instructions: "Draw a straight timeline of 5 events (from your own life or a topic you've studied). Mark each event with a date, a dot, and a small picture.", materials: "colours", estimatedTime: "25 min" },
  { subject: "history", type: "visual", ageBand: "12-14", title: "Plan of a Historical Place", instructions: "Draw a bird's-eye plan of a castle, fort, or ancient settlement. Show at least 6 features (walls, gate, well, towers…) and add a key explaining your symbols.", materials: "colours", estimatedTime: "30 min" },
  { subject: "history", type: "visual", ageBand: "15-20", title: "Change Over Time", instructions: "Draw an annotated visual (timeline, layered map, or flow diagram) showing how one place, border, or technology changed across at least three periods. Label each stage with a date and the key change.", materials: "colours", estimatedTime: "45 min" },
  { subject: "history", type: "vocabulary", ageBand: "5-7", title: "Long Ago", instructions: "The time that has already happened — yesterday, last year, and the days before you were born.", vocabAnswer: "past", estimatedTime: "5 min" },
  { subject: "history", type: "vocabulary", ageBand: "8-11", title: "One Hundred Years", instructions: "A length of time that is equal to one hundred years.", vocabAnswer: "century", estimatedTime: "5 min" },
  { subject: "history", type: "vocabulary", ageBand: "12-14", title: "Evidence From the Time", instructions: "A piece of evidence created at the actual time being studied — like a letter, photograph, or diary made during the event itself.", vocabAnswer: "primary source", estimatedTime: "5 min" },
  { subject: "history", type: "vocabulary", ageBand: "15-20", title: "Writing About the Past", instructions: "The study of how accounts of the past have themselves been written and interpreted over time — how scholars' methods and biases shape the records we read.", vocabAnswer: "historiography", estimatedTime: "5 min" },

  /* ───────── MATH ───────── */
  { subject: "math", type: "written", ageBand: "5-7", title: "Duck Number Story", instructions: "Write a number story: 'There were 5 ducks. 2 swam away.' Then write how many are left and the number sentence (5 − 2 = ?).", materials: "paper, pencil", estimatedTime: "10 min" },
  { subject: "math", type: "written", ageBand: "8-11", title: "Make a Shopping Problem", instructions: "You have 50 kr. Write your own word problem about buying 3 things, then solve it, showing each step of your working.", materials: "paper, pencil", estimatedTime: "20 min" },
  { subject: "math", type: "written", ageBand: "12-14", title: "Explain Your Method", instructions: "A jumper costs 480 kr after a 20% discount. Write out, in full sentences, how to find its original price before the discount.", materials: "paper, pencil", estimatedTime: "25 min" },
  { subject: "math", type: "written", ageBand: "15-20", title: "Justify It", instructions: "Write a clear argument (at least 5 sentences) explaining why the sum of two even numbers is always even. Use algebra — let the numbers be 2n and 2m — to support your reasoning.", materials: "paper, pencil", estimatedTime: "30 min" },
  { subject: "math", type: "visual", ageBand: "5-7", title: "Shape Picture", instructions: "Draw a house, a sun, and a tree using only circles, squares, triangles, and rectangles. Colour each kind of shape a different colour.", materials: "colours", estimatedTime: "15 min" },
  { subject: "math", type: "visual", ageBand: "8-11", title: "Fraction Pizzas", instructions: "Draw three pizzas. Shade them to show one half, one quarter, and three quarters. Label each pizza with its fraction.", materials: "colours", estimatedTime: "20 min" },
  { subject: "math", type: "visual", ageBand: "12-14", title: "Plot the Points", instructions: "Draw x and y axes. Plot (1,1), (5,1), (5,4) and (1,4), then join them in order. Name the shape you made and label each point's coordinates.", materials: "ruler", estimatedTime: "25 min" },
  { subject: "math", type: "visual", ageBand: "15-20", title: "Graph a Curve", instructions: "Sketch y = x² for x from −3 to 3. Plot at least 7 points, draw a smooth curve through them, and mark the vertex and the line of symmetry.", materials: "graph paper", estimatedTime: "30 min" },
  { subject: "math", type: "vocabulary", ageBand: "5-7", title: "Altogether", instructions: "When you put two groups together to find how many there are in total.", vocabAnswer: "addition", estimatedTime: "5 min" },
  { subject: "math", type: "vocabulary", ageBand: "8-11", title: "Equal Groups", instructions: "This operation splits a number into equal groups.", vocabAnswer: "division", estimatedTime: "5 min" },
  { subject: "math", type: "vocabulary", ageBand: "12-14", title: "All the Way Around", instructions: "The total distance around the outside edge of a flat shape.", vocabAnswer: "perimeter", estimatedTime: "5 min" },
  { subject: "math", type: "vocabulary", ageBand: "15-20", title: "The Longest Side", instructions: "In a right-angled triangle, the longest side — the one directly opposite the right angle.", vocabAnswer: "hypotenuse", estimatedTime: "5 min" },

  /* ───────── ENGLISH (Literacy) ───────── */
  { subject: "english", type: "written", ageBand: "5-7", title: "Finish the Story", instructions: "Finish this story in 2–3 sentences: 'The little cat opened the door and saw…'", materials: "paper, pencil", estimatedTime: "10 min" },
  { subject: "english", type: "written", ageBand: "8-11", title: "Invent a Character", instructions: "Invent a character. Write a short paragraph describing how they look, one thing they love, and one thing they are afraid of.", materials: "paper, pen", estimatedTime: "20 min" },
  { subject: "english", type: "written", ageBand: "12-14", title: "Make Your Case", instructions: "Write a paragraph persuading your school to add one new rule. Give at least two reasons and one example to support your idea.", materials: "paper, pen", estimatedTime: "25 min" },
  { subject: "english", type: "written", ageBand: "15-20", title: "Close Reading", instructions: "Choose a poem or short passage. Write about 250 words analysing how the writer uses language and structure to create a mood. Quote at least two phrases as evidence.", materials: "a text", estimatedTime: "45 min" },
  { subject: "english", type: "visual", ageBand: "5-7", title: "Letter Hunt: B", instructions: "Draw three things that start with the letter 'b'. Write a 'b' next to each picture.", materials: "colours", estimatedTime: "10 min" },
  { subject: "english", type: "visual", ageBand: "8-11", title: "Story Mountain", instructions: "Draw a story mountain for a story you know — beginning, build-up, problem, solution, and ending. Add a small picture at each stage.", materials: "colours", estimatedTime: "25 min" },
  { subject: "english", type: "visual", ageBand: "12-14", title: "Scene as a Comic", instructions: "Turn one scene from a book into a 4-panel comic strip. Draw the action in each panel and use speech bubbles for what the characters say.", materials: "colours", estimatedTime: "30 min" },
  { subject: "english", type: "visual", ageBand: "15-20", title: "Map Your Essay", instructions: "Draw a mind-map for an essay on a theme in a text you've studied. Branch the central theme into at least 4 sub-ideas, and add one piece of evidence at each branch.", materials: "colours", estimatedTime: "30 min" },
  { subject: "english", type: "vocabulary", ageBand: "5-7", title: "Same Ending Sound", instructions: "Two words that end with the same sound, like 'cat' and 'hat'.", vocabAnswer: "rhyme", estimatedTime: "5 min" },
  { subject: "english", type: "vocabulary", ageBand: "8-11", title: "Naming Word", instructions: "A word that names a person, place, animal, or thing — like 'dog', 'school', or 'Sara'.", vocabAnswer: "noun", estimatedTime: "5 min" },
  { subject: "english", type: "vocabulary", ageBand: "12-14", title: "Like or As", instructions: "A comparison that describes one thing as being like another using the words 'like' or 'as' — for example, 'brave as a lion'.", vocabAnswer: "simile", estimatedTime: "5 min" },
  { subject: "english", type: "vocabulary", ageBand: "15-20", title: "The Main Character", instructions: "The central character whose journey or struggle drives the main events of a story.", vocabAnswer: "protagonist", estimatedTime: "5 min" },

  /* ───────── SCIENCE ───────── */
  { subject: "science", type: "written", ageBand: "5-7", title: "What Plants Need", instructions: "Finish this sentence and then draw it: 'A plant needs ___ and ___ to grow.'", materials: "colours", estimatedTime: "10 min" },
  { subject: "science", type: "written", ageBand: "8-11", title: "Plan an Experiment", instructions: "Write a plan to find out which paper towel soaks up the most water. List what you will keep the same and what you will measure.", materials: "paper, pen", estimatedTime: "25 min" },
  { subject: "science", type: "written", ageBand: "12-14", title: "Explain the Water Cycle", instructions: "Write a paragraph explaining the water cycle. Use the words evaporation, condensation, and precipitation in the correct order.", materials: "paper, pen", estimatedTime: "25 min" },
  { subject: "science", type: "written", ageBand: "15-20", title: "Test the Claim", instructions: "A drink is labelled as something that 'boosts energy'. In 200–300 words, explain what evidence you would need to test this claim and how you would control the variables in a fair experiment.", materials: "paper, pen", estimatedTime: "40 min" },
  { subject: "science", type: "visual", ageBand: "5-7", title: "Label the Body", instructions: "Draw a person and label four parts: head, arm, leg, and hand.", materials: "colours", estimatedTime: "15 min" },
  { subject: "science", type: "visual", ageBand: "8-11", title: "Life Cycle Wheel", instructions: "Draw the life cycle of a butterfly or a frog as a circle with 4 stages and arrows between them. Label each stage.", materials: "colours", estimatedTime: "25 min" },
  { subject: "science", type: "visual", ageBand: "12-14", title: "Circuit Diagram", instructions: "Draw a simple circuit containing a cell, a switch, and a bulb, using the correct circuit symbols. Add an arrow to show the direction of the current.", materials: "ruler", estimatedTime: "25 min" },
  { subject: "science", type: "visual", ageBand: "15-20", title: "Diagram a System", instructions: "Draw a labelled diagram of the human heart (or a plant cell). Include at least 6 labelled parts and arrows showing flow or function.", materials: "colours", estimatedTime: "35 min" },
  { subject: "science", type: "vocabulary", ageBand: "5-7", title: "Staying on Top", instructions: "When something stays on top of the water instead of sinking.", vocabAnswer: "floating", estimatedTime: "5 min" },
  { subject: "science", type: "vocabulary", ageBand: "8-11", title: "An Animal's Home", instructions: "The natural home of an animal or plant, where it finds its food and shelter.", vocabAnswer: "habitat", estimatedTime: "5 min" },
  { subject: "science", type: "vocabulary", ageBand: "12-14", title: "Plants Making Food", instructions: "The process green plants use to make their own food from sunlight, water, and carbon dioxide.", vocabAnswer: "photosynthesis", estimatedTime: "5 min" },
  { subject: "science", type: "vocabulary", ageBand: "15-20", title: "Reaction Helper", instructions: "A substance that speeds up a chemical reaction without being used up itself.", vocabAnswer: "catalyst", estimatedTime: "5 min" },

  /* ───────── GEOGRAPHY ───────── */
  { subject: "geography", type: "written", ageBand: "5-7", title: "Where I Live", instructions: "Write one sentence about where you live, and one sentence about something you can see outside your window.", materials: "paper, pencil", estimatedTime: "10 min" },
  { subject: "geography", type: "written", ageBand: "8-11", title: "TV Weather Report", instructions: "Write a short weather report for today, as if you were on TV. Include the temperature, what the sky looks like, and what people should wear.", materials: "paper, pen", estimatedTime: "20 min" },
  { subject: "geography", type: "written", ageBand: "12-14", title: "City vs Village", instructions: "Write a paragraph comparing a city and a village. Name two clear differences in how people live in each place.", materials: "paper, pen", estimatedTime: "25 min" },
  { subject: "geography", type: "written", ageBand: "15-20", title: "A Geographic Issue", instructions: "Choose a local or global issue (flooding, traffic, deforestation…). In about 250 words, explain its causes, who it affects, and one possible solution.", materials: "paper, pen", estimatedTime: "45 min" },
  { subject: "geography", type: "visual", ageBand: "5-7", title: "Map of My Room", instructions: "Draw a map of your bedroom seen from above. Mark the bed, the door, and the window.", materials: "colours", estimatedTime: "15 min" },
  { subject: "geography", type: "visual", ageBand: "8-11", title: "Treasure Island Map", instructions: "Draw a map of an imaginary island. Add at least 5 features (mountain, river, beach, forest, village…) and a key that explains your symbols.", materials: "colours", estimatedTime: "25 min" },
  { subject: "geography", type: "visual", ageBand: "12-14", title: "River From Source to Mouth", instructions: "Draw a labelled diagram of a river from source to mouth. Mark the source, a tributary, a meander, and the mouth.", materials: "colours", estimatedTime: "30 min" },
  { subject: "geography", type: "visual", ageBand: "15-20", title: "Map the Data", instructions: "Draw a map that shows data using shading or arrows — for example, population density by region, or migration flows. Include a title, a key, and a shading scale.", materials: "colours", estimatedTime: "40 min" },
  { subject: "geography", type: "vocabulary", ageBand: "5-7", title: "Land in Water", instructions: "A piece of land with water all the way around it.", vocabAnswer: "island", estimatedTime: "5 min" },
  { subject: "geography", type: "vocabulary", ageBand: "8-11", title: "The Middle Line", instructions: "The imaginary line around the middle of the Earth, halfway between the North and South Poles.", vocabAnswer: "equator", estimatedTime: "5 min" },
  { subject: "geography", type: "vocabulary", ageBand: "12-14", title: "Wearing Away", instructions: "The gradual wearing away of rock and soil by wind, water, or ice, which then carries the material somewhere else.", vocabAnswer: "erosion", estimatedTime: "5 min" },
  { subject: "geography", type: "vocabulary", ageBand: "15-20", title: "Moving to the Cities", instructions: "The process by which a growing share of a population moves from the countryside to live in towns and cities, making those cities grow.", vocabAnswer: "urbanisation", estimatedTime: "5 min" },
];

export function getActivity(subject: string, type: ActivityType, band: ActivityBand): Activity | undefined {
  return ACTIVITIES.find((a) => a.subject === subject && a.type === type && a.ageBand === band);
}

// All bands for a subject+type, ordered easy → hard.
export function getActivities(subject: string, type: ActivityType): Activity[] {
  return ACTIVITY_BANDS
    .map((band) => getActivity(subject, type, band))
    .filter((a): a is Activity => Boolean(a));
}
