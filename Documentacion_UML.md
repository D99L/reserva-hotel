# Documentación de Modelos UML - Sistema de Reservas de Hotel

Este documento detalla los diagramas UML (basados en el modelo 4+1) creados para guiar al equipo de desarrollo (Scrum Team) en la comprensión e implementación del sistema.

## 1. Vista de Escenario (Diagrama de Casos de Uso)
**Archivo:** `Vista_Escenario.md`

Este diagrama identifica cómo los actores interactúan con el sistema.
- **Actores principales:** 
  - **Turista:** Usuario final que interactúa con el portal para buscar y reservar habitaciones.
  - **Administrador:** Personal del hotel que gestiona y confirma las reservas.
- **Casos de Uso Principales:**
  - *Consultar Disponibilidad:* Permite al turista buscar si hay habitaciones libres.
  - *Ingresar Fechas:* Extiende la búsqueda para acotar los resultados.
  - *Reservar Habitación:* Acción core del turista.
  - *Confirmar Habitación:* Acción requerida por parte del administrador tras una reserva.

## 2. Vista de Procesos (Diagrama de Actividad)
**Archivo:** `Vista_Proceso.md`

Describe el flujo de trabajo lógico paso a paso desde que el usuario entra al sistema hasta que finaliza una reserva.
- **Flujo:** El cliente busca una habitación, el sistema verifica disponibilidad. Si hay disponibilidad, se solicitan datos, se hace una reserva temporal, se procesa el pago y, de ser exitoso, se confirma la reserva definitiva.
- **Propósito para el equipo:** Ayuda a los desarrolladores de Backend a entender la secuencia lógica de los servicios y las validaciones condicionales que deben programar (por ejemplo, validar si la pasarela de pagos aprueba la transacción antes de confirmar).

## 3. Vista Lógica (Diagrama de Clases)
**Archivo:** `Vista_Logica.md`

Representa las entidades estáticas del sistema, sus atributos, métodos y cómo se relacionan entre sí. Esta es la base directa para crear el modelo de base de datos.
- **Entidades:**
  - `Hotel`: Almacena información general de la sucursal.
  - `Habitacion`: Ligada a un hotel, define el producto que se vende.
  - `Cliente`: Datos de contacto del comprador.
  - `Reserva`: Tabla transaccional que une al Cliente con la Habitación.
- **Relaciones:** Un Cliente puede tener múltiples reservas. Una Habitación puede estar en múltiples reservas a lo largo del tiempo. Un Hotel tiene múltiples habitaciones.

---
**Nota para el equipo de desarrollo:** 
Todos los archivos fuente de estos diagramas están centralizados en el repositorio Git del proyecto para asegurar su versionamiento y fácil acceso.
