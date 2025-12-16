// Simple icon component using Unicode/Emoji for now
// Can be replaced with SVG icons later

export const Icons = {
  dashboard: "📊",
  machine: "🏭",
  ticket: "🎫",
  contact: "📞",
  profile: "👤",
  search: "🔍",
  settings: "⚙️",
  support: "🛠️",
  history: "📜",
  add: "➕",
  plus: "➕",
  check: "✓",
  warning: "⚠️",
  error: "✗",
  info: "ℹ️",
  phone: "📞",
  document: "📄",
  download: "⬇️",
  upload: "📤",
  close: "✕",
  sort: "⇅",
  "sort-up": "↑",
  "sort-down": "↓",
  chat: "💬",
  send: "➤",
  user: "👤",
};

export default function Icon({ name }: { name: keyof typeof Icons }) {
  return <span className="icon">{Icons[name] || "•"}</span>;
}
