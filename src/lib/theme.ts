export const THEME_STORAGE_KEY = "nexora-theme";

/** Runs in the document head before paint so the theme does not flash. */
export const themeInitScript = `(function(){try{var key=${JSON.stringify(THEME_STORAGE_KEY)};var stored=localStorage.getItem(key);var dark=stored==="dark"||(stored!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var root=document.documentElement;root.classList.toggle("dark",dark);root.classList.toggle("light",!dark);root.style.colorScheme=dark?"dark":"light";}catch(e){}})();`;
