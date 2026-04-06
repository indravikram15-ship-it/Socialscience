/**
 * Social Science – Digital Interactive Book
 * script.js
 *
 * Content covers four chapters:
 *   1. Geography – Our Earth
 *   2. History – Ancient Civilisations
 *   3. Civics – Democratic Government
 *   4. Economics – Resources & Development
 *
 * Each chapter has:
 *   • A chapter-title page
 *   • 2-3 content pages
 *   • A mini-quiz page
 */

/* ============================================================
   BOOK CONTENT DATA
   ============================================================ */
const chapters = [
  /* ──────────────────────────── CHAPTER 1 ─────────────────────────────── */
  {
    number: 1,
    title: "Geography – Our Earth",
    icon: "🌍",
    intro: "Explore the physical features, climates, and natural resources that shape life on our planet.",
    pages: [
      {
        type: "content",
        title: "The Blue Planet",
        html: `
          <h2>The Blue Planet</h2>
          <p>Earth is the third planet from the Sun and the only known planet to support life. About <strong>71 %</strong> of its surface is covered by water, giving it its distinctive blue appearance from space.</p>
          <div class="two-col">
            <div>
              <h3>Major Landforms</h3>
              <ul>
                <li><strong>Mountains</strong> – formed by tectonic plate collisions</li>
                <li><strong>Plateaus</strong> – elevated flat land</li>
                <li><strong>Plains</strong> – flat, low-lying areas ideal for farming</li>
                <li><strong>Valleys</strong> – low land between hills or mountains</li>
              </ul>
            </div>
            <div>
              <h3>Water Bodies</h3>
              <ul>
                <li>Pacific Ocean – largest ocean</li>
                <li>Atlantic Ocean – second largest</li>
                <li>Arctic & Southern Oceans</li>
                <li>Seas, rivers, lakes &amp; glaciers</li>
              </ul>
            </div>
          </div>
          <div class="info-box">
            <strong>🌐 Did You Know?</strong>
            The Pacific Ocean is larger than all of Earth's landmass combined!
          </div>
        `
      },
      {
        type: "content",
        title: "Climate Zones",
        html: `
          <h2>Climate Zones</h2>
          <p>Climate describes the average weather conditions in a region over a long period. Earth is divided into broad <strong>climate zones</strong> based on temperature and rainfall.</p>
          <div class="img-frame">
            🗺️ Climate Zones Map
            <span class="img-label">Fig 1.1 – Climate Zones of the World</span>
          </div>
          <h3>Major Climate Zones</h3>
          <ul>
            <li><strong>Tropical</strong> – Hot and wet all year; near the equator</li>
            <li><strong>Arid / Desert</strong> – Very little rainfall; extreme temperatures</li>
            <li><strong>Temperate</strong> – Moderate temperatures; four distinct seasons</li>
            <li><strong>Polar</strong> – Extremely cold; ice and snow dominate</li>
            <li><strong>Mediterranean</strong> – Hot dry summers and mild wet winters</li>
          </ul>
          <div class="fact-box">
            <strong>🌡️ Interesting Fact</strong>
            The hottest temperature ever recorded on Earth was 56.7 °C (134 °F) in Death Valley, California (1913).
          </div>
        `
      },
      {
        type: "activity",
        title: "Match the Climate Zone",
        quizId: "geo-quiz",
        activityHtml: `
          <h2>Activity – Match the Climate Zone</h2>
          <p>Drag each <strong>description</strong> on the left and drop it onto the correct <strong>climate zone</strong> on the right.</p>
          <div class="activity-box" id="match-geo">
            <div class="match-grid">
              <div class="match-col">
                <h5>Descriptions</h5>
                <div class="match-item" draggable="true" data-id="A">Hot &amp; wet year-round</div>
                <div class="match-item" draggable="true" data-id="B">Very little rain, extreme heat</div>
                <div class="match-item" draggable="true" data-id="C">Four seasons, moderate temps</div>
                <div class="match-item" draggable="true" data-id="D">Covered in ice &amp; snow</div>
              </div>
              <div class="match-col">
                <h5>Climate Zones</h5>
                <div class="match-drop" data-answer="A">Tropical</div>
                <div class="match-drop" data-answer="B">Arid / Desert</div>
                <div class="match-drop" data-answer="C">Temperate</div>
                <div class="match-drop" data-answer="D">Polar</div>
              </div>
            </div>
          </div>
          <button class="quiz-trigger-btn" data-quiz="geo-quiz">📝 Take Chapter Quiz</button>
        `
      }
    ],
    quiz: {
      id: "geo-quiz",
      title: "Chapter 1 Quiz – Geography",
      questions: [
        {
          q: "What percentage of Earth's surface is covered by water?",
          options: ["51 %", "61 %", "71 %", "81 %"],
          answer: 2
        },
        {
          q: "Which is the largest ocean on Earth?",
          options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
          answer: 3
        },
        {
          q: "Which climate zone experiences hot dry summers and mild wet winters?",
          options: ["Tropical", "Mediterranean", "Polar", "Arid"],
          answer: 1
        }
      ]
    }
  },

  /* ──────────────────────────── CHAPTER 2 ─────────────────────────────── */
  {
    number: 2,
    title: "History – Ancient Civilisations",
    icon: "🏛️",
    intro: "Journey back thousands of years to discover the great civilisations that laid the foundations of modern society.",
    pages: [
      {
        type: "content",
        title: "Cradles of Civilisation",
        html: `
          <h2>Cradles of Civilisation</h2>
          <p>A <em>civilisation</em> is a complex human society with cities, governments, writing, and cultural traditions. The earliest civilisations developed near <strong>river valleys</strong> because rivers provided water for farming.</p>
          <div class="two-col">
            <div>
              <h3>Mesopotamia</h3>
              <p>Between the <strong>Tigris</strong> and <strong>Euphrates</strong> rivers (modern Iraq). Home of the Sumerians, one of the world's first writing systems – <em>cuneiform</em>.</p>
            </div>
            <div>
              <h3>Ancient Egypt</h3>
              <p>Along the <strong>Nile River</strong>. Famous for pyramids, hieroglyphics, and pharaohs. The Nile's annual floods deposited rich soil for agriculture.</p>
            </div>
          </div>
          <div class="two-col">
            <div>
              <h3>Indus Valley</h3>
              <p>Along the <strong>Indus River</strong> (modern Pakistan/India). Known for well-planned cities like Harappa and Mohenjo-daro.</p>
            </div>
            <div>
              <h3>Ancient China</h3>
              <p>Along the <strong>Huang He (Yellow River)</strong>. Origins of silk production, paper-making, and the world's oldest continuous culture.</p>
            </div>
          </div>
        `
      },
      {
        type: "content",
        title: "Timeline of Ancient History",
        html: `
          <h2>Timeline of Ancient History</h2>
          <p>Key milestones across the ancient world:</p>
          <ul class="timeline">
            <li><span class="tl-year">3500 BCE</span> First cities appear in Mesopotamia</li>
            <li><span class="tl-year">3100 BCE</span> Egypt unified under the first pharaoh</li>
            <li><span class="tl-year">2600 BCE</span> Great Pyramid of Giza constructed</li>
            <li><span class="tl-year">2500 BCE</span> Indus Valley cities at their peak</li>
            <li><span class="tl-year">1754 BCE</span> Hammurabi's Code – one of the oldest law codes</li>
            <li><span class="tl-year">1200 BCE</span> Decline of Bronze Age civilisations</li>
            <li><span class="tl-year">776 BCE</span> First Olympic Games in ancient Greece</li>
            <li><span class="tl-year">509 BCE</span> Roman Republic founded</li>
          </ul>
          <div class="fact-box">
            <strong>📜 Fascinating Fact</strong>
            The Great Wall of China stretches over 21,000 km – enough to circle Earth halfway!
          </div>
        `
      },
      {
        type: "activity",
        title: "Match the Civilisation",
        quizId: "hist-quiz",
        activityHtml: `
          <h2>Activity – Match the Civilisation</h2>
          <p>Drag each civilisation to its correct river.</p>
          <div class="activity-box" id="match-hist">
            <div class="match-grid">
              <div class="match-col">
                <h5>Civilisations</h5>
                <div class="match-item" draggable="true" data-id="A">Ancient Egypt</div>
                <div class="match-item" draggable="true" data-id="B">Mesopotamia</div>
                <div class="match-item" draggable="true" data-id="C">Indus Valley</div>
                <div class="match-item" draggable="true" data-id="D">Ancient China</div>
              </div>
              <div class="match-col">
                <h5>Rivers</h5>
                <div class="match-drop" data-answer="A">Nile River</div>
                <div class="match-drop" data-answer="B">Tigris &amp; Euphrates</div>
                <div class="match-drop" data-answer="C">Indus River</div>
                <div class="match-drop" data-answer="D">Huang He (Yellow River)</div>
              </div>
            </div>
          </div>
          <button class="quiz-trigger-btn" data-quiz="hist-quiz">📝 Take Chapter Quiz</button>
        `
      }
    ],
    quiz: {
      id: "hist-quiz",
      title: "Chapter 2 Quiz – Ancient Civilisations",
      questions: [
        {
          q: "Which writing system was developed by the Sumerians in Mesopotamia?",
          options: ["Hieroglyphics", "Cuneiform", "Sanskrit", "Latin"],
          answer: 1
        },
        {
          q: "On which river did Ancient Egyptian civilisation develop?",
          options: ["Tigris", "Indus", "Nile", "Huang He"],
          answer: 2
        },
        {
          q: "In which year was the Roman Republic founded?",
          options: ["776 BCE", "509 BCE", "1754 BCE", "3100 BCE"],
          answer: 1
        }
      ]
    }
  },

  /* ──────────────────────────── CHAPTER 3 ─────────────────────────────── */
  {
    number: 3,
    title: "Civics – Democratic Government",
    icon: "🏛️",
    intro: "Understand how governments work, what democracy means, and the rights and duties of citizens.",
    pages: [
      {
        type: "content",
        title: "What is Democracy?",
        html: `
          <h2>What is Democracy?</h2>
          <p>The word <strong>democracy</strong> comes from the Greek words <em>demos</em> (people) and <em>kratos</em> (power). It is a system of government in which citizens have the power to choose their leaders and make decisions.</p>
          <h3>Core Principles</h3>
          <ul>
            <li><strong>Popular Sovereignty</strong> – ultimate authority belongs to the people</li>
            <li><strong>Rule of Law</strong> – everyone, including leaders, must follow the law</li>
            <li><strong>Separation of Powers</strong> – power divided among branches of government</li>
            <li><strong>Free &amp; Fair Elections</strong> – citizens choose leaders through voting</li>
            <li><strong>Fundamental Rights</strong> – rights like freedom of speech are protected</li>
          </ul>
          <div class="info-box">
            <strong>🗳️ Key Concept</strong>
            In a <em>representative democracy</em>, citizens elect representatives who make decisions on their behalf. India, the USA, and France are examples of representative democracies.
          </div>
        `
      },
      {
        type: "content",
        title: "Three Branches of Government",
        html: `
          <h2>Three Branches of Government</h2>
          <p>Most democracies divide government into <strong>three branches</strong> to prevent any single person or group from having too much power – a system called <em>checks and balances</em>.</p>
          <div class="two-col">
            <div>
              <h3>🏛️ Legislature</h3>
              <p>Makes laws. Examples: Parliament (India), Congress (USA), Bundestag (Germany).</p>
            </div>
            <div>
              <h3>⚖️ Judiciary</h3>
              <p>Interprets laws; ensures they follow the constitution. Examples: Supreme Court.</p>
            </div>
          </div>
          <div style="margin-top:8px;">
            <h3>🏢 Executive</h3>
            <p>Implements &amp; enforces laws. Includes the President, Prime Minister, and Cabinet ministers.</p>
          </div>
          <div class="fact-box">
            <strong>💡 Did You Know?</strong>
            India has the largest written Constitution in the world, with 448 articles and 12 schedules.
          </div>
        `
      },
      {
        type: "activity",
        title: "Rights & Duties Activity",
        quizId: "civics-quiz",
        activityHtml: `
          <h2>Activity – Rights &amp; Duties</h2>
          <p>Drag each statement to the correct category.</p>
          <div class="activity-box" id="match-civics">
            <div class="match-grid">
              <div class="match-col">
                <h5>Statements</h5>
                <div class="match-item" draggable="true" data-id="A">Freedom of speech</div>
                <div class="match-item" draggable="true" data-id="B">Pay your taxes</div>
                <div class="match-item" draggable="true" data-id="C">Right to education</div>
                <div class="match-item" draggable="true" data-id="D">Obey the law</div>
              </div>
              <div class="match-col">
                <h5>Categories</h5>
                <div class="match-drop" data-answer="A">Fundamental Right</div>
                <div class="match-drop" data-answer="B">Fundamental Duty</div>
                <div class="match-drop" data-answer="C">Fundamental Right</div>
                <div class="match-drop" data-answer="D">Fundamental Duty</div>
              </div>
            </div>
          </div>
          <button class="quiz-trigger-btn" data-quiz="civics-quiz">📝 Take Chapter Quiz</button>
        `
      }
    ],
    quiz: {
      id: "civics-quiz",
      title: "Chapter 3 Quiz – Democratic Government",
      questions: [
        {
          q: "What does the word 'democracy' literally mean?",
          options: ["Power of leaders", "Power of the people", "Rule of law", "Freedom of speech"],
          answer: 1
        },
        {
          q: "Which branch of government is responsible for making laws?",
          options: ["Executive", "Judiciary", "Legislature", "Military"],
          answer: 2
        },
        {
          q: "What principle ensures that everyone, including leaders, must follow the law?",
          options: ["Popular Sovereignty", "Separation of Powers", "Rule of Law", "Federalism"],
          answer: 2
        }
      ]
    }
  },

  /* ──────────────────────────── CHAPTER 4 ─────────────────────────────── */
  {
    number: 4,
    title: "Economics – Resources & Development",
    icon: "💰",
    intro: "Learn how countries use natural and human resources to grow their economies and improve people's lives.",
    pages: [
      {
        type: "content",
        title: "Types of Resources",
        html: `
          <h2>Types of Resources</h2>
          <p>A <strong>resource</strong> is anything that is useful to people and can be used to satisfy needs. Resources can be broadly classified as:</p>
          <div class="two-col">
            <div>
              <h3>🌱 Natural Resources</h3>
              <ul>
                <li>Renewable – solar energy, wind, water</li>
                <li>Non-renewable – coal, petroleum, natural gas</li>
                <li>Biotic – forests, animals, fish</li>
                <li>Abiotic – minerals, soil, air</li>
              </ul>
            </div>
            <div>
              <h3>👥 Human Resources</h3>
              <ul>
                <li>Labour – physical and mental work</li>
                <li>Skills &amp; education</li>
                <li>Entrepreneurship – organising production</li>
                <li>Capital – man-made tools and machinery</li>
              </ul>
            </div>
          </div>
          <div class="info-box">
            <strong>♻️ Sustainability</strong>
            Using resources wisely so future generations can also meet their needs is called <em>sustainable development</em>.
          </div>
        `
      },
      {
        type: "content",
        title: "Economic Sectors",
        html: `
          <h2>Economic Sectors</h2>
          <p>Economic activities are grouped into <strong>three sectors</strong> depending on how closely they are linked to natural resources.</p>
          <h3>Primary Sector</h3>
          <p>Directly extracts or produces natural resources. Examples: farming, fishing, mining, forestry.</p>
          <h3>Secondary Sector</h3>
          <p>Transforms raw materials into finished goods. Examples: manufacturing, construction, electricity generation.</p>
          <h3>Tertiary Sector (Services)</h3>
          <p>Provides services rather than goods. Examples: trade, transport, banking, healthcare, education.</p>
          <div class="fact-box">
            <strong>📊 Interesting Fact</strong>
            In most developed countries, over 70 % of workers are employed in the tertiary (service) sector.
          </div>
          <div class="img-frame">
            📊 Economic Sector Diagram
            <span class="img-label">Fig 4.1 – Shift from Primary to Tertiary Sector</span>
          </div>
        `
      },
      {
        type: "activity",
        title: "Classify the Resource",
        quizId: "econ-quiz",
        activityHtml: `
          <h2>Activity – Classify the Resource</h2>
          <p>Drag each resource to the correct sector or type.</p>
          <div class="activity-box" id="match-econ">
            <div class="match-grid">
              <div class="match-col">
                <h5>Resources / Activities</h5>
                <div class="match-item" draggable="true" data-id="A">Farming</div>
                <div class="match-item" draggable="true" data-id="B">Banking</div>
                <div class="match-item" draggable="true" data-id="C">Car manufacturing</div>
                <div class="match-item" draggable="true" data-id="D">Coal mining</div>
              </div>
              <div class="match-col">
                <h5>Sectors</h5>
                <div class="match-drop" data-answer="A">Primary Sector</div>
                <div class="match-drop" data-answer="B">Tertiary Sector</div>
                <div class="match-drop" data-answer="C">Secondary Sector</div>
                <div class="match-drop" data-answer="D">Primary Sector</div>
              </div>
            </div>
          </div>
          <button class="quiz-trigger-btn" data-quiz="econ-quiz">📝 Take Chapter Quiz</button>
        `
      }
    ],
    quiz: {
      id: "econ-quiz",
      title: "Chapter 4 Quiz – Resources & Development",
      questions: [
        {
          q: "Which of the following is a renewable natural resource?",
          options: ["Coal", "Petroleum", "Solar energy", "Natural gas"],
          answer: 2
        },
        {
          q: "Which economic sector transforms raw materials into finished goods?",
          options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
          answer: 1
        },
        {
          q: "What term describes using resources wisely so future generations can also meet their needs?",
          options: ["Globalisation", "Privatisation", "Sustainable Development", "Industrialisation"],
          answer: 2
        }
      ]
    }
  }
];

