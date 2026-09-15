# Modelos UML Actualizados (Semana 5)

A continuación se presentan los diagramas correspondientes al estándar 4+1, con mejoras respecto a la semana anterior y la adición del diagrama de componentes.

## 1. Vista de Escenario (Casos de Uso)
*Mejora: Se agregan detalles para la gestión del sistema de reservas.*

```mermaid
flowchart LR
    %% Actores
    Turista(["Turista"])
    Administrador(["Administrador"])
    
    %% Casos de Uso
    UC_Disp((Buscar Disponibilidad))
    UC_Sel((Seleccionar Habitación))
    UC_Res((Realizar Reserva))
    UC_Conf((Gestionar Reservas))
    UC_Pago((Procesar Pago))
    
    %% Relaciones
    Turista --> UC_Disp
    Turista --> UC_Res
    Turista --> UC_Pago
    
    Administrador --> UC_Conf
    
    UC_Disp -.->|<<include>>| UC_Sel
    UC_Res -.->|<<include>>| UC_Pago
```

## 2. Vista de Procesos (Diagrama de Actividad)
*Proceso de reserva de habitación.*

```mermaid
stateDiagram-v2
    [*] --> BuscarHabitacion
    BuscarHabitacion --> SeleccionarHabitacion: Habitaciones Disponibles
    BuscarHabitacion --> BuscarHabitacion: Sin disponibilidad
    SeleccionarHabitacion --> IngresarDatos
    IngresarDatos --> ProcesarPago
    ProcesarPago --> PagoAprobado
    ProcesarPago --> PagoRechazado
    PagoRechazado --> IngresarDatos
    PagoAprobado --> ConfirmarReserva
    ConfirmarReserva --> [*]
```

## 3. Vista Lógica (Diagrama de Clases)
*Mejora: Adición de métodos y tipos de datos coherentes con la Base de Datos.*

```mermaid
classDiagram
    class Hotel {
        +int hotel_id
        +String nombre
        +String direccion
        +int categoria
        +obtenerHabitaciones()
    }
    
    class Habitacion {
        +int habitacion_id
        +int hotel_id
        +String tipo
        +int capacidad
        +float precio
        +verificarDisponibilidad()
    }
    
    class Cliente {
        +int cliente_id
        +String nombre
        +String apellido
        +String correo_electronico
        +String telefono
        +registrar()
    }
    
    class Reserva {
        +int reserva_id
        +int cliente_id
        +int habitacion_id
        +Date fecha_entrada
        +Date fecha_salida
        +int cantidad_personas
        +crearReserva()
        +cancelarReserva()
    }
    
    Hotel "1" -- "*" Habitacion : tiene
    Cliente "1" -- "*" Reserva : realiza
    Habitacion "1" -- "*" Reserva : es parte de
```

## 4. Vista de Despliegue (Diagrama de Componentes)
*Nueva vista solicitada en S5.*

```mermaid
flowchart TD
    subgraph "Front-End (Vistas de Usuario)"
        UI_T[Interfaz Web de Turista]
        UI_A[Panel Web de Administrador]
    end
    
    subgraph "Back-End"
        CR[Controlador de Reservas]
        CU[Controlador de Usuarios]
        GP[Gestor de Pagos]
    end
    
    subgraph "Base de Datos MySQL"
        BD[(si_reserva_hotel)]
    end
    
    UI_T -->|HTTP/REST| CR
    UI_A -->|HTTP/REST| CR
    CR -->|SQL| BD
    CU -->|SQL| BD
    CR -->|API Externa| GP
```
