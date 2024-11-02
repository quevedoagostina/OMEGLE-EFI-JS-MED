# Omegle Med API Rest

Omegle Med es una plataforma para la gestión de turnos médicos. Este proyecto incluye una API REST desarrollada con Node.js, Express y Sequelize, y un frontend en React para la interfaz de usuario.

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración Inicial](#configuración-inicial)
  - [Requisitos Previos](#requisitos-previos)
  - [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
  - [Variables de Entorno](#variables-de-entorno)
- [Instalación](#instalación)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)
- [Solución de Problemas](#solución-de-problemas)

---

## Descripción del Proyecto

Este proyecto permite a los usuarios (pacientes) gestionar sus citas médicas y acceder a un listado de doctores. A través de la API REST, los usuarios pueden registrarse, iniciar sesión y gestionar sus turnos. Los doctores también pueden ser administrados dentro del sistema.

## Estructura del Proyecto

```plaintext
omegle-med-api-rest
├── config/
│   └── config.json         # Configuración de Sequelize
├── migrations/             # Migraciones para la base de datos
├── seeders/                # Archivos para poblar la base de datos con datos de prueba
├── src/
│   ├── routes/             # Rutas de la API (userRoutes, doctorRoutes, etc.)
│   ├── controllers/        # Controladores para manejar la lógica de negocio
│   └── models/             # Modelos de Sequelize (User, Doctor, etc.)
├── .env                    # Archivo de variables de entorno
├── server.js               # Configuración principal del servidor
└── README.md               # Documentación del proyecto
```

## Configuración Inicial

### Requisitos Previos

1. **Node.js** (versión 14 o superior)
2. **MySQL** (versión 8 o superior)
3. **NPM** o **Yarn** (para la gestión de paquetes)

### Configuración de la Base de Datos

1. Inicia sesión en MySQL (en Linux, podrías necesitar `sudo`):

    ```bash
    sudo mysql -u root
    ```

2. Cambia el método de autenticación para el usuario `root` si es necesario:

    ```sql
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tu_contraseña';
    FLUSH PRIVILEGES;
    ```

3. Crea la base de datos:

    ```sql
    CREATE DATABASE omegle;
    ```

4. Asegúrate de que el archivo `config/config.json` esté configurado correctamente:

    ```json
    {
      "development": {
        "username": "root",
        "password": "tu_contraseña",
        "database": "omegle",
        "host": "127.0.0.1",
        "port": 3306,
        "dialect": "mysql"
      }
    }
    ```

5. Si todo está listo, ejecuta las migraciones para crear las tablas necesarias:

    ```bash
    npx sequelize-cli db:migrate
    ```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (modifica los valores según tus configuraciones):

```plaintext
DB_USERNAME=root
DB_PASSWORD=tu_contraseña
DB_DATABASE=omegle
DB_HOST=127.0.0.1
PORT=4000
JWT_SECRET=messi
REACT_APP_API_URL=http://localhost:3000
```

- **DB_USERNAME**: Usuario de MySQL (usualmente `root`).
- **DB_PASSWORD**: Contraseña de MySQL para el usuario especificado.
- **DB_DATABASE**: Nombre de la base de datos (en este caso `omegle`).
- **DB_HOST**: Host de la base de datos (usualmente `127.0.0.1`).
- **PORT**: Puerto en el que correrá la API (por defecto `4000`).
- **JWT_SECRET**: Clave secreta para la autenticación JWT.
- **REACT_APP_API_URL**: URL base del frontend (usualmente `http://localhost:3000`).

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del backend (API REST):

    ```bash
    cd omegle-med-api-rest
    npm install
    ```

3. Configura la base de datos y ejecuta las migraciones como se describe en la sección de configuración de la base de datos.

## Ejecución del Proyecto

1. **Ejecuta el backend**:

    ```bash
    npm start
    ```

2. **Ejecuta el frontend** (requiere configuración separada en otro proyecto):

    ```bash
    cd omegle-med-app-web
    npm install
    npm run dev
    ```

3. Accede a:
   - **Backend**: `http://localhost:4000`
   - **Frontend**: `http://localhost:3000`

## Endpoints de la API

| Método | Endpoint           | Descripción                        |
|--------|---------------------|------------------------------------|
| POST   | `/users/register`   | Registra un nuevo usuario         |
| POST   | `/users/login`      | Inicia sesión de usuario          |
| GET    | `/doctors`          | Lista todos los doctores          |
| GET    | `/appointments`     | Lista todas las citas             |
| POST   | `/appointments`     | Crea una nueva cita               |

### Ejemplo de Solicitud para Crear un Turno

```bash
curl -X POST http://localhost:4000/appointments \
     -H "Authorization: Bearer <token>" \
     -d '{ "doctorId": 1, "date": "2023-11-15", "time": "10:00" }'
```

## Solución de Problemas

- **Error `Access denied for user 'root'@'localhost'`**: Si tienes problemas para acceder con el usuario `root`, asegúrate de que tu usuario `root` tenga el método de autenticación `mysql_native_password`. Revisa la sección de configuración de la base de datos en este documento.

- **Error `ECONNREFUSED` al ejecutar migraciones**: Verifica que tu base de datos MySQL esté en ejecución y que el puerto sea correcto (generalmente `3306`).

- **Migraciones no aplicadas**: Si tienes problemas al ejecutar las migraciones, asegúrate de que tu archivo de configuración `config/config.json` y tu `.env` coincidan.