/* ============================================================
   BUILD PAGES FROM DATA
   ============================================================ */

/** All "flat" page objects after unpacking chapters */
const allPages = [];

/** Map quiz-id → quiz data */
const quizMap = {};

chapters.forEach(ch => {
  // Chapter title page
  allPages.push({ chapterNum: ch.number, pageType: "chapter-title", data: ch });

  ch.pages.forEach(p => {
    allPages.push({ chapterNum: ch.number, pageType: p.type, data: p });
  });

  quizMap[ch.quiz.id] = ch.quiz;
});

/* ============================================================
   DOM HELPERS
   ============================================================ */
function el(id) { return document.getElementById(id); }

function buildPages() {
  const book = el("book");

  allPages.forEach((p, i) => {
    const div = document.createElement("div");
    div.classList.add("page");
    div.dataset.index = i;

    if (p.pageType === "chapter-title") {
      const ch = p.data;
      div.classList.add("page-chapter-title");
      div.innerHTML = `
        <div class="chapter-icon">${ch.icon}</div>
        <span class="chapter-number">Chapter ${ch.number}</span>
        <h1 class="chapter-title-text">${ch.title}</h1>
        <p class="chapter-intro">${ch.intro}</p>
      `;
    } else if (p.pageType === "content") {
      div.classList.add("page-content");
      div.innerHTML = p.data.html;
    } else if (p.pageType === "activity") {
      div.classList.add("page-content");
      div.innerHTML = p.data.activityHtml;
    }

    book.appendChild(div);
  });
}

