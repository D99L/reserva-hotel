# Manual de Pruebas de Usuario - Sistema de Reserva de Hotel

## 1. Introducción
Este manual proporciona una guía paso a paso para que los usuarios finales (y el equipo de QA) puedan realizar las pruebas de validación del Sistema de Reserva de Hotel. Su objetivo principal es asegurar que el software cumple con los requisitos y funciona de manera adecuada en un entorno simulado de producción.

## 2. Objetivos
* Validar que los procesos de reserva, administración de habitaciones, inicio de sesión y checkout funcionan según lo esperado.
* Identificar posibles errores o comportamientos inesperados (defectos) antes del lanzamiento final.
* Garantizar que la interfaz sea intuitiva y cumpla con los criterios de aceptación (DoD).

## 3. Alcance
Las pruebas abarcan las funcionalidades principales desarrolladas hasta la iteración actual (Semana 8):
* Módulo de Autenticación (Login)
* Módulo del Turista (Búsqueda y Reserva)
* Módulo de Checkout
* Módulo del Administrador (Gestión de reservas y habitaciones)

## 4. Requisitos Previos
* **Entorno:** Contar con un navegador web moderno actualizado (Google Chrome, Mozilla Firefox, Edge o Safari).
* **Acceso:** Tener la URL del entorno de pruebas (ej. `http://localhost:3000`).
* **Credenciales:**
  * Administrador: Usuario: `admin` / Contraseña: `adminpassword` (o según datos de prueba).
  * Turista: Usuario: `turista` / Contraseña: `turistapassword` (o permitir registro previo).
* **Datos de Prueba:** Se dispondrá de un set de habitaciones precargadas en la base de datos de pruebas.

## 5. Instrucciones Generales para la Ejecución
1. Acceda a la URL del sistema desde su navegador.
2. Siga los pasos detallados en el documento de "Casos de Prueba Funcionales".
3. Anote los resultados de cada paso, indicando si el resultado actual coincide con el resultado esperado.
4. Si el resultado es exitoso, marque el caso de prueba como **Aprobado (Pass)**.
5. Si ocurre algún error, márquelo como **Fallido (Fail)** y siga el procedimiento de reporte de defectos.

## 6. Reporte de Defectos (Bugs)
Si se encuentra con un comportamiento inesperado, documente el problema incluyendo:
* **ID del Caso de Prueba** que estaba ejecutando.
* **Descripción del problema.**
* **Pasos para reproducir** el error.
* **Resultado Esperado** vs **Resultado Actual**.
* **Evidencia:** Capturas de pantalla o un video corto mostrando el error.
* Envíe el reporte al equipo de desarrollo (o agréguelo a la herramienta de seguimiento de tickets, p. ej. Trello o Jira).
