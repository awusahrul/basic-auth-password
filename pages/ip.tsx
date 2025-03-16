import axios from 'axios';

// Interface untuk menentukan tipe data response dari API
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

// Fungsi untuk mengambil data IP
export const getIpInfo = async (): Promise<IpApiResponse> => {
  try {
    const response = await axios.get<IpApiResponse>('https://ipapi.co/json');
    return response.data;
  } catch (error) {
    console.error('Error fetching IP data:', error);
    throw new Error('Failed to fetch IP information');
  }
};

// Contoh penggunaan (opsional)
export const printIpInfo = async () => {
  try {
    const ipData = await getIpInfo();
    console.log('IP Information:', JSON.stringify(ipData, null, 2));
    return ipData;
  } catch (error) {
    console.error('Error in printIpInfo:', error);
    throw error;
  }
};