/* ============================================================
   NAVIGATION
   ============================================================ */
let currentIndex = 0;

function goToPage(index) {
  const pages = document.querySelectorAll(".page");
  if (index < 0 || index >= pages.length) return;

  pages[currentIndex].classList.remove("active");
  currentIndex = index;
  pages[currentIndex].classList.add("active");

  el("prev-btn").disabled = currentIndex === 0;
  el("next-btn").disabled = currentIndex === pages.length - 1;
  el("page-indicator").textContent = `Page ${currentIndex + 1} of ${pages.length}`;

  // Wire up drag-and-drop and quiz buttons on this page
  initMatchActivity(pages[currentIndex]);
  initQuizTriggers(pages[currentIndex]);

  // Scroll book to top
  pages[currentIndex].scrollIntoView({ block: "nearest" });
}

/* ============================================================
   TABLE OF CONTENTS
   ============================================================ */
function buildTOC() {
  const list = el("toc-list");

  // Keep track of position in allPages to find chapter title pages
  allPages.forEach((p, i) => {
    const li = document.createElement("li");
    if (p.pageType === "chapter-title") {
      li.classList.add("toc-chapter");
      li.textContent = `Chapter ${p.data.number}: ${p.data.title}`;
    } else {
      li.classList.add("toc-page");
      const label = p.data.title || (p.pageType === "activity" ? "Activity" : "Content");
      li.textContent = label;
      li.addEventListener("click", () => {
        goToPage(i);
        closeTOC();
      });
    }
    list.appendChild(li);
  });
}

