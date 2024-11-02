# Node.js + Sequelize - API-REST-EFI

Este proyecto es una API construida con Node.js, Express, Sequelize y MySQL.

## Requisitos previos

- Node.js instalado
- MySQL en ejecución
- Clonar este repositorio

## Instalación

1. Clona este repositorio y navega a la carpeta del proyecto:

```bash
git clone <URL-del-repositorio>
cd API-REST-EFI
```

### 2. Instala las dependencias
npm install

### 3. Crea un archivo .env en la raíz del proyecto con la configuración de la base de datos:
```bash
DB_USERNAME = root - usuario de mysql personal  
DB_PASSWORD = root1234 - contraseña de mysql personal  
DB_DATABASE = nombre_de_tu_db - nombre de base de datos de mysql personal   
DB_HOST = 127.0.0.1    
PORT = 4000   
```

### 4. Crea la base de datos en MySQL:
Ubicados dentro de la carpeta del proyecto ejecutamos node createDatabase.js

// Conexión sin especificar una base de datos concreta
const sequelize = new Sequelize('', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql',
});

En este fragmento de código debemos respetar nuestro usuario y contraseña de MySql

### 5. Ejecutar Migraciones  
Ejecuta las migraciones para crear las tablas en la base de datos:  
npx sequelize-cli db:migrate  

### 6. Ejecutar seeders
npx sequelize-cli db:seed:all

### 7. Ejecutar el Servidor  
Inicia el servidor con el siguiente comando:  
npm start o npm run dev  



## Comandos de Sequelize
#### 1. Crear un nuevo modelo  
Para crear un modelo y su migración correspondiente:  
npx sequelize-cli model:generate --name <ModelName> --attributes field1:type,field2:type  

##### Ejemplo:   
npx sequelize-cli model:generate --name Product --attributes name:string,price:float

#### 2. Ejecutar migraciones  
npx sequelize-cli db:migrate

### 3. Deshacer la última migración  
npx sequelize-cli db:migrate:undo

### 4. Crear un nuevo seeders
npx sequelize-cli seed:generate --name create-user

### 5. Thunderclient
thunder collection avaible to test all endpoints

## Estructura del Proyecto
├── src  
│   ├── config  
│   │   └── config.json            # Configuración de la base de datos para Sequelize  
│   ├── controllers  
│   │   └── userController.js      # Controlador para manejar los usuarios  
│   ├── migrations  
│   │   └── [timestamp]-create-user.js  # Migración para crear la tabla de usuarios  
│   ├── models  
│   │   ├── index.js               # Configuración de la conexión de Sequelize  
│   │   └── user.js                # Definición del modelo User  
│   ├── routes  
│   │   └── userRoutes.js          # Rutas para la API de usuarios  
├── .env                           # Variables de entorno (DB credentials, etc.)  
├── createDatabase.js              # Crear database a traves de un archivo.js  
├── package.json                   # Dependencias del proyecto y scripts  
└── server.js                      # Configuración del servidor Express  



