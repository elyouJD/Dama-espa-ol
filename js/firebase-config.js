// Configuración pública de Firebase para la aplicación web.
// La seguridad debe aplicarse mediante Authentication, Firestore Rules y validación del servidor.
export const firebaseConfig = {
  apiKey: "AIzaSyABBrbobExiBt510bvyxFT_80YhsUJyWKM",
  authDomain: "dice-rush-web.firebaseapp.com",
  projectId: "dice-rush-web",
  appId: "1:139600189621:web:6638e9f01a83e954af46fc",
};
export const firebaseReady = !Object.values(firebaseConfig).some(v =>
  /^(PEGA_|TU-)/.test(String(v))
);
