// Demo seed for the UNLEASHED classroom.
// Idempotent: creates four authored course companions + a school-day schedule,
// enrollments, gradebook entries and meetings the first time a learner loads
// the classroom, so the product ships alive instead of empty.

import { prisma } from "./prisma";
import type { Companion } from "./types";

function todayInChicago(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const pick = (t: string) => parts.find((p) => p.type === t)?.value || "";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

// ---------------- Authored companions ----------------

const biology: Companion = {
  title: "Biology: The Cell — Basic Unit of Life",
  subtitle: "Grade 8 · Structures, energy, and division in living cells",
  overview:
    "Every living thing — from a bacterium to a blue whale — is built from cells. A cell is the smallest unit that can carry out the processes of life: growth, response, energy use, and reproduction. This companion takes you from the idea that the cell is life's basic unit, through the jobs of key organelles, to how cells release energy and how they divide so organisms can grow and repair. You will practice explaining structures in terms of their function, and you will read a short source excerpt that frames what state instruction requires at this grade. The work is formative: it builds evidence of reasoning, not a certified grade.",
  alignment: {
    state: "Arizona",
    grade: "8",
    area: "Science",
    statute: "Arizona Science Standards § HS + Grade 8 progression",
    authority: "Arizona State Board of Education",
    note:
      "The selected statute establishes an instructional area; it does not by itself provide complete curricular standards or state approval. Review instructional accuracy and local requirements before adoption.",
  },
  learningObjectives: [
    "Explain why the cell is considered the basic unit of life.",
    "Identify the nucleus, cell membrane, and mitochondrion and describe the function of each.",
    "Describe how cells release usable energy through cellular respiration.",
    "Compare how cells divide for growth versus for replacement.",
    "Use a source excerpt to distinguish a statutory instructional area from detailed standards.",
  ],
  sections: [
    {
      title: "The Cell: Basic Unit of Life",
      lesson:
        "All living things are made of cells, and cells are the smallest units that can carry out life processes such as growth, reproduction, and energy production. Some organisms are a single cell; others, like you, are trillions of cells working together. Every cell has a boundary — the cell membrane — that controls what enters and leaves. Inside, most cells have a nucleus that holds genetic material (DNA) and directs what the cell does. The key insight is structure supports function: the shape and parts of a cell make specific jobs possible. A cell is not a bag of parts; it is an organized system where each component has a role. When you study a cell, ask not only 'what is it?' but 'what does it do, and how does its structure let it do that?'",
      workedExample:
        "A red blood cell has no nucleus when mature. That structure is not a defect — it creates more room for hemoglobin, the protein that carries oxygen. Removing the nucleus is a functional trade-off: the cell can carry more oxygen but can no longer divide or repair itself. This shows structure supporting function at the cellular level.",
      checks: [
        "Which part of the cell controls what the cell does, and what evidence from its structure supports your answer?",
        "Why is the cell membrane described as a boundary rather than a wall?",
        "A cell is called 'the basic unit of life.' Explain what 'unit' means in this sentence.",
      ],
    },
    {
      title: "Organelles and Their Jobs",
      lesson:
        "Inside a cell, specialized structures called organelles do particular jobs. The nucleus stores DNA and directs the cell's activities. The mitochondrion (plural: mitochondria) releases usable energy. The cell membrane controls the passage of materials in and out. Think of a cell as a small factory: each organelle is a workstation with a task, and the membrane is the shipping dock. Organelles are not decorative — their structure matches their job. The folded inner membrane of a mitochondrion, for example, gives it a large surface area for the reactions that release energy. When an organelle is damaged, the whole cell can struggle, because the system depends on each part doing its work.",
      workedExample:
        "The nucleus is enclosed by its own membrane with pores. The pores let instructions (messenger molecules) leave the nucleus while keeping the DNA safely inside. The structure — a membrane with selective pores — directly enables the function of sending instructions without losing the master code.",
      checks: [
        "If a cell's mitochondria stopped working, which life process would be most affected, and why?",
        "How does the folded inner membrane of a mitochondrion support its function?",
        "Two organelles are described as 'membrane-bound.' Why might a membrane be important to an organelle's job?",
      ],
    },
    {
      title: "Energy and the Mitochondrion",
      lesson:
        "Cells need a steady supply of usable energy to stay alive. The mitochondrion releases this energy through cellular respiration: it breaks down glucose using oxygen to produce ATP, the molecule that powers cell work. ATP is like a charged battery — when a cell contracts a muscle or builds a protein, it spends ATP. The connection between structure and function appears again: cells that do a lot of work, like muscle cells, contain many mitochondria. Energy flow is one-directional at the cell level: glucose and oxygen go in, ATP and waste (carbon dioxide, water) come out. Understanding this exchange helps explain why you breathe harder during exercise — your cells are demanding more oxygen to make more ATP.",
      workedExample:
        "A sprinter's leg muscle cells contain far more mitochondria than a skin cell of the same person. The muscle cell must release large amounts of energy quickly to contract; the extra mitochondria provide the ATP that work requires. Skin cells, which divide often but do little heavy work, need fewer.",
      checks: [
        "In one sentence, relate oxygen, glucose, and ATP in cellular respiration.",
        "Why do muscle cells contain more mitochondria than skin cells?",
        "A poison blocks the mitochondrion's inner membrane. Predict the effect on the cell and justify it.",
      ],
    },
    {
      title: "Cells Divide and Specialize",
      lesson:
        "Cells divide so organisms can grow and so damaged tissue can be replaced. In division, one cell becomes two, each with a copy of the genetic instructions. A single fertilized cell becomes a person through repeated division, but not all cells stay the same — they specialize. A nerve cell looks and behaves nothing like a muscle cell, yet both carry the same DNA. Specialization happens because different cells use different parts of their genetic instructions. Division for growth and division for repair are both essential: without growth, you would never develop; without repair, small injuries would never heal. Understanding division and specialization explains how one set of instructions builds the many cell types in a body.",
      workedExample:
        "A cut on your finger heals because skin cells near the wound divide to replace what was lost, then specialize back into skin — not into muscle or nerve. The cells follow their existing instructions; they do not switch type. This is why a shallow cut restores skin, not a random tissue.",
      checks: [
        "How can a nerve cell and a muscle cell carry the same DNA yet look and behave differently?",
        "Give one reason division for growth and division for repair are both necessary.",
        "After a cut heals, the new tissue is skin, not muscle. Use specialization to explain why.",
      ],
    },
  ],
  independentPractice: [
    "Draw a labeled cell and write one function next to each labeled part.",
    "Explain in your own words why the cell is called the basic unit of life.",
    "Describe what would happen to a cell if its membrane stopped working.",
    "Compare the jobs of the nucleus and the mitochondrion in two sentences.",
    "Use the word 'ATP' in a sentence that explains what a cell does with energy.",
    "Give an everyday analogy for the cell membrane and justify your choice.",
    "Predict which organelle would be most active in a cell that secretes a lot of material, and why.",
    "Write one question about cells that this companion has not answered.",
  ],
  appliedProject: {
    title: "Cell as a System: Structure–Function Model",
    brief:
      "Build a model (labeled diagram, 3-D, or coded simulation) of a cell that shows how at least three structures support specific functions. Annotate each structure with its job and with one piece of evidence for why its shape or composition enables that job.",
    deliverables: [
      "A labeled model showing the nucleus, mitochondrion, and cell membrane.",
      "A written explanation (150–200 words) connecting each structure's shape to its function.",
      "One trade-off or limitation your model reveals about the cell as a system.",
    ],
  },
  glossary: [
    { term: "Cell", definition: "The smallest unit that can carry out life processes." },
    { term: "Cell membrane", definition: "The boundary that controls what enters and leaves a cell." },
    { term: "Nucleus", definition: "The organelle that stores DNA and directs the cell's activities." },
    { term: "Mitochondrion", definition: "The organelle that releases usable energy as ATP." },
    { term: "ATP", definition: "The molecule that stores and delivers energy for cell work." },
    { term: "Cellular respiration", definition: "The process that breaks down glucose using oxygen to produce ATP." },
    { term: "Organelle", definition: "A specialized structure inside a cell that performs a specific job." },
    { term: "Specialization", definition: "The process by which cells use different parts of their DNA to become distinct cell types." },
  ],
  familyNote:
    "Ask your learner to teach you one cell part and its job using a household object as an analogy. If they can explain it simply, they understand it.",
  sources: [
    "Arizona Science Standards § Grade 8 progression (instructional area only, not full standards).",
    "Standards-authority context: Arizona State Board of Education.",
  ],
};

const algebra: Companion = {
  title: "Algebra I: Linear Equations & Graphs",
  subtitle: "Grade 9 · Slope, intercepts, and the straight line",
  overview:
    "A linear equation describes a constant rate of change — the simplest kind of relationship between two quantities. This companion builds from translating words into expressions, to solving linear equations, to graphing straight lines using slope and intercepts. The central idea is that a line's slope tells you how fast one quantity changes with another, and the intercepts tell you where the relationship starts. You will practice moving between four representations: words, equations, tables, and graphs. The work is formative: each check builds evidence of reasoning, not a recorded grade.",
  alignment: {
    state: "Arizona",
    grade: "9",
    area: "Mathematics",
    statute: "Arizona Mathematics Standards § Algebra I",
    authority: "Arizona State Board of Education",
    note:
      "The selected statute establishes an instructional area; it does not by itself provide complete curricular standards or state approval. Review instructional accuracy and local requirements before adoption.",
  },
  learningObjectives: [
    "Translate a word problem into a linear equation.",
    "Solve a linear equation in one variable and check the solution.",
    "Identify slope and intercepts from an equation, a table, and a graph.",
    "Graph a linear equation using slope-intercept form.",
    "Interpret slope as a rate of change in a real context.",
  ],
  sections: [
    {
      title: "From Words to Equations",
      lesson:
        "Algebra begins with translation: turning a description in words into a statement with variables and numbers. A variable is a placeholder for an unknown quantity. The skill is to read carefully, name what you do not know, and write the relationship exactly as described. 'A number plus five is twelve' becomes x + 5 = 12. The equation is not the answer; it is the question written in a form you can work with. Mistakes in translation are the most common source of errors, so slow down at this step. Underline quantities, circle the verb that means 'equals,' and assign a variable before doing any arithmetic.",
      workedExample:
        "Problem: Three more than twice a number is eleven. Let n be the number. 'Twice a number' is 2n; 'three more than' that is 2n + 3; 'is eleven' gives 2n + 3 = 11. Solving: 2n = 8, so n = 4. Check: twice 4 is 8, plus 3 is 11. ✓",
      checks: [
        "Write 'five less than a number is nine' as an equation, defining your variable.",
        "Why is it important to define your variable before writing the equation?",
        "Translate 'a number doubled, then reduced by four, equals ten' and explain each part.",
      ],
    },
    {
      title: "Solving Linear Equations",
      lesson:
        "Solving an equation means finding the value (or values) of the variable that make the statement true. The guiding principle is balance: whatever you do to one side, do to the other. You isolate the variable by undoing operations in reverse order — addition first, then multiplication. Always check your solution by substituting back into the original equation. A linear equation in one variable has one solution, no solution, or infinitely many (when both sides are identical). Recognizing which case you have is part of understanding, not just computing.",
      workedExample:
        "Solve 3x - 7 = 14. Add 7 to both sides: 3x = 21. Divide both sides by 3: x = 7. Check: 3(7) - 7 = 21 - 7 = 14. ✓ The solution is x = 7.",
      checks: [
        "Solve 2(x + 4) = 18 and show your check.",
        "How can you tell whether an equation has no solution or infinitely many solutions?",
        "Explain why the order of undoing operations matters when isolating a variable.",
      ],
    },
    {
      title: "Slope and Rate of Change",
      lesson:
        "Slope measures how steeply a line rises or falls: the change in y divided by the change in x between two points. Slope is a rate of change — it tells you how much the output changes for each unit of input. A positive slope rises left-to-right; a negative slope falls; a zero slope is flat. Slope-intercept form, y = mx + b, makes the rate of change visible: m is the slope and b is the y-intercept (where the line crosses the y-axis). Reading slope from an equation, a table, or a graph are three views of the same idea. In a real context, slope has units — dollars per hour, meters per second — and interpreting it is as important as computing it.",
      workedExample:
        "A taxi charges $3 to start plus $2 per mile. Cost C = 2m + 3. The slope 2 means each mile adds $2; the intercept 3 is the starting charge. After 5 miles: C = 2(5) + 3 = $13.",
      checks: [
        "What does the slope of a line tell you, in your own words?",
        "A line has equation y = -4x + 7. Identify its slope and y-intercept and say what each means.",
        "Give a real-world example where the slope would be negative, and justify it.",
      ],
    },
    {
      title: "Graphing Linear Equations",
      lesson:
        "A linear equation graphs as a straight line, and any straight line is fully determined by two pieces of information: a point and a slope, or two points. Using y = mx + b, plot the y-intercept first, then use the slope to find a second point — rise over run — and draw the line through them. The x-intercept is where the line crosses the x-axis (set y = 0 and solve). Graphs reveal what algebra hides: whether two lines are parallel (same slope, different intercept), where they cross (the solution to a system), and whether a relationship is increasing or decreasing. Moving fluently between equation and graph is a core algebra skill.",
      workedExample:
        "Graph y = (1/2)x - 1. The y-intercept is (0, -1); plot it. Slope 1/2 means up 1, right 2: from (0,-1) go to (2, 0). Draw the line through (0,-1) and (2,0). The x-intercept is (2, 0).",
      checks: [
        "Describe the steps to graph a line using slope-intercept form.",
        "Two lines have the same slope but different y-intercepts. What is true about their graphs?",
        "How would you find the x-intercept of y = 3x - 9, and what does it represent?",
      ],
    },
  ],
  independentPractice: [
    "Translate 'twice a number decreased by six equals ten' and solve it.",
    "Solve 5x + 2 = 2x + 14 and check your solution.",
    "Find the slope of the line through (1, 3) and (4, 12).",
    "Write the equation of a line with slope -2 and y-intercept 5.",
    "Graph y = 3x - 6 and label both intercepts.",
    "A phone plan costs $20 per month plus $0.10 per text. Write the cost equation.",
    "Determine whether y = 2x + 1 and y = 2x - 4 intersect, and explain why.",
    "Write a word problem whose solution is the equation 4x = 24.",
  ],
  appliedProject: {
    title: "Rate of Change in Real Life",
    brief:
      "Choose a real linear relationship (cost over time, distance over speed, savings over weeks). Collect or estimate data, write its equation in slope-intercept form, graph it, and interpret the slope and intercept in context.",
    deliverables: [
      "A table of at least four data points and the equation that models them.",
      "A graph with both axes labeled and the line drawn.",
      "A one-paragraph interpretation of what the slope and intercept mean in your context.",
    ],
  },
  glossary: [
    { term: "Variable", definition: "A symbol that represents an unknown quantity." },
    { term: "Equation", definition: "A statement that two expressions are equal." },
    { term: "Solution", definition: "A value of the variable that makes an equation true." },
    { term: "Slope", definition: "The ratio of the change in y to the change in x; a rate of change." },
    { term: "y-intercept", definition: "The y-coordinate of the point where a line crosses the y-axis." },
    { term: "Slope-intercept form", definition: "y = mx + b, where m is slope and b is the y-intercept." },
    { term: "Rate of change", definition: "How much one quantity changes per unit of another." },
    { term: "x-intercept", definition: "The x-coordinate of the point where a line crosses the x-axis." },
  ],
  familyNote:
    "Pick a bill or a measurement at home and ask your learner to write its linear equation. If they can name the slope and intercept, they have the idea.",
  sources: [
    "Arizona Mathematics Standards § Algebra I (instructional area only, not full standards).",
    "Standards-authority context: Arizona State Board of Education.",
  ],
};

const english: Companion = {
  title: "English II: Argumentative Reading & Writing",
  subtitle: "Grade 10 · Claims, evidence, and commentary",
  overview:
    "An argument is not an opinion shouted louder; it is a claim supported by evidence and explained by commentary. This companion trains you to read arguments for their structure — claim, evidence, commentary — and to write your own with the same backbone. You will learn to distinguish a claim from a fact, to choose evidence that actually supports the claim, and to write commentary that connects the two rather than restating the obvious. The work moves from analyzing short texts to drafting a focused argumentative paragraph. The checks are formative: they build evidence of your reasoning as a reader and writer.",
  alignment: {
    state: "Arizona",
    grade: "10",
    area: "English Language Arts",
    statute: "Arizona English Language Arts Standards § Grade 9–10",
    authority: "Arizona State Board of Education",
    note:
      "The selected statute establishes an instructional area; it does not by itself provide complete curricular standards or state approval. Review instructional accuracy and local requirements before adoption.",
  },
  learningObjectives: [
    "Distinguish a claim from a fact and from an opinion.",
    "Identify claim, evidence, and commentary in an argumentative text.",
    "Select evidence that genuinely supports a given claim.",
    "Write commentary that connects evidence to a claim without restating it.",
    "Revise a paragraph to strengthen the claim–evidence–commentary structure.",
  ],
  sections: [
    {
      title: "What an Argument Is",
      lesson:
        "An argument has three moving parts. A claim is the position you want the reader to accept — it must be debatable, not a fact. Evidence is the specific information you use to support the claim: a quotation, a statistic, an example. Commentary is your explanation of how the evidence supports the claim; it is the thinking that links them. Many writers drop evidence without commentary and assume the reader will make the connection. A strong writer makes the connection explicit. Reading for these three parts trains you to write them. When you read an argument, label each sentence: is it claim, evidence, or commentary?",
      workedExample:
        "Claim: School should start later. Evidence: 'A 2014 study found teens whose schools started after 8:30 slept 30 more minutes per night.' Commentary: Starting later lets teens sleep more, which research links to better attention and mood — so a later start directly serves the school's own goal of learning. The commentary does the work the evidence alone cannot.",
      checks: [
        "In one sentence, what is the difference between a claim and a fact?",
        "Label these as claim, evidence, or commentary: 'Homework should be capped.' / 'A 2019 survey showed students with 2+ hours had more stress.' / 'Capping homework would lower stress without hurting achievement.'",
        "Why is 'Water boils at 100°C' not a claim?",
      ],
    },
    {
      title: "Reading for Structure",
      lesson:
        "Skilled readers read arguments twice: first for the claim, then for the structure. Find the thesis — the sentence that states the main position. Then trace the evidence the writer offers and the commentary that explains it. Watch for weak links: evidence that does not actually support the claim, or commentary that merely repeats the evidence in different words. A common flaw is the 'dropped quote': a quotation appears with no explanation of why it matters. Reading for structure makes these flaws visible and teaches you to avoid them in your own writing. Annotate as you go: underline the claim, box evidence, and circle commentary.",
      workedExample:
        "Text: 'Recess matters. One study found children with daily recess scored higher on attention tests. So schools should protect recess.' Claim = 'Recess matters' / 'schools should protect recess.' Evidence = the study. Commentary = 'So schools should protect recess' partially links it, but the writer never explains how attention scores connect to the school's purpose. The link is implied, not stated — a fixable weakness.",
      checks: [
        "What is a 'dropped quote,' and why is it a weakness?",
        "Name two signs that an argument's evidence does not support its claim.",
        "How does annotating claim, evidence, and commentary help you as a reader?",
      ],
    },
    {
      title: "Choosing Evidence",
      lesson:
        "Not all evidence is equal. Strong evidence is relevant (it actually bears on the claim), specific (named, not vague), and credible (from a source a reader can trust). When choosing evidence, ask: does this prove what I say it proves? A common error is selecting evidence that is true but off-topic. Quantity does not substitute for relevance; one precise, well-explained piece of evidence beats three loosely connected ones. If you cannot write commentary linking a piece of evidence to your claim, the evidence is probably the wrong choice. Choosing evidence is an act of judgment, not collection.",
      workedExample:
        "Claim: Reading fiction builds empathy. Weak evidence: 'Many people enjoy fiction' (true, but about enjoyment, not empathy). Strong evidence: 'A 2013 study found participants who read literary fiction scored higher on tests of identifying others' emotions.' The strong evidence directly measures empathy, so it supports the claim.",
      checks: [
        "List the three qualities of strong evidence and define each.",
        "Why might a true piece of evidence still fail to support a claim?",
        "Give an example of evidence that is specific and credible but not relevant.",
      ],
    },
    {
      title: "Writing the Argumentative Paragraph",
      lesson:
        "A focused argumentative paragraph follows a predictable shape: a topic sentence stating the claim, one or more pieces of evidence each followed by commentary, and a closing sentence that reinforces the claim or draws a consequence. Write the commentary immediately after the evidence — do not stack evidence and explain it all at the end, or the reader loses the link. Revise by asking of each sentence: does this advance the argument, or does it repeat? Strong paragraphs are not long; they are tight. Cut restatements and replace them with thinking.",
      workedExample:
        "Draft: 'Recess should be longer. Kids like it. A study says it helps attention. So make it longer.' Revision: 'Recess should be longer because it improves attention. A 2018 study found students with 30 minutes of recess scored 12% higher on attention tasks. Higher attention means more learning per class hour, so a longer recess directly serves academic goals.' The revision replaces a dropped quote and vague liking with a specific study and commentary that links attention to the school's purpose.",
      checks: [
        "Why should commentary follow evidence immediately rather than at the end?",
        "What question helps you decide whether a sentence advances the argument?",
        "Revise this so commentary links evidence to claim: 'Phones distract. 80% of teens check phones in class. So ban them.'",
      ],
    },
  ],
  independentPractice: [
    "Write a debatable claim about homework.",
    "Find a 'dropped quote' in a text you have read and explain the fix.",
    "List three pieces of evidence for a claim and rank them by relevance.",
    "Write a topic sentence for an argument about screen time.",
    "Identify the strongest evidence for: 'School uniforms improve focus.'",
    "Turn a fact into a claim by adding a debatable position.",
    "Write commentary for this evidence: 'Students who read 20 minutes a day score in the 90th percentile.'",
    "Revise a paragraph that stacks evidence without commentary.",
  ],
  appliedProject: {
    title: "Argumentative Paragraph Portfolio",
    brief:
      "Write two argumentative paragraphs on topics of your choice, each following the claim–evidence–commentary structure. Annotate each paragraph to label the claim, evidence, and commentary, and write a short reflection on one revision you made.",
    deliverables: [
      "Two polished paragraphs (100–150 words each) with clear claim–evidence–commentary.",
      "Annotated labels on each paragraph identifying the three parts.",
      "A 100-word reflection on one revision and why it strengthened the argument.",
    ],
  },
  glossary: [
    { term: "Claim", definition: "A debatable position a writer asks the reader to accept." },
    { term: "Evidence", definition: "Specific information used to support a claim." },
    { term: "Commentary", definition: "Explanation that connects evidence to a claim." },
    { term: "Fact", definition: "A statement that can be verified, not debated." },
    { term: "Thesis", definition: "The main claim of an essay or argument." },
    { term: "Relevance", definition: "The degree to which evidence bears on the claim." },
    { term: "Dropped quote", definition: "A quotation introduced without commentary explaining it." },
    { term: "Topic sentence", definition: "The sentence stating a paragraph's main idea." },
  ],
  familyNote:
    "Ask your learner to argue one position at dinner and to label, out loud, their claim, their evidence, and their commentary. It sharpens both thinking and speaking.",
  sources: [
    "Arizona English Language Arts Standards § Grade 9–10 (instructional area only, not full standards).",
    "Standards-authority context: Arizona State Board of Education.",
  ],
};

const history: Companion = {
  title: "U.S. History: Foundations to Reconstruction",
  subtitle: "Grade 11 · Constitution, early republic, and the rebuilding after the Civil War",
  overview:
    "This companion traces the United States from its constitutional foundations through the early republic and into the struggle of Reconstruction after the Civil War. The throughline is a question the nation kept revisiting: who counts as a citizen, and what rights does citizenship guarantee? You will read short source-bound contexts, practice explaining cause and consequence, and weigh evidence the way historians do — not to memorize a date, but to argue from it. The work is formative: each check builds evidence of historical reasoning, not a certified grade.",
  alignment: {
    state: "Arizona",
    grade: "11",
    area: "Social Studies",
    statute: "Arizona History and Social Science Standards § High School",
    authority: "Arizona State Board of Education",
    note:
      "The selected statute establishes an instructional area; it does not by itself provide complete curricular standards or state approval. Review instructional accuracy and local requirements before adoption.",
  },
  learningObjectives: [
    "Explain how the Constitution addressed weaknesses of the Articles of Confederation.",
    "Describe the debate between federal and state power in the early republic.",
    "Identify causes and consequences of the Civil War.",
    "Evaluate the goals and limits of Reconstruction.",
    "Use a primary-source excerpt to support a historical claim.",
  ],
  sections: [
    {
      title: "Constitutional Foundations",
      lesson:
        "The U.S. Constitution (1787) replaced the Articles of Confederation, which had created a national government too weak to tax, raise an army, or settle disputes between states. The Constitution's answer was a stronger federal structure with three branches — legislative, executive, judicial — each able to check the others. The Framers feared both monarchy and mob rule, so they built in balance: power divided between federal and state governments, and within the federal government, divided again. Understanding the Constitution means understanding a set of deliberate trade-offs: more federal power meant more capacity to act, but also more risk of overreach, which the checks were meant to restrain.",
      workedExample:
        "Under the Articles, Congress could ask states for money but could not compel payment; many states refused, and the national government nearly went bankrupt. The Constitution fixed this by giving Congress the power to tax directly. The trade-off: states gave up financial autonomy in exchange for a government that could actually function.",
      checks: [
        "Name one weakness of the Articles of Confederation and how the Constitution addressed it.",
        "Why did the Framers separate government into three branches?",
        "Give one example of a trade-off the Constitution made between power and restraint.",
      ],
    },
    {
      title: "Federal vs. State Power",
      lesson:
        "The tension between federal and state power defined the early republic and did not end with the Constitution. The Tenth Amendment reserved powers not given to the federal government to the states, but the line between them was contested from the start. Debates over a national bank, tariffs, and especially slavery turned this abstract question into regional conflict. A useful habit is to ask of any event: which level of government claimed authority, and who challenged that claim? The Civil War was, in one view, the violent resolution of a constitutional argument that compromise had failed to settle.",
      workedExample:
        "In 1832 South Carolina claimed the right to nullify a federal tariff within its borders; President Jackson asserted federal supremacy and threatened force. Congress compromised with a lower tariff, but the principle was clear: states could not unilaterally override federal law. Nullification foreshadowed the secession crisis three decades later.",
      checks: [
        "What does the Tenth Amendment reserve, and to whom?",
        "How did the nullification crisis reveal the federal–state tension?",
        "Why was the question of federal vs. state power hard to settle permanently?",
      ],
    },
    {
      title: "Causes and Consequences of the Civil War",
      lesson:
        "The Civil War (1861–1865) grew from a long conflict over slavery's expansion, states' rights, and the future of the nation's economy. Election of 1860 brought Abraham Lincoln to power on a platform opposing slavery's spread; southern states seceded, forming the Confederacy. The war's consequences were vast: slavery abolished via the Thirteenth Amendment, the Union preserved, and roughly 700,000 dead. Historians emphasize consequence over single cause: no one event caused the war, but a chain of unresolved disputes made violence increasingly likely. Practice stating cause and consequence precisely, and beware single-cause explanations.",
      workedExample:
        "The Emancipation Proclamation (1863) did not free every enslaved person — it applied to states in rebellion, where the Union could not yet enforce it. Its consequence was strategic and moral: it reframed the war as a fight against slavery, discouraging British recognition of the Confederacy, and it set the stage for the Thirteenth Amendment's total abolition.",
      checks: [
        "Give one cause and one consequence of the Civil War, stated precisely.",
        "Why do historians warn against single-cause explanations?",
        "What did the Emancipation Proclamation accomplish, and what did it not?",
      ],
    },
    {
      title: "Reconstruction and Its Limits",
      lesson:
        "Reconstruction (1865–1877) attempted to rebuild the South and redefine citizenship. The Thirteenth, Fourteenth, and Fifteenth Amendments abolished slavery, guaranteed birthright citizenship and equal protection, and protected Black men's voting rights. For a time, Black Americans held office and built institutions. But Reconstruction faced violence, white resistance, and waning northern commitment; the Compromise of 1877 withdrew federal troops, and southern states soon imposed segregation and disenfranchisement. The central historical question: why did a constitutional revolution fail to become a social one? Practice weighing evidence — laws, violence, economic dependence — rather than naming a single cause.",
      workedExample:
        "The Fourteenth Amendment guaranteed equal protection, yet by the 1890s 'Jim Crow' laws enforced segregation that courts upheld as 'separate but equal' (Plessy v. Ferguson, 1896). The Amendment's promise remained in the text but not in practice — showing that constitutional change does not by itself change social reality without enforcement.",
      checks: [
        "What did the Thirteenth, Fourteenth, and Fifteenth Amendments each accomplish?",
        "Give two reasons Reconstruction's promises were not fully realized.",
        "How does Plessy v. Ferguson illustrate the gap between amendment and practice?",
      ],
    },
  ],
  independentPractice: [
    "Explain one trade-off the Constitution made between power and restraint.",
    "Describe how the nullification crisis connected to later secession.",
    "State one cause and one consequence of the Civil War precisely.",
    "Summarize what the Fourteenth Amendment guaranteed.",
    "Give two reasons Reconstruction fell short of its goals.",
    "Write a one-sentence claim about federal vs. state power and list one piece of evidence.",
    "Explain why the Emancipation Proclamation's limits mattered.",
    "Pose one historical question this companion has not answered.",
  ],
  appliedProject: {
    title: "A Constitutional Question Across Time",
    brief:
      "Trace one constitutional question (federal vs. state power, citizenship, or equal protection) from the founding era to Reconstruction. Use at least two primary-source excerpts to show how the question changed, and argue why it remained unresolved.",
    deliverables: [
      "A timeline with at least four events and a one-line explanation of each.",
      "Two primary-source excerpts with citations and your analysis of each.",
      "A 200-word argument about why the question persisted rather than being settled.",
    ],
  },
  glossary: [
    { term: "Constitution", definition: "The 1787 frame of government replacing the Articles of Confederation." },
    { term: "Federalism", definition: "The division of power between national and state governments." },
    { term: "Checks and balances", definition: "Each branch's power to restrain the others." },
    { term: "Secession", definition: "A state's withdrawal from the Union, leading to the Civil War." },
    { term: "Emancipation Proclamation", definition: "1863 order reframing the war against slavery in rebellious states." },
    { term: "Reconstruction", definition: "1865–1877 effort to rebuild the South and redefine citizenship." },
    { term: "Fourteenth Amendment", definition: "Guarantees birthright citizenship and equal protection under law." },
    { term: "Jim Crow", definition: "Segregation laws imposed in the South after Reconstruction." },
  ],
  familyNote:
    "Pick a news story about a federal vs. state dispute and ask your learner to connect it to a moment from this companion. History repeats its arguments.",
  sources: [
    "Arizona History and Social Science Standards § High School (instructional area only, not full standards).",
    "Standards-authority context: Arizona State Board of Education.",
  ],
};

const COMPANIONS: Array<{ companion: Companion; grade: string; area: string; statute: string }> = [
  { companion: biology, grade: "8", area: "Science", statute: biology.alignment.statute },
  { companion: algebra, grade: "9", area: "Mathematics", statute: algebra.alignment.statute },
  { companion: english, grade: "10", area: "English Language Arts", statute: english.alignment.statute },
  { companion: history, grade: "11", area: "Social Studies", statute: history.alignment.statute },
];

// ---------------- Schedule template ----------------

type BlockTemplate = {
  blockType: string;
  title: string;
  start: string; // HH:mm
  end: string;
  courseIndex: number | null; // index into COMPANIONS, or null
  deficiencyFocus?: string;
};

const SCHEDULE: BlockTemplate[] = [
  { blockType: "ADVISORY", title: "Professor check-in and Day preview", start: "08:00", end: "08:15", courseIndex: null },
  { blockType: "LESSON", title: "Biology block", start: "08:15", end: "09:00", courseIndex: 0 },
  { blockType: "LESSON", title: "Algebra block", start: "09:05", end: "09:50", courseIndex: 1 },
  { blockType: "BREAK", title: "Morning break", start: "09:50", end: "10:05", courseIndex: null },
  { blockType: "LESSON", title: "English block", start: "10:05", end: "10:55", courseIndex: 2 },
  { blockType: "LESSON", title: "History block", start: "11:00", end: "11:45", courseIndex: 3 },
  { blockType: "LUNCH", title: "Lunch", start: "11:45", end: "12:30", courseIndex: null },
  {
    blockType: "REMEDIATION",
    title: "Targeted support · Linear equations",
    start: "12:30",
    end: "13:00",
    courseIndex: 1,
    deficiencyFocus: "Slope-intercept form — translating word problems to equations",
  },
  { blockType: "MEETING", title: "Co-host check-in", start: "13:00", end: "13:30", courseIndex: null },
];

const ENROLLMENT_META: Array<{ level: string; deficiencyFocus: string | null; priority: string }> = [
  { level: "On pace", deficiencyFocus: null, priority: "Low" },
  { level: "Approaching", deficiencyFocus: "Slope-intercept form — translating word problems to equations", priority: "High" },
  { level: "On pace", deficiencyFocus: "Linking evidence to claim with commentary", priority: "Medium" },
  { level: "On pace", deficiencyFocus: null, priority: "Low" },
];

const GRADEBOOK: Array<{ courseIndex: number; title: string; category: string; score: number; possible: number; status: string; feedback: string }> = [
  { courseIndex: 0, title: "Cell structures quiz", category: "Quiz", score: 9, possible: 10, status: "GRADED", feedback: "Strong on organelle function; review the membrane's role." },
  { courseIndex: 0, title: "Cell model project", category: "Project", score: 22, possible: 25, status: "GRADED", feedback: "Clear structure–function links; annotate the trade-off." },
  { courseIndex: 1, title: "Linear equations check", category: "Quiz", score: 6, possible: 10, status: "GRADED", feedback: "Translation from words needs practice; retry the practice set." },
  { courseIndex: 2, title: "Argumentative paragraph", category: "Writing", score: 17, possible: 20, status: "GRADED", feedback: "Good claim; deepen the commentary, do not restate evidence." },
  { courseIndex: 3, title: "Constitution short response", category: "Writing", score: null, possible: 20, status: "PENDING", feedback: "Awaiting submission." },
];

const MEETINGS: Array<{ courseIndex: number | null; title: string; start: string; end: string; room: string }> = [
  { courseIndex: null, title: "Co-host check-in", start: "13:00", end: "13:30", room: "Room 204 / virtual" },
  { courseIndex: 1, title: "Algebra office hours", start: "15:30", end: "16:00", room: "Room 112" },
];

// ---------------- Seed runner ----------------

export async function ensureDemoSeed(ownerId: string): Promise<void> {
  const existingCourses = await prisma.course.count({ where: { ownerId } });

  let courseIds: number[] = [];

  if (existingCourses === 0) {
    // First run: create courses + enrollments + grades + meetings + today's schedule.
    courseIds = [];
    for (let i = 0; i < COMPANIONS.length; i++) {
      const entry = COMPANIONS[i];
      const course = await prisma.course.create({
        data: {
          ownerId,
          state: entry.companion.alignment.state,
          area: entry.area,
          statute: entry.statute,
          grade: entry.grade,
          title: entry.companion.title,
          companionJson: JSON.stringify(entry.companion),
          model: "ZAI GLM-4.6",
          createdAt: new Date(Date.now() - (COMPANIONS.length - i) * 60000),
        },
      });
      courseIds.push(course.id);

      const meta = ENROLLMENT_META[i];
      await prisma.courseEnrollment.create({
        data: {
          ownerId,
          courseId: course.id,
          level: meta.level,
          deficiencyFocus: meta.deficiencyFocus,
          priority: meta.priority,
          enrolledAt: new Date().toISOString(),
        },
      });
    }

    // Gradebook.
    for (const g of GRADEBOOK) {
      await prisma.gradebookEntry.create({
        data: {
          ownerId,
          courseId: courseIds[g.courseIndex],
          title: g.title,
          category: g.category,
          score: g.score,
          possible: g.possible,
          status: g.status,
          feedback: g.feedback,
          gradedAt: g.status === "GRADED" ? new Date(Date.now() - 86400000) : null,
        },
      });
    }

    // Meetings.
    for (const m of MEETINGS) {
      await prisma.classroomMeeting.create({
        data: {
          ownerId,
          courseId: m.courseIndex === null ? null : courseIds[m.courseIndex],
          title: m.title,
          startsAt: m.start,
          endsAt: m.end,
          room: m.room,
          status: "SCHEDULED",
        },
      });
    }
  } else {
    // Subsequent runs: reuse existing courses (ordered by id ascending to match seed order).
    const rows = await prisma.course.findMany({
      where: { ownerId },
      orderBy: { id: "asc" },
      take: 4,
    });
    courseIds = rows.map((r) => r.id);
  }

  // Ensure today's schedule exists (re-seeds each new day so the demo stays current).
  const today = todayInChicago();
  const todayCount = await prisma.schoolScheduleBlock.count({
    where: { ownerId, schoolDate: today },
  });
  if (todayCount === 0 && courseIds.length > 0) {
    let sequence = 0;
    for (const block of SCHEDULE) {
      sequence += 1;
      const courseId =
        block.courseIndex === null ? null : courseIds[block.courseIndex] ?? null;
      await prisma.schoolScheduleBlock.create({
        data: {
          ownerId,
          schoolDate: today,
          courseId,
          blockType: block.blockType,
          title: block.title,
          startsAt: `${today}T${block.start}:00`,
          endsAt: `${today}T${block.end}:00`,
          status: "UPCOMING",
          deficiencyFocus: block.deficiencyFocus ?? null,
          sequence,
        },
      });
    }
  }
}
