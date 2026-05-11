import { useState, useEffect, useRef } from "react";

const TABS = [
  { id: "read", label: "📖 Read Chapter", icon: "📖" },
  { id: "summary", label: "📋 Chapter Summary", icon: "📋" },
  { id: "quiz", label: "🧠 Quiz", icon: "🧠" },
  { id: "mindmap", label: "🗺️ Mindmap", icon: "🗺️" },
  { id: "activity", label: "🎮 Learn & Fun Activity", icon: "🎮" },
  { id: "report", label: "📊 My Report Card", icon: "📊" },
  { id: "doubt", label: "💬 Ask Your Doubt", icon: "💬" },
];

const QUIZ_QUESTIONS = [
  {
    q: "What is Geographical Diversity?",
    options: [
      "Presence of different cultures only",
      "Presence of different landforms, climates, vegetation, and human adaptation",
      "Variety of languages spoken in India",
      "Different types of food eaten in India",
    ],
    answer: 1,
    explanation: "Geographical Diversity refers to the variety in physical features, climate, soil types, vegetation, and wildlife across a region.",
  },
  {
    q: "Which is the highest and innermost range of the Himalayas?",
    options: ["Shiwalik", "Himachal", "Himadri", "Vindhyas"],
    answer: 2,
    explanation: "Himadri (Greater Himalayas) is the highest and innermost range, with peaks above 6,000 meters like Mount Everest.",
  },
  {
    q: "Why are the Himalayas called the 'Water Tower of Asia'?",
    options: [
      "They have underground water tanks",
      "They receive the most rainfall in Asia",
      "They store snow that melts into rivers feeding millions",
      "They are the widest mountain range",
    ],
    answer: 2,
    explanation: "Himalayan glaciers like Gangotri store snow that melts and feeds major rivers like Ganga, Indus, and Brahmaputra.",
  },
  {
    q: "Which famous hill stations are found in the Himachal range?",
    options: [
      "Haridwar and Rishikesh",
      "Shimla, Mussoorie, and Darjeeling",
      "Gangotri and Kedarnath",
      "Patna and Varanasi",
    ],
    answer: 1,
    explanation: "Himachal (Lesser Himalayas) is known for beautiful hill stations like Shimla, Mussoorie, Darjeeling, and Nainital.",
  },
  {
    q: "The Northern Plains are formed by deposits from which rivers?",
    options: [
      "Krishna, Godavari, Cauvery",
      "Narmada, Tapti, Mahanadi",
      "Ganga, Yamuna, Brahmaputra",
      "Beas, Chenab, Ravi only",
    ],
    answer: 2,
    explanation: "The Northern Plains were formed by alluvial deposits from the Ganga, Yamuna, Brahmaputra and their tributaries.",
  },
  {
    q: "Which region is known as the 'Granary of India'?",
    options: ["Thar Desert", "Deccan Plateau", "Northern Plains", "Coastal Plains"],
    answer: 2,
    explanation: "The Northern Plains are called the Granary of India due to high crop productivity — wheat in Punjab, rice in Bengal, sugarcane in UP.",
  },
  {
    q: "What is the Shiwalik range also known as?",
    options: ["Greater Himalayas", "Middle Himalayas", "Outer Foothills / Outer Himalayas", "Tibetan Plateau"],
    answer: 2,
    explanation: "Shiwalik is the outermost range of the Himalayas, bordering the plains, also called the Outer Foothills.",
  },
  {
    q: "The Himalayas were formed by the collision of which two tectonic plates?",
    options: [
      "African Plate and Eurasian Plate",
      "Indo-Australian Plate and Eurasian Plate",
      "Pacific Plate and Indian Plate",
      "North American Plate and Asian Plate",
    ],
    answer: 1,
    explanation: "India (Indo-Australian plate) drifted north from Gondwana and collided with the Eurasian plate ~50 million years ago, creating the Himalayas.",
  },
];

