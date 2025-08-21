Libreta de Contactos - Sistema de Gestión

Sistema completo para gestionar una libreta de contactos con funcionalidades CRUD, desarrollado con Django REST Framework, Angular 18 y Docker.
Características
Backend (Django REST Framework)

-API RESTful completa
-Autenticación JWT
-Base de datos PostgreSQL
-Modelos de datos para contactos
-Validaciones y serializers
-CORS configurado

Frontend (Angular 18)

-Interfaz moderna con Bootstrap
-Formularios reactivos
-Gestión de estado de autenticación
-Interceptores HTTP
-Guards de rutas

DevOps

-Docker y Docker Compose
-Configuración para desarrollo
-Base de datos en contenedor

Tecnologías Utilizadas

-Backend: Django 4.2, Django REST Framework, PostgreSQL, JWT
-Frontend: Angular 18, Bootstrap 5, Bootstrap Icons
-Base de datos: PostgreSQL
-Contenedores: Docker, Docker Compose
-Autenticación: JWT (JSON Web Tokens)

Prerrequisitos

-Docker y Docker Compose instalados
-Git

Despliegue Local con Docker
1. Clonar el proyecto

- git clone https://github.com/JorgeEGZ/contatc-book
- cd contact-book

2. Verificar la estructura de archivos

Asegúrate de tener esta estructura:

contact-book/
├── .env
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── ...
└── frontend/
    ├── Dockerfile
    ├── package.json
    └── ...

3. Ejecutar con Docker Compose

Construir y ejecutar todos los servicios
- docker-compose up --build

Para ejecutar en segundo plano:
- docker-compose up --build -d

4. Inicializar la base de datos

En una NUEVA terminal, ejecutar:

Aplicar migraciones de Django

-docker-compose exec backend python manage.py migrate

Crear superusuario (opcional)

-docker-compose exec backend python manage.py createsuperuser
-Seguir las instrucciones para crear usuario admin

5. Acceder a la aplicación

    Frontend (Angular): http://localhost:4200

    Backend (Django API): http://localhost:8000

    Admin Django: http://localhost:8000/admin

    Base de datos: PostgreSQL en localhost:5432

URLs de la aplicación

-Aplicación principal: http://localhost:4200
-API REST: http://localhost:8000/api/
-Admin Django: http://localhost:8000/admin

Endpoints de autenticación:

-POST /api/auth/register/ - Registrar usuario
-POST /api/auth/login/ - Iniciar sesión
-POST /api/auth/logout/ - Cerrar sesión
