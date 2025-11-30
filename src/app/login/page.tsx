"use client";

import { useState, FormEvent } from "react";
import { Box, Button, Heading, Input, Text, Field } from "@chakra-ui/react";
import { useLoginMutation, useLazyGetUsersQuery } from "@/services/fakestoreApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("johnd");
  const [password, setPassword] = useState("m38rmF$");
  const [login, { isLoading }] = useLoginMutation();
  const [fetchUsers] = useLazyGetUsersQuery();
  const [errorText, setErrorText] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorText(null);

    try {
      const result = await login({ username, password }).unwrap();

      let userId: number | null = null;
      try {
        const users = await fetchUsers().unwrap();
        const currentUser = users.find((u) => u.username === username);
        userId = currentUser?.id ?? null;
      } catch {
        userId = null;
      }

      dispatch(setCredentials({ token: result.token, username, userId }));
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", result.token);
        localStorage.setItem("auth_username", username);
        if (userId !== null) {
          localStorage.setItem("auth_userId", String(userId));
        }
      }
      router.push("/");
    } catch {
      setErrorText("Ошибка авторизации");
    }
  };

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Heading size="md" mb={6}>
        Вход
      </Heading>

      <form onSubmit={handleSubmit}>
        <Box mb={4}>
          <Field.Root>
            <Field.Label>Логин</Field.Label>
            <Input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Field.Root>
        </Box>

        <Box mb={4}>
          <Field.Root>
            <Field.Label>Пароль</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Field.Root>
        </Box>

        {errorText && (
          <Text color="red.500" mb={3}>
            {errorText}
          </Text>
        )}

        <Button type="submit" colorScheme="teal" loading={isLoading}>
          Войти
        </Button>
      </form>
    </Box>
  );
}