function openTOC()  { el("toc-drawer").classList.remove("closed"); el("toc-overlay").classList.add("visible"); }
function closeTOC() { el("toc-drawer").classList.add("closed");    el("toc-overlay").classList.remove("visible"); }

/* ============================================================
   DRAG-AND-DROP MATCHING ACTIVITY
   ============================================================ */
let draggedItem = null;

function initMatchActivity(pageEl) {
  const items = pageEl.querySelectorAll(".match-item");
  const drops = pageEl.querySelectorAll(".match-drop");

  items.forEach(item => {
    item.addEventListener("dragstart", e => {
      draggedItem = item;
      item.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      draggedItem = null;
    });
  });

  drops.forEach(drop => {
    drop.addEventListener("dragover", e => {
      e.preventDefault();
      if (!drop.classList.contains("correct")) drop.classList.add("drag-over");
    });
    drop.addEventListener("dragleave", () => drop.classList.remove("drag-over"));
    drop.addEventListener("drop", e => {
      e.preventDefault();
      drop.classList.remove("drag-over");
      if (!draggedItem || drop.classList.contains("correct")) return;

      const droppedId = draggedItem.dataset.id;
      const expectedId = drop.dataset.answer;

      if (droppedId === expectedId) {
        drop.classList.add("correct");
        draggedItem.classList.add("matched");
        draggedItem.setAttribute("draggable", "false");
        // Place label inside drop
        drop.textContent = drop.textContent + " ✓";
      } else {
        drop.classList.add("wrong");
        setTimeout(() => drop.classList.remove("wrong"), 800);
      }
    });
  });
}

