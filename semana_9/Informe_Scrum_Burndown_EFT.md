# Informe de Adaptación a Metodología Scrum y Project Burndown
**Proyecto:** Sistema Web de Reserva de Hotel  
**Asignatura:** Ingeniería de Software (PRY3211)  
**Institución:** Duoc UC  
**Estudiante / Equipo:** Adolfo Leal Lara  
**Docente:** Jorge Antonio Canales Soto  
**Fecha:** Octubre 2026 (Semana 9 - EFT)  

---

## 1. Adaptación del Proyecto al Marco de Trabajo Scrum

Para el desarrollo del **Sistema Web de Reserva de Hotel**, se adaptó el marco ágil de trabajo **Scrum**, distribuyendo el ciclo de vida del proyecto a lo largo de las 9 semanas lectivas estructuradas en **3 Sprints de 3 semanas de duración cada uno**:
* **Sprint 1 (Semanas 1 a 3 - Experiencia de Aprendizaje 1):** Levantamiento de Requerimientos, Historias de Usuario, Modelo de Dominio y Modelamiento Arquitectónico UML bajo vistas 4+1.
* **Sprint 2 (Semanas 4 a 6 - Experiencia de Aprendizaje 2):** Diseño e implementación de la Base de Datos SQLite, construcción del Backend con Node.js/Express, maquetación de vistas frontend responsivas en EJS y prototipado.
* **Sprint 3 (Semanas 7 a 9 - Experiencia de Aprendizaje 3 y EFT):** Integración de API externa de cambio de divisas, gestión de errores, diseño y ejecución del Manual de Pruebas de Usuario (QA), corrección de no conformidades y entrega final transversal (EFT).

### 1.1 Roles Scrum
* **Product Owner (PO):** Docente guía Jorge Antonio Canales Soto, encargado de validar las necesidades del cliente hotelero, priorizar el valor del negocio y evaluar las entregas sumativas e incrementos de producto.
* **Scrum Master & Development Team:** Adolfo Leal Lara, responsable de facilitar el flujo ágil, asegurar el cumplimiento de la Definición de Terminado (DoD), remover impedimentos técnicos, y programar e integrar la solución técnica completa.

### 1.2 Eventos y Ceremonias Ágiles
* **Sprint Planning:** Al inicio de cada Sprint, se seleccionaron las Historias de Usuario del Product Backlog para conformar el Sprint Backlog, estimando su esfuerzo en Story Points (escala Fibonacci: 1, 2, 3, 5, 8, 13).
* **Daily Scrum (Sincronización Periódica):** Revisiones sistemáticas respondiendo: ¿Qué se avanzó?, ¿Qué se abordará hoy?, y ¿Qué impedimentos existen?
* **Sprint Review:** Demostración funcional del incremento al cierre de cada experiencia mediante entregables formales, prototipos web y videos explicativos.
* **Sprint Retrospective:** Análisis de oportunidades de mejora, adoptando el feedback del docente (por ejemplo, fortaleciendo la integración front-back y la gestión de no conformidades en calidad de software).

### 1.3 Criterios de Aceptación y Definition of Done (DoD)
Para que un elemento del backlog sea marcado como **Done (Terminado)**, debió cumplir rigurosamente con:
1. **Código fuente implementado:** Sintaxis limpia, comentarios explicativos y sin errores de compilación o ejecución.
2. **Integración probada:** Comunicación efectiva entre front-end y back-end con persistencia real en la base de datos SQLite.
3. **Manejo de errores:** Validación de entradas de usuario y captura de contingencias en llamadas externas con `try/catch`.
4. **Pruebas funcionales aprobadas:** Validación de casos Happy Path y Edge Cases sin fallos bloqueantes.
5. **Control de versiones:** Commit descriptivo en el repositorio Git público de GitHub y tarjeta actualizada en Trello a "Done".

---

## 2. Planilla del Product Backlog (Consolidado Final)

