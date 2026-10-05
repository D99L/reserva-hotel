# Casos de Prueba Funcionales (Happy Paths & Edge Cases)

A continuación, se detallan los casos de prueba para validar las funcionalidades clave del Sistema de Reserva de Hotel.

---

## Módulo: Autenticación (Login)

### CP01: Inicio de sesión exitoso (Happy Path)
* **Precondición:** El usuario tiene credenciales válidas en la base de datos.
* **Pasos:**
  1. Navegar a la página de login (`/login`).
  2. Ingresar el nombre de usuario y contraseña correctos.
  3. Hacer clic en "Iniciar Sesión".
* **Resultado Esperado:** El sistema autentica al usuario y lo redirige a la vista correspondiente según su rol (Turista o Administrador).

### CP02: Inicio de sesión con credenciales inválidas (Edge Case)
* **Precondición:** El usuario ingresa a la vista de login.
* **Pasos:**
  1. Navegar a la página de login.
  2. Ingresar un usuario existente, pero con contraseña incorrecta.
  3. Hacer clic en "Iniciar Sesión".
* **Resultado Esperado:** El sistema no permite el acceso y muestra un mensaje de error como "Usuario o contraseña incorrectos".

---

## Módulo: Turista (Reserva de Habitaciones)

### CP03: Búsqueda y Reserva de habitación exitosa (Happy Path)
* **Precondición:** Usuario logueado como "Turista". Hay habitaciones disponibles en las fechas seleccionadas.
* **Pasos:**
  1. Ingresar las fechas de Check-in y Check-out, y cantidad de huéspedes.
  2. Hacer clic en "Buscar".
  3. Seleccionar una habitación de los resultados.
  4. Confirmar la reserva.
* **Resultado Esperado:** La reserva se procesa correctamente, se muestra un mensaje de confirmación y el estado de la habitación cambia a reservada para esas fechas.

### CP04: Búsqueda sin habitaciones disponibles (Edge Case)
* **Precondición:** Usuario logueado como "Turista". No hay habitaciones disponibles.
* **Pasos:**
  1. Ingresar un rango de fechas en temporada alta donde el hotel está 100% ocupado.
  2. Hacer clic en "Buscar".
* **Resultado Esperado:** El sistema muestra un mensaje claro indicando "No se encontraron habitaciones disponibles para las fechas seleccionadas".

### CP05: Fechas de Check-in posteriores al Check-out (Edge Case)
* **Precondición:** Usuario logueado como "Turista".
* **Pasos:**
  1. Ingresar como Check-in una fecha (ej. 20/12/2026) y Check-out una fecha anterior (ej. 15/12/2026).
  2. Hacer clic en "Buscar".
* **Resultado Esperado:** El sistema bloquea la búsqueda y muestra un error de validación: "La fecha de salida debe ser posterior a la fecha de entrada".

---

## Módulo: Proceso de Checkout

### CP06: Pago de reserva exitoso (Happy Path)
* **Precondición:** Usuario logueado, con una reserva pendiente de pago.
* **Pasos:**
  1. Navegar a la sección de "Checkout" o "Mis Reservas".
  2. Seleccionar la reserva a pagar.
  3. Ingresar datos de tarjeta de crédito válidos y confirmar.
* **Resultado Esperado:** El pago se procesa, la reserva cambia a estado "Pagada" y se emite un comprobante/factura en pantalla.

### CP07: Error al procesar pago con tarjeta inválida (Edge Case)
* **Precondición:** Usuario en pantalla de checkout.
* **Pasos:**
  1. Ingresar datos de tarjeta simulando fondos insuficientes o número inválido.
  2. Confirmar pago.
* **Resultado Esperado:** El pago es rechazado. Se muestra el mensaje "El pago no pudo ser procesado. Verifique los datos de su tarjeta". La reserva se mantiene pendiente.

---

## Módulo: Administrador (Gestión)

### CP08: Visualización y cancelación de reservas (Happy Path)
* **Precondición:** Usuario logueado como "Admin". Existen reservas activas.
* **Pasos:**
  1. Navegar a la vista de "Administración de Reservas".
  2. Ubicar una reserva específica.
  3. Hacer clic en "Cancelar Reserva" y confirmar la acción.
* **Resultado Esperado:** La reserva se cancela, la habitación vuelve a estar disponible para esas fechas y la tabla se actualiza.

### CP09: Creación de nueva habitación (Happy Path)
* **Precondición:** Usuario logueado como "Admin".
* **Pasos:**
  1. Navegar a la vista de "Gestión de Habitaciones".
  2. Completar formulario (Número de habitación, tipo, precio, capacidad).
  3. Guardar.
* **Resultado Esperado:** La nueva habitación aparece en el listado y está disponible para futuras búsquedas de los turistas.
