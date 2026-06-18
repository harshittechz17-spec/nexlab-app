import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { id: "discover", icon: "⚡", label: "Discover" },
  { id: "experiments", icon: "🔬", label: "Experiments" },
  { id: "projects", icon: "🛠️", label: "My Projects" },
  { id: "learn", icon: "📡", label: "Learn" },
  { id: "social", icon: "🌐", label: "Social" },
];

const CATEGORIES = ["All", "Science", "Technology", "Creative", "Life Hacks", "Myths", "Live"];

const FEED_ITEMS = [
  {
    id: 1, type: "live", category: "Science",
    title: "Does Salt Really Make Water Boil Faster?",
    desc: "A controlled kitchen experiment with temperature sensors. Watch real-time data.",
    author: "Dr. Priya K.", followers: "12.4K", live: true,
    tags: ["myth", "physics", "kitchen"],
    color: "#FF4757",
  },
  {
    id: 2, type: "experiment", category: "Technology",
    title: "Build a Mini Theremin with Arduino",
    desc: "Create a sound instrument controlled by hand distance — no touch required.",
    author: "CircuitMind", followers: "8.1K", live: false,
    tags: ["electronics", "audio", "diy"],
    color: "#00D4FF",
  },
  {
    id: 3, type: "hack", category: "Life Hacks",
    title: "Lemon Battery That Powers an LED",
    desc: "Turn 4 lemons into a real power source. Step-by-step with measurable voltage output.",
    author: "Harshit Labs", followers: "5.2K", live: false,
    tags: ["chemistry", "electricity", "beginner"],
    color: "#FFB830",
  },
  {
    id: 4, type: "myth", category: "Myths",
    title: "Myth: We Only Use 10% of Our Brain",
    desc: "Using fMRI scans and neuroscience data — what's really happening in your brain right now.",
    author: "NeuroNexus", followers: "22K", live: false,
    tags: ["neuroscience", "debunked", "biology"],
    color: "#7B2FFF",
  },
  {
    id: 5, type: "creative", category: "Creative",
    title: "Generative Art with Chaos Theory",
    desc: "Use butterfly effect equations to create stunning fractal visuals with p5.js.",
    author: "PixelPhysics", followers: "9.7K", live: false,
    tags: ["math", "art", "code"],
    color: "#2ED573",
  },
  {
    id: 6, type: "live", category: "Science",
    title: "Fermentation Live — Day 3 of Kombucha",
    desc: "pH readings, bubbles, temperature — live tracking of a fermentation experiment.",
    author: "BioLab Home", followers: "3.8K", live: true,
    tags: ["biology", "food", "chemistry"],
    color: "#FF6B81",
  },
];

const COMPONENTS = [
  { name: "Voltage Divider", cat: "Electronics", icon: "⚡", uses: 1240 },
  { name: "Centrifugal Force", cat: "Physics", icon: "🌀", uses: 870 },
  { name: "Photosynthesis Loop", cat: "Biology", icon: "🌿", uses: 650 },
  { name: "Bezier Curves", cat: "Math/Creative", icon: "📐", uses: 990 },
  { name: "Neural Layer", cat: "AI/Tech", icon: "🧠", uses: 2100 },
  { name: "Acid-Base Reaction", cat: "Chemistry", icon: "🧪", uses: 780 },
];

const SOCIAL_FEEDS = [
  { name: "YouTube", icon: "▶", color: "#FF0000", handle: "@NexLabOfficial", followers: "48K" },
  { name: "Instagram", icon: "◉", color: "#E1306C", handle: "@nexlab.io", followers: "31K" },
  { name: "X / Twitter", icon: "✕", color: "#1DA1F2", handle: "@NexLabHQ", followers: "19K" },
  { name: "Discord", icon: "◈", color: "#5865F2", handle: "NexLab Community", followers: "8.2K" },
];

function PulseDot({ color = "#FF4757" }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <span style={{
        width: 8, height: 8, borderRadius: "50%", background: color,
        boxShadow: `0 0 0 0 ${color}`,
        animation: "pulse 1.5s infinite",
        display: "inline-block",
      }} />
      <style>{`@keyframes pulse{0%{box-shadow:0 0 0 0 ${color}88}70%{box-shadow:0 0 0 6px transparent}100%{box-shadow:0 0 0 0 transparent}}`}</style>
    </span>
  );
}

function ExperimentCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(item)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, #141828 0%, #1a1f35 100%)`
          : "#111624",
        border: `1px solid ${hovered ? item.color : "#1e2540"}`,
        borderRadius: 16,
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: hovered ? `0 8px 32px ${item.color}22` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${item.color}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.25s",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
          color: item.color, textTransform: "uppercase",
          background: `${item.color}18`, padding: "2px 8px", borderRadius: 4,
        }}>{item.category}</span>
        {item.live && (
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#FF4757", fontWeight: 700 }}>
            <PulseDot color="#FF4757" /> LIVE
          </span>
        )}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#F0F4FF", marginBottom: 7, lineHeight: 1.4 }}>
        {item.title}
      </div>
      <div style={{ fontSize: 12, color: "#7a85b0", marginBottom: 14, lineHeight: 1.6 }}>
        {item.desc}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {item.tags.map(t => (
          <span key={t} style={{
            fontSize: 10, color: "#7a85b0", background: "#1e2540",
            padding: "2px 8px", borderRadius: 20,
          }}>#{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#4a5580", fontWeight: 600 }}>by {item.author}</span>
        <span style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>👁 {item.followers}</span>
      </div>
    </div>
  );
}

function AIAssistant({ context, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: `I'm your NexLab AI! Ask me anything about "${context}" or explore related experiments, components, and concepts.` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function ask() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You are NexLab AI, an expert science, technology, and creative experiments assistant. You help users understand experiments, components, science concepts, life hacks, and tech projects. Context: user is exploring "${context}". Keep answers concise, engaging, and use emojis where natural. Suggest related experiments when relevant.`,
          messages: [
            ...messages.filter(m => m.role === "user" || (m.role === "assistant" && messages.indexOf(m) > 0)).map(m => ({
              role: m.role, content: m.text
            })),
            { role: "user", content: userMsg }
          ],
        })
      });
      const data = await res.json();
      const reply = data.content?.map(c => c.text || "").join("") || "Sorry, I couldn't process that.";
      setMessages(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "Connection error. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, width: 360,
      background: "#111624", border: "1px solid #2a3060",
      borderRadius: 20, boxShadow: "0 20px 60px #00000088",
      zIndex: 1000, display: "flex", flexDirection: "column",
      maxHeight: 480,
    }}>
      <div style={{
        padding: "14px 18px", borderBottom: "1px solid #1e2540",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "linear-gradient(90deg, #7B2FFF22, #00D4FF11)",
        borderRadius: "20px 20px 0 0",
      }}>
        <span style={{ fontWeight: 700, color: "#F0F4FF", fontSize: 14 }}>
          🤖 NexLab AI
        </span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#7a85b0", cursor: "pointer", fontSize: 18 }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "82%",
            background: m.role === "user"
              ? "linear-gradient(135deg, #7B2FFF, #00D4FF)"
              : "#1a2040",
            color: "#F0F4FF",
            padding: "10px 14px",
            borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            fontSize: 13, lineHeight: 1.5,
          }}>{m.text}</div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start", background: "#1a2040", padding: "10px 14px", borderRadius: "16px 16px 16px 4px", color: "#7a85b0", fontSize: 13 }}>
            Thinking...
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "10px 14px", borderTop: "1px solid #1e2540", display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && ask()}
          placeholder="Ask anything..."
          style={{
            flex: 1, background: "#1a2040", border: "1px solid #2a3060",
            borderRadius: 10, padding: "8px 12px", color: "#F0F4FF",
            fontSize: 13, outline: "none",
          }}
        />
        <button
          onClick={ask}
          style={{
            background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
            border: "none", borderRadius: 10, padding: "8px 14px",
            color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13,
          }}
        >↑</button>
      </div>
    </div>
  );
}

function NewProjectModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [cat, setCat] = useState("Science");
  const [desc, setDesc] = useState("");

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#00000099",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#111624", border: "1px solid #2a3060",
        borderRadius: 20, padding: 30, width: 420, maxWidth: "90vw",
      }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#F0F4FF", marginBottom: 6 }}>New Project</div>
        <div style={{ fontSize: 13, color: "#4a5580", marginBottom: 24 }}>Define your experiment or creative project</div>
        {[
          { label: "Project Name", val: name, set: setName, placeholder: "e.g. Solar-powered water purifier" },
          { label: "Description", val: desc, set: setDesc, placeholder: "What will you explore or build?" },
        ].map(({ label, val, set, placeholder }) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#7a85b0", marginBottom: 6, fontWeight: 600 }}>{label}</div>
            <input
              value={val} onChange={e => set(e.target.value)} placeholder={placeholder}
              style={{
                width: "100%", background: "#1a2040", border: "1px solid #2a3060",
                borderRadius: 10, padding: "10px 14px", color: "#F0F4FF",
                fontSize: 13, outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        ))}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: "#7a85b0", marginBottom: 8, fontWeight: 600 }}>Category</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Science", "Technology", "Creative", "Life Hacks"].map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? "linear-gradient(135deg,#7B2FFF,#00D4FF)" : "#1a2040",
                border: `1px solid ${cat === c ? "transparent" : "#2a3060"}`,
                borderRadius: 8, padding: "6px 14px", color: cat === c ? "#fff" : "#7a85b0",
                fontSize: 12, cursor: "pointer", fontWeight: 600,
              }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, background: "#1a2040", border: "1px solid #2a3060",
            borderRadius: 10, padding: "12px", color: "#7a85b0", cursor: "pointer", fontSize: 13,
          }}>Cancel</button>
          <button onClick={() => { if (name) { onCreate({ name, cat, desc }); onClose(); } }} style={{
            flex: 2, background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
            border: "none", borderRadius: 10, padding: "12px", color: "#fff",
            cursor: "pointer", fontWeight: 700, fontSize: 13,
          }}>Create Project →</button>
        </div>
      </div>
    </div>
  );
}

export default function NexLabApp() {
  const [activeNav, setActiveNav] = useState("discover");
  const [activeCat, setActiveCat] = useState("All");
  const [aiContext, setAiContext] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [projects, setProjects] = useState([
    { name: "Static Electricity Generator", cat: "Science", desc: "Exploring triboelectric effect", id: 1 },
    { name: "Pixel Sorting Algorithm", cat: "Creative", desc: "Glitch art using sorting", id: 2 },
  ]);
  const [searchQ, setSearchQ] = useState("");

  const filtered = FEED_ITEMS.filter(item =>
    (activeCat === "All" || item.category === activeCat || (activeCat === "Live" && item.live)) &&
    (item.title.toLowerCase().includes(searchQ.toLowerCase()) || !searchQ)
  );

  return (
    <div style={{
      background: "#0A0E1A", minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', sans-serif",
      display: "flex", color: "#F0F4FF",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0E1A; }
        ::-webkit-scrollbar-thumb { background: #2a3060; border-radius: 2px; }
        input::placeholder { color: #4a5580; }
        .nav-item:hover { background: #1a2040 !important; }
      `}</style>

      {/* Sidebar */}
      <div style={{
        width: 220, background: "#0d1120", borderRight: "1px solid #151c30",
        padding: "24px 14px", display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 32, paddingLeft: 8 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 24, fontWeight: 800,
            background: "linear-gradient(90deg, #7B2FFF, #00D4FF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>NexLab</div>
          <div style={{ fontSize: 11, color: "#4a5580", fontWeight: 500, letterSpacing: 1 }}>EXPLORE · BUILD · DISCOVER</div>
        </div>

        {/* Nav */}
        {NAV_ITEMS.map(item => (
          <button key={item.id} className="nav-item" onClick={() => setActiveNav(item.id)} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 14px", borderRadius: 12, marginBottom: 4,
            background: activeNav === item.id ? "linear-gradient(135deg, #7B2FFF22, #00D4FF11)" : "transparent",
            border: activeNav === item.id ? "1px solid #7B2FFF44" : "1px solid transparent",
            cursor: "pointer", textAlign: "left", width: "100%",
            color: activeNav === item.id ? "#F0F4FF" : "#4a5580",
            fontWeight: activeNav === item.id ? 700 : 500, fontSize: 14,
            transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 17 }}>{item.icon}</span>
            {item.label}
            {item.id === "experiments" && (
              <span style={{
                marginLeft: "auto", background: "#FF4757", color: "#fff",
                fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 10,
              }}>2</span>
            )}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* AI Button */}
        <button onClick={() => setAiContext("General Science & Tech")} style={{
          width: "100%", padding: "12px", borderRadius: 14,
          background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
          border: "none", color: "#fff", fontWeight: 700, cursor: "pointer",
          fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>🤖 Ask NexLab AI</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 28px" }}>

        {/* DISCOVER */}
        {activeNav === "discover" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
                  Discover Experiments
                </div>
                <div style={{ color: "#4a5580", fontSize: 14 }}>Live science, tech builds, creative projects & myth-busting</div>
              </div>
              <input
                value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="🔍  Search experiments..."
                style={{
                  background: "#111624", border: "1px solid #1e2540",
                  borderRadius: 12, padding: "10px 16px", color: "#F0F4FF",
                  fontSize: 13, width: 240, outline: "none",
                }}
              />
            </div>

            {/* Hero banner */}
            <div style={{
              background: "linear-gradient(135deg, #7B2FFF22, #00D4FF11)",
              border: "1px solid #7B2FFF44", borderRadius: 20, padding: "24px 28px",
              marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 16,
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <PulseDot color="#FF4757" />
                  <span style={{ fontSize: 12, color: "#FF4757", fontWeight: 700, letterSpacing: 1 }}>3 EXPERIMENTS LIVE NOW</span>
                </div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
                  Can you make fire with ice?
                </div>
                <div style={{ color: "#7a85b0", fontSize: 13 }}>Join 2,400 viewers watching this optics experiment unfold</div>
              </div>
              <button onClick={() => setAiContext("optics experiment — making fire with ice using lens effect")} style={{
                background: "linear-gradient(135deg, #FF4757, #FF6B81)",
                border: "none", borderRadius: 12, padding: "12px 22px",
                color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14,
              }}>▶ Join Live</button>
            </div>

            {/* Category filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setActiveCat(c)} style={{
                  background: activeCat === c ? "linear-gradient(135deg, #7B2FFF, #00D4FF)" : "#111624",
                  border: `1px solid ${activeCat === c ? "transparent" : "#1e2540"}`,
                  borderRadius: 20, padding: "6px 16px", color: activeCat === c ? "#fff" : "#4a5580",
                  fontSize: 12, cursor: "pointer", fontWeight: 600, transition: "all 0.2s",
                }}>
                  {c === "Live" && <><PulseDot color="#FF4757" /> </>}{c}
                </button>
              ))}
            </div>

            {/* Feed grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {filtered.map(item => (
                <ExperimentCard key={item.id} item={item} onClick={i => setAiContext(i.title)} />
              ))}
              {filtered.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#4a5580", padding: 40 }}>
                  No experiments found. Try a different search.
                </div>
              )}
            </div>
          </div>
        )}

        {/* EXPERIMENTS / COMPONENTS */}
        {activeNav === "experiments" && (
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Science Components</div>
            <div style={{ color: "#4a5580", fontSize: 14, marginBottom: 28 }}>Learn, remix, and use in your projects</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {COMPONENTS.map(comp => (
                <div key={comp.name} onClick={() => setAiContext(`${comp.name} — ${comp.cat} component`)} style={{
                  background: "#111624", border: "1px solid #1e2540",
                  borderRadius: 16, padding: "22px", cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{comp.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{comp.name}</div>
                  <div style={{ color: "#4a5580", fontSize: 12, marginBottom: 14 }}>{comp.cat}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#7a85b0" }}>{comp.uses.toLocaleString()} uses</span>
                    <button style={{
                      background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
                      border: "none", borderRadius: 8, padding: "5px 12px",
                      color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer",
                    }}>Learn →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MY PROJECTS */}
        {activeNav === "projects" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 4 }}>My Projects</div>
                <div style={{ color: "#4a5580", fontSize: 14 }}>{projects.length} active projects</div>
              </div>
              <button onClick={() => setShowNewProject(true)} style={{
                background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
                border: "none", borderRadius: 12, padding: "12px 22px",
                color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14,
              }}>+ New Project</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {projects.map((p, i) => (
                <div key={p.id} style={{
                  background: "#111624", border: "1px solid #1e2540",
                  borderRadius: 16, padding: 22,
                }}>
                  <div style={{
                    display: "inline-block", fontSize: 11, fontWeight: 700,
                    color: "#00D4FF", background: "#00D4FF18",
                    padding: "2px 8px", borderRadius: 4, marginBottom: 12, letterSpacing: 1,
                  }}>{p.cat.toUpperCase()}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{p.name}</div>
                  <div style={{ color: "#4a5580", fontSize: 13, marginBottom: 18 }}>{p.desc || "No description yet."}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setAiContext(p.name)} style={{
                      flex: 1, background: "#1a2040", border: "1px solid #2a3060",
                      borderRadius: 8, padding: "8px", color: "#7a85b0",
                      cursor: "pointer", fontSize: 12,
                    }}>🤖 AI Help</button>
                    <button style={{
                      flex: 1, background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
                      border: "none", borderRadius: 8, padding: "8px",
                      color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 700,
                    }}>Open →</button>
                  </div>
                </div>
              ))}
              <div onClick={() => setShowNewProject(true)} style={{
                background: "#0d1120", border: "2px dashed #1e2540",
                borderRadius: 16, padding: 22,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                cursor: "pointer", minHeight: 160, gap: 10,
              }}>
                <div style={{ fontSize: 32, color: "#2a3060" }}>+</div>
                <div style={{ color: "#4a5580", fontSize: 14, fontWeight: 600 }}>Start New Project</div>
              </div>
            </div>
          </div>
        )}

        {/* LEARN */}
        {activeNav === "learn" && (
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Learn Anything</div>
            <div style={{ color: "#4a5580", fontSize: 14, marginBottom: 28 }}>AI-powered explanations for every concept and component</div>
            <div style={{
              background: "linear-gradient(135deg, #7B2FFF22, #FFB83011)",
              border: "1px solid #7B2FFF44", borderRadius: 20, padding: "28px",
              marginBottom: 24, textAlign: "center",
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🧠</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Ask the NexLab AI Tutor</div>
              <div style={{ color: "#7a85b0", fontSize: 13, marginBottom: 20 }}>
                Explain concepts, run thought experiments, connect ideas across disciplines
              </div>
              <button onClick={() => setAiContext("Learning — explain any science or tech concept")} style={{
                background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
                border: "none", borderRadius: 12, padding: "14px 32px",
                color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 15,
              }}>Start Learning with AI →</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { topic: "Electricity Basics", icon: "⚡", level: "Beginner" },
                { topic: "DNA & Genetics", icon: "🧬", level: "Intermediate" },
                { topic: "Black Holes", icon: "🌑", level: "Advanced" },
                { topic: "Fermentation Science", icon: "🍶", level: "Beginner" },
                { topic: "Quantum Computing", icon: "💠", level: "Advanced" },
                { topic: "Neural Networks", icon: "🕸️", level: "Intermediate" },
              ].map(t => (
                <div key={t.topic} onClick={() => setAiContext(t.topic)} style={{
                  background: "#111624", border: "1px solid #1e2540",
                  borderRadius: 14, padding: "18px 16px", cursor: "pointer",
                  transition: "border 0.2s",
                }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{t.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{t.topic}</div>
                  <div style={{
                    fontSize: 11, color: t.level === "Beginner" ? "#2ED573" : t.level === "Advanced" ? "#FF4757" : "#FFB830",
                    fontWeight: 700,
                  }}>{t.level}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SOCIAL */}
        {activeNav === "social" && (
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Follow NexLab</div>
            <div style={{ color: "#4a5580", fontSize: 14, marginBottom: 28 }}>Stay connected across platforms</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {SOCIAL_FEEDS.map(s => (
                <div key={s.name} style={{
                  background: "#111624", border: "1px solid #1e2540",
                  borderRadius: 18, padding: "24px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: `${s.color}22`, border: `1px solid ${s.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, color: s.color, fontWeight: 800,
                    }}>{s.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{s.name}</div>
                      <div style={{ color: "#4a5580", fontSize: 12 }}>{s.handle}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: s.color, fontWeight: 700, fontSize: 18 }}>{s.followers}</span>
                    <button style={{
                      background: `${s.color}22`, border: `1px solid ${s.color}66`,
                      borderRadius: 10, padding: "8px 18px",
                      color: s.color, fontWeight: 700, cursor: "pointer", fontSize: 13,
                    }}>Follow</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 28, background: "#111624", border: "1px solid #1e2540",
              borderRadius: 18, padding: "24px",
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>📬 Weekly Science Digest</div>
              <div style={{ color: "#7a85b0", fontSize: 13, marginBottom: 16 }}>
                Get the best experiments, myths debunked, and life hacks — every Sunday.
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <input placeholder="your@email.com" style={{
                  flex: 1, background: "#1a2040", border: "1px solid #2a3060",
                  borderRadius: 10, padding: "10px 14px", color: "#F0F4FF", fontSize: 13, outline: "none",
                }} />
                <button style={{
                  background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
                  border: "none", borderRadius: 10, padding: "10px 20px",
                  color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13,
                }}>Subscribe</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Drawer */}
      {aiContext && <AIAssistant context={aiContext} onClose={() => setAiContext(null)} />}

      {/* New Project Modal */}
      {showNewProject && (
        <NewProjectModal
          onClose={() => setShowNewProject(false)}
          onCreate={p => setProjects(prev => [...prev, { ...p, id: Date.now() }])}
        />
      )}
    </div>
  );
}