/* ============================================================
   QUIZ MODAL
   ============================================================ */
let currentQuiz = null;
let selectedAnswers = {};

function openQuiz(quizId) {
  const quiz = quizMap[quizId];
  if (!quiz) return;
  currentQuiz = quiz;
  selectedAnswers = {};

  el("quiz-title").textContent = quiz.title;
  const body = el("quiz-body");
  body.innerHTML = "";
  el("quiz-result").classList.add("hidden");
  el("quiz-submit").disabled = false;
  el("quiz-submit").classList.remove("hidden");

  quiz.questions.forEach((q, qi) => {
    const block = document.createElement("div");
    block.innerHTML = `<p class="quiz-question"><strong>Q${qi + 1}.</strong> ${q.q}</p>`;
    const ul = document.createElement("ul");
    ul.classList.add("quiz-options");

    q.options.forEach((opt, oi) => {
      const li = document.createElement("li");
      li.textContent = opt;
      li.dataset.qi = qi;
      li.dataset.oi = oi;
      li.addEventListener("click", () => selectOption(li, qi, oi));
      ul.appendChild(li);
    });

    block.appendChild(ul);
    body.appendChild(block);
  });

  el("quiz-modal").classList.remove("hidden");
}

function selectOption(li, qi, oi) {
  // Deselect others in same question
  li.closest("ul").querySelectorAll("li").forEach(l => l.classList.remove("selected"));
  li.classList.add("selected");
  selectedAnswers[qi] = oi;
}

