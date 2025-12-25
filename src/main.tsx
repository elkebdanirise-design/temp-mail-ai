import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// CRITICAL: Clear OAuth hash fragments BEFORE React Router mounts
// This prevents router crashes from #access_token=... fragments
const hashFragment = window.location.hash;
if (hashFragment && (hashFragment.includes('access_token') || hashFragment.includes('error'))) {
  // Store hash data for Supabase to process
  const hashData = hashFragment;
  // Clear the URL immediately to prevent router issues
  window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
  // Store in sessionStorage so AuthContext can still process the tokens
  sessionStorage.setItem('supabase_auth_hash', hashData);
  console.log('[main] Cleared OAuth hash from URL, stored for processing');
}

createRoot(document.getElementById("root")!).render(<App />);
