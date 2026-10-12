# Guion de Grabación en Microsoft Teams - Evaluación Final Transversal (EFT)
**Asignatura:** Ingeniería de Software (PRY3211)  
**Proyecto:** Sistema Web de Reserva de Hotel  
**Estudiante / Equipo:** Adolfo Leal Lara  
**Docente:** Jorge Antonio Canales Soto  
**Duración Total Máxima:** 10:00 minutos  
**Herramienta de Grabación:** Microsoft Teams (Reunión con cámara y pantalla compartida)

---

## Estructura y Distribución de Tiempos (Total: 10 Minutos)

| Bloque | Minutos | Tema Principal | Pantalla a Compartir | Criterios Rúbrica Cubiertos |
| :---: | :---: | :--- | :--- | :--- |
| **1** | 00:00 - 01:15 | Introducción, Presentación del Equipo y Contexto del Proyecto | Diapositiva 1 y 2 de la Presentación Web | Presentación del equipo, contexto del problema y alcance. |
| **2** | 01:15 - 02:45 | Arquitectura del Software, Modelo de Datos y Servidor de Aplicaciones | Diapositiva 3 (Arquitectura 4+1) y VS Code (`server.js`, `database.js`) | Criterio 1: Servidor de aplicaciones, integración BD SQLite, Node/Express. |
| **3** | 02:45 - 04:15 | Demostración en Vivo: Portal Turista y Flujo de Reserva Multimoneda | Navegador web en `http://localhost:3001` (Vista Turista y Checkout) | Criterio 1 y 8: Demostración de funcionalidades, reserva, checkout y API externa. |
| **4** | 04:15 - 05:45 | Demostración en Vivo: Portal Administrador y Reglas de Negocio | Navegador web en `http://localhost:3001/admin` y `/admin/habitaciones` | Criterio 1 y 8: CRUD habitaciones, cambio de estado de reservas, aislamiento de roles. |
| **5** | 05:45 - 07:15 | Metodología Scrum, Sprint Backlog y Project Burndown Chart | Diapositivas 6 y 7, Tablero Trello en vivo | Criterio 3 y 5: Adaptación Scrum, Burndown chart, Trello, gestión de Sprints. |
| **6** | 07:15 - 08:30 | Estrategia de Calidad, Manual de Pruebas y Tratamiento de No Conformidades | Diapositiva 8 y Terminal de pruebas automatizadas | Criterio 6: Manual de pruebas, casos Happy Path / Edge Cases, feedback docente. |
| **7** | 08:30 - 09:15 | Versionamiento Git, Repositorio de Evidencias y Despliegue | Repositorio GitHub en la nube (`https://github.com/D99L/reserva-hotel.git`) | Criterio 2 y 7: Repositorio público Git, versionamiento continuo y evidencias. |
| **8** | 09:15 - 10:00 | Reflexión y Conclusiones Finales | Diapositiva 10 y Cámara activa | Parte III: Reflexión sobre aprendizajes, impacto profesional y cierre. |

---

## Guion Minuto a Minuto para el Video

### Minuto 00:00 – 01:15 | Bloque 1: Bienvenida e Introducción
* **Qué mostrar en pantalla:** Diapositiva de Portada de `Presentacion_EFT_Semana9.html` con la cámara web encendida.
* **Locución (Qué decir):**
  > *"Muy buenos días estimado profesor Jorge Canales Soto y compañeros. Bienvenidos a la presentación de la Evaluación Final Transversal (EFT) de la asignatura Ingeniería de Software (PRY3211) de la carrera Analista Programador Computacional en Duoc UC.*
  > 
  > *Mi nombre es Adolfo Leal Lara y a continuación presentaré la culminación de nuestro proyecto semestral: el **Sistema Integral de Reserva de Hotel**.*
  > 
  > *Este proyecto nació con el objetivo de dar solución a una problemática real en el rubro hotelero: la necesidad de contar con una plataforma web centralizada, ágil y segura que permita a los turistas buscar y reservar habitaciones de manera transparente —incorporando cotizaciones en tiempo real en diferentes divisas— y al mismo tiempo brinde a los administradores del hotel un control total e intuitivo sobre el inventario de habitaciones, estados de reserva y flujo de caja."*

---

