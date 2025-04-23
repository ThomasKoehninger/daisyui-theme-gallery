import React, { useState, useEffect } from "react";

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave",
  "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua",
  "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula",
  "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee",
  "winter", "dim", "nord", "sunset"
];

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [previewTheme, setPreviewTheme] = useState(null); // Vollbildmodus?

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSelect = (themeName) => {
    setTheme(themeName);
    setPreviewTheme(themeName);
  };

  if (previewTheme) {
    // Vollbild-Modus
    return (
      <div className="min-h-screen bg-base-200 text-base-content p-6 animate-fadeIn">
        <div className="flex flex-col items-center justify-center mb-8 gap-4 text-center">
          <select
            className="select select-bordered text-base max-w-xs animate-fadeIn"
            value={theme}
            onChange={(e) => handleThemeSelect(e.target.value)}
          >
            {themes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <span className="text-sm opacity-60">
            Aktives Theme: <strong>{theme}</strong>
          </span>
          <button className="btn btn-outline btn-sm mt-2" onClick={() => setPreviewTheme(null)}>
            🔙 Zur Übersicht
          </button>
        </div>
    
        <div className="hero min-h-[60vh] bg-primary text-primary-content rounded-xl transition-all duration-300 ease-in-out animate-fadeIn">
          <div className="hero-content text-center">
            <div>
              <h1 className="text-5xl font-bold">Theme: {theme}</h1>
              <p className="py-6">Hier siehst du das Theme im Vollbild.</p>
              <button className="btn btn-secondary">Test-Button</button>
            </div>
          </div>
        </div>
      </div>
    );
    
    
  }

  // Galerie-Modus
  return (
    <div className="min-h-screen bg-base-200 text-base-content p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🎨 Theme-Galerie</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {themes.map((t) => (
          <div
            key={t}
            className="card cursor-pointer shadow-md transition hover:scale-[1.02]"
            onClick={() => handleThemeSelect(t)}
            data-theme={t}
          >
            <div className="card-body bg-base-100 text-base-content p-4">
              <h2 className="card-title">{t}</h2>
              <p className="text-sm">Klicke für Vollbild-Vorschau</p>
              <button className="btn btn-primary btn-sm mt-2">Auswählen</button>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-10 text-center text-sm text-base-content/60">
        Aktives Theme: <strong>{theme}</strong>
      </footer>
    </div>
  );
}