A continuación se presenta la planilla completa del Product Backlog priorizado mediante la técnica **MoSCoW** (Must have, Should have, Could have, Won't have), con sus estimaciones en **Story Points (SP)**:

| ID | Épica | Historia de Usuario (HU) | Criterios de Aceptación (DoD) | Prioridad | SP | Sprint | Estado |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **US01** | Autenticación | **Como** turista o admin, **quiero** iniciar sesión con correo y RUT, **para** acceder de forma segura al sistema según mi rol. | Formulario con validación; sesión HTTP iniciada; redirección según rol. | Must | 5 | Sp 2 | Done |
| **US02** | Seguridad | **Como** sistema, **quiero** restringir el acceso a rutas según el rol del usuario, **para** evitar accesos no autorizados a la administración. | Middleware verifica sesión; si turista entra a `/admin` se redirige a `/`; viceversa. | Must | 5 | Sp 2 | Done |
| **US03** | Búsqueda | **Como** turista, **quiero** buscar habitaciones disponibles por rango de fechas y huéspedes, **para** planificar mi estadía. | Filtro dinámico en SQL; solo muestra habitaciones en estado 'Disponible'. | Must | 8 | Sp 2 | Done |
| **US04** | Validación | **Como** turista, **quiero** que el sistema valide mis fechas de reserva, **para** no cometer errores en la reserva. | Bloquea búsqueda si fecha Check-in es posterior o igual a Check-out. | Must | 3 | Sp 2 | Done |
| **US05** | Cotización | **Como** turista, **quiero** visualizar las tarifas en CLP, USD o EUR, **para** conocer el costo exacto en mi moneda preferida. | Consumo de `/api/exchange-rate`; recálculo vía AJAX; fallback en CLP si la API falla. | Should | 8 | Sp 3 | Done |
| **US06** | Reserva | **Como** turista, **quiero** seleccionar una habitación y confirmar mi reserva, **para** asegurar mi estadía en el hotel. | Inserción en tabla `Reserva`; cálculo de noches y total; estado 'Confirmada'. | Must | 8 | Sp 2 | Done |
| **US07** | Checkout | **Como** turista, **quiero** acceder al checkout y ver mi comprobante, **para** tener constancia del pago y la reserva. | Vista con detalle de estadía, código de reserva y confirmación de pago. | Must | 5 | Sp 3 | Done |
| **US08** | Monitoreo | **Como** administrador, **quiero** visualizar el listado completo de reservas, **para** conocer la ocupación del hotel. | Tabla completa con datos de turista, habitación, fechas, montos y estado actual. | Must | 8 | Sp 2 | Done |
| **US09** | Cancelación | **Como** administrador, **quiero** cancelar una reserva solicitada por el cliente, **para** liberar la habitación en el inventario. | Botón de acción rápida; cambio de estado a 'Cancelada'; actualización en BD. | Must | 5 | Sp 3 | Done |
| **US10** | Inventario | **Como** administrador, **quiero** dar de alta nuevas habitaciones con sus detalles, **para** ampliar la oferta del hotel. | Formulario CRUD con número, tipo, capacidad y tarifa por noche; inserción en BD. | Must | 8 | Sp 2 | Done |
| **US11** | Mantenimiento| **Como** administrador, **quiero** eliminar habitaciones fuera de servicio, **para** mantener el catálogo depurado. | Eliminación física en BD si no hay reservas activas asociadas. | Should | 5 | Sp 3 | Done |
| **US12** | Modelamiento | **Como** equipo, **quiero** diseñar la arquitectura UML bajo el modelo 4+1, **para** guiar el desarrollo con bases sólidas. | Diagramas de Casos de Uso, Clases, Actividad, Componentes y Despliegue listos. | Must | 21 | Sp 1 | Done |
| **TOTAL** | - | **12 Historias de Usuario** | - | - | **89 SP** | - | **100% Done** |

*Nota sobre Planilla de Backlog:* La versión editable en línea y el seguimiento de tarjetas se encuentra sincronizado en el tablero oficial de Trello del proyecto.

---

## 3. Project Burndown Chart y Análisis de Velocidad

El **Project Burndown Chart** refleja el avance del proyecto a lo largo del tiempo, contrastando la reducción ideal de esfuerzo frente a la ejecución real de Story Points en cada semana lectiva.

### 3.1 Tabla de Datos de Quemado de Esfuerzo (Project Burndown Data)

| Hito Temporal | Semana | SP Planificados (Ideal) | SP Remanentes Reales | SP Quemados en la Semana | Evento Clave del Proyecto |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Inicio del Proyecto** | Sem 0 | 89.0 | 89.0 | - | Creación de Repositorio Git y Trello inicial. |
| **Sprint 1 (Exp 1)** | Sem 1 | 79.1 | 82.0 | 7.0 | Definición de Requerimientos y Casos de Uso. |
| | Sem 2 | 69.2 | 72.0 | 10.0 | Modelamiento UML (Clases y Actividades). |
| | Sem 3 | 59.3 | 61.0 | 11.0 | Cierre Sprint 1: Diagramas 4+1 consolidados. |
| **Sprint 2 (Exp 2)** | Sem 4 | 49.4 | 52.0 | 9.0 | Creación de Modelo de Datos SQLite y server Node. |
| | Sem 5 | 39.5 | 41.0 | 11.0 | Vistas EJS responsivas de Turista y Admin. |
| | Sem 6 | 29.6 | 28.0 | 13.0 | Cierre Sprint 2: CRUD funcional e inicio de sesión. |
| **Sprint 3 (Exp 3 & EFT)**| Sem 7 | 19.8 | 18.0 | 10.0 | Integración API Multimoneda y matriz de testing. |
| | Sem 8 | 9.9 | 7.0 | 11.0 | Manual de Pruebas de Usuario y No Conformidades. |
| | Sem 9 | 0.0 | 0.0 | 7.0 | Cierre EFT: Empaquetamiento final, video y ERS. |

### 3.2 Gráfico del Project Burndown
*(El gráfico de alta resolución generado se encuentra disponible como `burndown_chart.png` y ha sido incrustado en el documento oficial de entrega).*

* **Línea Ideal de Quemado:** Representa una reducción uniforme de aproximadamente 9.9 SP por semana.
* **Línea Real del Equipo:** Muestra una ligera desviación controlada durante las Semanas 1 y 2 por el tiempo dedicado al refinamiento arquitectónico, la cual fue recuperada con éxito durante el Sprint 2 gracias a la reutilización modular del código en Express y EJS, alcanzando los **0 Story Points remanentes en la Semana 9**.

### 3.3 Velocidad del Equipo (Team Velocity)
* **Sprint 1:** 28 Story Points completados (Comprometidos: 30 SP). Eficiencia: 93.3%.
* **Sprint 2:** 33 Story Points completados (Comprometidos: 32 SP). Eficiencia: 103.1%.
* **Sprint 3:** 28 Story Points completados (Comprometidos: 27 SP). Eficiencia: 103.7%.
* **Velocidad Promedio:** **29.7 SP / Sprint**. Esta estabilidad en la velocidad demuestra una alta madurez del equipo ágil en estimación y ejecución técnica.

---

## 4. Retrospectiva y Mejora Continua

Durante la ejecución del marco Scrum, se aplicaron dos ajustes principales derivados de las ceremonias de retrospectiva:
1. **Atención al Feedback del Docente:** En la Semana 7 se recibió la observación sobre robustecer la comunicación entre el front-end y el back-end en el tratamiento de errores de servicios externos. Esto motivó la creación de tareas técnicas en el Sprint 3 para asegurar degradación elegante ante caídas de la API de divisas.
2. **Gestión Proactiva de No Conformidades:** Se implementó una lista de verificación previa a cada commit para asegurar que ninguna funcionalidad fuera considerada terminada sin antes haber corrido su respectivo caso de prueba funcional documentado en el Manual de QA.
