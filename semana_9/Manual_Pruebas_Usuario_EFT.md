# Manual de Pruebas de Usuario y Resultados de Testing (QA)
**Proyecto:** Sistema Web de Reserva de Hotel  
**Asignatura:** Ingeniería de Software (PRY3211)  
**Institución:** Duoc UC  
**Estudiante / QA Lead:** Adolfo Leal Lara  
**Docente:** Jorge Antonio Canales Soto  
**Fecha:** Octubre 2026 (Semana 9 - EFT)  
**Versión:** 3.0 Final Transversal  

---

## 1. Introducción y Objetivos de Calidad

Este manual formaliza la estrategia de aseguramiento de calidad del software (QA) para el **Sistema Web de Reserva de Hotel**, estructurando la verificación y validación tanto de los caminos felices (**Happy Paths**) como de las situaciones límite o de error (**Edge Cases**).

### 1.1 Objetivos Específicos
* Validar que todas las funcionalidades descritas en el ERS cumplan con sus criterios de aceptación (Definition of Done).
* Verificar la integridad referencial y transaccional de las operaciones con la base de datos SQLite.
* Comprobar la resiliencia del sistema ante contingencias de red al consumir la API externa de tipo de cambio.
* Establecer un protocolo formal de gestión de no conformidades basado en las normas **ISO 9001:2015**, **IEEE Software Quality** e **ISTQB**.

### 1.2 Entorno de Pruebas
* **Servidor de Aplicaciones:** Node.js v18.x / v20.x, Express v5.x.
* **Base de Datos:** SQLite v3 con claves foráneas activas.
* **Navegadores Probados:** Google Chrome (v120+), Microsoft Edge (v120+), Mozilla Firefox (v121+).
* **URL de Pruebas Local:** `http://localhost:3001`
* **Credenciales de Prueba:**
  * Administrador: `admin@hotel.cl` / RUT: `1111111-1`
  * Turista: `adolfo.leal@correo.cl` / RUT: `2222222-2`

---

## 2. Casos de Prueba Funcionales (Happy Paths & Edge Cases)

### CP01: Autenticación Exitosa por Rol (Happy Path)
* **Precondición:** Usuario registrado en la base de datos SQLite.
* **Pasos:**
  1. Navegar a `http://localhost:3001/login`.
  2. Ingresar correo `adolfo.leal@correo.cl` y RUT `2222222-2`.
  3. Hacer clic en "Iniciar Sesión".
* **Resultado Esperado:** Autenticación correcta, creación de cookie de sesión y redirección automática a la vista de Turista (`/`).
* **Resultado Obtenido:** Redirección exitosa con código HTTP 302 hacia `/`.
* **Estado:** **APROBADO (Pass)**

---

### CP02: Autenticación con Credenciales Incorrectas (Edge Case)
* **Precondición:** Servidor activo en la vista de login.
* **Pasos:**
  1. Ingresar correo no existente `usuario_falso@correo.cl` o RUT inválido `0000000-0`.
  2. Hacer clic en "Iniciar Sesión".
* **Resultado Esperado:** El sistema deniega el acceso, no crea sesión y muestra alerta visible: "Credenciales inválidas".
* **Resultado Obtenido:** Bloqueo de sesión confirmado; permanencia en `/login` con mensaje de error claro.
* **Estado:** **APROBADO (Pass)**

---

### CP03: Control de Acceso y Aislamiento de Rutas por Rol (Edge Case / Seguridad)
* **Precondición:** Sesión iniciada con rol de "Turista".
* **Pasos:**
  1. Intentar acceder forzadamente escribiendo en la barra del navegador `http://localhost:3001/admin`.
* **Resultado Esperado:** El middleware de autorización detecta el rol 'Turista' y bloquea el acceso redirigiendo inmediatamente a `/`.
* **Resultado Obtenido:** Petición interceptada; código HTTP 302 y redirección a `/` sin divulgar datos administrativos.
* **Estado:** **APROBADO (Pass)**

---

### CP04: Búsqueda y Reserva Exitosa de Habitación (Happy Path)
* **Precondición:** Turista autenticado. Existen habitaciones disponibles en SQLite.
* **Pasos:**
  1. Seleccionar fecha Check-in (ej. 20/12/2026) y Check-out (ej. 25/12/2026).
  2. Seleccionar 2 huéspedes y presionar "Buscar Habitaciones".
  3. Seleccionar la habitación Simple o Doble disponible y hacer clic en "Reservar Ahora".
