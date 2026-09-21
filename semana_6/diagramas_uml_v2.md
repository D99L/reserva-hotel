# Diagramas UML (Actualizados Semana 6)

Mejoras a los diagramas en base a lo anterior, agregando inicio de sesion y la cancelacion.

## Vista de Escenario (Caso de Uso)

```mermaid
flowchart LR
    Turista(["👤 Turista"])
    Admin(["👤 Administrador"])
    
    UC_Login((Iniciar Sesion))
    UC1((Buscar Habitacion))
    UC2((Reservar))
    UC3((Pagar))
    UC4((Cancelar Reserva))
    UC5((Gestionar Reservas))
    
    Turista --> UC_Login
    Turista --> UC1
    Turista --> UC2
    Turista --> UC3
    Turista --> UC4
    
    Admin --> UC_Login
    Admin --> UC5
```

## Vista de Proceso (Actividad)

```mermaid
stateDiagram-v2
    [*] --> Login
    Login --> Buscar_Habitacion
    Buscar_Habitacion --> Ver_Disponibilidad
    
    state Ver_Disponibilidad {
        [*] --> Hay_Espacio
        [*] --> No_Hay_Espacio
    }
    
    Ver_Disponibilidad --> Reservar : Hay_Espacio
    Ver_Disponibilidad --> Buscar_Habitacion : No_Hay_Espacio
    
    Reservar --> Pagar
    Pagar --> Confirmar_Reserva : Pago exitoso
    Pagar --> Reservar : Falla pago
    
    Confirmar_Reserva --> [*]
```

## Vista Logica (Clases)

```mermaid
classDiagram
    class Usuario {
        +int usuario_id
        +String rut
        +String nombre
        +String rol
        +login()
    }
    
    class Hotel {
        +int hotel_id
        +String nombre
        +String direccion
    }
    
    class Habitacion {
        +int habitacion_id
        +String tipo
        +float precio
        +String estado
    }
    
    class Reserva {
        +int reserva_id
        +Date fecha_entrada
        +Date fecha_salida
        +String estado
        +cancelar()
    }
    
    class Pago {
        +int pago_id
        +float monto
        +String metodo
    }

    Usuario "1" -- "*" Reserva : hace
    Hotel "1" *-- "*" Habitacion : tiene
    Reserva "*" -- "1" Habitacion : ocupa
    Reserva "1" -- "1" Pago : tiene
```

## Diagrama de Base de Datos (ER)

```mermaid
erDiagram
    USUARIO ||--|{ RESERVA : "realiza"
    HOTEL ||--|{ HABITACION : "tiene"
    HABITACION ||--|{ RESERVA : "asignada a"
    RESERVA ||--|| PAGO : "genera"
    
    USUARIO {
        int usuario_id
        string nombre
        string rol
    }
    HOTEL {
        int hotel_id
        string nombre
    }
    HABITACION {
        int habitacion_id
        int hotel_id
        float precio
    }
    RESERVA {
        int reserva_id
        int usuario_id
        int habitacion_id
    }
    PAGO {
        int pago_id
        int reserva_id
        float monto
    }
```
