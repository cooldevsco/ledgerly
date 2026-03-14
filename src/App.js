import { useState } from "react";

const COLORS = {
  ink: "#0f0e0c",
  cream: "#f5f0e8",
  sand: "#e8dfc8",
  amber: "#c8922a",
  amberLight: "#e8b84b",
  muted: "#7a7060",
  white: "#ffffff",
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: ${COLORS.cream}; color: ${COLORS.ink}; font-family: 'DM Mono', monospace; }

  .app { min-height: 100vh; }

  /* LANDING */
  .landing { background: ${COLORS.ink}; color: ${COLORS.cream}; min-height: 100vh; }

  .nav {
    display: flex; justify-content: space-between; align-items: center;
    padding: 28px 48px; border-bottom: 1px solid #2a2820;
  }
  .logo {
    font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700;
    letter-spacing: -0.5px; color: ${COLORS.cream};
  }
  .logo span { color: ${COLORS.amber}; }
  .nav-cta {
    background: ${COLORS.amber}; color: ${COLORS.ink}; border: none;
    padding: 10px 24px; font-family: 'DM Mono', monospace; font-size: 13px;
    font-weight: 500; cursor: pointer; letter-spacing: 0.5px;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: ${COLORS.amberLight}; }

  .hero {
    padding: 100px 48px 80px;
    max-width: 900px;
  }
  .hero-eyebrow {
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: ${COLORS.amber}; margin-bottom: 24px; display: flex; align-items: center; gap: 12px;
  }
  .hero-eyebrow::after { content: ''; display: block; width: 40px; height: 1px; background: ${COLORS.amber}; }
  .hero h1 {
    font-family: 'Playfair Display', serif; font-size: clamp(52px, 8vw, 96px);
    font-weight: 900; line-height: 0.95; letter-spacing: -2px;
    margin-bottom: 32px; color: ${COLORS.cream};
  }
  .hero h1 em { color: ${COLORS.amber}; font-style: italic; }
  .hero p {
    font-size: 15px; line-height: 1.8; color: #a09880; max-width: 480px;
    margin-bottom: 48px;
  }
  .hero-actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
  .btn-primary {
    background: ${COLORS.amber}; color: ${COLORS.ink}; border: none;
    padding: 16px 36px; font-family: 'DM Mono', monospace; font-size: 14px;
    font-weight: 500; cursor: pointer; letter-spacing: 0.5px; transition: all 0.2s;
  }
  .btn-primary:hover { background: ${COLORS.amberLight}; transform: translateY(-1px); }
  .btn-ghost {
    background: transparent; color: ${COLORS.cream}; border: 1px solid #3a3830;
    padding: 16px 36px; font-family: 'DM Mono', monospace; font-size: 14px;
    cursor: pointer; letter-spacing: 0.5px; transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: ${COLORS.amber}; color: ${COLORS.amber}; }

  .social-proof {
    padding: 0 48px; margin-top: 80px; border-top: 1px solid #2a2820; padding-top: 48px;
    display: flex; gap: 64px; flex-wrap: wrap;
  }
  .stat-num {
    font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700;
    color: ${COLORS.amber};
  }
  .stat-label { font-size: 12px; color: #6a6050; letter-spacing: 1px; margin-top: 4px; }

  .features {
    padding: 80px 48px; display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: #2a2820; border-top: 1px solid #2a2820;
  }
  .feature {
    background: ${COLORS.ink}; padding: 48px 36px;
    transition: background 0.2s;
  }
  .feature:hover { background: #161410; }
  .feature-icon {
    width: 40px; height: 40px; border: 1px solid #3a3830;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 24px;
  }
  .feature h3 {
    font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600;
    margin-bottom: 12px; color: ${COLORS.cream};
  }
  .feature p { font-size: 13px; line-height: 1.8; color: #6a6050; }

  /* PAYWALL */
  .paywall {
    min-height: 100vh; background: ${COLORS.cream};
    display: flex; align-items: center; justify-content: center; padding: 48px 24px;
  }
  .paywall-card {
    background: ${COLORS.white}; max-width: 420px; width: 100%;
    border: 1px solid ${COLORS.sand}; padding: 48px;
    box-shadow: 8px 8px 0px ${COLORS.sand};
  }
  .paywall-tag {
    display: inline-block; background: ${COLORS.amber}; color: ${COLORS.ink};
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    padding: 4px 10px; margin-bottom: 24px;
  }
  .paywall-card h2 {
    font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700;
    margin-bottom: 8px; line-height: 1.1;
  }
  .paywall-card p { font-size: 13px; color: ${COLORS.muted}; margin-bottom: 32px; line-height: 1.7; }
  .price-display {
    border-top: 1px solid ${COLORS.sand}; border-bottom: 1px solid ${COLORS.sand};
    padding: 24px 0; margin-bottom: 32px; display: flex; align-items: baseline; gap: 8px;
  }
  .price-amount {
    font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 900; color: ${COLORS.ink};
  }
  .price-period { font-size: 13px; color: ${COLORS.muted}; }
  .perks { list-style: none; margin-bottom: 32px; display: flex; flex-direction: column; gap: 12px; }
  .perks li { font-size: 13px; display: flex; gap: 12px; align-items: flex-start; }
  .perks li::before { content: '✓'; color: ${COLORS.amber}; font-weight: 700; flex-shrink: 0; }
  .subscribe-btn {
    width: 100%; background: ${COLORS.ink}; color: ${COLORS.cream};
    border: none; padding: 18px; font-family: 'DM Mono', monospace;
    font-size: 14px; font-weight: 500; cursor: pointer; letter-spacing: 1px;
    text-transform: uppercase; transition: background 0.2s; margin-bottom: 12px;
  }
  .subscribe-btn:hover { background: #2a2820; }
  .paywall-note { font-size: 11px; color: #b0a890; text-align: center; letter-spacing: 0.5px; }
  .back-link {
    display: block; text-align: center; margin-top: 20px;
    font-size: 12px; color: ${COLORS.muted}; cursor: pointer; text-decoration: underline;
  }

  /* APP */
  .app-shell { min-height: 100vh; background: ${COLORS.cream}; }
  .app-header {
    background: ${COLORS.ink}; padding: 20px 48px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .app-header .logo { font-size: 18px; }
  .app-tabs {
    display: flex; gap: 4px; padding: 0 48px;
    background: ${COLORS.sand}; border-bottom: 2px solid #d0c8b0;
  }
  .tab {
    padding: 16px 24px; font-size: 12px; letter-spacing: 1px;
    text-transform: uppercase; cursor: pointer; border: none;
    background: transparent; color: ${COLORS.muted}; font-family: 'DM Mono', monospace;
    border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.15s;
  }
  .tab.active { color: ${COLORS.ink}; border-bottom-color: ${COLORS.amber}; font-weight: 500; }
  .tab:hover { color: ${COLORS.ink}; }

  .app-content { padding: 40px 48px; max-width: 1100px; margin: 0 auto; }

  /* BUILDER */
  .builder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

  .form-panel {
    background: ${COLORS.white}; border: 1px solid ${COLORS.sand};
    padding: 32px; display: flex; flex-direction: column; gap: 24px;
  }
  .panel-title {
    font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600;
    border-bottom: 1px solid ${COLORS.sand}; padding-bottom: 16px; margin-bottom: 4px;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label {
    font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: ${COLORS.muted};
  }
  .form-group input, .form-group textarea, .form-group select {
    border: 1px solid ${COLORS.sand}; padding: 10px 12px;
    font-family: 'DM Mono', monospace; font-size: 13px; color: ${COLORS.ink};
    background: ${COLORS.cream}; outline: none; width: 100%; resize: vertical;
    transition: border-color 0.15s;
  }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
    border-color: ${COLORS.amber};
  }

  /* LINE ITEMS */
  .line-items { display: flex; flex-direction: column; gap: 8px; }
  .line-item-row { display: grid; grid-template-columns: 3fr 1fr 1fr auto; gap: 8px; align-items: center; }
  .line-item-row input {
    border: 1px solid ${COLORS.sand}; padding: 8px 10px;
    font-family: 'DM Mono', monospace; font-size: 13px; background: ${COLORS.cream};
    outline: none; transition: border-color 0.15s; color: ${COLORS.ink};
  }
  .line-item-row input:focus { border-color: ${COLORS.amber}; }
  .del-btn {
    background: none; border: 1px solid #e0d8c8; color: #c0a888;
    width: 28px; height: 28px; cursor: pointer; font-size: 14px;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0;
  }
  .del-btn:hover { background: #fff0e8; border-color: #c08060; color: #a06040; }
  .add-item-btn {
    background: none; border: 1px dashed ${COLORS.sand}; padding: 10px;
    font-family: 'DM Mono', monospace; font-size: 12px; color: ${COLORS.muted};
    cursor: pointer; letter-spacing: 0.5px; transition: all 0.2s; margin-top: 4px;
  }
  .add-item-btn:hover { border-color: ${COLORS.amber}; color: ${COLORS.amber}; }

  /* PREVIEW */
  .preview-panel {
    background: ${COLORS.white}; border: 1px solid ${COLORS.sand};
    overflow: hidden; position: sticky; top: 20px;
  }
  .preview-header {
    background: ${COLORS.sand}; padding: 12px 20px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .preview-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${COLORS.muted}; }
  .print-btn {
    background: ${COLORS.amber}; color: ${COLORS.ink}; border: none;
    padding: 8px 18px; font-family: 'DM Mono', monospace; font-size: 11px;
    cursor: pointer; letter-spacing: 0.5px; transition: background 0.15s;
  }
  .print-btn:hover { background: ${COLORS.amberLight}; }

  .invoice-doc { padding: 40px; min-height: 600px; }
  .inv-header { display: flex; justify-content: space-between; margin-bottom: 40px; }
  .inv-company-name {
    font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: ${COLORS.ink};
  }
  .inv-type-badge {
    background: ${COLORS.ink}; color: ${COLORS.cream};
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    padding: 6px 14px; align-self: flex-start;
  }
  .inv-meta { display: flex; gap: 32px; margin-bottom: 32px; }
  .inv-meta-block { display: flex; flex-direction: column; gap: 4px; }
  .inv-meta-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: ${COLORS.muted}; }
  .inv-meta-value { font-size: 13px; color: ${COLORS.ink}; }
  .inv-divider { border: none; border-top: 2px solid ${COLORS.ink}; margin: 24px 0 16px; }
  .inv-items-header {
    display: grid; grid-template-columns: 3fr 1fr 1fr 1fr;
    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
    color: ${COLORS.muted}; padding: 0 0 10px; border-bottom: 1px solid ${COLORS.sand};
    margin-bottom: 8px;
  }
  .inv-item {
    display: grid; grid-template-columns: 3fr 1fr 1fr 1fr;
    padding: 10px 0; border-bottom: 1px solid ${COLORS.sand}; font-size: 13px;
  }
  .inv-item:last-child { border-bottom: none; }
  .inv-totals { margin-top: 24px; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
  .inv-total-row { display: flex; gap: 40px; font-size: 13px; }
  .inv-total-label { color: ${COLORS.muted}; min-width: 80px; text-align: right; }
  .inv-total-value { min-width: 80px; text-align: right; font-weight: 500; }
  .inv-grand-total {
    display: flex; gap: 40px; font-size: 16px; padding-top: 12px;
    border-top: 2px solid ${COLORS.ink}; margin-top: 4px;
  }
  .inv-grand-total .inv-total-label { color: ${COLORS.ink}; font-weight: 600; }
  .inv-grand-total .inv-total-value {
    font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700;
  }
  .inv-notes {
    margin-top: 40px; padding-top: 20px; border-top: 1px solid ${COLORS.sand};
    font-size: 12px; color: ${COLORS.muted}; line-height: 1.7;
  }
  .inv-footer {
    margin-top: 32px; padding-top: 16px; border-top: 1px solid ${COLORS.sand};
    font-size: 10px; color: #c0b8a0; text-align: center; letter-spacing: 1px;
  }

  /* TEMPLATES */
  .templates-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .template-card {
    background: ${COLORS.white}; border: 2px solid ${COLORS.sand};
    padding: 28px; cursor: pointer; transition: all 0.2s;
  }
  .template-card:hover { border-color: ${COLORS.amber}; transform: translateY(-2px); box-shadow: 4px 4px 0 ${COLORS.sand}; }
  .template-icon { font-size: 28px; margin-bottom: 16px; }
  .template-card h3 {
    font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 600;
    margin-bottom: 8px;
  }
  .template-card p { font-size: 12px; color: ${COLORS.muted}; line-height: 1.6; }
  .template-tag {
    display: inline-block; background: ${COLORS.sand}; font-size: 10px;
    padding: 3px 8px; margin-top: 12px; color: ${COLORS.muted}; letter-spacing: 0.5px;
  }

  /* HISTORY */
  .history-list { display: flex; flex-direction: column; gap: 1px; background: ${COLORS.sand}; }
  .history-item {
    background: ${COLORS.white}; padding: 20px 28px;
    display: flex; align-items: center; justify-content: space-between;
    transition: background 0.15s; cursor: pointer;
  }
  .history-item:hover { background: #fdfaf5; }
  .history-meta { display: flex; gap: 24px; align-items: center; }
  .history-type {
    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
    background: ${COLORS.ink}; color: ${COLORS.cream}; padding: 3px 8px;
  }
  .history-client { font-size: 14px; font-weight: 500; }
  .history-date { font-size: 12px; color: ${COLORS.muted}; }
  .history-amount {
    font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: ${COLORS.amber};
  }
  .status-badge {
    font-size: 10px; padding: 3px 10px; letter-spacing: 1px; text-transform: uppercase;
  }
  .status-paid { background: #e8f5e8; color: #2a7a2a; }
  .status-sent { background: #fff8e8; color: #a06020; }
  .status-draft { background: ${COLORS.sand}; color: ${COLORS.muted}; }

  .section-title {
    font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700;
    margin-bottom: 8px;
  }
  .section-sub { font-size: 13px; color: ${COLORS.muted}; margin-bottom: 28px; }

  @media (max-width: 768px) {
    .builder-grid, .features, .templates-grid { grid-template-columns: 1fr; }
    .nav, .hero, .app-content, .social-proof { padding-left: 24px; padding-right: 24px; }
    .app-tabs { padding: 0 24px; overflow-x: auto; }
    .app-header { padding: 16px 24px; }
  }
`;

const generateInvoiceNumber = () => {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `INV-${num}`;
};

const today = () => new Date().toISOString().split("T")[0];
const dueDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
};

const TEMPLATES = [
  { icon: "🔧", name: "Service Agreement", tag: "Consulting", desc: "For service-based businesses billing by hour or project." },
  { icon: "🏗️", name: "Construction Bid", tag: "Contractors", desc: "Detailed proposal with labor, materials and project timeline." },
  { icon: "🎨", name: "Creative Project", tag: "Designers", desc: "Ideal for graphic design, photography, or creative work." },
  { icon: "💻", name: "Web Development", tag: "Tech", desc: "Software, apps and tech projects with milestone billing." },
  { icon: "📋", name: "Consulting Retainer", tag: "Consulting", desc: "Monthly retainer agreements with scope and deliverables." },
  { icon: "🏠", name: "Real Estate Services", tag: "Real Estate", desc: "Property management fees, commissions and related services." },
];

const SAMPLE_HISTORY = [
  { type: "Invoice", client: "Maple & Co.", date: "Mar 10, 2026", amount: "$3,200.00", status: "paid" },
  { type: "Proposal", client: "Bright Ideas Studio", date: "Mar 08, 2026", amount: "$8,500.00", status: "sent" },
  { type: "Invoice", client: "TechBridge LLC", date: "Mar 05, 2026", amount: "$1,750.00", status: "paid" },
  { type: "Invoice", client: "Coastal Ventures", date: "Feb 28, 2026", amount: "$4,900.00", status: "sent" },
  { type: "Proposal", client: "Nova Interiors", date: "Feb 22, 2026", amount: "$12,000.00", status: "draft" },
];

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | paywall | app
  const [activeTab, setActiveTab] = useState("builder");
  const [docType, setDocType] = useState("Invoice");
  const [invoiceNum] = useState(generateInvoiceNumber());

  const [sender, setSender] = useState({ name: "", email: "", address: "" });
  const [client, setClient] = useState({ name: "", email: "", address: "" });
  const [dates, setDates] = useState({ issue: today(), due: dueDate() });
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState(0);

  const [items, setItems] = useState([
    { id: 1, desc: "Professional Services", qty: 1, rate: 0 },
  ]);

  const addItem = () => setItems(prev => [...prev, { id: Date.now(), desc: "", qty: 1, rate: 0 }]);
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const updateItem = (id, field, value) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));

  const subtotal = items.reduce((sum, i) => sum + (parseFloat(i.qty) || 0) * (parseFloat(i.rate) || 0), 0);
  const tax = subtotal * (parseFloat(taxRate) / 100 || 0);
  const total = subtotal + tax;

  const fmt = (n) => "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const loadTemplate = (t) => {
    if (t.name === "Web Development") {
      setItems([
        { id: 1, desc: "Discovery & Planning", qty: 1, rate: 1200 },
        { id: 2, desc: "UI/UX Design", qty: 1, rate: 2400 },
        { id: 3, desc: "Frontend Development", qty: 40, rate: 85 },
        { id: 4, desc: "Backend Integration", qty: 20, rate: 95 },
      ]);
    } else if (t.name === "Consulting Retainer") {
      setItems([
        { id: 1, desc: "Monthly Retainer Fee", qty: 1, rate: 3500 },
        { id: 2, desc: "Additional Hours (est.)", qty: 5, rate: 150 },
      ]);
    } else if (t.name === "Creative Project") {
      setItems([
        { id: 1, desc: "Brand Strategy", qty: 1, rate: 1800 },
        { id: 2, desc: "Logo Design (3 concepts)", qty: 1, rate: 950 },
        { id: 3, desc: "Brand Guidelines", qty: 1, rate: 600 },
      ]);
    } else {
      setItems([{ id: 1, desc: t.name + " Services", qty: 1, rate: 500 }]);
    }
    setActiveTab("builder");
  };

  return (
    <>
      <style>{style}</style>
      <div className="app">

        {/* LANDING */}
        {screen === "landing" && (
          <div className="landing">
            <nav className="nav">
              <div className="logo">Ledger<span>ly</span></div>
              <button className="nav-cta" onClick={() => setScreen("paywall")}>Start Free Trial</button>
            </nav>

            <div className="hero">
              <div className="hero-eyebrow">Professional Invoicing</div>
              <h1>Get paid<br />faster. Look<br /><em>sharper.</em></h1>
              <p>
                Create beautiful invoices and proposals in minutes.
                Built for small business owners who want to look professional
                without spending hours on paperwork.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => setScreen("paywall")}>
                  Start Free — $19/mo after
                </button>
                <button className="btn-ghost" onClick={() => setScreen("app")}>
                  Preview the tool →
                </button>
              </div>
            </div>

            <div className="social-proof">
              <div>
                <div className="stat-num">2 min</div>
                <div className="stat-label">Avg. invoice time</div>
              </div>
              <div>
                <div className="stat-num">$19</div>
                <div className="stat-label">Per month, flat</div>
              </div>
              <div>
                <div className="stat-num">∞</div>
                <div className="stat-label">Invoices & proposals</div>
              </div>
              <div>
                <div className="stat-num">PDF</div>
                <div className="stat-label">Export & print ready</div>
              </div>
            </div>

            <div className="features">
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <h3>Instant Generation</h3>
                <p>Fill in your details and your invoice is ready. No learning curve, no complicated settings.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">📄</div>
                <h3>6 Pro Templates</h3>
                <p>Industry-specific templates for contractors, consultants, designers, developers and more.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">💾</div>
                <h3>Document History</h3>
                <p>All your invoices and proposals saved in one place. Track what's paid, sent, or pending.</p>
              </div>
            </div>
          </div>
        )}

        {/* PAYWALL */}
        {screen === "paywall" && (
          <div className="paywall">
            <div className="paywall-card">
              <div className="paywall-tag">7-Day Free Trial</div>
              <h2>Start creating professional invoices today</h2>
              <p>Join small business owners who send polished invoices and proposals in minutes, not hours.</p>
              <div className="price-display">
                <div className="price-amount">$19</div>
                <div className="price-period">/ month<br /><span style={{fontSize:11, color:'#b0a890'}}>Cancel anytime</span></div>
              </div>
              <ul className="perks">
                <li>Unlimited invoices & proposals</li>
                <li>6 industry-specific templates</li>
                <li>PDF export & print-ready format</li>
                <li>Tax calculation & line items</li>
                <li>Document history & status tracking</li>
                <li>Your logo & branding on every doc</li>
              </ul>
              <button className="subscribe-btn" onClick={() => window.location.href - "https://buy.stripe.com/bJecN601O2NO8PocHA2Ji00"}>
                Start Free Trial — No Card Needed
              </button>
              <div className="paywall-note">🔒 SECURED WITH STRIPE · CANCEL ANYTIME</div>
              <span className="back-link" onClick={() => setScreen("landing")}>← Back to homepage</span>
            </div>
          </div>
        )}

        {/* APP */}
        {screen === "app" && (
          <div className="app-shell">
            <div className="app-header">
              <div className="logo">Ledger<span style={{color:COLORS.amber}}>ly</span></div>
              <div style={{display:'flex', gap:16, alignItems:'center'}}>
                <span style={{fontSize:12, color:'#6a6050'}}>7 days left in trial</span>
                <button className="nav-cta" onClick={() => setScreen("paywall")}>Upgrade $19/mo</button>
              </div>
            </div>

            <div className="app-tabs">
              {["builder","templates","history"].map(t => (
                <button key={t} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                  {t === "builder" ? "📝 Builder" : t === "templates" ? "📂 Templates" : "🗂 History"}
                </button>
              ))}
            </div>

            <div className="app-content">

              {/* BUILDER */}
              {activeTab === "builder" && (
                <div className="builder-grid">
                  <div style={{display:'flex', flexDirection:'column', gap:20}}>

                    {/* Doc Type */}
                    <div className="form-panel">
                      <div className="panel-title">Document Type</div>
                      <div style={{display:'flex', gap:8}}>
                        {["Invoice","Proposal","Quote"].map(t => (
                          <button key={t} onClick={() => setDocType(t)} style={{
                            flex:1, padding:'10px', border:`2px solid ${docType===t ? COLORS.amber : COLORS.sand}`,
                            background: docType===t ? COLORS.amber : 'transparent',
                            color: docType===t ? COLORS.ink : COLORS.muted,
                            fontFamily:"'DM Mono', monospace", fontSize:12, cursor:'pointer',
                            letterSpacing:'0.5px', transition:'all 0.15s', fontWeight: docType===t ? '600' : '400'
                          }}>{t}</button>
                        ))}
                      </div>
                    </div>

                    {/* Your Info */}
                    <div className="form-panel">
                      <div className="panel-title">Your Business</div>
                      <div className="form-group">
                        <label>Business Name</label>
                        <input value={sender.name} onChange={e => setSender({...sender, name: e.target.value})} placeholder="Acme Services LLC" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Email</label>
                          <input value={sender.email} onChange={e => setSender({...sender, email: e.target.value})} placeholder="you@company.com" />
                        </div>
                        <div className="form-group">
                          <label>Phone</label>
                          <input placeholder="(555) 000-0000" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <textarea value={sender.address} onChange={e => setSender({...sender, address: e.target.value})} placeholder="123 Main St, City, State" rows={2} />
                      </div>
                    </div>

                    {/* Client */}
                    <div className="form-panel">
                      <div className="panel-title">Bill To</div>
                      <div className="form-group">
                        <label>Client / Company Name</label>
                        <input value={client.name} onChange={e => setClient({...client, name: e.target.value})} placeholder="Client Name or Company" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Email</label>
                          <input value={client.email} onChange={e => setClient({...client, email: e.target.value})} placeholder="client@email.com" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <textarea value={client.address} onChange={e => setClient({...client, address: e.target.value})} placeholder="Client address" rows={2} />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="form-panel">
                      <div className="panel-title">Dates</div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Issue Date</label>
                          <input type="date" value={dates.issue} onChange={e => setDates({...dates, issue: e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label>Due Date</label>
                          <input type="date" value={dates.due} onChange={e => setDates({...dates, due: e.target.value})} />
                        </div>
                      </div>
                    </div>

                    {/* Line Items */}
                    <div className="form-panel">
                      <div className="panel-title">Line Items</div>
                      <div style={{display:'grid', gridTemplateColumns:'3fr 1fr 1fr auto', gap:8, marginBottom:8}}>
                        {["Description","Qty","Rate",""].map((h,i) => (
                          <div key={i} style={{fontSize:9, letterSpacing:'1.5px', textTransform:'uppercase', color:COLORS.muted}}>{h}</div>
                        ))}
                      </div>
                      <div className="line-items">
                        {items.map(item => (
                          <div key={item.id} className="line-item-row">
                            <input value={item.desc} onChange={e => updateItem(item.id, 'desc', e.target.value)} placeholder="Service description" />
                            <input type="number" value={item.qty} onChange={e => updateItem(item.id, 'qty', e.target.value)} placeholder="1" min="0" />
                            <input type="number" value={item.rate} onChange={e => updateItem(item.id, 'rate', e.target.value)} placeholder="0.00" min="0" step="0.01" />
                            <button className="del-btn" onClick={() => removeItem(item.id)}>×</button>
                          </div>
                        ))}
                      </div>
                      <button className="add-item-btn" onClick={addItem}>+ Add Line Item</button>

                      <div style={{display:'flex', justifyContent:'flex-end', marginTop:16}}>
                        <div style={{display:'flex', alignItems:'center', gap:12}}>
                          <label style={{fontSize:12, color:COLORS.muted}}>Tax %</label>
                          <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)}
                            style={{width:70, border:`1px solid ${COLORS.sand}`, padding:'6px 8px',
                              fontFamily:"'DM Mono', monospace", fontSize:13, background:COLORS.cream,
                              outline:'none', color:COLORS.ink}} placeholder="0" min="0" max="100" />
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="form-panel">
                      <div className="panel-title">Notes & Terms</div>
                      <div className="form-group">
                        <label>Notes (optional)</label>
                        <textarea value={notes} onChange={e => setNotes(e.target.value)}
                          placeholder="Payment terms, thank you note, bank details..." rows={3} />
                      </div>
                    </div>
                  </div>

                  {/* PREVIEW */}
                  <div>
                    <div className="preview-panel">
                      <div className="preview-header">
                        <span className="preview-label">Live Preview</span>
                        <button className="print-btn" onClick={() => window.print()}>Export PDF</button>
                      </div>
                      <div className="invoice-doc">
                        <div className="inv-header">
                          <div>
                            <div className="inv-company-name">{sender.name || "Your Business Name"}</div>
                            <div style={{fontSize:12, color:COLORS.muted, marginTop:6, lineHeight:1.7}}>
                              {sender.email && <div>{sender.email}</div>}
                              {sender.address && <div style={{whiteSpace:'pre-line'}}>{sender.address}</div>}
                            </div>
                          </div>
                          <div className="inv-type-badge">{docType}</div>
                        </div>

                        <div className="inv-meta">
                          <div className="inv-meta-block">
                            <div className="inv-meta-label">Number</div>
                            <div className="inv-meta-value">{invoiceNum}</div>
                          </div>
                          <div className="inv-meta-block">
                            <div className="inv-meta-label">Issued</div>
                            <div className="inv-meta-value">{dates.issue}</div>
                          </div>
                          <div className="inv-meta-block">
                            <div className="inv-meta-label">Due</div>
                            <div className="inv-meta-value">{dates.due}</div>
                          </div>
                        </div>

                        {client.name && (
                          <div style={{marginBottom:24, padding:'16px', background:COLORS.cream}}>
                            <div className="inv-meta-label" style={{marginBottom:6}}>Bill To</div>
                            <div style={{fontSize:14, fontWeight:500}}>{client.name}</div>
                            {client.email && <div style={{fontSize:12, color:COLORS.muted}}>{client.email}</div>}
                            {client.address && <div style={{fontSize:12, color:COLORS.muted, whiteSpace:'pre-line'}}>{client.address}</div>}
                          </div>
                        )}

                        <hr className="inv-divider" />
                        <div className="inv-items-header">
                          <div>Description</div><div>Qty</div><div>Rate</div><div style={{textAlign:'right'}}>Amount</div>
                        </div>
                        {items.map(item => (
                          <div key={item.id} className="inv-item">
                            <div>{item.desc || "—"}</div>
                            <div>{item.qty}</div>
                            <div>{fmt(parseFloat(item.rate)||0)}</div>
                            <div style={{textAlign:'right'}}>{fmt((parseFloat(item.qty)||0)*(parseFloat(item.rate)||0))}</div>
                          </div>
                        ))}

                        <div className="inv-totals">
                          <div className="inv-total-row">
                            <div className="inv-total-label">Subtotal</div>
                            <div className="inv-total-value">{fmt(subtotal)}</div>
                          </div>
                          {taxRate > 0 && (
                            <div className="inv-total-row">
                              <div className="inv-total-label">Tax ({taxRate}%)</div>
                              <div className="inv-total-value">{fmt(tax)}</div>
                            </div>
                          )}
                          <div className="inv-grand-total">
                            <div className="inv-total-label">Total Due</div>
                            <div className="inv-total-value">{fmt(total)}</div>
                          </div>
                        </div>

                        {notes && (
                          <div className="inv-notes">
                            <div style={{fontSize:9, letterSpacing:'2px', textTransform:'uppercase', color:COLORS.muted, marginBottom:6}}>Notes</div>
                            {notes}
                          </div>
                        )}

                        <div className="inv-footer">Generated with Ledgerly · ledgerly.app</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATES */}
              {activeTab === "templates" && (
                <div>
                  <div className="section-title">Templates</div>
                  <div className="section-sub">Choose a template to pre-fill your invoice builder.</div>
                  <div className="templates-grid">
                    {TEMPLATES.map(t => (
                      <div key={t.name} className="template-card" onClick={() => loadTemplate(t)}>
                        <div className="template-icon">{t.icon}</div>
                        <h3>{t.name}</h3>
                        <p>{t.desc}</p>
                        <div className="template-tag">{t.tag}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HISTORY */}
              {activeTab === "history" && (
                <div>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:24}}>
                    <div>
                      <div className="section-title">Document History</div>
                      <div className="section-sub">All your invoices and proposals in one place.</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontFamily:"'Playfair Display', serif", fontSize:28, fontWeight:700, color:COLORS.amber}}>$30,350</div>
                      <div style={{fontSize:11, color:COLORS.muted, letterSpacing:'1px'}}>Total billed this month</div>
                    </div>
                  </div>
                  <div className="history-list">
                    {SAMPLE_HISTORY.map((h, i) => (
                      <div key={i} className="history-item">
                        <div className="history-meta">
                          <div className="history-type">{h.type}</div>
                          <div>
                            <div className="history-client">{h.client}</div>
                            <div className="history-date">{h.date}</div>
                          </div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', gap:20}}>
                          <div className="history-amount">{h.amount}</div>
                          <div className={`status-badge status-${h.status}`}>{h.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </>
  );
}