function submitQuiz() {
  if (!currentQuiz) return;

  const questions = currentQuiz.questions;
  let correct = 0;

  questions.forEach((q, qi) => {
    const options = document.querySelectorAll(`#quiz-body li[data-qi="${qi}"]`);
    options.forEach(li => {
      const oi = parseInt(li.dataset.oi, 10);
      if (oi === q.answer) li.classList.add("correct-answer");
      if (selectedAnswers[qi] === oi && oi !== q.answer) li.classList.add("wrong-answer");
    });
    if (selectedAnswers[qi] === q.answer) correct++;
  });

  const result = el("quiz-result");
  const pct = Math.round((correct / questions.length) * 100);
  result.textContent = `You scored ${correct} / ${questions.length} (${pct}%). ${pct >= 67 ? "Well done! 🎉" : "Keep practising! 📖"}`;
  result.className = "quiz-result " + (pct >= 67 ? "pass" : "fail");
  result.classList.remove("hidden");
  el("quiz-submit").classList.add("hidden");
}

function initQuizTriggers(pageEl) {
  pageEl.querySelectorAll(".quiz-trigger-btn").forEach(btn => {
    // Remove old listener by cloning
    const fresh = btn.cloneNode(true);
    btn.replaceWith(fresh);
    fresh.addEventListener("click", () => openQuiz(fresh.dataset.quiz));
  });
}