### Minuto 01:15 – 02:45 | Bloque 2: Arquitectura Técnica y Servidor de Aplicaciones
* **Qué mostrar en pantalla:** Diapositiva de Arquitectura y breve visualización en Visual Studio Code de `server.js` y `database.js`.
* **Locución (Qué decir):**
  > *"Pasando a las propiedades técnicas de la solución, el sistema fue diseñado bajo el modelo arquitectónico de capas y el estándar de vistas 4+1:*
  > 
  > *En el **Back-end y Servidor de Aplicaciones**, utilizamos un entorno **Node.js** con el framework **Express**, configurado con middleware de sesiones seguras (`express-session`) para el aislamiento estricto de roles entre Turistas y Administradores.*
  > 
  > *En la **Capa de Persistencia**, implementamos una base de datos relacional **SQLite**, estructurada con claves foráneas, restricciones de integridad referencial y normalización en tercera forma normal, administrando tablas de Usuarios, Hoteles, Habitaciones y Reservas.*
  > 
  > *En el **Front-end**, desarrollamos vistas dinámicas y responsivas mediante el motor de plantillas **EJS**, estilizadas con CSS3 moderno que se adaptan a cualquier resolución de pantalla.*
  > 
  > *Además, atendiendo específicamente el feedback de la Experiencia 3, integramos un servicio web RESTful externo (`exchangerate-api`) en el endpoint `/api/exchange-rate`, con manejo robusto de errores mediante bloques `try/catch` y validación de parámetros, garantizando que el servidor nunca colapse ante contingencias de red."*

---

### Minuto 02:45 – 04:15 | Bloque 3: Demostración en Vivo - Experiencia del Turista
* **Qué mostrar en pantalla:** Navegador web en `http://localhost:3001/login`, iniciando sesión con `adolfo.leal@correo.cl` (RUT: `2222222-2`), realizando una búsqueda y reserva.
* **Locución (Qué decir):**
  > *"Veamos ahora la aplicación en funcionamiento en nuestro servidor local. Iniciamos sesión con una cuenta de cliente Turista. Observen que el sistema valida las credenciales y carga el portal de reservas.*
  > 
  > *Aquí el turista puede seleccionar sus fechas de Check-in y Check-out. El sistema valida automáticamente que la fecha de salida sea posterior a la de entrada. Al filtrar, se consultan en SQLite únicamente aquellas habitaciones cuyo estado sea 'Disponible'.*
  > 
  > *Una de nuestras funcionalidades clave es el conversor multimoneda: mediante AJAX y nuestra API de tipo de cambio, el turista puede seleccionar visualizar los precios en Pesos Chilenos (CLP), Dólares (USD) o Euros (EUR), calculándose el monto en tiempo real de forma dinámica.*
  > 
  > *Seleccionamos la habitación, confirmamos la reserva y el sistema nos redirige a la vista de Checkout, donde se procesa la confirmación y se genera el comprobante con estado 'Confirmada'. Todo el ciclo se actualiza de inmediato en la base de datos."*

---

### Minuto 04:15 – 05:45 | Bloque 4: Demostración en Vivo - Panel de Administración
* **Qué mostrar en pantalla:** Cerrar sesión o cambiar a ventana con usuario `admin@hotel.cl` (RUT: `1111111-1`), navegando por `/admin` y `/admin/habitaciones`.
* **Locución (Qué decir):**
  > *"Ahora cerramos sesión e ingresamos con credenciales de Administrador: `admin@hotel.cl`. Noten que si un turista intentara escribir manualmente `/admin` en la barra de direcciones, el middleware de autorización lo intercepta y redirige automáticamente, garantizando la seguridad perimetral.*
  > 
  > *En el panel de administración podemos observar el listado global de todas las reservas efectuadas, el cliente asociado, las fechas y los montos. Desde aquí el administrador puede cambiar el estado de las reservas o cancelarlas con un solo clic, liberando la habitación de inmediato.*
  > 
  > *Asimismo, en el submódulo de 'Gestión de Habitaciones', el administrador cuenta con un CRUD completo donde puede registrar nuevas unidades, definir su categoría (Simple, Doble, Suite), capacidad máxima y tarifa por noche, o bien dar de baja habitaciones fuera de servicio."*

---

