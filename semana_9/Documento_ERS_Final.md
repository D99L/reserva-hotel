# Especificación de Requerimientos de Software (ERS) - Versión Final
**Estándar IEEE 830**  
**Proyecto:** Sistema Web de Reserva de Hotel  
**Asignatura:** Ingeniería de Software (PRY3211)  
**Institución:** Duoc UC - Escuela de Informática y Telecomunicaciones  
**Carrera:** Analista Programador Computacional  
**Autor:** Adolfo Leal Lara  
**Docente:** Jorge Antonio Canales Soto  
**Fecha:** Octubre 2026 (Semana 9 - EFT)  
**Versión:** 3.0 (Versión Final Transversal)

---

## 1. Introducción

### 1.1 Propósito del Documento
El presente documento tiene como propósito definir formalmente la Especificación de Requerimientos de Software (ERS) para la versión final del **Sistema Web de Reserva de Hotel**, bajo las directrices del estándar internacional **IEEE 830**. Este documento consolida las necesidades del negocio, las especificaciones funcionales y no funcionales, el modelamiento arquitectónico y la matriz de trazabilidad resultantes de las tres experiencias de aprendizaje de la asignatura.

### 1.2 Alcance del Sistema
El sistema es una solución web integral diseñada para la gestión hotelera y la experiencia del cliente (turista), contemplando:
1. **Módulo de Autenticación y Autorización:** Control de acceso basado en roles (RBAC) con aislamiento de sesiones para Administradores y Turistas.
2. **Módulo del Turista (Front-Office):** Búsqueda de disponibilidad por rango de fechas y huéspedes, cotización dinámica multimoneda en tiempo real (CLP, USD, EUR) mediante integración de Web Service REST externo, selección de habitación y confirmación de reserva con generación de comprobante.
3. **Módulo de Administración (Back-Office):** Dashboard de control de ocupación hotelera, visualización y cambio de estados de reservas (Pendiente, Confirmada, Cancelada, Pagada), y administración completa (CRUD) de habitaciones hoteleras y tarifas.
4. **Capa de Persistencia y Servidor de Aplicaciones:** Backend desarrollado en Node.js y Express conectado a base de datos SQLite con relaciones de integridad referencial.

### 1.3 Personal Involucrado y Stakeholders
* **Cliente / Turista:** Persona interesada en consultar y reservar alojamiento de forma ágil desde cualquier dispositivo.
* **Administrador Hotelero:** Personal del hotel responsable de gestionar habitaciones, verificar reservas y monitorear la ocupación.
* **Equipo de Desarrollo (Scrum Team):** Adolfo Leal Lara (Desarrollador Full Stack / Scrum Master / QA).
* **Docente Guía / Product Owner Evaluador:** Jorge Antonio Canales Soto.

### 1.4 Definiciones, Acrónimos y Abreviaturas
* **ERS:** Especificación de Requerimientos de Software (IEEE 830).
* **RBAC:** Role-Based Access Control (Control de Acceso Basado en Roles).
* **API:** Application Programming Interface (Interfaz de Programación de Aplicaciones).
* **DoD:** Definition of Done (Criterios de Aceptación / Definición de Terminado).
* **CRUD:** Create, Read, Update, Delete (Crear, Leer, Actualizar, Eliminar).
* **EJS:** Embedded JavaScript Templating (Motor de plantillas del lado del servidor).
* **SQLite:** Sistema de gestión de bases de datos relacional ligero contenido en archivo.

### 1.5 Referencias
* IEEE Std 830-1998: *IEEE Recommended Practice for Software Requirements Specifications*.
* Guía de Aprendizaje e Instrucciones Específicas EFT Semana 9 (PRY3211 - Duoc UC).
* Scrum Guide (Ken Schwaber & Jeff Sutherland).
* Documentación de Express.js y SQLite3.

---

## 2. Descripción General

### 2.1 Perspectiva del Producto
El sistema es una aplicación autónoma basada en arquitectura cliente-servidor web de 3 capas (Presentación en EJS/HTML5/CSS3, Lógica de Negocio en Node.js/Express, y Persistencia en SQLite), con conectividad externa vía HTTP hacia un proveedor de tasas de cambio internacionales.

