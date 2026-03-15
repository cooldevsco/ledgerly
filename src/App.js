/* eslint-disable */
import React, { useState, useRef } from "react";

const COLORS = {
  ink: "#0f0e0c",
  cream: "#f5f0e8",
  sand: "#e8dfc8",
  amber: "#c8922a",
  amberLight: "#e8b84b",
  muted: "#7a7060",
  white: "#ffffff",
};

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD — US Dollar" },
  { code: "GBP", symbol: "£", label: "GBP — British Pound" },
  { code: "EUR", symbol: "€", label: "EUR — Euro" },
  { code: "CAD", symbol: "CA$", label: "CAD — Canadian Dollar" },
  { code: "AUD", symbol: "A$", label: "AUD — Australian Dollar" },
  { code: "JPY", symbol: "¥", label: "JPY — Japanese Yen" },
];

const ACCENT_COLORS = [
  { name: "Amber", value: "#c8922a" },
  { name: "Navy", value: "#1a3a5c" },
  { name: "Forest", value: "#2a5c3a" },
  { name: "Burgundy", value: "#7a1a2a" },
  { name: "Slate", value: "#3a4a5c" },
  { name: "Charcoal", value: "#3a3a3a" },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f5f0e8; color: #0f0e0c; font-family: 'DM Mono', monospace; }
  .app { min-height: 100vh; }

  .landing { background: #0f0e0c; color: #f5f0e8; min-height: 100vh; }
  .nav { display: flex; justify-content: space-between; align-items: center; padding: 28px 48px; border-bottom: 1px solid #2a2820; }
  .logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #f5f0e8; }
  .nav-cta { background: #c8922a; color: #0f0e0c; border: none; padding: 10px 24px; font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500; cursor: pointer; letter-spacing: 0.5px; transition: background 0.2s; }
  .nav-cta:hover { background: #e8b84b; }
  .hero { padding: 100px 48px 80px; max-width: 900px; }
  .hero-eyebrow { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #c8922a; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
  .hero-eyebrow::after { content: ''; display: block; width: 40px; height: 1px; background: #c8922a; }
  .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(52px, 8vw, 96px); font-weight: 900; line-height: 0.95; letter-spacing: -2px; margin-bottom: 32px; color: #f5f0e8; }
  .hero h1 em { color: #c8922a; font-style: italic; }
  .hero p { font-size: 15px; line-height: 1.8; color: #a09880; max-width: 480px; margin-bottom: 48px; }
  .hero-actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
  .btn-primary { background: #c8922a; color: #0f0e0c; border: none; padding: 16px 36px; font-family: 'DM Mono', monospace; font-size: 14px; font-weight: 500; cursor: pointer; letter-spacing: 0.5px; transition: all 0.2s; }
  .btn-primary:hover { background: #e8b84b; transform: translateY(-1px); }
  .btn-ghost { background: transparent; color: #f5f0e8; border: 1px solid #3a3830; padding: 16px 36px; font-family: 'DM Mono', monospace; font-size: 14px; cursor: pointer; letter-spacing: 0.5px; transition: all 0.2s; }
  .btn-ghost:hover { border-color: #c8922a; color: #c8922a; }
  .social-proof { padding: 0 48px; margin-top: 80px; border-top: 1px solid #2a2820; padding-top: 48px; display: flex; gap: 64px; flex-wrap: wrap; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: #c8922a; }
  .stat-label { font-size: 12px; color: #6a6050; letter-spacing: 1px; margin-top: 4px; }
  .features { padding: 80px 48px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #2a2820; border-top: 1px solid #2a2820; }
  .feature { background: #0f0e0c; padding: 48px 36px; transition: background 0.2s; }
  .feature:hover { background: #161410; }
  .feature-icon { width: 40px; height: 40px; border: 1px solid #3a3830; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 24px; }
  .feature h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #f5f0e8; }
  .feature p { font-size: 13px; line-height: 1.8; color: #6a6050; }

  .paywall { min-height: 100vh; background: #f5f0e8; display: flex; align-items: center; justify-content: center; padding: 48px 24px; }
  .paywall-card { background: #ffffff; max-width: 420px; width: 100%; border: 1px solid #e8dfc8; padding: 48px; box-shadow: 8px 8px 0px #e8dfc8; }
  .paywall-tag { display: inline-block; background: #c8922a; color: #0f0e0c; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; margin-bottom: 24px; }
  .paywall-card h2 { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; margin-bottom: 8px; line-height: 1.1; }
  .paywall-card p { font-size: 13px; color: #7a7060; margin-bottom: 32px; line-height: 1.7; }
  .price-display { border-top: 1px solid #e8dfc8; border-bottom: 1px solid #e8dfc8; padding: 24px 0; margin-bottom: 32px; display: flex; align-items: baseline; gap: 8px; }
  .price-amount { font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 900; color: #0f0e0c; }
  .price-period { font-size: 13px; color: #7a7060; }
  .perks { list-style: none; margin-bottom: 32px; display: flex; flex-direction: column; gap: 12px; }
  .perks li { font-size: 13px; display: flex; gap: 12px; align-items: flex-start; }
  .perks li::before { content: '✓'; color: #c8922a; font-weight: 700; flex-shrink: 0; }
  .subscribe-btn { width: 100%; background: #0f0e0c; color: #f5f0e8; border: none; padding: 18px; font-family: 'DM Mono', monospace; font-size: 14px; font-weight: 500; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; transition: background 0.2s; margin-bottom: 12px; }
  .subscribe-btn:hover { background: #2a2820; }
  .paywall-note { font-size: 11px; color: #b0a890; text-align: center; letter-spacing: 0.5px; }
  .back-link { display: block; text-align: center; margin-top: 20px; font-size: 12px; color: #7a7060; cursor: pointer; text-decoration: underline; }

  .app-shell { min-height: 100vh; background: #f5f0e8; }
  .app-header { background: #0f0e0c; padding: 20px 48px; display: flex; justify-content: space-between; align-items: center; }
  .app-tabs { display: flex; gap: 4px; padding: 0 48px; background: #e8dfc8; border-bottom: 2px solid #d0c8b0; overflow-x: auto; }
  .tab { padding: 16px 24px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border: none; background: transparent; color: #7a7060; font-family: 'DM Mono', monospace; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.15s; white-space: nowrap; }
  .tab.active { color: #0f0e0c; border-bottom-color: #c8922a; font-weight: 500; }
  .tab:hover { color: #0f0e0c; }
  .app-content { padding: 40px 48px; max-width: 1100px; margin: 0 auto; }

  .builder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  .form-panel { background: #ffffff; border: 1px solid #e8dfc8; padding: 32px; display: flex; flex-direction: column; gap: 24px; }
  .panel-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; border-bottom: 1px solid #e8dfc8; padding-bottom: 16px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #7a7060; }
  .form-group input, .form-group textarea, .form-group select { border: 1px solid #e8dfc8; padding: 10px 12px; font-family: 'DM Mono', monospace; font-size: 13px; color: #0f0e0c; background: #f5f0e8; outline: none; width: 100%; resize: vertical; transition: border-color 0.15s; }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: #c8922a; }

  .line-items { display: flex; flex-direction: column; gap: 8px; }
  .line-item-row { display: grid; grid-template-columns: 3fr 1fr 1fr auto; gap: 8px; align-items: center; }
  .line-item-row input { border: 1px solid #e8dfc8; padding: 8px 10px; font-family: 'DM Mono', monospace; font-size: 13px; background: #f5f0e8; outline: none; transition: border-color 0.15s; color: #0f0e0c; }
  .line-item-row input:focus { border-color: #c8922a; }
  .del-btn { background: none; border: 1px solid #e0d8c8; color: #c0a888; width: 28px; height: 28px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
  .del-btn:hover { background: #fff0e8; border-color: #c08060; color: #a06040; }
  .add-item-btn { background: none; border: 1px dashed #e8dfc8; padding: 10px; font-family: 'DM Mono', monospace; font-size: 12px; color: #7a7060; cursor: pointer; letter-spacing: 0.5px; transition: all 0.2s; margin-top: 4px; }
  .add-item-btn:hover { border-color: #c8922a; color: #c8922a; }

  .preview-panel { background: #ffffff; border: 1px solid #e8dfc8; overflow: hidden; position: sticky; top: 20px; }
  .preview-header { background: #e8dfc8; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
  .preview-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #7a7060; }
  .preview-actions { display: flex; gap: 8px; }
  .print-btn { background: #c8922a; color: #0f0e0c; border: none; padding: 8px 18px; font-family: 'DM Mono', monospace; font-size: 11px; cursor: pointer; letter-spacing: 0.5px; transition: background 0.15s; }
  .print-btn:hover { background: #e8b84b; }
  .email-btn { background: #0f0e0c; color: #f5f0e8; border: none; padding: 8px 18px; font-family: 'DM Mono', monospace; font-size: 11px; cursor: pointer; letter-spacing: 0.5px; transition: background 0.15s; }
  .email-btn:hover { background: #2a2820; }

  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 24px; }
  .modal { background: #ffffff; max-width: 440px; width: 100%; padding: 40px; border: 1px solid #e8dfc8; box-shadow: 8px 8px 0 #e8dfc8; }
  .modal h3 { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; margin-bottom: 20px; }
  .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
  .modal-send { flex: 1; background: #0f0e0c; color: #f5f0e8; border: none; padding: 14px; font-family: 'DM Mono', monospace; font-size: 13px; cursor: pointer; transition: background 0.15s; }
  .modal-send:hover { background: #2a2820; }
  .modal-cancel { background: none; border: 1px solid #e8dfc8; color: #7a7060; padding: 14px 20px; font-family: 'DM Mono', monospace; font-size: 13px; cursor: pointer; }

  .invoice-doc { padding: 40px; min-height: 600px; }
  .inv-header { display: flex; justify-content: space-between; margin-bottom: 40px; align-items: flex-start; }
  .inv-logo { max-width: 120px; max-height: 60px; object-fit: contain; margin-bottom: 8px; display: block; }
  .inv-company-name { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #0f0e0c; }
  .inv-type-badge { color: #f5f0e8; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; padding: 6px 14px; align-self: flex-start; }
  .inv-meta { display: flex; gap: 32px; margin-bottom: 32px; flex-wrap: wrap; }
  .inv-meta-block { display: flex; flex-direction: column; gap: 4px; }
  .inv-meta-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #7a7060; }
  .inv-meta-value { font-size: 13px; color: #0f0e0c; }
  .inv-divider { border: none; border-top: 2px solid #0f0e0c; margin: 24px 0 16px; }
  .inv-items-header { display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #7a7060; padding: 0 0 10px; border-bottom: 1px solid #e8dfc8; margin-bottom: 8px; }
  .inv-item { display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-size: 13px; }
  .inv-item:last-child { border-bottom: none; }
  .inv-totals { margin-top: 24px; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
  .inv-total-row { display: flex; gap: 40px; font-size: 13px; }
  .inv-total-label { color: #7a7060; min-width: 80px; text-align: right; }
  .inv-total-value { min-width: 80px; text-align: right; font-weight: 500; }
  .inv-grand-total { display: flex; gap: 40px; font-size: 16px; padding-top: 12px; border-top: 2px solid #0f0e0c; margin-top: 4px; }
  .inv-grand-total .inv-total-label { color: #0f0e0c; font-weight: 600; }
  .inv-grand-total .inv-total-value { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; }
  .inv-notes { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e8dfc8; font-size: 12px; color: #7a7060; line-height: 1.7; }
  .inv-footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e8dfc8; font-size: 10px; color: #c0b8a0; text-align: center; letter-spacing: 1px; }

  .templates-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .template-card { background: #ffffff; border: 2px solid #e8dfc8; padding: 28px; cursor: pointer; transition: all 0.2s; }
  .template-card:hover { transform: translateY(-2px); box-shadow: 4px 4px 0 #e8dfc8; }
  .template-icon { font-size: 28px; margin-bottom: 16px; }
  .template-card h3 { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 600; margin-bottom: 8px; }
  .template-card p { font-size: 12px; color: #7a7060; line-height: 1.6; }
  .template-tag { display: inline-block; background: #e8dfc8; font-size: 10px; padding: 3px 8px; margin-top: 12px; color: #7a7060; letter-spacing: 0.5px; }

  .history-list { display: flex; flex-direction: column; gap: 1px; background: #e8dfc8; }
  .history-item { background: #ffffff; padding: 20px 28px; display: flex; align-items: center; justify-content: space-between; transition: background 0.15s; flex-wrap: wrap; gap: 12px; }
  .history-item:hover { background: #fdfaf5; }
  .history-meta { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; }
  .history-type { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; background: #0f0e0c; color: #f5f0e8; padding: 3px 8px; }
  .history-client { font-size: 14px; font-weight: 500; }
  .history-date { font-size: 12px; color: #7a7060; }
  .history-amount { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; }
  .status-select { font-size: 10px; padding: 4px 8px; letter-spacing: 1px; text-transform: uppercase; border: none; cursor: pointer; font-family: 'DM Mono', monospace; }
  .status-paid { background: #e8f5e8; color: #2a7a2a; }
  .status-sent { background: #fff8e8; color: #a06020; }
  .status-draft { background: #e8dfc8; color: #7a7060; }

  .clients-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
  .client-card { background: #ffffff; border: 1px solid #e8dfc8; padding: 20px; cursor: pointer; transition: all 0.15s; }
  .client-card:hover { border-color: #c8922a; }
  .client-name { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
  .client-email { font-size: 12px; color: #7a7060; }
  .client-count { font-size: 11px; color: #c8922a; margin-top: 8px; }

  .section-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; margin-bottom: 8px; }
  .section-sub { font-size: 13px; color: #7a7060; margin-bottom: 28px; }

  .color-swatches { display: flex; gap: 8px; flex-wrap: wrap; }
  .color-swatch { width: 28px; height: 28px; border-radius: 50%; cursor: pointer; border: 3px solid transparent; transition: all 0.15s; }
  .color-swatch.selected { border-color: #0f0e0c; transform: scale(1.15); }

  .logo-upload-area { border: 2px dashed #e8dfc8; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; background: #f5f0e8; }
  .logo-upload-area:hover { border-color: #c8922a; }
  .logo-preview { max-width: 100px; max-height: 50px; object-fit: contain; }

  .notification { position: fixed; bottom: 24px; right: 24px; background: #0f0e0c; color: #f5f0e8; padding: 14px 24px; font-size: 13px; z-index: 999; animation: slideIn 0.3s ease; }
  @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  @media (max-width: 768px) {
    .builder-grid, .features, .templates-grid, .clients-grid { grid-template-columns: 1fr; }
    .nav, .hero, .app-content, .social-proof { padding-left: 24px; padding-right: 24px; }
    .app-tabs { padding: 0 24px; }
    .app-header { padding: 16px 24px; }
  }

  @media print {
    .app-header, .app-tabs, .form-panel, .preview-header, .inv-footer { display: none !important; }
    .builder-grid { display: block !important; }
    .preview-panel { border: none !important; box-shadow: none !important; }
    .invoice-doc { padding: 0 !important; }
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

const INITIAL_HISTORY = [
  { id: 1, type: "Invoice", client: "Maple & Co.", date: "Mar 10, 2026", amount: 3200, status: "paid" },
  { id: 2, type: "Proposal", client: "Bright Ideas Studio", date: "Mar 08, 2026", amount: 8500, status: "sent" },
  { id: 3, type: "Invoice", client: "TechBridge LLC", date: "Mar 05, 2026", amount: 1750, status: "paid" },
  { id: 4, type: "Invoice", client: "Coastal Ventures", date: "Feb 28, 2026", amount: 4900, status: "sent" },
  { id: 5, type: "Proposal", client: "Nova Interiors", date: "Feb 22, 2026", amount: 12000, status: "draft" },
];

const INITIAL_CLIENTS = [
  { id: 1, name: "Maple & Co.", email: "contact@maple.co", address: "123 Maple St, Portland, OR", invoiceCount: 3 },
  { id: 2, name: "Bright Ideas Studio", email: "hello@brightideas.com", address: "456 Creative Ave, Austin, TX", invoiceCount: 2 },
  { id: 3, name: "TechBridge LLC", email: "info@techbridge.io", address: "789 Tech Blvd, Seattle, WA", invoiceCount: 4 },
];

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [activeTab, setActiveTab] = useState("builder");
  const [docType, setDocType] = useState("Invoice");
  const [invoiceNum] = useState(generateInvoiceNumber());
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [logoUrl, setLogoUrl] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailNote, setEmailNote] = useState("");
  const [notification, setNotification] = useState(null);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const logoInputRef = useRef(null);

  const [sender, setSender] = useState({ name: "", email: "", address: "" });
  const [client, setClient] = useState({ name: "", email: "", address: "" });
  const [dates, setDates] = useState({ issue: today(), due: dueDate() });
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [items, setItems] = useState([{ id: 1, desc: "Professional Services", qty: 1, rate: 0 }]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addItem = () => setItems(prev => [...prev, { id: Date.now(), desc: "", qty: 1, rate: 0 }]);
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const updateItem = (id, field, value) => setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));

  const subtotal = items.reduce((sum, i) => sum + (parseFloat(i.qty) || 0) * (parseFloat(i.rate) || 0), 0);
  const tax = subtotal * (parseFloat(taxRate) / 100 || 0);
  const total = subtotal + tax;

  const fmt = (n) => currency.symbol + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogoUrl(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const loadClient = (c) => {
    setClient({ name: c.name, email: c.email, address: c.address });
    setEmailTo(c.email);
    showNotification("Client loaded: " + c.name);
    setActiveTab("builder");
  };

  const handleSendEmail = () => {
    if (!emailTo) { showNotification("Please enter an email address"); return; }
    const subject = encodeURIComponent(docType + " from " + (sender.name || "Invoicr") + " — " + invoiceNum);
    const body = encodeURIComponent("Hi " + (client.name || "there") + ",\n\nPlease find your " + docType.toLowerCase() + " (" + invoiceNum + ") attached.\n\nTotal: " + fmt(total) + "\nDue: " + dates.due + "\n\n" + (emailNote ? emailNote + "\n\n" : "") + "Thank you for your business!\n\n" + (sender.name || "") + "\n" + (sender.email || ""));
    window.location.href = "mailto:" + emailTo + "?subject=" + subject + "&body=" + body;
    setShowEmailModal(false);
    showNotification("Email client opened!");
    if (client.name) {
      const newEntry = { id: Date.now(), type: docType, client: client.name, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), amount: total, status: "sent" };
      setHistory(prev => [newEntry, ...prev]);
      if (!clients.find(c => c.name === client.name)) {
        setClients(prev => [...prev, { id: Date.now(), name: client.name, email: client.email, address: client.address, invoiceCount: 1 }]);
      }
    }
  };

  const updateStatus = (id, newStatus) => setHistory(prev => prev.map(h => h.id === id ? { ...h, status: newStatus } : h));

  const exportCSV = () => {
    const headers = ["Type", "Client", "Date", "Amount", "Status"];
    const rows = history.map(h => [h.type, h.client, h.date, fmt(h.amount), h.status]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "invoicr-history.csv"; a.click();
    URL.revokeObjectURL(url);
    showNotification("CSV exported!");
  };

  const loadTemplate = (t) => {
    if (t.name === "Web Development") {
      setItems([{ id: 1, desc: "Discovery & Planning", qty: 1, rate: 1200 }, { id: 2, desc: "UI/UX Design", qty: 1, rate: 2400 }, { id: 3, desc: "Frontend Development", qty: 40, rate: 85 }, { id: 4, desc: "Backend Integration", qty: 20, rate: 95 }]);
    } else if (t.name === "Consulting Retainer") {
      setItems([{ id: 1, desc: "Monthly Retainer Fee", qty: 1, rate: 3500 }, { id: 2, desc: "Additional Hours (est.)", qty: 5, rate: 150 }]);
    } else if (t.name === "Creative Project") {
      setItems([{ id: 1, desc: "Brand Strategy", qty: 1, rate: 1800 }, { id: 2, desc: "Logo Design (3 concepts)", qty: 1, rate: 950 }, { id: 3, desc: "Brand Guidelines", qty: 1, rate: 600 }]);
    } else {
      setItems([{ id: 1, desc: t.name + " Services", qty: 1, rate: 500 }]);
    }
    setActiveTab("builder");
    showNotification("Template loaded: " + t.name);
  };

  const totalRevenue = history.filter(h => h.status === "paid").reduce((s, h) => s + h.amount, 0);
  const totalPending = history.filter(h => h.status === "sent").reduce((s, h) => s + h.amount, 0);

  return (
    <>
      <style>{style}</style>
      <div className="app">

        {notification && <div className="notification">{notification}</div>}

        {showEmailModal && (
          <div className="modal-overlay" onClick={() => setShowEmailModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h3>Send {docType}</h3>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label>Recipient Email</label>
                <input value={emailTo} onChange={e => setEmailTo(e.target.value)} placeholder="client@email.com" />
              </div>
              <div className="form-group">
                <label>Personal Note (optional)</label>
                <textarea value={emailNote} onChange={e => setEmailNote(e.target.value)} placeholder="Add a short message..." rows={3} />
              </div>
              <div className="modal-actions">
                <button className="modal-cancel" onClick={() => setShowEmailModal(false)}>Cancel</button>
                <button className="modal-send" onClick={handleSendEmail}>Open Email Client →</button>
              </div>
            </div>
          </div>
        )}

        {screen === "landing" && (
          <div className="landing">
            <nav className="nav">
              <div className="logo">Invoicr</div>
              <button className="nav-cta" onClick={() => setScreen("paywall")}>Start Free Trial</button>
            </nav>
            <div className="hero">
              <div className="hero-eyebrow">Professional Invoicing</div>
              <h1>Get paid<br />faster. Look<br /><em>sharper.</em></h1>
              <p>Create beautiful invoices and proposals in minutes. Built for small business owners who want to look professional without spending hours on paperwork.</p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => setScreen("paywall")}>Start Free — $19/mo after</button>
                <button className="btn-ghost" onClick={() => setScreen("app")}>Preview the tool →</button>
              </div>
            </div>
            <div className="social-proof">
              <div><div className="stat-num">2 min</div><div className="stat-label">Avg. invoice time</div></div>
              <div><div className="stat-num">$19</div><div className="stat-label">Per month, flat</div></div>
              <div><div className="stat-num">∞</div><div className="stat-label">Invoices & proposals</div></div>
              <div><div className="stat-num">PDF</div><div className="stat-label">Export & print ready</div></div>
            </div>
            <div className="features">
              <div className="feature"><div className="feature-icon">⚡</div><h3>Instant Generation</h3><p>Fill in your details and your invoice is ready. No learning curve, no complicated settings.</p></div>
              <div className="feature"><div className="feature-icon">📄</div><h3>6 Pro Templates</h3><p>Industry-specific templates for contractors, consultants, designers, developers and more.</p></div>
              <div className="feature"><div className="feature-icon">💾</div><h3>Document History</h3><p>All your invoices and proposals saved. Track paid, sent, or pending and export to CSV.</p></div>
            </div>
          </div>
        )}

        {screen === "paywall" && (
          <div className="paywall">
            <div className="paywall-card">
              <div className="paywall-tag">7-Day Free Trial</div>
              <h2>Start creating professional invoices today</h2>
              <p>Join small business owners who send polished invoices and proposals in minutes, not hours.</p>
              <div className="price-display">
                <div className="price-amount">$19</div>
                <div className="price-period">/ month<br /><span style={{ fontSize: 11, color: "#b0a890" }}>Cancel anytime</span></div>
              </div>
              <ul className="perks">
                <li>Unlimited invoices & proposals</li>
                <li>6 industry-specific templates</li>
                <li>Email invoices directly to clients</li>
                <li>Logo upload & custom brand colors</li>
                <li>Saved client contact book</li>
                <li>CSV export for bookkeeping & taxes</li>
                <li>Multi-currency support</li>
                <li>PDF export & print-ready format</li>
              </ul>
              <button className="subscribe-btn" onClick={() => { window.open("https://buy.stripe.com/bJecN601O2NO8PocHA2Ji00", "_blank") }}>
                Start Free Trial — 7 Days Free
              </button>
              <div className="paywall-note">🔒 SECURED WITH STRIPE · CANCEL ANYTIME</div>
              <span className="back-link" onClick={() => setScreen("landing")}>← Back to homepage</span>
            </div>
          </div>
        )}

        {screen === "app" && (
          <div className="app-shell">
            <div className="app-header">
              <div className="logo" style={{ color: "#f5f0e8" }}>Invoicr</div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#6a6050" }}>7 days left in trial</span>
                <button className="nav-cta" onClick={() => setScreen("paywall")}>Upgrade $19/mo</button>
              </div>
            </div>

            <div className="app-tabs">
              {["builder", "templates", "clients", "history", "settings"].map(t => (
                <button key={t} className={"tab" + (activeTab === t ? " active" : "")} onClick={() => setActiveTab(t)}>
                  {t === "builder" ? "📝 Builder" : t === "templates" ? "📂 Templates" : t === "clients" ? "👥 Clients" : t === "history" ? "🗂 History" : "⚙️ Settings"}
                </button>
              ))}
            </div>

            <div className="app-content">

              {activeTab === "builder" && (
                <div className="builder-grid">
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                    <div className="form-panel">
                      <div className="panel-title">Document Type</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {["Invoice", "Proposal", "Quote"].map(t => (
                          <button key={t} onClick={() => setDocType(t)} style={{ flex: 1, padding: "10px", border: "2px solid " + (docType === t ? accentColor : "#e8dfc8"), background: docType === t ? accentColor : "transparent", color: docType === t ? "#ffffff" : "#7a7060", fontFamily: "'DM Mono', monospace", fontSize: 12, cursor: "pointer", letterSpacing: "0.5px", transition: "all 0.15s", fontWeight: docType === t ? "600" : "400" }}>{t}</button>
                        ))}
                      </div>
                    </div>

                    <div className="form-panel">
                      <div className="panel-title">Your Business</div>
                      <div>
                        <label style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "#7a7060", display: "block", marginBottom: 6 }}>Business Logo</label>
                        <div className="logo-upload-area" onClick={() => logoInputRef.current.click()}>
                          {logoUrl ? <img src={logoUrl} alt="Logo" className="logo-preview" /> : <span style={{ fontSize: 12, color: "#7a7060" }}>Click to upload logo (PNG, JPG)</span>}
                        </div>
                        <input ref={logoInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogoUpload} />
                      </div>
                      <div className="form-group"><label>Business Name</label><input value={sender.name} onChange={e => setSender({ ...sender, name: e.target.value })} placeholder="Acme Services LLC" /></div>
                      <div className="form-row">
                        <div className="form-group"><label>Email</label><input value={sender.email} onChange={e => setSender({ ...sender, email: e.target.value })} placeholder="you@company.com" /></div>
                        <div className="form-group"><label>Phone</label><input placeholder="(555) 000-0000" /></div>
                      </div>
                      <div className="form-group"><label>Address</label><textarea value={sender.address} onChange={e => setSender({ ...sender, address: e.target.value })} placeholder="123 Main St, City, State" rows={2} /></div>
                    </div>

                    <div className="form-panel">
                      <div className="panel-title">
                        <span>Bill To</span>
                        {clients.length > 0 && (
                          <select onChange={e => { const c = clients.find(c => c.id === parseInt(e.target.value)); if (c) loadClient(c); }} style={{ fontSize: 11, border: "1px solid #e8dfc8", background: "#f5f0e8", fontFamily: "'DM Mono', monospace", padding: "4px 8px", color: "#7a7060", cursor: "pointer" }}>
                            <option value="">Load saved client...</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        )}
                      </div>
                      <div className="form-group"><label>Client / Company Name</label><input value={client.name} onChange={e => setClient({ ...client, name: e.target.value })} placeholder="Client Name or Company" /></div>
                      <div className="form-row"><div className="form-group"><label>Email</label><input value={client.email} onChange={e => { setClient({ ...client, email: e.target.value }); setEmailTo(e.target.value); }} placeholder="client@email.com" /></div></div>
                      <div className="form-group"><label>Address</label><textarea value={client.address} onChange={e => setClient({ ...client, address: e.target.value })} placeholder="Client address" rows={2} /></div>
                    </div>

                    <div className="form-panel">
                      <div className="panel-title">Dates & Currency</div>
                      <div className="form-row">
                        <div className="form-group"><label>Issue Date</label><input type="date" value={dates.issue} onChange={e => setDates({ ...dates, issue: e.target.value })} /></div>
                        <div className="form-group"><label>Due Date</label><input type="date" value={dates.due} onChange={e => setDates({ ...dates, due: e.target.value })} /></div>
                      </div>
                      <div className="form-group"><label>Currency</label><select value={currency.code} onChange={e => setCurrency(CURRENCIES.find(c => c.code === e.target.value))}>{CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}</select></div>
                    </div>

                    <div className="form-panel">
                      <div className="panel-title">Line Items</div>
                      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr auto", gap: 8, marginBottom: 8 }}>
                        {["Description", "Qty", "Rate", ""].map((h, i) => <div key={i} style={{ fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "#7a7060" }}>{h}</div>)}
                      </div>
                      <div className="line-items">
                        {items.map(item => (
                          <div key={item.id} className="line-item-row">
                            <input value={item.desc} onChange={e => updateItem(item.id, "desc", e.target.value)} placeholder="Service description" />
                            <input type="number" value={item.qty} onChange={e => updateItem(item.id, "qty", e.target.value)} placeholder="1" min="0" />
                            <input type="number" value={item.rate} onChange={e => updateItem(item.id, "rate", e.target.value)} placeholder="0.00" min="0" step="0.01" />
                            <button className="del-btn" onClick={() => removeItem(item.id)}>×</button>
                          </div>
                        ))}
                      </div>
                      <button className="add-item-btn" onClick={addItem}>+ Add Line Item</button>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <label style={{ fontSize: 12, color: "#7a7060" }}>Tax %</label>
                          <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} style={{ width: 70, border: "1px solid #e8dfc8", padding: "6px 8px", fontFamily: "'DM Mono', monospace", fontSize: 13, background: "#f5f0e8", outline: "none", color: "#0f0e0c" }} placeholder="0" min="0" max="100" />
                        </div>
                      </div>
                    </div>

                    <div className="form-panel">
                      <div className="panel-title">Notes & Terms</div>
                      <div className="form-group"><label>Notes (optional)</label><textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Payment terms, thank you note, bank details..." rows={3} /></div>
                    </div>
                  </div>

                  <div>
                    <div className="preview-panel">
                      <div className="preview-header">
                        <span className="preview-label">Live Preview</span>
                        <div className="preview-actions">
                          <button className="email-btn" onClick={() => setShowEmailModal(true)}>✉ Email</button>
                          <button className="print-btn" onClick={() => window.print()}>↓ Export PDF</button>
                        </div>
                      </div>
                      <div className="invoice-doc">
                        <div className="inv-header">
                          <div>
                            {logoUrl && <img src={logoUrl} alt="Logo" className="inv-logo" />}
                            <div className="inv-company-name">{sender.name || "Your Business Name"}</div>
                            <div style={{ fontSize: 12, color: "#7a7060", marginTop: 6, lineHeight: 1.7 }}>
                              {sender.email && <div>{sender.email}</div>}
                              {sender.address && <div style={{ whiteSpace: "pre-line" }}>{sender.address}</div>}
                            </div>
                          </div>
                          <div className="inv-type-badge" style={{ background: accentColor }}>{docType}</div>
                        </div>
                        <div className="inv-meta">
                          <div className="inv-meta-block"><div className="inv-meta-label">Number</div><div className="inv-meta-value">{invoiceNum}</div></div>
                          <div className="inv-meta-block"><div className="inv-meta-label">Issued</div><div className="inv-meta-value">{dates.issue}</div></div>
                          <div className="inv-meta-block"><div className="inv-meta-label">Due</div><div className="inv-meta-value">{dates.due}</div></div>
                          <div className="inv-meta-block"><div className="inv-meta-label">Currency</div><div className="inv-meta-value">{currency.code}</div></div>
                        </div>
                        {client.name && (
                          <div style={{ marginBottom: 24, padding: "16px", background: "#f5f0e8" }}>
                            <div className="inv-meta-label" style={{ marginBottom: 6 }}>Bill To</div>
                            <div style={{ fontSize: 14, fontWeight: 500 }}>{client.name}</div>
                            {client.email && <div style={{ fontSize: 12, color: "#7a7060" }}>{client.email}</div>}
                            {client.address && <div style={{ fontSize: 12, color: "#7a7060", whiteSpace: "pre-line" }}>{client.address}</div>}
                          </div>
                        )}
                        <hr className="inv-divider" style={{ borderTopColor: accentColor }} />
                        <div className="inv-items-header"><div>Description</div><div>Qty</div><div>Rate</div><div style={{ textAlign: "right" }}>Amount</div></div>
                        {items.map(item => (
                          <div key={item.id} className="inv-item">
                            <div>{item.desc || "—"}</div>
                            <div>{item.qty}</div>
                            <div>{fmt(parseFloat(item.rate) || 0)}</div>
                            <div style={{ textAlign: "right" }}>{fmt((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0))}</div>
                          </div>
                        ))}
                        <div className="inv-totals">
                          <div className="inv-total-row"><div className="inv-total-label">Subtotal</div><div className="inv-total-value">{fmt(subtotal)}</div></div>
                          {taxRate > 0 && <div className="inv-total-row"><div className="inv-total-label">Tax ({taxRate}%)</div><div className="inv-total-value">{fmt(tax)}</div></div>}
                          <div className="inv-grand-total">
                            <div className="inv-total-label">Total Due</div>
                            <div className="inv-total-value" style={{ color: accentColor }}>{fmt(total)}</div>
                          </div>
                        </div>
                        {notes && <div className="inv-notes"><div style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: "#7a7060", marginBottom: 6 }}>Notes</div>{notes}</div>}
                        <div className="inv-footer">Generated with Invoicr · useinvoicr.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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

              {activeTab === "clients" && (
                <div>
                  <div className="section-title">Client Book</div>
                  <div className="section-sub">Saved clients — click any to load into the builder.</div>
                  {clients.length === 0 ? (
                    <div style={{ background: "#ffffff", border: "1px solid #e8dfc8", padding: 40, textAlign: "center", color: "#7a7060", fontSize: 13 }}>No clients saved yet. Send your first invoice to save a client automatically.</div>
                  ) : (
                    <div className="clients-grid">
                      {clients.map(c => (
                        <div key={c.id} className="client-card" onClick={() => loadClient(c)}>
                          <div className="client-name">{c.name}</div>
                          <div className="client-email">{c.email}</div>
                          {c.address && <div style={{ fontSize: 11, color: "#7a7060", marginTop: 4 }}>{c.address}</div>}
                          <div className="client-count">{c.invoiceCount} invoice{c.invoiceCount !== 1 ? "s" : ""}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
                    <div>
                      <div className="section-title">Document History</div>
                      <div className="section-sub">Click the status dropdown to update it.</div>
                    </div>
                    <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#2a7a2a" }}>{fmt(totalRevenue)}</div>
                        <div style={{ fontSize: 11, color: "#7a7060", letterSpacing: "1px" }}>Collected</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#a06020" }}>{fmt(totalPending)}</div>
                        <div style={{ fontSize: 11, color: "#7a7060", letterSpacing: "1px" }}>Pending</div>
                      </div>
                      <button onClick={exportCSV} style={{ background: "#0f0e0c", color: "#f5f0e8", border: "none", padding: "10px 20px", fontFamily: "'DM Mono', monospace", fontSize: 12, cursor: "pointer", letterSpacing: "0.5px" }}>↓ Export CSV</button>
                    </div>
                  </div>
                  <div className="history-list">
                    {history.map((h) => (
                      <div key={h.id} className="history-item">
                        <div className="history-meta">
                          <div className="history-type">{h.type}</div>
                          <div><div className="history-client">{h.client}</div><div className="history-date">{h.date}</div></div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                          <div className="history-amount" style={{ color: accentColor }}>{fmt(h.amount)}</div>
                          <select value={h.status} onChange={e => updateStatus(h.id, e.target.value)} className={"status-select status-" + h.status}>
                            <option value="draft">Draft</option>
                            <option value="sent">Sent</option>
                            <option value="paid">Paid</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div style={{ maxWidth: 600 }}>
                  <div className="section-title">Settings</div>
                  <div className="section-sub">Customize how your invoices look.</div>
                  <div className="form-panel" style={{ marginBottom: 20 }}>
                    <div className="panel-title">Invoice Accent Color</div>
                    <p style={{ fontSize: 13, color: "#7a7060", marginBottom: 16 }}>This color appears on your invoice badge, divider, and total amount.</p>
                    <div className="color-swatches">
                      {ACCENT_COLORS.map(c => (
                        <div key={c} className={"color-swatch" + (accentColor === c ? " selected" : "")} style={{ background: c }} onClick={() => setAccentColor(c)} title={c.name} />
                      ))}
                    </div>
                    <div style={{ marginTop: 16, fontSize: 12, color: "#7a7060" }}>Selected: {ACCENT_COLORS.find(c => c === accentColor)?.name}</div>
                  </div>
                  <div className="form-panel">
                    <div className="panel-title">Default Currency</div>
                    <div className="form-group"><label>Currency</label><select value={currency.code} onChange={e => setCurrency(CURRENCIES.find(c => c.code === e.target.value))}>{CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}</select></div>
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
