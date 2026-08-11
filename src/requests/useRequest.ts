import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IRequests } from "./IRequests";
import { requestsAPI } from "./RequestsAPI";


export function useRequest(id: number | undefined) {
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<IRequests | undefined>(undefined);

  const loadRequest = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      setRequest(await requestsAPI.find(id));
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
   
    void (async () => {
      setLoading(true);
      try {
        setRequest(await requestsAPI.find(id));
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { request, loading, reload: loadRequest };
}
