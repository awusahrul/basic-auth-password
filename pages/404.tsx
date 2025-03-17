import { NextPageContext } from 'next';
import { NextResponse } from 'next/server';

export default function Custom404() {
  // Halaman ini tidak akan menampilkan HTML, tetapi kita tetap harus mendefinisikan komponen
  return null;
}

// Menggunakan getServerSideProps untuk mengatur respons JSON
export async function getServerSideProps(context: NextPageContext) {
  const { res } = context;

  // Pastikan kita berada di sisi server
  if (res) {
    // Set header untuk JSON
    res.setHeader('Content-Type', 'application/json');
    // Set status kode 404
    res.statusCode = 404;
    // Tulis respons JSON
    res.write(
      JSON.stringify({
        status: 'error',
        code: 404,
        message: 'Halaman tidak ditemukan',
      })
    );
    // Akhiri respons
    res.end();
  }

  // Kembalikan props kosong karena kita tidak merender halaman
  return {
    props: {},
  };
}