### 2.2 Funciones del Producto
* Registro e inicio de sesión de usuarios con validación de credenciales.
* Filtro y consulta de disponibilidad de habitaciones por fecha y capacidad.
* Conversión dinámica de tarifas entre pesos chilenos (CLP), dólares (USD) y euros (EUR).
* Registro y persistencia transaccional de reservas en la base de datos.
* Generación de comprobante digital de checkout.
* Visualización centralizada de reservas para la administración hotelera.
* Cancelación y actualización de estado de reservas en tiempo real.
* Alta, modificación, listado y baja de habitaciones hoteleras.

### 2.3 Características de los Usuarios
* **Turista:** Usuario sin conocimientos técnicos avanzados. Requiere interfaz limpia, intuitiva, responsiva y retroalimentación clara de errores en pantalla.
* **Administrador:** Usuario de gestión interna que opera el inventario, requiere rapidez en la visualización de datos, filtros claros y acciones directas.

### 2.4 Restricciones del Sistema
* El servidor de aplicaciones debe ejecutarse sobre Node.js v18+ y Express.
* La base de datos debe operar sobre SQLite garantizando portabilidad sin necesidad de servicios pesados externos de base de datos.
* El tiempo de respuesta de las vistas no debe superar los 2 segundos bajo condiciones normales.
* En caso de indisponibilidad del servicio web externo de tipo de cambio, el sistema debe degradar elegantemente su servicio mostrando los precios en CLP y notificando al usuario sin interrumpir el flujo.

---

## 3. Requerimientos Específicos

### 3.1 Requerimientos Funcionales (RF)

| ID | Nombre del Requerimiento | Descripción | Prioridad |
| :---: | :--- | :--- | :---: |
| **RF01** | Autenticación de Usuarios | El sistema debe permitir iniciar sesión ingresando correo electrónico y RUT. Debe validar credenciales y crear una sesión segura en el servidor. | Alta (Must) |
| **RF02** | Control de Acceso por Roles | El middleware debe interceptar cada petición HTTP: si el rol es 'Turista', se restringe el acceso al panel `/admin`; si es 'Administrador', se redirige al panel de gestión. | Alta (Must) |
| **RF03** | Búsqueda de Disponibilidad | El sistema debe permitir ingresar fecha de Check-in, fecha de Check-out y cantidad de huéspedes, filtrando solo aquellas habitaciones no reservadas en dicho rango. | Alta (Must) |
| **RF04** | Validación de Fechas | El sistema debe validar que la fecha de Check-in sea mayor o igual a la fecha actual y que la fecha de Check-out sea estrictamente posterior a la de Check-in. | Alta (Must) |
| **RF05** | Integración API Multimoneda | El sistema debe consultar el endpoint `/api/exchange-rate` para obtener la tasa de cambio vigente y recalcular el precio mostrado en USD o EUR mediante AJAX. | Media (Should) |
| **RF06** | Creación y Registro de Reserva | El sistema debe persistir la reserva en la tabla `Reserva` con ID de usuario, ID de habitación, fechas, cantidad de huéspedes, valor total y estado inicial 'Confirmada'. | Alta (Must) |
| **RF07** | Proceso de Checkout y Comprobante | El sistema debe presentar la pantalla de resumen de reserva y emitir el detalle de confirmación con los datos del huésped y el total pagado. | Alta (Must) |
| **RF08** | Panel de Reservas Administrador | El administrador debe poder visualizar una tabla con todas las reservas registradas, indicando cliente, habitación, fechas, montos y estado. | Alta (Must) |
| **RF09** | Cancelación de Reservas | El administrador debe poder cancelar una reserva activa, cambiando su estado a 'Cancelada' y liberando automáticamente la habitación. | Alta (Must) |
| **RF10** | CRUD de Habitaciones | El administrador debe poder registrar nuevas habitaciones (número, tipo, capacidad, precio, hotel) y visualizarlas en el inventario. | Alta (Must) |
| **RF11** | Eliminación de Habitaciones | El administrador debe poder eliminar habitaciones del inventario que no posean reservas activas bloqueantes. | Media (Should) |
| **RF12** | Cierre de Sesión Seguro | El sistema debe destruir la cookie de sesión en el servidor y redirigir a la pantalla de login al pulsar "Cerrar Sesión". | Alta (Must) |

