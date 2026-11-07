# Biblioteca — API Routes con Next.js

API de práctica para administrar autores y libros con Next.js, Prisma y PostgreSQL en Supabase. Implementa el procedimiento del laboratorio 12 de DAWA.

## Tecnologías

- Next.js con App Router y TypeScript
- Prisma ORM y adaptador PostgreSQL
- PostgreSQL en Supabase

## Requisitos

Node.js 22.12 o superior y una base PostgreSQL accesible.

## Instalación

Desde esta carpeta, instala las dependencias con `npm install`. La instalación genera el cliente de Prisma.

Crea un archivo `.env` en esta carpeta con la siguiente variable, usando una conexión propia de PostgreSQL:

```env
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/postgres"
```

No compartas este archivo. Codifica los caracteres especiales de la contraseña cuando formen parte de una URL. Para una red IPv4, Supabase ofrece Session pooler como alternativa a la conexión directa.

Para sincronizar el esquema de esta práctica con la base configurada, ejecuta `npx prisma db push`; revisa cualquier advertencia de pérdida de datos antes de continuar. Después, ejecuta `npx prisma generate` si cambias el esquema.

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`. Las comprobaciones de código y compilación son `npm run lint` y `npm run build`.

## Endpoints

| Ruta | Métodos | Uso |
| --- | --- | --- |
| `/api/authors` | GET, POST | Listar o crear autores. |
| `/api/authors/:id` | GET, PUT, DELETE | Consultar, modificar o eliminar un autor. |
| `/api/authors/:id/books` | GET | Listar libros de un autor. |
| `/api/books` | GET, POST | Listar o crear libros; GET admite `?genre=Novela`. |
| `/api/books/:id` | GET, PUT, DELETE | Consultar, modificar o eliminar un libro. |

Al eliminar un autor se eliminan en cascada sus libros, según el esquema de Prisma. Las solicitudes POST y PUT reciben JSON con `Content-Type: application/json`.

## Estructura

- `app/api`: rutas de la API.
- `prisma/schema.prisma`: modelos y relaciones.
- `lib/prisma.ts`: cliente de Prisma.
- `prisma7.config.ts`: configuración de Prisma CLI.

La búsqueda avanzada, las estadísticas y las páginas de gestión corresponden a la sección TAREA y están pendientes.
