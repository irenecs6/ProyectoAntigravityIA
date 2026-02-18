# Idea del Proyecto: Jugan2
Una aplicación web interactiva que permite a los usuarios explorar un catálogo de videojuegos utilizando la API de RAWG. Los usuarios pueden ver una lista de títulos y acceder a una vista de detalle con información especifica y plataformas disponibles.

## --- HISTORIAL DE PROMPTS Y DEBUGGING ---
### Prompt:
    Inicia la creación del proyecto 'Jugan2'. Tu única tarea ahora mismo es inicializar un proyecto básico de React 
    usando Vite. Ejecuta el comando de terminal necesario de forma directa y sin que requiera interacción manual 
    (usa el comando: npm create vite@latest . -- --template react).El proyecto tratará sobre juegos usando la API de RAWG

### 🗒️Nota: 
    Durante la inicialización de Vite, el directorio no estaba vacío por el documento Walkthrough. 
    El agente de Antigravity detectó el conflicto y lo resolvió moviendo el archivo de forma temporal 
    para permitir la instalación no interactiva de React, restaurándolo después con éxito.

### Prompt:
    Vale, te mando mi API Key de RAWG es: https://api.rawg.io/api/games?key=7b4b839fa3e649318ce487ebf7a69ee6
    Crea un inicio simple sin estilos, donde tenga los nombres de los juegos de la api

### Prompt:
    Ejecuta el plan y dime cómo levantar el servidor local para verlo

### Prompt:
    Ahora quiero que al pulsar en el nombre de un juego, me lleve a una página de detalle sobre ese mismo juego. Para ello instala la librería react-router-dom para gestionar la navegación.
    Configura las rutas una para el inicio y otra para el detalle

### Prompt:
    Esta bien pero te falta añadir en los detalles las plataformas en las que se puede jugar cada juego

### Prompt:
    El proyecto sera subido a github, por motivos de seguridad no quiero que la API Key esté visible en el código., por lo tanto guarda la clave api en un archivo oculto para poder subirlo

### ✅Respuesta:
    ¡Hecho! He tomado las siguientes medidas para asegurar tu API Key antes de que subas el proyecto a GitHub:
    
    Archivo .env oculto: Tu clave ya estaba en el archivo .env, que es el estándar para datos sensibles.
    Actualización de .gitignore: He configurado explícitamente el archivo .gitignore para que ignore cualquier archivo .env. Así, Git nunca lo rastreará ni lo subirá al repositorio público.
    Creado .env.example: He añadido un archivo de ejemplo sin tu clave real. Esto permite que otros (o tú en otro equipo) sepan qué variables configurar sin exponer la original.

### Prompt:
    Quiero que agreges un navegador y un footer. Añade tambien una pagina de contacto donde tenga un formulario con botones y algun evento

### Prompt:
    en el inicio estan todos los juegos quiero que me lo pongas en una pagina de juegos, donde aparezca  con su imagen y en inicio me dejas el titulo de la pagina nada mas, mas adelange le daremos los estilos.

### Prompt:
    De la pagina de juegos quiero que tenga una opcion para seleccionar el juego como favorito o quitarlo de favorito. El juego que este seleccionado como favorito debe aparecer en una pagina llamada favorito, en esta pagina tambien tendra la opcion de quitar el juego de favorito.
    Quiero que uses localstorage.

### Prompt:
    En la pagina de juegos no aparecen las plataformas de cada juego(Pc, Xbox, PlayStation...)

### Prompt:
    Vale, ahora quiero que me añadas un buscador en el nav.

### Prompt:
    al usar el buscador en el Nav, me aparecen juegos que no están en la lista inicial de la página de Juegos ¿eso porque es? ¿estas usando la api que te dado?