* **Resultado Esperado:** Se calcula la estadía en días, se inserta el registro en la tabla `Reserva` con estado 'Confirmada' y se redirige a `/checkout`.
* **Resultado Obtenido:** Registro almacenado con éxito en SQLite; redirección a `/checkout` con comprobante visible.
* **Estado:** **APROBADO (Pass)**

---

### CP05: Búsqueda de Habitación sin Disponibilidad (Edge Case)
* **Precondición:** Rango de fechas con todas las habitaciones ocupadas.
* **Pasos:**
  1. Seleccionar un rango de fechas de alta ocupación donde todas las habitaciones se encuentren reservadas.
  2. Hacer clic en "Buscar Habitaciones".
* **Resultado Esperado:** El sistema no arroja error de servidor; presenta mensaje amigable: "No se encontraron habitaciones disponibles para las fechas seleccionadas".
* **Resultado Obtenido:** Manejo correcto del conjunto vacío; vista renderizada con mensaje amigable.
* **Estado:** **APROBADO (Pass)**

---

### CP06: Validación de Fechas Invertidas en Búsqueda (Edge Case)
* **Precondición:** Turista en la vista de búsqueda.
* **Pasos:**
  1. Ingresar fecha Check-in posterior a Check-out (ej. Check-in: 25/12/2026 y Check-out: 20/12/2026).
  2. Intentar enviar el formulario.
* **Resultado Esperado:** Validación en cliente y servidor bloquea la búsqueda y emite alerta: "La fecha de salida debe ser posterior a la fecha de entrada".
* **Resultado Obtenido:** Formulario bloqueado antes del envío y validado en servidor sin generar reservas inconsistentes.
* **Estado:** **APROBADO (Pass)**

---

### CP07: Consumo de API Multimoneda y Tolerancia a Fallos (Happy Path & Fallback)
* **Precondición:** Turista visualizando habitaciones disponibles en pesos chilenos (CLP).
* **Pasos:**
  1. En el selector de moneda, escoger "USD" o "EUR".
  2. El cliente ejecuta petición AJAX a `/api/exchange-rate?target=USD`.
  3. Simular caída de red o target inválido (ej. `target=XYZ`).
* **Resultado Esperado:** 
  - Con red disponible: la API externa responde la tasa vigente y los precios en pantalla se actualizan automáticamente.
  - Con fallo/error: el servidor captura la excepción con `try/catch`, responde código 400/404 sin colapsar, y la interfaz mantiene el precio en CLP con notificación al usuario.
* **Resultado Obtenido:** Comunicación front-back impecable. Manejo de errores verificado según retroalimentación docente.
* **Estado:** **APROBADO (Pass)**

---

### CP08: Visualización y Monitoreo de Reservas por Administrador (Happy Path)
* **Precondición:** Administrador autenticado en `/admin`.
* **Pasos:**
  1. Ingresar al panel principal de administración.
  2. Revisar la tabla de reservas activas.
* **Resultado Esperado:** Visualización tabular completa con ID de reserva, cliente, habitación, rango de fechas, total y estado.
* **Resultado Obtenido:** Datos poblados en tiempo real desde la tabla `Reserva` con uniones relacionales (`JOIN Usuario`, `JOIN Habitacion`).
* **Estado:** **APROBADO (Pass)**

---

### CP09: Cancelación de Reserva y Liberación de Inventario (Happy Path)
* **Precondición:** Administrador ubicado en el panel de reservas con al menos una reserva activa.
* **Pasos:**
  1. Identificar la reserva y presionar el botón "Cancelar Reserva".
* **Resultado Esperado:** La base de datos actualiza el estado de la reserva a 'Cancelada', la habitación vuelve a estar disponible para búsquedas y la tabla se actualiza.
* **Resultado Obtenido:** Estado modificado a 'Cancelada' en SQLite; inventario liberado exitosamente.
* **Estado:** **APROBADO (Pass)**

---

