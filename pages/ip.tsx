import axios from 'axios';
import { useEffect, useState } from 'react';

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

export default function IpPage() {
  const [ipData, setIpData] = useState<IpApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIpData = async () => {
      try {
        const data = await getIpInfo();
        setIpData(data);
      } catch (err) {
        setError('Failed to fetch IP information');
      }
    };
    fetchIpData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ipData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>IP Information</h1>
      <p><strong>IP:</strong> {ipData.ip}</p>
      <p><strong>City:</strong> {ipData.city}</p>
      <p><strong>Region:</strong> {ipData.region}</p>
      <p><strong>Country:</strong> {ipData.country_name}</p>
      <p><strong>Timezone:</strong> {ipData.timezone}</p>
      <p><strong>Currency:</strong> {ipData.currency_name}</p>
    </div>
  );
}