---

### 3.2 Requerimientos No Funcionales (RNF)

| ID | Categoría | Descripción del Requerimiento | Métrica / Criterio |
| :---: | :--- | :--- | :--- |
| **RNF01** | Rendimiento | El servidor debe responder peticiones locales en menos de 300 ms y peticiones con API externa en menos de 1,5 segundos. | Tiempo de respuesta < 1.5s |
| **RNF02** | Seguridad | Las rutas administrativas y de usuario deben estar protegidas mediante sesiones HTTP seguras (`express-session`), evitando el acceso no autorizado vía URL directa. | 100% rutas protegidas |
| **RNF03** | Confiabilidad | Ante caídas o fallas de red de la API externa de tipo de cambio, el sistema debe capturar el error con `try/catch` y mantener operativo el flujo en moneda local CLP. | Disponibilidad 99.9% local |
| **RNF04** | Usabilidad | Las interfaces deben ser responsivas (diseño móvil y escritorio), con jerarquía visual clara y contrastes conformes a estándares de accesibilidad básica. | Responsive CSS / viewport |
| **RNF05** | Compatibilidad | La solución debe ser compatible con los navegadores modernos estándar del mercado (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari). | 100% navegadores Evergreen |
| **RNF06** | Mantenibilidad | El código debe estar modularizado en controladores, base de datos y vistas, con nombres descriptivos y comentarios explicativos. | Separación MVC / Clean Code |
| **RNF07** | Integridad de Datos | La base de datos SQLite debe exigir claves primarias, claves foráneas (`FOREIGN KEY`) y tipos de datos válidos para evitar registros huérfanos. | ACID / FK activas en SQLite |
| **RNF08** | Portabilidad | La aplicación debe desplegarse y ejecutarse en cualquier sistema operativo (Windows, Linux, macOS) con únicamente el comando `npm install && npm start`. | Multiplataforma Node.js |

---

## 4. Matriz de Trazabilidad de Requerimientos

| Requerimiento Funcional | Épica / Historia de Usuario | Componente / Archivo | Caso de Prueba (QA) | Estado |
| :---: | :---: | :---: | :---: | :---: |
| **RF01** | US01: Inicio de Sesión | `server.js` (`/login`), `views/login.ejs` | CP01, CP02 | Completado y Validado |
| **RF02** | US02: Control de Acceso | `server.js` (Middleware de sesión) | CP01, CP03, CP08 | Completado y Validado |
| **RF03** | US03: Búsqueda de Habitaciones | `server.js` (`/`), `views/turista.ejs` | CP04, CP05 | Completado y Validado |
| **RF04** | US04: Validación de Fechas | `views/turista.ejs` (JS validación) | CP06 | Completado y Validado |
| **RF05** | US05: Conversión Multimoneda | `server.js` (`/api/exchange-rate`) | CP07 | Completado y Validado |
| **RF06** | US06: Creación de Reserva | `server.js` (`/reservar`), `database.js` | CP04 | Completado y Validado |
| **RF07** | US07: Checkout de Reserva | `server.js` (`/checkout`), `views/checkout.ejs` | CP04 | Completado y Validado |
| **RF08** | US08: Panel de Reservas Admin | `server.js` (`/admin`), `views/admin.ejs` | CP08 | Completado y Validado |
| **RF09** | US09: Cancelación de Reservas | `server.js` (`/admin/reservas/:id/cancel`) | CP09 | Completado y Validado |
| **RF10** | US10: Registro de Habitaciones | `server.js` (`/admin/habitaciones`), `views/admin_habitaciones.ejs` | CP10 | Completado y Validado |
| **RF11** | US11: Eliminación Habitaciones | `server.js` (`/admin/habitaciones/:id/delete`) | CP10 | Completado y Validado |
| **RF12** | US12: Cierre de Sesión | `server.js` (`/logout`) | CP01 | Completado y Validado |

---
**Documento ERS V3.0 Final Aprobado**
