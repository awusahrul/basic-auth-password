import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface IpApiResponse {
  ip: string;
  network?: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3?: string;
  country_capital?: string;
  country_tld?: string;
  continent_code: string;
  in_eu: boolean;
  postal: string | null;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area?: number;
  country_population?: number;
  asn: string;
  org: string;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IpApiResponse>) {
  try {
    // Ambil IP dari header x-forwarded-for
    const forwarded = req.headers['x-forwarded-for'] as string | string[] | undefined;
    // Ambil IP dari header cf-connecting-ip (khusus Cloudflare)
    const cfIp = req.headers['cf-connecting-ip'] as string | undefined;

    let userIp: string | null = null;

    // Prioritaskan cf-connecting-ip jika tersedia (khusus Cloudflare)
    if (cfIp) {
      userIp = cfIp;
    } else if (forwarded) {
      // Jika x-forwarded-for adalah array
      if (Array.isArray(forwarded)) {
        userIp = forwarded[0]; // Ambil IP pertama (IP asli pengguna)
      } else {
        // Pisahkan IP jika ada beberapa (misalnya, IP proxy dan IP pengguna)
        const ipList = forwarded.split(',').map(ip => ip.trim());
        userIp = ipList[0]; // Ambil IP pertama
      }
    }

    // Jika tidak ada IP yang valid, kembalikan error
    if (!userIp) {
      throw new Error('Unable to determine user IP');
    }

    // Gunakan IP pengguna untuk mengambil data dari ipapi.co
    const response = await axios.get<IpApiResponse>(`https://ipapi.co/${userIp}/json/`);
    const ipData = response.data;

    
}
