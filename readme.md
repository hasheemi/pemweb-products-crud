# Week 9 - Simple Product API

REST API sederhana yang dibangun menggunakan Node.js dan Express.js dengan menerapkan arsitektur MVC
(Model-View-Controller) agar struktur kode lebih terorganisir dan mudah dikelola.

## Cara Menjalankan

1. Instal seluruh dependensi yang dibutuhkan:

    ```bash
    npm install
    ```

2. Jalankan server menggunakan nodemon untuk keperluan pengembangan:
    ```bash
    nodemon app.js
    ```

Server akan berjalan pada alamat `http://localhost:3009`.

## Struktur Proyek

- **`models/`** - Berisi struktur data (saat ini menggunakan array sederhana yang disimpan di dalam
  memori).
- **`controllers/`** - Berisi logika utama aplikasi (business logic) serta pengelolaan respons API.
- **`routes/`** - Mengatur endpoint HTTP dan menghubungkannya dengan fungsi yang terdapat pada
  controller.
- **`app.js`** - File utama aplikasi yang berfungsi untuk menginisialisasi Express, mengatur
  middleware, dan menghubungkan seluruh route.

## Daftar Endpoint API dan Dokumentasi

| Metode | Endpoint        | Fungsi Controller | Deskripsi                                                                           |
| :----- | :-------------- | :---------------- | :---------------------------------------------------------------------------------- |
| `GET`  | `/`             | inline            | Endpoint untuk memeriksa status server. Mengembalikan respons `{ hello: 'world' }`. |
| `GET`  | `/products`     | `getAllProducts`  | Mengembalikan seluruh data produk dalam bentuk array.                               |
| `GET`  | `/products/:id` | `getProductById`  | Mengembalikan satu data produk berdasarkan ID.                                      |
| `POST` | `/products`     | `createProduct`   | Menambahkan produk baru ke dalam daftar produk.                                     |

### Contoh Penggunaan: POST `/products`

**Content-Type:** `application/json`

**Body Request:**

```json
{
    "id": 3,
    "name": "Penghapus",
    "price": 3000
}
```

Endpoint tersebut digunakan untuk menambahkan produk baru dengan mengirimkan data berupa ID, nama
produk, dan harga dalam format JSON.
