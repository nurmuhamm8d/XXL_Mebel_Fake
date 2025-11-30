"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import Header from "./_header";

type AuthGateProps = {
  children: React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [hydrated, setHydrated] = useState(
    () => typeof window !== "undefined"
  );

  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedToken = localStorage.getItem("auth_token");
    const storedUsername = localStorage.getItem("auth_username");
    const storedUserId = localStorage.getItem("auth_userId");

    if (storedToken && storedUsername && !auth.token) {
      dispatch(
        setCredentials({
          token: storedToken,
          username: storedUsername,
          userId: storedUserId ? Number(storedUserId) : null,
        })
      );
    }

    setTimeout(() => setHydrated(true), 0);
  }, [auth.token, dispatch]);

  useEffect(() => {
    if (!hydrated) return;
    if (!auth.token && !isAuthPage) {
      router.replace("/login");
    }
  }, [auth.token, hydrated, isAuthPage, router]);

  if (!hydrated) return null;

  if (!auth.token && !isAuthPage) {
    return (
      <Box p={8} textAlign="center">
        <Text>Требуется авторизация...</Text>
      </Box>
    );
  }

  return isAuthPage ? (
    <>{children}</>
  ) : (
    <>
      <Header />
      {children}
    </>
  );
}
