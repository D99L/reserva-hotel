# Reflexión Personal sobre los Aprendizajes - Parte III (Individual)
**Asignatura:** Ingeniería de Software (PRY3211)  
**Estudiante:** Adolfo Leal Lara  
**Carrera:** Analista Programador Computacional  
**Institución:** Duoc UC  
**Docente:** Jorge Antonio Canales Soto  
**Fecha:** Octubre 2026 (Semana 9 - EFT)  

---

## 1. Comprensión Profunda de los Aprendizajes Obtenidos en la Asignatura

Al culminar las nueve semanas lectivas de la asignatura **Ingeniería de Software (PRY3211)**, mi comprensión del desarrollo de sistemas ha experimentado una transformación cualitativa sustancial. Tradicionalmente, la formación inicial en programación suele centrarse en la resolución inmediata de algoritmos y la sintaxis de un lenguaje particular; sin embargo, esta asignatura me permitió internalizar que **la programación es solo una fase dentro del ciclo de vida integral de la ingeniería de software**.

A lo largo de las tres experiencias de aprendizaje, comprendí la interdependencia sistémica que existe entre cada etapa del desarrollo:

1. **Experiencia 1 - Ingeniería de Requerimientos y Modelamiento Arquitectónico:**
   Aprendí que la causa principal del fracaso en los proyectos tecnológicos no radica habitualmente en deficiencias de codificación, sino en requerimientos ambiguos, mal elicitados o insuficientemente especificados. La adopción del estándar **IEEE 830** para la redacción de la ERS y la utilización del **modelo arquitectónico 4+1 de Philippe Kruchten** (Vistas de Escenarios, Lógica, Procesos, Desarrollo y Física) me demostraron que el diseño previo reduce drásticamente el retrabajo futuro. Modelar diagramas de casos de uso y diagramas de actividades antes de tocar una sola línea de código permitió definir con precisión los límites del sistema, clarificando las interacciones entre los diferentes actores (Turista y Administrador) y anticipando los flujos alternativos.

2. **Experiencia 2 - Diseño Modular, Persistencia e Implementación Ágil:**
   La transición del diseño abstracto a la materialización técnica me enseñó a valorar los patrones de arquitectura de software, particularmente la separación de responsabilidades en tres capas (Presentación en EJS, Lógica de Negocio en Node.js/Express y Persistencia en SQLite). Diseñar un modelo entidad-relación normalizado en tercera forma normal evitó redundancias y garantizó la integridad referencial mediante claves foráneas. Asimismo, la vivencia de la metodología ágil **Scrum** —con ceremonias de planificación, estimación con Story Points y la aplicación rigurosa de la **Definition of Done (DoD)**— me hizo comprender que la agilidad no significa improvisación, sino disciplina y entrega continua de incrementos de software con valor real para el cliente.

3. **Experiencia 3 - Integración Tecnológica, Calidad y Testing Sistemático:**
   Esta etapa consolidó mi perspectiva sobre la robustez del software. Las recomendaciones del profesor Jorge Canales Soto en el foro y la retroalimentación de la Semana 7 fueron determinantes para comprender que un sistema moderno no opera de forma aislada: vive en un ecosistema interconectado. Al integrar la API externa de tipo de cambio (`exchangerate-api`), entendí la necesidad crítica de diseñar mecanismos de tolerancia a fallos mediante bloques `try/catch`, validación de payloads y estrategias de degradación elegante (fallback a moneda local CLP). Además, la elaboración del **Manual de Pruebas de Usuario** y la diferenciación sistemática entre **Happy Paths** (caminos felices) y **Edge Cases** (casos de borde o extremos) me permitieron adoptar la mentalidad de un ingeniero de QA, verificando no solo que el software haga lo que debe hacer, sino asegurando que no colapse ante entradas inesperadas.

---

## 2. Reflexión Personal y Autocrítica Constructiva

Examinando mi propio desempeño a lo largo del semestre, identifico aprendizajes y puntos de inflexión personales muy significativos:

* **Evolución del Criterio Técnico y Autocrítica:**
  Al comienzo del proyecto, cometí el error habitual de querer apresurar la construcción visual antes de consolidar el diseño de la base de datos y la arquitectura del servidor. Esta aproximación inicial me generó desajustes menores al momento de enlazar las vistas con las consultas SQL. Como autocrítica constructiva, reconocí que subestimar el tiempo de modelamiento genera fricción en las etapas posteriores. Al recibir el feedback formativo del docente, modifiqué mi enfoque: detuve el avance superficial y dediqué el tiempo necesario a robustecer los controladores y la lógica de validación en el backend.

* **Gestión de la Frustración y Resolución Metódica de Problemas:**
  Uno de los desafíos más complejos ocurrió durante la integración del servicio web externo, donde las respuestas asíncronas causaban retrasos en la carga de las vistas si la conexión fluctuaba. En lugar de aplicar soluciones parche en el cliente, apliqué las directrices de calidad de software (ISO 9001:2015 e ISTQB): analicé la causa raíz, aislé el consumo en un endpoint propio (`/api/exchange-rate`) y parametricé el manejo de errores. Esta experiencia forjó en mí una mayor serenidad profesional, enseñándome a descomponer problemas complejos en componentes analizables y testeables.

* **Autonomía, Responsabilidad y Compromiso:**
  Asumir simultáneamente las responsabilidades de planificación en Trello, arquitectura, desarrollo full-stack, testing y documentación me exigió una alta disciplina de gestión del tiempo. Aprendí a utilizar el **Project Burndown Chart** no como una mera exigencia académica, sino como un instrumento real de monitoreo y toma de decisiones para evitar desviaciones en el alcance y garantizar una entrega final impecable y a tiempo.

---

## 3. Relación con la Carrera de Analista Programador Computacional y Proyección Profesional

La formación como **Analista Programador Computacional** en Duoc UC tiene como propósito fundamental formar profesionales capacitados para analizar, diseñar, desarrollar, probar e implementar soluciones tecnológicas que resuelvan necesidades empresariales con altos estándares de calidad, seguridad y eficiencia.

La asignatura de Ingeniería de Software ha sido el puente definitivo entre las asignaturas técnicas de programación y las exigencias reales de la industria del software:

1. **Impacto en el Perfil de Egreso:**
   Esta experiencia consolida directamente las competencias de mi perfil de egreso: capacidad de levantar requerimientos formales, diseñar arquitecturas sostenibles en el tiempo, trabajar bajo marcos ágiles (Scrum/Kanban), asegurar la calidad del código mediante pruebas funcionales y versionar proyectos de manera profesional mediante Git y plataformas colaborativas. Hoy me siento plenamente capacitado para incorporarme a una célula de desarrollo ágil y aportar valor desde el primer día.

2. **Aplicabilidad en el Mercado Laboral Tecnológico:**
   En el ecosistema tecnológico actual —tanto en empresas nacionales en Chile como en compañías internacionales—, las organizaciones no buscan programadores que solo sigan instrucciones a ciegas; buscan profesionales con **pensamiento crítico de ingeniería**. Entender cómo estructurar una ERS bajo IEEE 830, cómo documentar la Definition of Done, cómo gestionar No Conformidades según ISO/ISTQB y cómo comunicar el estado de un proyecto a directivos y clientes mediante métricas claras (Burndown, Velocity) constituye una ventaja competitiva decisiva que me diferenciará favorablemente en procesos de selección laboral.

3. **Consecución de Metas Profesionales a Mediano y Largo Plazo:**
   Mi meta profesional a corto plazo es desempeñarme exitosamente como Desarrollador Full-Stack o Ingeniero de Software Junior, especializándome en el diseño de microservicios y aplicaciones web escalables. A mediano y largo plazo, aspiro a evolucionar hacia los roles de **Líder Técnico (Tech Lead)** o **Arquitecto de Software**, guiando equipos multidisciplinarios. Las lecciones aprendidas en esta asignatura —especialmente la visión holística de que la calidad no se añade al final mediante pruebas, sino que se construye desde la primera definición de requerimientos— constituirán el fundamento ético y técnico sobre el cual cimentaré mi trayectoria profesional.