const ACTIVITY_QUESTIONS = [
  {
    region: "🏔️ Himalayas",
    clues: ["Snow-covered peaks", "Woolen clothing", "Wooden houses", "Terrace farming"],
    answer: "himalaya",
    color: "#4a90d9",
  },
  {
    region: "🌾 Northern Plains",
    clues: ["Flat fertile land", "Alluvial soil", "Rice and wheat farming", "Dense population"],
    answer: "plains",
    color: "#7cb342",
  },
  {
    region: "🏜️ Thar Desert",
    clues: ["Hot and dry", "Camel transport", "Loose cotton clothes", "Water conservation"],
    answer: "desert",
    color: "#f9a825",
  },
  {
    region: "🌊 Coastal Areas",
    clues: ["Fish in diet", "Seafood trade", "Houses on stilts", "Near the sea"],
    answer: "coastal",
    color: "#00acc1",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("read");
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [activityStep, setActivityStep] = useState(0);
  const [activityInput, setActivityInput] = useState("");
  const [activityResult, setActivityResult] = useState(null);
  const [activityScore, setActivityScore] = useState(0);
  const [activityDone, setActivityDone] = useState(false);
  const [doubt, setDoubt] = useState("");
  const [doubts, setDoubts] = useState([]);
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [readSection, setReadSection] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.getElementById("main-scroll");
    if (el) el.scrollTop = 0;
  }, [activeTab, readSection]);

  const READ_SECTIONS = [
    {
      title: "What is Geographical Diversity?",
      emoji: "🌍",
      bg: "linear-gradient(135deg, #1a5276 0%, #154360 100%)",
      content: (
        <div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 24px", marginBottom: 20 }}>
            <h3 style={{ color: "#f7dc6f", margin: "0 0 15px", fontSize: 18 }}>🌍 About India</h3>
            <ul style={{ fontSize: 16, lineHeight: 2, margin: 0, paddingLeft: 25, color: "#e8f4fd" }}>
              <li><strong style={{ color: "#f7dc6f" }}>India</strong> is the <strong style={{ color: "#82e0aa" }}>7th largest country</strong> in the world and part of Asia.</li>
              <li>Along with neighbours like <strong style={{ color: "#f0b27a" }}>Pakistan, Nepal, Bhutan, Bangladesh, Sri Lanka, and Myanmar</strong>, it forms the <strong style={{ color: "#82e0aa" }}>Indian Subcontinent</strong>.</li>
            </ul>
          </div>
          <div style={{ background: "rgba(247,220,111,0.15)", border: "2px solid #f7dc6f", borderRadius: 16, padding: "20px 24px", marginBottom: 20 }}>
            <h3 style={{ color: "#f7dc6f", margin: "0 0 15px", fontSize: 18 }}>📚 Definition of Geographical Diversity</h3>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, marginBottom: 15 }}>
              <strong style={{ color: "#f7dc6f" }}>Geographical Diversity</strong> is the presence of different <em>landforms, climates, vegetation, and human adaptation</em> across a region.
            </p>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "15px", marginTop: 12 }}>
              <p style={{ margin: 0, fontSize: 15, color: "#82e0aa", marginBottom: 8 }}>
                <strong>🔥 Example:</strong> Hot deserts in <strong>Rajasthan</strong> (scorching heat, sparse vegetation, camel herding)
              </p>
              <p style={{ margin: 0, fontSize: 15, color: "#a9cce3" }}>
                <strong>❄️ Example:</strong> Snow-covered mountains in <strong>Kashmir</strong> (freezing cold, alpine vegetation, different lifestyle)
              </p>
            </div>
          </div>
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            <img src="./Screenshot 2026-05-11 165929.png" alt="Physical divisions map of India" style={{ width: "100%", maxWidth: 560, borderRadius: 18, border: "2px solid rgba(247,220,111,0.35)", boxShadow: "0 15px 40px rgba(0,0,0,0.18)" }} />
            <p style={{ marginTop: 12, color: "rgba(232,244,253,0.85)", fontSize: 14 }}>Map showing India’s major physical divisions, with the Himalayas, Northern Plains, Deccan Plateau, Western Ghats, and Eastern Ghats.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            {[
              { icon: "🏔️", label: "Mountains", ex: "Himalayas, Western Ghats" },
              { icon: "🌾", label: "Plains", ex: "Ganga, Indus Plains" },
              { icon: "🏜️", label: "Deserts", ex: "Thar Desert, Rajasthan" },
              { icon: "🏝️", label: "Islands", ex: "Andaman, Lakshadweep" },
            ].map((item) => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: "#f7dc6f", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>{item.ex}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(130,224,170,0.15)", border: "2px solid #82e0aa", borderRadius: 14, padding: "16px 20px" }}>
            <p style={{ margin: 0, fontSize: 15 }}>
              🌟 <strong style={{ color: "#82e0aa" }}>Fun Fact:</strong> India has <em>almost every major landform</em> on Earth — from snowy Himalayan peaks to tropical coastlines to scorching deserts! It's like a mini world!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "India's Major Physical Divisions",
      emoji: "🗺️",
      bg: "linear-gradient(135deg, #1e8449 0%, #145a32 100%)",
      content: (
        <div>
          <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 20, background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 16 }}>
            India is divided into <strong style={{ color: "#f7dc6f" }}>5 major physical divisions</strong>. Natural boundaries like the Himalayas, Thar Desert, Arabian Sea, Bay of Bengal, and Indian Ocean separate India from the rest of Asia.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { num: "01", name: "The Himalayan Mountains", icon: "🏔️", color: "#85c1e9", desc: "Highest mountain range, northern boundary" },
              { num: "02", name: "The Northern Plains", icon: "🌾", color: "#82e0aa", desc: "Ganga & Indus plains, most fertile land" },
              { num: "03", name: "The Desert Region", icon: "🏜️", color: "#f9e79f", desc: "Thar Desert, hot and arid landscape" },
              { num: "04", name: "The Southern Peninsula", icon: "⛰️", color: "#f0b27a", desc: "Deccan Plateau, Eastern & Western Ghats" },
              { num: "05", name: "The Islands", icon: "🏝️", color: "#a9cce3", desc: "Andaman & Nicobar, Lakshadweep" },
            ].map((div) => (
              <div key={div.num} style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 18px", borderLeft: `4px solid ${div.color}` }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: div.color, minWidth: 28 }}>{div.num}</span>
                <span style={{ fontSize: 28 }}>{div.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: div.color, fontSize: 16 }}>{div.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.8 }}>{div.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 16 }}>
            <h4 style={{ color: "#f7dc6f", margin: "0 0 12px" }}>🌏 Geography Shapes Lifestyle</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { region: "Mountains", lifestyle: "Wool clothing, wooden homes, terrace farming" },
                { region: "Deserts", lifestyle: "Cotton clothes, camels, water conservation" },
                { region: "Coastal", lifestyle: "Fish diet, stilt houses, seafood trade" },
                { region: "Plains", lifestyle: "Large-scale farming, dense settlements" },
              ].map((r) => (
                <div key={r.region} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ color: "#82e0aa", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{r.region}</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>{r.lifestyle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "The Himalayas – A Natural Wonder",
      emoji: "🏔️",
      bg: "linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)",
      content: (
        <div>
          <div style={{ background: "rgba(133,193,233,0.15)", border: "2px solid #85c1e9", borderRadius: 16, padding: 20, marginBottom: 20 }}>
            <h3 style={{ color: "#85c1e9", margin: "0 0 14px" }}>⛰️ Amazing Facts about the Himalayas</h3>
            {[
              { icon: "🏔️", title: "Eight Thousanders", desc: "Many peaks rise above 8,000 metres — among the world's highest!" },
              { icon: "🌍", title: "Across Six Nations", desc: "Spans India, Nepal, Bhutan, China, Pakistan, and Afghanistan" },
              { icon: "💧", title: "Water Tower of Asia", desc: "Feeds the Ganga, Indus, and Brahmaputra rivers" },
              { icon: "🙏", title: "Sacred Peaks", desc: "Dotted with temples and monasteries of deep spiritual value" },
            ].map((f) => (
              <div key={f.title} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, minWidth: 32 }}>{f.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#f7dc6f" }}>{f.title}</div>
                  <div style={{ fontSize: 14, opacity: 0.85 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(231,76,60,0.15)", border: "2px solid #e74c3c", borderRadius: 16, padding: 20 }}>
            <h3 style={{ color: "#e74c3c", margin: "0 0 14px" }}>🌋 How Were the Himalayas Formed?</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "India was once near Africa as part of the supercontinent Gondwana",
                "It moved north and collided with the Eurasian plate ~50 million years ago",
                "The land folded upwards like a wrinkled carpet, creating the Himalayas",
                "India still moves 5 cm/year — so the mountains grow 5 mm every year!",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 14px" }}>
                  <span style={{ background: "#e74c3c", color: "#fff", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Three Divisions of the Himalayas",
      emoji: "🗻",
      bg: "linear-gradient(135deg, #4a235a 0%, #2e1a47 100%)",
      content: (
        <div>
          <p style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 14, margin: "0 0 20px", fontSize: 15, lineHeight: 1.7 }}>
            The Himalayas are divided into <strong style={{ color: "#f7dc6f" }}>three parallel ranges</strong>, each with unique features.
          </p>
          {[
            {
              name: "1. Himadri", subtitle: "(Greater Himalayas)", color: "#85c1e9", altRange: "Above 6,000 m",
              features: ["Highest and innermost range", "Permanently snow-covered peaks", "Mt. Everest, Kanchenjunga, Nanda Devi", "Gangotri Glacier — source of the Ganga", "Few people live here due to extreme cold"],
            },
            {
              name: "2. Himachal", subtitle: "(Lesser Himalayas)", color: "#82e0aa", altRange: "3,700 – 4,500 m",
              features: ["Lies south of Himadri", "Moderate climate with forests", "Hill stations: Shimla, Mussoorie, Darjeeling, Nainital", "Supports biodiversity and human life", "Beautiful valleys ideal for agriculture"],
            },
            {
              name: "3. Shiwalik", subtitle: "(Outer Foothills)", color: "#f0b27a", altRange: "900 – 1,200 m",
              features: ["Lowest and outermost range", "Rolling hills and dense forests", "Dehradun and Haridwar at its feet", "Rich in wildlife", "Acts as transition zone to Northern Plains"],
            },
          ].map((range) => (
            <div key={range.name} style={{ background: "rgba(255,255,255,0.07)", border: `2px solid ${range.color}`, borderRadius: 16, padding: "18px 20px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <h3 style={{ color: range.color, margin: 0, fontSize: 18 }}>{range.name}</h3>
                  <div style={{ fontSize: 13, opacity: 0.7 }}>{range.subtitle}</div>
                </div>
                <div style={{ background: range.color + "33", border: `1px solid ${range.color}`, borderRadius: 8, padding: "4px 10px", fontSize: 12, color: range.color, fontWeight: 700 }}>{range.altRange}</div>
              </div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {range.features.map((f, i) => (
                  <li key={i} style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.9 }}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
          <div style={{ background: "rgba(247,220,111,0.15)", border: "2px solid #f7dc6f", borderRadius: 12, padding: "14px 18px" }}>
            <p style={{ margin: 0, fontSize: 14 }}>🏠 <strong style={{ color: "#f7dc6f" }}>Fun Fact:</strong> In the western Himalayas, people build earthquake-resistant homes called <strong>'Kath-kuni'</strong> or <strong>'Dhajji-dewari'</strong> — made with local stone and wood!</p>
          </div>
        </div>
      ),
    },
    {
      title: "Importance of the Himalayas",
      emoji: "🌟",
      bg: "linear-gradient(135deg, #1a5276 0%, #0e3460 100%)",
      content: (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            {[
              { icon: "🌍", title: "Geographical", color: "#85c1e9", desc: "Natural boundary between India and neighbouring countries. Feeds major rivers like Ganga and Yamuna." },
              { icon: "🌧️", title: "Climate", color: "#82e0aa", desc: "Blocks cold Arctic winds. Helps bring monsoon rains to India by intercepting moisture-laden clouds." },
              { icon: "🦁", title: "Biodiversity", color: "#f0b27a", desc: "Home to snow leopard, Himalayan blue poppy, and thousands of unique species of flora and fauna." },
              { icon: "💰", title: "Economic", color: "#f7dc6f", desc: "Rich in timber and herbs. Attracts millions of tourists, contributing significantly to the economy." },
              { icon: "🛡️", title: "Defence", color: "#e74c3c", desc: "Acts as a natural wall protecting India from external invasions and threats." },
              { icon: "💧", title: "Water Source", color: "#a9cce3", desc: "Glaciers are the source of perennial rivers that support agriculture and drinking water for millions." },
            ].map((item) => (
              <div key={item.title} style={{ background: "rgba(255,255,255,0.08)", border: `2px solid ${item.color}40`, borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: item.color, marginBottom: 6, fontSize: 14 }}>{item.title}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.85 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "The Northern Plains",
      emoji: "🌾",
      bg: "linear-gradient(135deg, #1e8449 0%, #0b5345 100%)",
      content: (
        <div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, marginBottom: 20 }}>
            <h3 style={{ color: "#82e0aa", margin: "0 0 12px" }}>🌊 Formation</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8 }}>
              The Northern Plains were formed by the <strong style={{ color: "#f7dc6f" }}>deposition of alluvium</strong> (fine fertile soil) carried by Himalayan rivers — Ganga, Yamuna, Indus, and Brahmaputra — over millions of years. This makes them <strong style={{ color: "#82e0aa" }}>highly fertile, flat, and densely populated</strong>.
            </p>
          </div>
          <h3 style={{ color: "#f7dc6f", margin: "0 0 12px" }}>Three Sub-regions:</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {[
              { region: "Punjab Plains", rivers: "Sutlej, Beas", states: "Punjab, Haryana", crops: "Wheat", color: "#f9e79f" },
              { region: "Ganga Plains", rivers: "Ganga, Yamuna", states: "UP, Bihar, West Bengal", crops: "Rice, Wheat, Jute", color: "#82e0aa" },
              { region: "Brahmaputra Plains", rivers: "Brahmaputra", states: "Assam", crops: "Tea, Rice", color: "#85c1e9" },
            ].map((sub) => (
              <div key={sub.region} style={{ display: "flex", gap: 14, background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 16px", borderLeft: `4px solid ${sub.color}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: sub.color, marginBottom: 4 }}>{sub.region}</div>
                  <div style={{ fontSize: 13, opacity: 0.85 }}>🏞️ {sub.states} &nbsp;|&nbsp; 💧 {sub.rivers} &nbsp;|&nbsp; 🌾 {sub.crops}</div>
                </div>
              </div>
            ))}
          </div>
          <h3 style={{ color: "#f7dc6f", margin: "0 0 12px" }}>🏆 Agricultural Significance</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { reason: "Alluvial Soil", desc: "Fine, fertile soil from rivers — perfect for crops" },
              { reason: "River Irrigation", desc: "Constant water supply from major river systems" },
              { reason: "Flat Land", desc: "Easy to plough, ideal for large-scale farming" },
              { reason: "Dense Population", desc: "Plenty of agricultural labour available" },
            ].map((r) => (
              <div key={r.reason} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ color: "#82e0aa", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{r.reason}</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{r.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(247,220,111,0.15)", border: "2px solid #f7dc6f", borderRadius: 12, padding: 14 }}>
            <p style={{ margin: 0, fontSize: 14 }}>⭐ <strong style={{ color: "#f7dc6f" }}>Fun Fact:</strong> The <strong>Ganga-Brahmaputra basin</strong> is one of the most fertile regions in the entire world! It's called the <strong>'Granary of India'</strong>.</p>
          </div>
        </div>
      ),
    },
  ];

  const handleQuizSelect = (optIdx) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const isCorrect = optIdx === QUIZ_QUESTIONS[quizIndex].answer;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { q: quizIndex, selected: optIdx, correct: isCorrect }]);
  };

  const handleNextQuiz = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((i) => i + 1);
      setSelected(null);
    } else {
      setQuizDone(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelected(null);
    setQuizDone(false);
    setScore(0);
    setAnswers([]);
  };

  const handleActivityCheck = () => {
    const current = ACTIVITY_QUESTIONS[activityStep];
    const isCorrect = activityInput.trim().toLowerCase() === current.answer;
    setActivityResult(isCorrect);
    if (isCorrect) setActivityScore((s) => s + 1);
  };

  const handleActivityNext = () => {
    if (activityStep < ACTIVITY_QUESTIONS.length - 1) {
      setActivityStep((s) => s + 1);
      setActivityInput("");
      setActivityResult(null);
    } else {
      setActivityDone(true);
    }
  };

  const resetActivity = () => {
    setActivityStep(0);
    setActivityInput("");
    setActivityResult(null);
    setActivityScore(0);
    setActivityDone(false);
  };

  const handleAskDoubt = async () => {
    if (!doubt.trim()) return;
    const userDoubt = doubt;
    setDoubt("");
    setAiLoading(true);
    setDoubts((prev) => [...prev, { type: "user", text: userDoubt }]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a friendly, enthusiastic geography teacher for Grade 7 students (12-13 years old) teaching about India's Geographical Diversity. The chapter covers: geographical diversity, India's 5 physical divisions (Himalayan Mountains, Northern Plains, Desert Region, Southern Peninsula, Islands), three divisions of Himalayas (Himadri, Himachal, Shiwalik), formation of Himalayas, importance of Himalayas, and Northern Plains (formation, agricultural significance). 
          
Answer student questions in simple, engaging language. Use emojis, fun analogies, and relatable examples. Keep answers concise (3-5 sentences max unless the concept needs more). If the question is unrelated to the chapter, gently redirect: "Great curiosity! Let's focus on our chapter topic for now."`,
          messages: [{ role: "user", content: userDoubt }],
        }),
      });
      const data = await res.json();
      const answer = data.content?.[0]?.text || "I couldn't get an answer right now. Please try again!";
      setDoubts((prev) => [...prev, { type: "ai", text: answer }]);
    } catch {
      setDoubts((prev) => [...prev, { type: "ai", text: "Oops! I couldn't connect right now. Please try again in a moment! 🙏" }]);
    }
    setAiLoading(false);
  };

  const totalQuizAttempted = answers.length;
  const quizPercent = totalQuizAttempted > 0 ? Math.round((score / QUIZ_QUESTIONS.length) * 100) : 0;
  const activityPercent = activityDone ? Math.round((activityScore / ACTIVITY_QUESTIONS.length) * 100) : 0;
  const overallPercent = Math.round((quizPercent + activityPercent) / 2);

  const grade = overallPercent >= 90 ? "A+" : overallPercent >= 75 ? "A" : overallPercent >= 60 ? "B" : overallPercent >= 40 ? "C" : "Keep Trying!";

  const bubbleStyle = {
    background: 'transparent',
    border: '2px solid rgba(255,255,255,0.5)',
    borderRadius: '20px',
    padding: '5px 15px',
    animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate',
    display: 'inline-block',
    marginLeft: '10px'
  };

  return (
    <div style={{
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      background: "#0d1b2a",
      minHeight: "100vh",
      color: "#e8f4fd",
      display: "flex",
      flexDirection: "column",
    }}>
      <style dangerouslySetInnerHTML={{__html: `@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } } @keyframes glow { 0% { box-shadow: 0 0 20px rgba(255,255,255,0.3); } 100% { box-shadow: 0 0 30px rgba(255,255,255,0.6); } }`}} />
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a3a5c 0%, #0d2137 100%)",
        padding: "18px 24px",
        borderBottom: "2px solid #1e5799",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ fontSize: 32 }}>🇮🇳</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#f7dc6f", letterSpacing: 0.5 }}>
              Geographical Diversity of India
            </h1>
            <div style={{ fontSize: 13, opacity: 0.7, color: "#85c1e9" }}>Grade 7 • Social Studies • Session 1 of 3</div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: "flex",
        overflowX: "auto",
        gap: 4,
        padding: "10px 12px",
        background: "#0d1b2a",
        borderBottom: "1px solid #1e3a5c",
        scrollbarWidth: "none",
      }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id
                ? "linear-gradient(135deg, #e67e22 0%, #d35400 100%)"
                : "rgba(255,255,255,0.06)",
              color: activeTab === tab.id ? "#fff" : "#aed6f1",
              border: activeTab === tab.id ? "none" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 700 : 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.2s",
              boxShadow: activeTab === tab.id ? "0 2px 12px rgba(230,126,34,0.4)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div id="main-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px", maxWidth: 800, margin: "0 auto", width: "100%" }}>

        {/* READ CHAPTER */}
        {activeTab === "read" && (
          <div>
            {/* Section Nav */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {READ_SECTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setReadSection(i)}
                  style={{
                    background: readSection === i ? "#f7dc6f" : "rgba(255,255,255,0.07)",
                    color: readSection === i ? "#0d1b2a" : "#aed6f1",
                    border: "none",
                    borderRadius: 16,
                    padding: "6px 12px",
                    fontSize: 13,
                    cursor: "pointer",
                    fontWeight: readSection === i ? 800 : 400,
                  }}
                >
                  {s.emoji} {i + 1}. {s.title.split(" ")[0]} {s.title.split(" ")[1] || ""}
                </button>
              ))}
            </div>
            <div style={{ background: READ_SECTIONS[readSection].bg, borderRadius: 20, padding: "24px 20px", color: "#e8f4fd", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
              <h2 style={{ margin: "0 0 20px", fontSize: 22, display: "flex", gap: 12, alignItems: "center" }}>
                <span>{READ_SECTIONS[readSection].emoji}</span>
                <span style={bubbleStyle}>{READ_SECTIONS[readSection].title}</span>
              </h2>
              {READ_SECTIONS[readSection].content}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
              <button
                onClick={() => setReadSection((s) => Math.max(0, s - 1))}
                disabled={readSection === 0}
                style={{ background: readSection === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)", color: readSection === 0 ? "#666" : "#aed6f1", border: "none", borderRadius: 12, padding: "10px 20px", cursor: readSection === 0 ? "default" : "pointer", fontSize: 14 }}
              >
                ← Previous
              </button>
              <span style={{ fontSize: 13, opacity: 0.6, alignSelf: "center" }}>{readSection + 1} / {READ_SECTIONS.length}</span>
              <button
                onClick={() => setReadSection((s) => Math.min(READ_SECTIONS.length - 1, s + 1))}
                disabled={readSection === READ_SECTIONS.length - 1}
                style={{ background: readSection === READ_SECTIONS.length - 1 ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #e67e22, #d35400)", color: readSection === READ_SECTIONS.length - 1 ? "#666" : "#fff", border: "none", borderRadius: 12, padding: "10px 20px", cursor: readSection === READ_SECTIONS.length - 1 ? "default" : "pointer", fontSize: 14, fontWeight: 700 }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* CHAPTER SUMMARY */}
        {activeTab === "summary" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #1a3a5c, #0d2137)", borderRadius: 20, padding: "20px", marginBottom: 16, border: "2px solid #1e5799" }}>
              <h2 style={{ color: "#f7dc6f", margin: "0 0 6px" }}>📋 Chapter at a Glance</h2>
              <p style={{ margin: 0, fontSize: 14, opacity: 0.7 }}>Everything you need to remember — in one place!</p>
            </div>
            {[
              {
                title: "What is Geographical Diversity?", color: "#85c1e9", icon: "🌍",
                points: [
                  "Presence of different landforms, climates, vegetation & human adaptation",
                  "India is the 7th largest country and part of Asia",
                  "India has almost every major landform — from deserts to snowy mountains!",
                  "Geography shapes food, clothing, housing & occupation",
                ],
              },
              {
                title: "5 Major Physical Divisions", color: "#82e0aa", icon: "🗺️",
                points: [
                  "The Himalayan Mountains — Northern boundary",
                  "The Northern Plains — Ganga & Indus basin",
                  "The Desert Region — Thar Desert",
                  "The Southern Peninsula — Deccan Plateau + Ghats",
                  "The Islands — Andaman & Nicobar, Lakshadweep",
                ],
              },
              {
                title: "Three Divisions of Himalayas", color: "#f0b27a", icon: "🏔️",
                points: [
                  "Himadri (Greater): Highest, innermost, always snow-covered (above 6,000m) — Mt. Everest",
                  "Himachal (Lesser): Middle range, hill stations — Shimla, Mussoorie (3,700–4,500m)",
                  "Shiwalik (Outer): Lowest, outermost, dense forests — Dehradun, Haridwar (900–1,200m)",
                ],
              },
              {
                title: "Importance of Himalayas", color: "#f7dc6f", icon: "⭐",
                points: [
                  "Geographical: Natural boundary with neighbouring countries",
                  "Climate: Blocks cold winds; helps bring monsoon rains",
                  "Biodiversity: Snow leopard, Himalayan blue poppy, rare species",
                  "Economic: Timber, herbs, tourism",
                  "Defence: Natural wall protecting India",
                ],
              },
              {
                title: "The Northern Plains", color: "#a9cce3", icon: "🌾",
                points: [
                  "Formed by alluvial deposits of Ganga, Yamuna, Brahmaputra",
                  "Highly fertile, flat, and densely populated",
                  "Sub-regions: Punjab Plains, Ganga Plains, Brahmaputra Plains",
                  "Called the 'Granary of India' — major producer of wheat & rice",
                  "Crops: Wheat (Punjab), Rice (West Bengal/Bihar), Jute, Sugarcane",
                ],
              },
            ].map((section) => (
              <div key={section.title} style={{ background: "rgba(255,255,255,0.04)", border: `2px solid ${section.color}40`, borderRadius: 16, padding: "18px 20px", marginBottom: 14 }}>
                <h3 style={{ color: section.color, margin: "0 0 14px", display: "flex", gap: 10, alignItems: "center" }}>
                  <span>{section.icon}</span>{section.title}
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {section.points.map((p, i) => (
                    <li key={i} style={{ fontSize: 14, lineHeight: 1.9, color: "#cce5ff" }}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div style={{ background: "linear-gradient(135deg, #922b21, #7b241c)", borderRadius: 16, padding: "18px 20px" }}>
              <h3 style={{ color: "#f7dc6f", margin: "0 0 14px" }}>📝 Key Terms to Remember</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Alluvial Soil", "Fine fertile soil deposited by rivers"],
                  ["Glacier", "Slow-moving mass of ice — like Gangotri"],
                  ["Tectonic Plates", "Large pieces of Earth's crust that move"],
                  ["Tributary", "A smaller river that flows into a bigger one"],
                  ["Kharif Crops", "Monsoon season crops (e.g., rice)"],
                  ["Rabi Crops", "Winter season crops (e.g., wheat)"],
                ].map(([term, def]) => (
                  <div key={term} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontWeight: 700, color: "#f7dc6f", fontSize: 13, marginBottom: 4 }}>{term}</div>
                    <div style={{ fontSize: 12, opacity: 0.85 }}>{def}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {activeTab === "quiz" && (
          <div>
            {!quizDone ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h2 style={{ margin: 0, color: "#f7dc6f", fontSize: 20 }}>🧠 Chapter Quiz</h2>
                  <span style={{ background: "rgba(247,220,111,0.15)", border: "1px solid #f7dc6f", borderRadius: 12, padding: "4px 12px", fontSize: 13, color: "#f7dc6f" }}>
                    {quizIndex + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>
                {/* Progress bar */}
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, height: 8, marginBottom: 20 }}>
                  <div style={{ background: "linear-gradient(90deg, #e67e22, #f7dc6f)", borderRadius: 8, height: "100%", width: `${((quizIndex) / QUIZ_QUESTIONS.length) * 100}%`, transition: "width 0.4s" }} />
                </div>
                <div style={{ background: "linear-gradient(135deg, #1a3a5c, #0d2137)", borderRadius: 20, padding: "24px 20px", marginBottom: 16 }}>
                  <p style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
                    Q{quizIndex + 1}. {QUIZ_QUESTIONS[quizIndex].q}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                  {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === QUIZ_QUESTIONS[quizIndex].answer;
                    let bg = "rgba(255,255,255,0.07)";
                    let border = "1px solid rgba(255,255,255,0.1)";
                    let color = "#e8f4fd";
                    if (selected !== null) {
                      if (isCorrect) { bg = "rgba(130,224,170,0.2)"; border = "2px solid #82e0aa"; color = "#82e0aa"; }
                      else if (isSelected && !isCorrect) { bg = "rgba(231,76,60,0.2)"; border = "2px solid #e74c3c"; color = "#e74c3c"; }
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleQuizSelect(i)}
                        style={{ background: bg, border, borderRadius: 14, padding: "14px 18px", color, fontSize: 15, textAlign: "left", cursor: selected === null ? "pointer" : "default", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s" }}
                      >
                        <span style={{ background: isSelected || (selected !== null && isCorrect) ? (isCorrect ? "#82e0aa" : "#e74c3c") : "rgba(255,255,255,0.1)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: selected !== null && (isSelected || isCorrect) ? "#fff" : "#aaa", flexShrink: 0 }}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {selected !== null && (
                  <div style={{ background: selected === QUIZ_QUESTIONS[quizIndex].answer ? "rgba(130,224,170,0.15)" : "rgba(231,76,60,0.15)", border: `2px solid ${selected === QUIZ_QUESTIONS[quizIndex].answer ? "#82e0aa" : "#e74c3c"}`, borderRadius: 14, padding: "14px 18px", marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, color: selected === QUIZ_QUESTIONS[quizIndex].answer ? "#82e0aa" : "#e74c3c", marginBottom: 6 }}>
                      {selected === QUIZ_QUESTIONS[quizIndex].answer ? "✅ Correct!" : "❌ Not quite!"}
                    </div>
                    <p style={{ margin: 0, fontSize: 14, opacity: 0.9 }}>{QUIZ_QUESTIONS[quizIndex].explanation}</p>
                  </div>
                )}
                {selected !== null && (
                  <button
                    onClick={handleNextQuiz}
                    style={{ width: "100%", background: "linear-gradient(135deg, #e67e22, #d35400)", color: "#fff", border: "none", borderRadius: 14, padding: "14px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}
                  >
                    {quizIndex < QUIZ_QUESTIONS.length - 1 ? "Next Question →" : "See Results 🎉"}
                  </button>
                )}
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>{score >= 6 ? "🏆" : score >= 4 ? "⭐" : "💪"}</div>
                <h2 style={{ color: "#f7dc6f", fontSize: 28 }}>Quiz Complete!</h2>
                <div style={{ background: "linear-gradient(135deg, #1a3a5c, #0d2137)", borderRadius: 20, padding: 24, marginBottom: 20 }}>
                  <div style={{ fontSize: 56, fontWeight: 900, color: score >= 6 ? "#82e0aa" : score >= 4 ? "#f7dc6f" : "#e74c3c", marginBottom: 8 }}>{score}/{QUIZ_QUESTIONS.length}</div>
                  <div style={{ fontSize: 20, opacity: 0.8 }}>{score >= 6 ? "Excellent! You're a Geography Star! 🌟" : score >= 4 ? "Good job! Keep practising! 📚" : "Keep revising and try again! 💪"}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                  {QUIZ_QUESTIONS.map((q, i) => {
                    const ans = answers.find((a) => a.q === i);
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "10px 16px", textAlign: "left" }}>
                        <span style={{ fontSize: 18 }}>{ans?.correct ? "✅" : "❌"}</span>
                        <span style={{ fontSize: 13, opacity: 0.85, flex: 1 }}>Q{i + 1}. {q.q.substring(0, 60)}...</span>
                      </div>
                    );
                  })}
                </div>
                <button onClick={resetQuiz} style={{ background: "linear-gradient(135deg, #e67e22, #d35400)", color: "#fff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
                  Retake Quiz 🔄
                </button>
              </div>
            )}
          </div>
        )}

        {/* MINDMAP */}
        {activeTab === "mindmap" && (
          <div>
            <h2 style={{ color: "#f7dc6f", margin: "0 0 16px" }}>🗺️ Visual Mindmap</h2>
            <div style={{ background: "linear-gradient(135deg, #0d2137, #1a3a5c)", borderRadius: 20, padding: 20, marginBottom: 16 }}>
              {/* Central node */}
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ display: "inline-block", background: "linear-gradient(135deg, #f7dc6f, #e67e22)", color: "#0d1b2a", borderRadius: 20, padding: "16px 28px", fontSize: 16, fontWeight: 900, boxShadow: "0 4px 20px rgba(247,220,111,0.3)" }}>
                  🇮🇳 India's Geographical Diversity
                </div>
              </div>
              {/* Branches */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  {
                    title: "5 Physical Divisions", color: "#85c1e9", icon: "🗺️",
                    children: ["Himalayan Mountains", "Northern Plains", "Desert Region", "Southern Peninsula", "Islands"],
                  },
                  {
                    title: "Himalayan Ranges", color: "#82e0aa", icon: "🏔️",
                    children: ["Himadri (>6000m)", "Himachal (3700-4500m)", "Shiwalik (900-1200m)", "Mt. Everest, Kanchenjunga"],
                  },
                  {
                    title: "Himalayan Importance", color: "#f0b27a", icon: "⭐",
                    children: ["Natural boundary", "Water source", "Climate regulator", "Biodiversity hotspot", "Natural defence"],
                  },
                  {
                    title: "Northern Plains", color: "#f7dc6f", icon: "🌾",
                    children: ["Alluvial soil", "Ganga/Yamuna/Brahmaputra", "Granary of India", "Rice, Wheat, Jute"],
                  },
                  {
                    title: "Geography & Lifestyle", color: "#e74c3c", icon: "🏠",
                    children: ["Mountains → wool, terrace farm", "Desert → cotton, camels", "Coast → fish, stilt houses", "Plains → farming, dense pop"],
                  },
                  {
                    title: "Himalaya Formation", color: "#a9cce3", icon: "🌋",
                    children: ["Gondwana supercontinent", "Plate collision 50M yrs ago", "Land folded upwards", "Still grows 5mm/year!"],
                  },
                ].map((branch) => (
                  <div key={branch.title} style={{ background: `${branch.color}15`, border: `2px solid ${branch.color}50`, borderRadius: 14, padding: "14px 16px" }}>
                    <div style={{ color: branch.color, fontWeight: 800, fontSize: 14, marginBottom: 10, display: "flex", gap: 8, alignItems: "center" }}>
                      <span>{branch.icon}</span>{branch.title}
                    </div>
                    {branch.children.map((c) => (
                      <div key={c} style={{ fontSize: 12, lineHeight: 1.8, paddingLeft: 12, borderLeft: `2px solid ${branch.color}60`, marginLeft: 4, marginBottom: 2, opacity: 0.9 }}>→ {c}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Key Comparisons Table */}
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 18 }}>
              <h3 style={{ color: "#f7dc6f", margin: "0 0 14px" }}>📊 Quick Comparison: 3 Himalayan Ranges</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "rgba(247,220,111,0.15)" }}>
                      {["Feature", "Himadri", "Himachal", "Shiwalik"].map((h) => (
                        <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#f7dc6f", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Position", "Innermost", "Middle", "Outermost"],
                      ["Altitude", ">6,000 m", "3,700–4,500 m", "900–1,200 m"],
                      ["Climate", "Extreme cold", "Moderate", "Warm"],
                      ["Famous places", "Mt. Everest, Gangotri", "Shimla, Mussoorie", "Dehradun, Haridwar"],
                      ["Human settlement", "Very sparse", "Moderate", "Dense"],
                    ].map((row, ri) => (
                      <tr key={ri} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.03)" }}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{ padding: "9px 12px", color: ci === 0 ? "#aed6f1" : "#e8f4fd", fontWeight: ci === 0 ? 700 : 400 }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* LEARN & FUN ACTIVITY */}
        {activeTab === "activity" && (
          <div>
            <h2 style={{ color: "#f7dc6f", margin: "0 0 6px" }}>🎮 Learn & Fun Activity</h2>
            <p style={{ opacity: 0.7, fontSize: 14, margin: "0 0 20px" }}>Guess the region from the clues! Type the region name to check your answer.</p>
            {!activityDone ? (
              <div>
                {/* Progress */}
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, height: 8, marginBottom: 20 }}>
                  <div style={{ background: "linear-gradient(90deg, #82e0aa, #27ae60)", borderRadius: 8, height: "100%", width: `${(activityStep / ACTIVITY_QUESTIONS.length) * 100}%`, transition: "width 0.4s" }} />
                </div>
                <div style={{ background: `linear-gradient(135deg, ${ACTIVITY_QUESTIONS[activityStep].color}33, rgba(13,27,42,0.9))`, border: `2px solid ${ACTIVITY_QUESTIONS[activityStep].color}`, borderRadius: 20, padding: 24, marginBottom: 16 }}>
                  <h3 style={{ color: ACTIVITY_QUESTIONS[activityStep].color, margin: "0 0 16px", fontSize: 20 }}>
                    🔍 Round {activityStep + 1}: Guess the Region!
                  </h3>
                  <p style={{ margin: "0 0 16px", fontSize: 15, opacity: 0.8 }}>I live in a region where...</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                    {ACTIVITY_QUESTIONS[activityStep].clues.map((clue, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "10px 14px" }}>
                        <span style={{ color: ACTIVITY_QUESTIONS[activityStep].color, fontSize: 18, minWidth: 24 }}>🔹</span>
                        <span style={{ fontSize: 15 }}>{clue}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ margin: "0 0 8px", fontSize: 14, opacity: 0.8 }}>Hint: Choose from — himalaya / plains / desert / coastal</p>
                    <input
                      value={activityInput}
                      onChange={(e) => setActivityInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && activityResult === null && handleActivityCheck()}
                      placeholder="Type your answer..."
                      style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  {activityResult === null ? (
                    <button onClick={handleActivityCheck} style={{ width: "100%", background: `linear-gradient(135deg, ${ACTIVITY_QUESTIONS[activityStep].color}, ${ACTIVITY_QUESTIONS[activityStep].color}cc)`, color: "#fff", border: "none", borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                      Check My Answer ✓
                    </button>
                  ) : (
                    <div>
                      <div style={{ background: activityResult ? "rgba(130,224,170,0.2)" : "rgba(231,76,60,0.2)", border: `2px solid ${activityResult ? "#82e0aa" : "#e74c3c"}`, borderRadius: 12, padding: "14px", marginBottom: 12, textAlign: "center" }}>
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{activityResult ? "🎉 Correct!" : "❌ Not quite!"}</div>
                        {!activityResult && <div style={{ fontSize: 14, opacity: 0.9 }}>The answer was: <strong style={{ color: "#f7dc6f" }}>{ACTIVITY_QUESTIONS[activityStep].answer}</strong></div>}
                        <div style={{ fontSize: 14, marginTop: 6 }}>This region: <strong style={{ color: ACTIVITY_QUESTIONS[activityStep].color }}>{ACTIVITY_QUESTIONS[activityStep].region}</strong></div>
                      </div>
                      <button onClick={handleActivityNext} style={{ width: "100%", background: "linear-gradient(135deg, #e67e22, #d35400)", color: "#fff", border: "none", borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                        {activityStep < ACTIVITY_QUESTIONS.length - 1 ? "Next Round →" : "Finish! 🏁"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                <h2 style={{ color: "#f7dc6f" }}>Activity Complete!</h2>
                <div style={{ background: "linear-gradient(135deg, #1e8449, #145a32)", borderRadius: 20, padding: 24, marginBottom: 20 }}>
                  <div style={{ fontSize: 48, fontWeight: 900, color: "#82e0aa" }}>{activityScore}/{ACTIVITY_QUESTIONS.length}</div>
                  <div style={{ fontSize: 18, opacity: 0.8 }}>{activityScore === 4 ? "Perfect! You know your regions! 🌟" : activityScore >= 2 ? "Good effort! Revise the regions once more! 📚" : "Keep practising! 💪"}</div>
                </div>
                <button onClick={resetActivity} style={{ background: "linear-gradient(135deg, #27ae60, #1e8449)", color: "#fff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
                  Play Again 🔄
                </button>
              </div>
            )}

            {/* Bonus: Match It! */}
            <div style={{ marginTop: 24, background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 18 }}>
              <h3 style={{ color: "#f7dc6f", margin: "0 0 14px" }}>🎯 Quick Match: Festivals & Geography</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { festival: "🌾 Baisakhi", region: "Punjab — wheat harvest in Northern Plains" },
                  { festival: "☀️ Pongal", region: "Tamil Nadu — rice harvest in coastal south" },
                  { festival: "🌸 Bihu", region: "Assam — harvest in Brahmaputra Plains" },
                  { festival: "🎍 Onam", region: "Kerala — coastal tropical region" },
                ].map((item) => (
                  <div key={item.festival} style={{ display: "flex", gap: 12, background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 14px", alignItems: "center" }}>
                    <span style={{ fontSize: 20, minWidth: 36 }}>{item.festival.split(" ")[0]}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#f0b27a" }}>{item.festival.substring(2)}</div>
                      <div style={{ fontSize: 13, opacity: 0.8 }}>{item.region}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REPORT CARD */}
        {activeTab === "report" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #1a3a5c, #0d2137)", borderRadius: 20, padding: 24, marginBottom: 16, textAlign: "center", border: "2px solid #f7dc6f40" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
              <h2 style={{ color: "#f7dc6f", margin: "0 0 4px" }}>My Progress Report</h2>
              <p style={{ opacity: 0.6, margin: 0, fontSize: 14 }}>Geographical Diversity of India • Grade 7</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Quiz Score", value: `${score}/${QUIZ_QUESTIONS.length}`, percent: quizPercent, color: "#85c1e9" },
                { label: "Activity Score", value: `${activityScore}/${ACTIVITY_QUESTIONS.length}`, percent: activityPercent, color: "#82e0aa" },
                { label: "Overall", value: grade, percent: overallPercent, color: "#f7dc6f" },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "rgba(255,255,255,0.05)", border: `2px solid ${stat.color}40`, borderRadius: 16, padding: "18px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 10 }}>{stat.label}</div>
                  <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, height: 6 }}>
                    <div style={{ background: stat.color, borderRadius: 8, height: "100%", width: `${stat.percent}%`, transition: "width 0.8s" }} />
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>{stat.percent}%</div>
                </div>
              ))}
            </div>
            {/* Skills assessment */}
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
              <h3 style={{ color: "#f7dc6f", margin: "0 0 16px" }}>🎯 Skills Assessment</h3>
              {[
                { skill: "Mapping & Location", done: quizDone || score > 0, icon: "🗺️" },
                { skill: "Understanding Concepts", done: totalQuizAttempted >= 3, icon: "💡" },
                { skill: "Region Identification", done: activityDone, icon: "🔍" },
                { skill: "Quiz Completed", done: quizDone, icon: "✅" },
                { skill: "Activity Completed", done: activityDone, icon: "🎮" },
              ].map((skill) => (
                <div key={skill.skill} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{skill.icon}</span>
                  <span style={{ flex: 1, fontSize: 14 }}>{skill.skill}</span>
                  <span style={{ fontSize: 16 }}>{skill.done ? "✅" : "⏳"}</span>
                </div>
              ))}
            </div>
            {/* Motivational message */}
            <div style={{ background: overallPercent >= 75 ? "linear-gradient(135deg, #1e8449, #145a32)" : "linear-gradient(135deg, #1a3a5c, #0d2137)", borderRadius: 16, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{overallPercent >= 90 ? "🏆" : overallPercent >= 75 ? "⭐" : overallPercent >= 50 ? "📚" : "💪"}</div>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: overallPercent >= 75 ? "#82e0aa" : "#f7dc6f" }}>
                {overallPercent >= 90 ? "Outstanding! You're a Geography Champion!" :
                  overallPercent >= 75 ? "Excellent work! Keep it up!" :
                  overallPercent >= 50 ? "Good progress! Complete the quiz and activity to improve your score!" :
                  "Complete the Quiz and Activity to see your full report! 🎯"}
              </p>
            </div>
          </div>
        )}

        {/* ASK YOUR DOUBT */}
        {activeTab === "doubt" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #4a235a, #2e1a47)", borderRadius: 20, padding: 20, marginBottom: 16 }}>
              <h2 style={{ color: "#f7dc6f", margin: "0 0 8px" }}>💬 Ask Your Doubt</h2>
              <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>Have a question about the chapter? Ask your AI teacher — available 24/7! 🤖</p>
            </div>
            {/* Suggested Questions */}
            {doubts.length === 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 14, opacity: 0.7, margin: "0 0 10px" }}>Try asking:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "Why is the Gangetic Plain so fertile?",
                    "What is the difference between Himadri and Himachal?",
                    "How do the Himalayas affect India's climate?",
                    "Why do people in mountains wear woollen clothes?",
                  ].map((q) => (
                    <button key={q} onClick={() => setDoubt(q)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px", color: "#aed6f1", fontSize: 14, textAlign: "left", cursor: "pointer" }}>
                      💭 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Chat History */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              {doubts.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.type === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "85%",
                    background: msg.type === "user" ? "linear-gradient(135deg, #e67e22, #d35400)" : "rgba(255,255,255,0.08)",
                    border: msg.type === "ai" ? "1px solid rgba(255,255,255,0.12)" : "none",
                    borderRadius: msg.type === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    padding: "12px 16px",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "#e8f4fd",
                  }}>
                    {msg.type === "ai" && <div style={{ fontSize: 12, color: "#f7dc6f", fontWeight: 700, marginBottom: 6 }}>🤖 Your AI Teacher</div>}
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div style={{ display: "flex" }}>
                  <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "18px 18px 18px 4px", padding: "12px 18px" }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      {[0, 1, 2].map((i) => (
                        <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#f7dc6f", animation: `bounce 1s ${i * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Input */}
            <div style={{ position: "sticky", bottom: 0, background: "#0d1b2a", paddingTop: 12 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  value={doubt}
                  onChange={(e) => setDoubt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !aiLoading && handleAskDoubt()}
                  placeholder="Type your question here..."
                  style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none" }}
                />
                <button
                  onClick={handleAskDoubt}
                  disabled={aiLoading || !doubt.trim()}
                  style={{ background: doubt.trim() && !aiLoading ? "linear-gradient(135deg, #e67e22, #d35400)" : "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: 14, padding: "0 20px", fontSize: 20, cursor: doubt.trim() && !aiLoading ? "pointer" : "default" }}
                >
                  {aiLoading ? "⏳" : "➤"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        #main-scroll::-webkit-scrollbar { width: 4px; }
        #main-scroll::-webkit-scrollbar-track { background: transparent; }
        #main-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        @keyframes bounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-8px); } }
        input::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>
    </div>
  );
}
