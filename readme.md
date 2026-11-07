# Week 10 - Simple Product API (Express + Prisma + Neon PostgreSQL)

REST API sederhana yang dibangun menggunakan Node.js dan Express.js dengan arsitektur MVC
(Model-View-Controller). Penyimpanan data **tidak lagi menggunakan variabel `array` di memori**,
melainkan **PostgreSQL di Neon** yang diakses melalui **Prisma ORM**.

## Cara Menjalankan

1. Instal seluruh dependensi:

    ```bash
    npm install
    ```

2. Pastikan `DATABASE_URL` tersedia di `.env` (didapat dari Neon CLI / dashboard Neon):

    ```env
    DATABASE_URL="postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require"
    ```

3. Terapkan migration dan generate Prisma Client:

    ```bash
    npx prisma migrate deploy
    npx prisma generate
    ```

4. Isi data dummy:

    ```bash
    npm run db:seed
    ```

5. Jalankan server:

    ```bash
    npm run dev      # nodemon
    # atau
    npm start        # node app.js
    ```

Server berjalan pada `http://localhost:3009` (bisa diubah lewat env `PORT`).

## Struktur Proyek

- **`prisma/schema.prisma`** - Definisi datasource Neon PostgreSQL dan model `Product`.
- **`prisma/migrations/`** - Riwayat migration SQL (tabel `products`).
- **`prisma/seed.js`** - Seeder 5 data dummy product.
- **`models/productModel.js`** - Singleton `PrismaClient` yang dipakai bersama.
- **`controllers/`** - Business logic + validasi request + response API (async/await Prisma).
- **`routes/`** - Pemetaan endpoint HTTP ke controller.
- **`app.js`** - Inisialisasi Express, middleware, route, error handler.

## Model Prisma

```prisma
model Product {
  id    Int    @id @default(autoincrement())
  name  String
  price Int

  @@map("products")
}
```

## Daftar Endpoint API

| Metode   | Endpoint        | Fungsi Controller | Deskripsi                                         |
| :------- | :-------------- | :---------------- | :------------------------------------------------ |
| `GET`    | `/`             | inline            | Health check, mengembalikan `{ hello: 'world' }`. |
| `GET`    | `/products`     | `getAllProducts`  | Mengembalikan seluruh product (`findMany`).       |
| `GET`    | `/products/:id` | `getProductById`  | Mengembalikan satu product (`findUnique`).        |
| `POST`   | `/products`     | `createProduct`   | Menambah product baru (`create`).                 |
| `PUT`    | `/products/:id` | `updateProduct`   | Mengubah product berdasarkan id (`update`).       |
| `DELETE` | `/products/:id` | `deleteProduct`   | Menghapus product berdasarkan id (`delete`).      |

### Contoh Penggunaan

**POST `/products`** — `Content-Type: application/json`

```json
{ "name": "Penghapus", "price": 3000 }
```

Respons `201 Created`:

```json
{ "id": 6, "name": "Penghapus", "price": 3000 }
```

**PUT `/products/6`**

```json
{ "name": "Penghapus Joyko", "price": 3500 }
```

**DELETE `/products/6`** → `200 OK`

```json
{
    "code": 200,
    "message": "Product With id (6) Deleted",
    "data": { "id": 6, "name": "Penghapus Joyko", "price": 3500 }
}
```

## Pengujian

```bash
npm run build      # prisma generate
npm run db:seed    # isi 5 data dummyevidence/
```
