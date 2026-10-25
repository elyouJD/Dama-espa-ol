# Dama Española — Netlify + Firebase + AdSense

Juego de damas 8×8 con modos contra la máquina, local y online. Incluye acceso con Firebase Authentication, invitaciones, páginas informativas y configuración inicial de AdSense.

## Publicación en Netlify
1. Publica el contenido completo de esta carpeta, no solo `index.html`.
2. Confirma que `js/firebase-config.js` apunta al proyecto Firebase correcto.
3. Después de cada publicación, abre la web con `Ctrl+F5` y comprueba `js/app.js` en DevTools → Network para confirmar que se sirve la versión nueva.

## Firebase online
1. Activa Authentication → Email/Password y Anonymous si se permiten invitados.
2. Activa Firestore Database.
3. Publica las reglas de `firestore.rules` en Firestore → Rules. No pegues reglas de otra aplicación sin conservar sus rutas necesarias.
4. La partida utiliza `/damaRooms/{roomId}`; cada documento almacena el tablero como una lista plana de 64 casillas y un `revision` creciente.
5. Prueba con dos usuarios distintos en dos navegadores/dispositivos. Un jugador crea la sala (rojas) y el otro abre el enlace y se une (negras). Verifica ambos sentidos de movimiento.

## AdSense: preparación, no garantía de aprobación
- El script de AdSense y `ads.txt` contienen el publisher ID `pub-5922232135849017` facilitado por el propietario.
- `ads.txt` debe estar accesible en `https://TU-DOMINIO/ads.txt`; verifica el dominio real y que Google lo pueda rastrear.
- Antes de solicitar revisión, completa la política de privacidad para describir de verdad los servicios activos, añade un mecanismo de consentimiento válido para visitantes de EEE/Reino Unido/Suiza cuando corresponda, y confirma que el sitio ofrece contenido original y útil, navegación funcional y páginas de contacto/acerca de claras.
- La aprobación depende de la revisión de Google y no puede garantizarse por añadir código, páginas legales o `ads.txt`.
- No hagas clic en tus propios anuncios ni pidas a otras personas que lo hagan. No coloques anuncios de forma que induzcan clics ni los confundas con controles del juego.

## Páginas
- `index.html`: juego
- `login.html`: autenticación
- `about.html`: información del sitio
- `contact.html`: formulario que abre el cliente de correo; no almacena mensajes
- `privacy-policy.html`: plantilla que debe revisarse y adaptarse a los tratamientos reales

## Seguridad
Las reglas de Firestore protegen el acceso básico a las salas, pero la validación completa de movimientos de un juego público debería realizarse en un backend de confianza. No publiques secretos de servidor en el frontend.


## Chat, regalos virtuales y llamadas de voz (beta)
- El chat y los regalos (rosa, jirafa, pez, dedo, avión y corazón) aparecen únicamente cuando ambos jugadores están conectados a la misma sala online. Son regalos visuales gratuitos; no hay pagos.
- La llamada de voz necesita permiso de micrófono y HTTPS (Netlify lo proporciona en producción; localhost también vale para pruebas). Pulsa **Llamar** y el otro jugador debe pulsar **Aceptar llamada**.
- Antes de probar estas funciones, publica el contenido completo de `firestore.rules` en Firebase Console → Firestore Database → Rules. Las reglas incluyen las subcolecciones `chat`, `gifts`, `signal`, `iceHost` e `iceGuest`.
- La voz WebRTC es una versión beta: usa servidores STUN públicos; algunas redes requieren un servidor TURN para que el audio conecte de forma fiable. Pruébalo con dos dispositivos y no lo anuncies como estable hasta validar conexión, rechazo y fin de llamada.
- Los mensajes se limitan a 300 caracteres. No compartas información personal en el chat.
