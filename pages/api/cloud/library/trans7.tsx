import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      "https://video.detik.com/trans7/smil:trans7.smil/index.m3u8",
      {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
        },
        responseType: "text", // Pastikan respons dikembalikan dalam bentuk teks
      }
    );

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send("Gagal mengambil data dari Trans7");
  }
}
