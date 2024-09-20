import { useCallback, useEffect, useState } from "react";

const baseUrl =
  "https://raw.githubusercontent.com/jindalujjwal0720/system-design-with-pip/main";

interface CacheData {
  type: "json" | "text";
  data: string;
  expiresAt: Date;
}

const getExpiry = () => {
  const date = new Date();
  // Cache for 1 hour
  date.setHours(date.getHours() + 1);
  return date;
};

const cacheResource = (urn: string, data: unknown, type: "json" | "text") => {
  const cacheData: CacheData = {
    type,
    data: JSON.stringify(data),
    expiresAt: getExpiry(),
  };
  localStorage.setItem(urn, JSON.stringify(cacheData));
};

const getCachedResource = (urn: string): CacheData | null => {
  const cacheData = localStorage.getItem(urn);
  if (!cacheData) return null;
  const parsedData = JSON.parse(cacheData) as CacheData;
  if (new Date(parsedData.expiresAt) < new Date()) {
    localStorage.removeItem(urn);
    return null;
  }
  return parsedData;
};

const useFetchResource = <TData,>(urn: string, type: "json" | "text") => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchResource = useCallback(async () => {
    const cachedData = getCachedResource(urn);
    if (cachedData) {
      setData(JSON.parse(cachedData.data));
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${urn}`);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response[type]();
      cacheResource(urn, data, type);
      setData(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [urn, type]);

  useEffect(() => {
    fetchResource();
  }, [fetchResource]);

  return { data, isLoading, error };
};

export default useFetchResource;