/* ============================================================
   OVERLAY FOR TOC
   ============================================================ */
function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "toc-overlay";
  document.body.appendChild(overlay);
  overlay.addEventListener("click", closeTOC);
}

/* ============================================================
   INITIALISE
   ============================================================ */
function init() {
  buildPages();
  buildTOC();
  createOverlay();

  // Show first page
  goToPage(0);

  // Cover → Book
  el("open-book-btn").addEventListener("click", () => {
    el("cover-screen").classList.add("hidden");
    el("app").classList.remove("hidden");
  });

  // Book → Cover
  el("cover-btn").addEventListener("click", () => {
    el("app").classList.add("hidden");
    el("cover-screen").classList.remove("hidden");
  });

  // Navigation
  el("prev-btn").addEventListener("click", () => goToPage(currentIndex - 1));
  el("next-btn").addEventListener("click", () => goToPage(currentIndex + 1));

  // Keyboard navigation
  document.addEventListener("keydown", e => {
    if (el("quiz-modal") && !el("quiz-modal").classList.contains("hidden")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") goToPage(currentIndex + 1);
    if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goToPage(currentIndex - 1);
  });

  // TOC toggle
  el("toc-toggle").addEventListener("click", () => {
    el("toc-drawer").classList.contains("closed") ? openTOC() : closeTOC();
  });

  // Quiz modal controls
  el("quiz-close").addEventListener("click", () => el("quiz-modal").classList.add("hidden"));
  el("quiz-submit").addEventListener("click", submitQuiz);
  el("quiz-modal").addEventListener("click", e => {
    if (e.target === el("quiz-modal")) el("quiz-modal").classList.add("hidden");
  });
}

document.addEventListener("DOMContentLoaded", init);
