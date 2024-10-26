const PREF_KEY = 'coffee-preferences';

export function persistPreferences(pref: string) {
  localStorage.setItem(PREF_KEY, pref);
}

export function loadPreferences() {
  return localStorage.getItem(PREF_KEY);
}

export function clearPreferences() {
  localStorage.removeItem(PREF_KEY);
}
