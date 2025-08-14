To-Do List App

## Descripción del Proyecto
Este proyecto es una aplicación de lista de tareas (To-Do List) desarrollada con **Ionic** y **Angular**. 
La aplicación permite a los usuarios agregar, marcar como completadas, eliminar y categorizar tareas. Los datos se almacenan de forma local utilizando **Ionic Storage**, esto debido a que 
es la opción recomendada para aplicación de Ionic en producción por su mejor rendimiento, mayor capacidad y confiabilidad entre plataformas.

Se han implementado las siguientes funcionalidades adicionales:
* **Gestión de Tareas**: Permite crear, editar, eliminar tareas y clasificar por tipo de categoria.
  Adicionalmente se cuenta con una funcionalidad que permite eliminar todos las tareas al mismo tiempo.
* **Gestión de Categorías**: Permite crear, editar y eliminar categorías.
* **Filtrado de Tareas**: Las tareas pueden ser filtradas por categoría.
* **Feature Flag (Firebase Remote Config)**: La funcionalidad de categorías se puede activar o desactivar de forma remota a través de Firebase,
  se configura la visibilidad del filtro de tareas y el color que esta presente en los tareas enlistadas
* **Optimización**: Se ha optimizado el rendimiento y la persistencia de datos con **Ionic Storage** para el manejo de grandes volúmenes de tareas.

## Diseño y Arquitectura

* **Separación de Responsabilidades**:Se implementó una arquitectura de servicios para separar la lógica de negocio (como la gestión de tareas y categorías) de los componentes de la interfaz de usuario.
    Esto hace que el código sea más modular y fácil de mantener.
 **Gestión del Estado**:El estado de la aplicación se gestiona de forma centralizada en los servicios de TaskService y CategoryService, que a su vez interactúan con StorageService para persistir los datos.
 **Manejo de la Asincronía**: Se hizo un uso extensivo de async/await para gestionar las operaciones asíncronas de Ionic Storage, garantizando que los datos se lean y se escriban de forma correcta y sin bloquear la interfaz de usuario.
    
## Requerimientos
Asegúrate de tener instalado lo siguiente:
* [Node.js](https://nodejs.org/) (versión 16.x o superior)
* [Ionic CLI](https://ionicframework.com/docs/cli) (versión 7.x o superior)
* [Cordova](https://cordova.apache.org/) (si planeas compilar para dispositivos)
* [Android Studio](https://developer.android.com/studio) (para Android)
* [Java] (https://www.oracle.com/java/technologies/downloads/#java17-windows) (Version 17 por compatibilidad con Ionic y Cordova)(para ejecutar build en Android)
* [Gradle] (https://gradle.org/releases/#7.8.1)(Version por compatibilidad con Ionic y Cordova) (para ejecutar build en Android)

  ## Configuración y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone (https://github.com/Ana1406/to-do-list.git)
    cd to-do-list
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Firebase:**
    * Crea un proyecto en la [Consola de Firebase](https://console.firebase.google.com/).
    * Añade una aplicación web y copia tu objeto `firebaseConfig`.
    * Crea el archivo `src/environments/environment.prod.ts` (si no existe) y agrega la configuración de Firebase:
        ```typescript
        export const environment = {
          production: true,
          firebaseConfig: {
            apiKey: "...",
            authDomain: "...",
            projectId: "...",
            storageBucket: "...",
            messagingSenderId: "...",
            appId: "..."
          }
        };
        ```
    * En Firebase Remote Config, crea una clave llamada `showCategories` con un valor booleano (`true` o `false`), tambien la item_background_color con un valor string ('#B7D2E8')
    * Adicionalmente en el repositorio se realizo la configuracion para el manejo de secretos con  lo datos sensibles como lo es 	Google API Key

4.  **Ejecutar la aplicación en el navegador:**
    ```bash
    ionic serve
    ```

5.  **Compilar para Android e iOS:**
    * Añadir las plataformas (si es necesario):
        ```bash
        ionic cordova platform add android
        ionic cordova platform add ios
        ```
    * Verificar requirimientos de cordova
      ```bash
      cordova requirements
      ```
    * Compilar el proyecto:
        ```bash
        ionic build --prod
        ```
    * LLamado a Cordova (Esto se realizo por fallo en compatibilidad entre ionic-angular y cordova)
      ```bash
        cordova build android      
        ```
