import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface IpApiResponse {
  ip: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  asn: string;
  org: string;
}

const getIpInfo = async (): Promise<IpApiResponse> => {
  try {
    const response = await axios.get<IpApiResponse>('https://ipapi.co/json');
    return response.data;
  } catch (error) {
    console.error('Error fetching IP data:', error);
    throw new Error('Failed to fetch IP information');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ipData = await getIpInfo();
    res.status(200).json(ipData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch IP information' });
  }
}
