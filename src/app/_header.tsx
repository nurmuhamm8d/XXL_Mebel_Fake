"use client";

import { useEffect, useState } from "react";
import { Box, Flex, HStack, Link, Text, Button, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/authSlice";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/cart", label: "Корзина" },
  { href: "/admin", label: "Админ" },
];

function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme_mode");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme_mode", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Box
      as="header"
      w="100%"
      borderBottomWidth="1px"
      borderColor="var(--border)"
      bg="var(--surface)"
      color="var(--text-strong)"
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={4}
        py={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="xl" fontWeight="bold">
          XXL Mebel
        </Text>

        <HStack as="nav" gap={6}>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              asChild
              fontWeight={pathname === item.href ? "bold" : "normal"}
            >
              <NextLink href={item.href}>{item.label}</NextLink>
            </Link>
          ))}
        </HStack>

        <HStack gap={3}>
          {username && (
            <Text fontSize="sm" color="gray.600">
              {username}
            </Text>
          )}
          <IconButton
            aria-label="Переключить тему"
            size="sm"
            variant="outline"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </IconButton>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              dispatch(logout());
              if (typeof window !== "undefined") {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_username");
                localStorage.removeItem("auth_userId");
              }
              window.location.href = "/login";
            }}
          >
            Выйти
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Header;
