Proyek ini adalah aplikasi web yang dibangun menggunakan Express.js dan Sequelize sebagai ORM untuk berinteraksi dengan database.

## Persyaratan

Sebelum memulai, pastikan Anda telah menginstal perangkat-perangkat berikut:

- [Node.js](https://nodejs.org/) (versi terbaru)
- [npm](https://www.npmjs.com/)

## Instalasi

1. **Clone repositori ini:**

    ```bash
    git clone https://github.com/username/repo-name.git
    cd repo-name
    ```

2. **Instal dependensi:**

    ```bash
    npm install
    ```

3. **Jalankan migrasi database:**

    ```bash
    npm run sequelize:migrate-up-all
    ```

4. **Jalankan seed data:**

    ```bash
    npm run sequelize:seed-up-all
    ```

5. **Jalankan aplikasi:**

    ```bash
    npm start
    ```

## Skrip npm

- `npm install` - Menginstal semua dependensi yang dibutuhkan.
- `npm run sequelize:migrate-up-all` - Menjalankan semua migrasi Sequelize.
- `npm run sequelize:seed-up-all` - Menjalankan semua seed Sequelize.
- `npm start` - Menjalankan aplikasi Express.js.

## Struktur Proyek

Berikut adalah struktur dasar dari proyek ini:
├── config
│ └── config.json # Konfigurasi database
├── controllers # Kontroler untuk route
├── migrations # File migrasi Sequelize
├── models # Definisi model Sequelize
├── seeders # File seed Sequelize
├── routes # Definisi route aplikasi
├── public # File statis (HTML, CSS, JS)
├── views # Template view (jika menggunakan template engine)
├── app.js # Inisialisasi aplikasi Express.js
└── package.json # File konfigurasi npm


## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini dan ajukan pull request dengan perubahan Anda.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

