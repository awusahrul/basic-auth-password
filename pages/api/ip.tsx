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

    // Jika ipapi.co mengembalikan error atau organisasi masih CLOUDFLARENET
    if (ipData.error || ipData.org === 'awucloud') {
      throw new Error('Detected Cloudflare IP instead of user IP');
    }

    res.status(200).json(ipData);
  } catch (error) {
    res.status(500).json({
      ip: null,
      version: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      region_code: 'Unknown',
      country: 'Unknown',
      country_name: 'Unknown',
      country_code: 'Unknown',
      continent_code: 'Unknown',
      in_eu: false,
      postal: null,
      latitude: 0,
      longitude: 0,
      timezone: 'Unknown',
      utc_offset: 'Unknown',
      country_calling_code: 'Unknown',
      currency: 'Unknown',
      currency_name: 'Unknown',
      languages: 'Unknown',
      asn: 'Unknown',
      org: 'Unknown',
      error: error.message || 'Failed to fetch IP information'
    });
  }
}
