import { firebaseConfig, firebaseReady } from './firebase-config.js';
const $ = id => document.getElementById(id);
let auth, authMod, app;
async function setup(){
 if(!firebaseReady){$('loginStatus').textContent='Firebase no está configurado. Revisa js/firebase-config.js.';return false}
 try{
  const appMod=await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js');
  authMod=await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js');
  app=appMod.initializeApp(firebaseConfig);
  auth=authMod.getAuth(app);
  return true;
 }catch(e){
  if(e.code==='app/duplicate-app'){authMod=await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js');auth=authMod.getAuth();return true}
  $('loginStatus').textContent='No se pudo conectar con Firebase. Comprueba la conexión y la configuración.';return false
 }
}
function messageFor(e){return ({'auth/invalid-credential':'Correo o contraseña incorrectos.','auth/email-already-in-use':'Ese correo ya tiene una cuenta.','auth/weak-password':'La contraseña debe tener al menos 6 caracteres.','auth/invalid-email':'El correo no es válido.','auth/operation-not-allowed':'Activa este método de acceso en Firebase Authentication.'})[e.code]||'No se pudo completar el acceso. Revisa la configuración de Firebase.'}
function redirect(){const p=new URLSearchParams(location.search);const room=p.get('room');const target=new URL('index.html',location.href);target.searchParams.set('mode','online');if(room)target.searchParams.set('room',room);target.searchParams.set('login','ok');location.href=target.toString()}
$('signInBtn').addEventListener('click',async()=>{if(!(await setup()))return;const email=$('loginEmail').value.trim(),password=$('loginPassword').value;if(!email||!password){$('loginStatus').textContent='Introduce correo y contraseña.';return}try{await authMod.signInWithEmailAndPassword(auth,email,password);redirect()}catch(e){$('loginStatus').textContent=messageFor(e)}});
$('signUpBtn').addEventListener('click',async()=>{if(!(await setup()))return;const email=$('loginEmail').value.trim(),password=$('loginPassword').value;if(!email||password.length<6){$('loginStatus').textContent='Introduce un correo válido y una contraseña de al menos 6 caracteres.';return}try{await authMod.createUserWithEmailAndPassword(auth,email,password);redirect()}catch(e){$('loginStatus').textContent=messageFor(e)}});
$('guestLoginBtn').addEventListener('click',async()=>{if(!(await setup()))return;try{await authMod.signInAnonymously(auth);redirect()}catch(e){$('loginStatus').textContent='Activa Anonymous en Firebase Authentication para permitir invitados.'}});
