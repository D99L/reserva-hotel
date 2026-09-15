# Guion para el Video (Semana 5)

Este es un guion sugerido para tu video de 3 a 5 minutos, cumpliendo con los requisitos de la rúbrica.

---

**[0:00 - 0:30] Introducción**
*   **Imagen:** Tu rostro o la primera diapositiva de presentación.
*   **Narración:** "Hola, somos el equipo [Nombre del Equipo] y hoy presentaremos los avances de la Semana 5 para nuestro Sistema de Reservas de Hotel. En esta iteración, hemos diseñado las primeras vistas de usuario (Front-End) y del panel administrador (Back-End), apoyándonos en los estándares UML 4+1 y nuestros criterios DOD (Definition of Done)."

**[0:30 - 1:30] Modelos UML Mejorados**
*   **Imagen:** Mostrar el documento `Modelos_UML_Actualizados.md` con los diagramas.
*   **Narración:** "Comenzamos mejorando nuestros modelos UML según el estándar 4+1. En la *Vista de Escenario*, actualizamos los casos de uso para incluir al Turista y al Administrador. En la *Vista de Procesos* y *Lógica*, refinamos los pasos de reserva y las clases (Hotel, Habitación, Cliente, Reserva) para que sean 100% coherentes con nuestra base de datos SQL. Además, incorporamos la nueva *Vista de Despliegue*, usando un diagrama de Componentes que muestra cómo el Front-End web se conecta mediante API REST al Back-End (Controlador de Reservas) y este a nuestra base de datos MySQL."

**[1:30 - 3:00] Prototipos y Vistas de Usuario**
*   **Imagen:** Mostrar las vistas de diseño (puedes abrir el archivo `UI_Prototipos.html` en el navegador web).
*   **Narración:** "Pasando al diseño de componentes de software, construimos tres vistas principales:
    1.  **Vista de Búsqueda (Turista):** Su propósito funcional es permitir filtrar habitaciones por fecha y capacidad. En términos de usabilidad, agrupamos los inputs de forma intuitiva y destacamos el botón de 'Buscar'.
    2.  **Vista de Formulario y Pago:** Permite capturar los datos del cliente. Como atributo de accesibilidad, todos los campos tienen sus etiquetas (labels) claras y el botón principal es de alto contraste.
    3.  **Panel de Administrador (Back-end UI):** Su propósito es gestionar las reservas (aprobarlas o cancelarlas). Usamos 'status badges' con colores semánticos (verde y amarillo) apoyados de texto descriptivo para asegurar la accesibilidad visual."

**[3:00 - 3:45] Planilla DOD y Gestión (Trello/Git)**
*   **Imagen:** Mostrar rápidamente la planilla Excel DOD y luego el tablero Trello.
*   **Narración:** "Todos estos diseños fueron validados mediante nuestra planilla DOD (Definition of Done), asegurando que cada vista cumple con el diseño responsivo, manejo de errores y contraste visual. Finalmente, organizamos nuestro trabajo subiendo las imágenes de las vistas a nuestro tablero de Trello, moviéndolas al estado 'En revisión'. Y hemos subido todos los códigos, diagramas y prototipos a nuestro repositorio Git, realizando los 3 commits requeridos por vista."

**[3:45 - 4:00] Cierre**
*   **Imagen:** Tablero Trello o pantalla final.
*   **Narración:** "Con esto concluimos la presentación de la semana 5. Muchas gracias."