### Minuto 05:45 – 07:15 | Bloque 5: Metodología Ágil Scrum y Project Burndown
* **Qué mostrar en pantalla:** Diapositiva de Métricas Scrum / Project Burndown Chart y el Tablero Trello en vivo.
* **Locución (Qué decir):**
  > *"Para gestionar el desarrollo del proyecto a lo largo de las 9 semanas, implementamos el marco ágil **Scrum**, distribuyendo el trabajo en 3 Sprints principales de 3 semanas cada uno:*
  > 
  > *En nuestro **Product Backlog** priorizamos 12 Historias de Usuario bajo la técnica MoSCoW, estimadas mediante Story Points con la escala Fibonacci. Definimos criterios rigurosos de 'Definition of Done' (DoD) que exigían código limpio, diseño responsivo, validaciones en back-end y pruebas funcionales aprobadas antes de dar por terminada cualquier tarea.*
  > 
  > *En nuestro tablero **Trello**, gestionamos el flujo continuo mediante listas de Backlog, Sprint Backlog, In Progress, Testing y Done. Como pueden observar, el 100% de las tarjetas del Sprint 3 y la entrega final se encuentran en estado 'Done'.*
  > 
  > *Respecto al **Project Burndown Chart**, iniciamos con un backlog total de 89 Story Points. En el Sprint 1 completamos 28 puntos en modelamiento y arquitectura inicial; en el Sprint 2 quemamos 33 puntos en construcción de base de datos y vistas; y en este Sprint 3 final completamos los 28 puntos restantes en integración de API, testing funcional y empaquetamiento, logrando una velocidad sostenida y cumpliendo el alcance comprometido sin deuda técnica."*

---

### Minuto 07:15 – 08:30 | Bloque 6: Aseguramiento de Calidad, Testing y No Conformidades
* **Qué mostrar en pantalla:** Diapositiva del Manual de Pruebas y terminal ejecutando `node test_endpoints.js`.
* **Locución (Qué decir):**
  > *"En el ámbito de calidad del software y testing, aplicamos las directrices compartidas por el profesor Jorge Canales respecto a la gestión formal de No Conformidades y estándares ISTQB / IEEE.*
  > 
  > *Diseñamos un **Manual de Pruebas de Usuario** que abarca 10 casos de prueba rigurosos, cubriendo tanto los caminos felices (Happy Paths) como los casos borde (Edge Cases): por ejemplo, intentos de autenticación con credenciales erróneas, ingresos de fechas invertidas, validación de formatos de moneda y manejo controlado de pérdida de conexión con la API externa.*
  > 
  > *Aquí en la terminal ejecutamos nuestro script automatizado `test_endpoints.js`, el cual valida secuencialmente la redirección en rutas protegidas, la creación de sesiones y el acceso a los endpoints del servidor, obteniendo un resultado 100% exitoso (Pass) en todas las pruebas ejecutadas."*

---

### Minuto 08:30 – 09:15 | Bloque 7: Versionamiento en Git y Evidencias del Proyecto
* **Qué mostrar en pantalla:** Repositorio GitHub `https://github.com/D99L/reserva-hotel` mostrando el historial de commits y carpetas de evidencia.
* **Locución (Qué decir):**
  > *"Todo el ciclo de vida del código fuente y los artefactos de diseño ha quedado respaldado en nuestro repositorio público de GitHub bajo la URL `https://github.com/D99L/reserva-hotel.git`.*
  > 
  > *Mantenemos un historial de commits limpio y descriptivo, evidenciando la trazabilidad desde las primeras semanas de modelamiento UML, pasando por la integración de base de datos en Semana 6, la batería de pruebas en Semana 7 y 8, hasta las actualizaciones finales de empaquetamiento de esta Semana 9.*
  > 
  > *Además, todo el software ha sido empaquetado en un archivo comprimido `.zip` autónomo junto con sus scripts de inicio, documentación ERS y evidencias completas."*

---

### Minuto 09:15 – 10:00 | Bloque 8: Reflexión Personal y Cierre
* **Qué mostrar en pantalla:** Diapositiva de Conclusión y cámara web en primer plano.
* **Locución (Qué decir):**
  > *"Para concluir, en la Parte III de esta evaluación desarrollé mi reflexión personal sobre los aprendizajes obtenidos en Ingeniería de Software. Esta asignatura ha marcado un antes y un después en mi formación como futuro Analista Programador Computacional.*
  > 
  > *Comprendí que programar es solo una parte de la ingeniería de software: el verdadero valor radica en saber modelar requerimientos con claridad, trabajar con metodologías ágiles como Scrum, gestionar no conformidades con criterio preventivo y garantizar la calidad en cada entrega.*
  > 
  > *Agradezco sinceramente las orientaciones y retroalimentaciones del profesor Jorge Canales Soto a lo largo de este semestre. Muchas gracias por su atención y quedo a disposición para cualquier consulta."*

---
**Fin del Video (Tiempo estimado de grabación: 9:45 - 10:00 minutos)**