### CP10: Alta y Baja de Habitaciones en el Inventario (CRUD Happy Path)
* **Precondición:** Administrador en la vista `/admin/habitaciones`.
* **Pasos:**
  1. Ingresar número de habitación "305", tipo "Suite Ejecutiva", capacidad "4", precio "120000" y hotel asociado.
  2. Hacer clic en "Crear Habitación".
  3. Validar su aparición en la tabla y presionar "Eliminar".
* **Resultado Esperado:** La habitación se inserta correctamente en SQLite con estado 'Disponible' y posteriormente se elimina del inventario.
* **Resultado Obtenido:** Operaciones transaccionales INSERT y DELETE ejecutadas sin inconsistencias.
* **Estado:** **APROBADO (Pass)**

---

## 3. Matriz de Resultados de Ejecución (Testing Summary)

| ID Caso | Módulo | Tipo de Prueba | Severidad | Resultado Esperado | Resultado Real | Estado |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **CP01** | Autenticación | Happy Path | Crítica | Login exitoso y redirección a rol | Redirección 302 conforme | **Pass** |
| **CP02** | Autenticación | Edge Case | Alta | Rechazo de credenciales y mensaje | Acceso denegado con alerta | **Pass** |
| **CP03** | Seguridad | Edge Case | Crítica | Bloqueo de turista en panel admin | Redirección 302 a `/` | **Pass** |
| **CP04** | Turista | Happy Path | Crítica | Reserva guardada y checkout | Registro en BD y comprobante | **Pass** |
| **CP05** | Turista | Edge Case | Media | Mensaje sin disponibilidad | Mensaje amigable en pantalla | **Pass** |
| **CP06** | Validación | Edge Case | Alta | Bloqueo por fechas incoherentes | Validación activa en cliente/servidor | **Pass** |
| **CP07** | Integración API | Happy Path/Edge | Alta | Cotización dinámica y fallback | Consumo REST y captura try/catch | **Pass** |
| **CP08** | Administrador | Happy Path | Alta | Listado de reservas con JOINs | Visualización en tabla admin | **Pass** |
| **CP09** | Administrador | Happy Path | Alta | Cancelación y liberación de cupo | Estado 'Cancelada' en BD | **Pass** |
| **CP10** | Inventario | Happy Path | Alta | Creación y eliminación de habitación| Inserción y borrado conforme | **Pass** |

**Tasa de Aprobación Global:** **100% (10 de 10 casos aprobados)**.

---

## 4. Gestión de No Conformidades (Basado en Pautas del Docente)

Atendiendo los lineamientos compartidos por el docente Jorge Antonio Canales Soto en el foro de la asignatura respecto a la gestión formal de calidad (ISO 9001:2015, IEEE e ISTQB), se documenta el ciclo de vida de no conformidades resueltas durante el proyecto:

1. **No Conformidad NC-01 (Funcional / Integración Front-Back):**
   * *Detección:* Durante las pruebas de la Semana 7, la pérdida temporal de conexión a la API externa de tasas de cambio provocaba que la promesa quedara rechazada sin tratamiento, congelando la interfaz del cliente.
   * *Causa Raíz:* Inexistencia de bloques `try/catch` envolventes y falta de valores predeterminados (fallback).
   * *Acción Correctiva:* En `server.js` se envolvió la llamada a `fetch` con validación estricta de código de respuesta y parámetros de consulta (`target`), retornando códigos HTTP semánticos (400, 404, 500) y configurando en `turista.ejs` un fallback automático para mostrar los valores en CLP.
   * *Prevención:* Implementación del caso de prueba automatizado CP07 y checklist de robustez previa a cada commit.

2. **No Conformidad NC-02 (Seguridad / Aislamiento de Sesiones):**
   * *Detección:* Posibilidad de acceder directamente por URL a vistas internas sin sesión activa si no se validaban todas las cabeceras.
   * *Causa Raíz:* Middleware de sesión aplicado de forma aislada solo en algunas rutas GET y no de forma global en la pila de Express.
   * *Acción Correctiva:* Se centralizó el middleware de autenticación y autorización en las primeras líneas de `server.js` antes de cualquier enrutamiento, interceptando globalmente cada petición entrante.
   * *Prevención:* Ejecución automatizada de `test_endpoints.js` en cada ciclo de integración.
