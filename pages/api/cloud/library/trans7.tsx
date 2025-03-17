import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Ambil file .m3u8 dari sumber asli
    const response = await axios.get(
      "https://video.detik.com/trans7/smil:trans7.smil/index.m3u8",
      { responseType: "text" }
    );

    let playlist = response.data;

    // Ganti semua path relatif dengan path absolut
    playlist = playlist.replace(
      /^(?!https?:\/\/)(.*\.m3u8)$/gm, // Cari path relatif (file .ts)
      "https://video.detik.com/trans7/smil:trans7.smil/$1" // Tambahkan host utama
    );

    // Set header agar tetap dalam format .m3u8
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.status(200).send(playlist);
  } catch (error) {
    console.error("Error fetching Trans7 stream:", error);
    res.status(500).send("Gagal mengambil data dari Trans7");
  }
}
