# Diagramas UML - Vistas del Sistema de Reservas

## 1. Vista de Escenario (Diagrama de Caso de Uso)
Muestra los actores principales y cómo interactúan con los casos de uso fundamentales del sistema de reservas.

```mermaid
usecaseDiagram
    actor Turista
    actor Administrador

    package "Sistema de Reservas" {
        usecase "Consultar Disponibilidad" as UC1
        usecase "Seleccionar Habitación" as UC2
        usecase "Ingresar Fechas" as UC3
        usecase "Realizar Reserva" as UC4
        usecase "Pagar Reserva" as UC5
        usecase "Confirmar Reserva" as UC6
    }

    Turista --> UC1
    Turista --> UC4
    Turista --> UC5

    Administrador --> UC6

    UC1 ..> UC2 : <<include>>
    UC1 ..> UC3 : <<extend>>
    UC4 ..> UC6 : <<include>>
```

*Nota: Github soporta sintaxis flowchart si usecaseDiagram no renderiza nativamente en algunas herramientas, aquí la versión alternativa en flowchart:*

```mermaid
flowchart LR
    Turista(["👤 Turista"])
    Administrador(["👤 Administrador"])
    
    UC1((Consultar Disponibilidad))
    UC2((Seleccionar Habitación))
    UC3((Ingresar Fechas))
    UC4((Realizar Reserva))
    UC5((Pagar Reserva))
    UC6((Confirmar Reserva))
    
    Turista --> UC1
    Turista --> UC4
    Turista --> UC5
    
    Administrador --> UC6
    
    UC1 -.->|<<include>>| UC2
    UC1 -.->|<<extend>>| UC3
    UC4 -.->|<<include>>| UC6
```

## 2. Vista de Procesos (Diagrama de Actividad)
Representa el flujo de trabajo para el proceso principal de "Realizar y Pagar una Reserva".

```mermaid
stateDiagram-v2
    [*] --> Iniciar_Busqueda
    Iniciar_Busqueda --> Ingresar_Fechas : Turista
    Ingresar_Fechas --> Mostrar_Disponibilidad : Sistema
    
    state Mostrar_Disponibilidad {
        [*] --> Hay_Habitaciones
        Hay_Habitaciones --> Seleccionar_Habitacion
        Seleccionar_Habitacion --> [*]
    }
    
    Mostrar_Disponibilidad --> Sin_Disponibilidad : No hay
    Sin_Disponibilidad --> Iniciar_Busqueda
    
    Mostrar_Disponibilidad --> Ingresar_Datos : Selecciona Habitación
    Ingresar_Datos --> Procesar_Pago : Turista
    Procesar_Pago --> Validar_Pago : Sistema
    
    Validar_Pago --> Pago_Rechazado : Error
    Pago_Rechazado --> Procesar_Pago : Reintentar
    
    Validar_Pago --> Pago_Aceptado : OK
    Pago_Aceptado --> Generar_Confirmacion : Sistema
    Generar_Confirmacion --> Notificar_Administrador
    Notificar_Administrador --> [*]
```

## 3. Vista Lógica (Diagrama de Clases)
Muestra la estructura de los objetos principales, sus atributos y relaciones.

```mermaid
classDiagram
    class Usuario {
        +int id_usuario
        +String nombre
        +String email
        +login()
        +logout()
    }
    
    class Turista {
        +String pasaporte
        +String pais_origen
        +buscarHabitacion()
        +hacerReserva()
        +realizarPago()
    }
    
    class Administrador {
        +String nivel_acceso
        +gestionarReservas()
        +confirmarReserva()
    }
    
    class Habitacion {
        +int id_habitacion
        +String tipo
        +float precio_noche
        +boolean estado
        +verificarDisponibilidad()
    }
    
    class Reserva {
        +int id_reserva
        +Date fecha_ingreso
        +Date fecha_salida
        +String estado
        +float total
        +calcularTotal()
        +actualizarEstado()
    }
    
    class Pago {
        +int id_pago
        +float monto
        +Date fecha_pago
        +String metodo
        +procesarTransaccion()
    }

    Usuario <|-- Turista
    Usuario <|-- Administrador
    Turista "1" -- "0..*" Reserva : realiza >
    Reserva "*" -- "1" Habitacion : incluye >
    Reserva "1" -- "1" Pago : tiene >
    Administrador "1" -- "*" Reserva : gestiona >
```

## 4. Vista de Despliegue (Diagrama de Componentes / Despliegue)
Muestra cómo se distribuirá el sistema en la infraestructura física (servidores, base de datos).

```mermaid
flowchart TD
    subgraph Cliente ["Capa de Presentación (Front-end)"]
        Navegador["Navegador Web\n(React/Angular/Vue)"]
        AppMovil["App Móvil\n(Opcional)"]
    end
    
    subgraph Servidor ["Capa de Negocio (Back-end)"]
        API["API RESTful\n(Node.js / Django / Spring)"]
        GestorReservas["Módulo Gestión de Reservas"]
        GestorPagos["Módulo Pagos"]
        
        API --> GestorReservas
        API --> GestorPagos
    end
    
    subgraph Datos ["Capa de Datos"]
        BD[("Base de Datos\n(PostgreSQL / MySQL)")]
    end
    
    subgraph Externo ["Servicios Externos"]
        PasarelaPagos["Pasarela de Pagos\n(Webpay / Stripe)"]
    end
    
    Navegador <-->|HTTP/REST| API
    AppMovil <-->|HTTP/REST| API
    GestorReservas <-->|SQL/ORM| BD
    GestorPagos <-->|API/Webhook| PasarelaPagos
```
