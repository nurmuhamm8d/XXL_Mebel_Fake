"use client";

import { useState, FormEvent } from "react";
import { Box, Button, Heading, Input, Text, Field } from "@chakra-ui/react";
import {
  useCreateUserMutation,
  useLoginMutation,
} from "@/services/fakestoreApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [errorText, setErrorText] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorText(null);

    if (!username || !email || !password) {
      setErrorText("Введите все поля");
      return;
    }

    try {
      const newUser = await createUser({ username, email, password }).unwrap();
      const loginResult = await login({ username, password }).unwrap();
      dispatch(
        setCredentials({
          token: loginResult.token,
          username,
          userId: newUser.id ?? null,
        })
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", loginResult.token);
        localStorage.setItem("auth_username", username);
        if (newUser.id) {
          localStorage.setItem("auth_userId", String(newUser.id));
        }
      }
      router.push("/");
    } catch {
      setErrorText("Ошибка регистрации");
    }
  };

  return (
    <Box p={8} maxW="400px" mx="auto">
      <Heading size="md" mb={6}>
        Регистрация
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
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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

        <Button
          type="submit"
          colorScheme="teal"
          loading={isCreating || isLoggingIn}
        >
          Зарегистрироваться
        </Button>
      </form>
    </Box>
  );
}
