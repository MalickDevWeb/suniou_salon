import { useEffect } from "react";

import { getCurrentUser } from "../services/api/auth";
import { useAuthStore } from "../store/authStore";

export const useSessionBootstrap = () => {
  const hydrated = useAuthStore((state) => state.hydrated);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    if (!hydrated || !token || user) return;
    getCurrentUser().then(setUser).catch(clearSession);
  }, [hydrated, token, user, setUser, clearSession]);

  return hydrated;
};
