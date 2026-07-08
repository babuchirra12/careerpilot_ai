"use client";

import { useEffect, useState } from "react";
import { isAuthenticated, removeToken } from "../lib/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  function logout() {
    removeToken();
    setAuthenticated(false);
    router.push("/login");
  }

  return { isAuthenticated: authenticated, logout };
}
