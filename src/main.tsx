import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// Garantir que o site inicie sempre em modo claro
document.documentElement.classList.remove("dark");

createRoot(document.getElementById("root")!).render(<App />);
