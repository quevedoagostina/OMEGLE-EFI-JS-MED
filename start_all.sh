#!/bin/bash

# Ruta al backend y al frontend
BACKEND_DIR="./omegle-med-api-rest"
FRONTEND_DIR="./omegle-med-app-web"

# Verificar si "concurrently" está instalado; si no, instalarlo
if ! command -v concurrently &> /dev/null
then
    echo "Instalando concurrently..."
    npm install -g concurrently
fi

# Levantar backend y frontend al mismo tiempo
echo "Iniciando el backend y el frontend..."

concurrently --kill-others-on-fail \
    "cd $BACKEND_DIR && npm install && npm start" \
    "cd $FRONTEND_DIR && npm install && npm run dev"

# Mensajes para acceder a las aplicaciones
echo "============================================="
echo "Backend en ejecución en: http://localhost:4000"
echo "Frontend en ejecución en: http://localhost:5173"
echo "============================================="
