import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

export type UseSessionOptions<T> = {
  defaultValue: T;
  jsonSerialize?: boolean;
};

export function useSession<T = any>(
  key: string,
  { defaultValue, jsonSerialize = false }: UseSessionOptions<T>
) {
  const { getItem, setItem, removeItem } = useAsyncStorage(key);

  const { refetch, data, ...props } = useQuery({
    queryKey: ["session", key],
    queryFn: async () => {
      const data = await getItem();
      if (data) {
        return (jsonSerialize ? JSON.parse(data) : data) as T;
      }
      return defaultValue as T;
    },
  });

  async function setData(newData: T | ((old: T) => T)) {
    let _newData: T;

    if (typeof newData === "function") {
      _newData = (newData as (old: T) => T)(data as T);
    } else {
      _newData = newData;
    }

    await setItem(jsonSerialize ? JSON.stringify(_newData) : (_newData as any));
    await refetch();
  }

  async function deleteData() {
    await removeItem();
    await refetch();
  }

  return { ...props, reloadData: refetch, data, setData, deleteData };
}
