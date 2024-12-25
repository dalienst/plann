import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../useAxiosAuth";
import useUserId from "../useUserId";
import { getUser } from "@/services/accounts";

export function useFetchProfile() {
  const axios = useAxiosAuth();
  const userId = useUserId();

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUser(userId, axios),
    enabled: !!userId,
  });
}
