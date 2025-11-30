"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/services/fakestoreApi";

export default function AdminPage() {
  const { data: users, isLoading, refetch } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [feedback, setFeedback] = useState<{ text: string; tone?: "success" | "warning" | "info" | "error" } | null>(null);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: selectedUser } = useGetUserQuery(selectedUserId ?? 0, {
    skip: selectedUserId === null,
  });

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const notify = (text: string, tone: "success" | "warning" | "info" | "error" = "info") => {
    setFeedback({ text, tone });
    window.setTimeout(() => setFeedback(null), 4000);
  };

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      notify("Заполните все поля", "warning");
      return;
    }

    if (selectedUserId) {
      await updateUser({ id: selectedUserId, ...form });
      notify("Пользователь обновлен", "success");
    } else {
      await createUser(form);
      notify("Пользователь создан", "success");
    }
    setForm({ username: "", email: "", password: "" });
    setSelectedUserId(null);
    refetch();
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    notify("Пользователь удален", "info");
    if (selectedUserId === id) {
      setSelectedUserId(null);
    }
    refetch();
  };

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      {feedback && (
        <Box
          mb={4}
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg={
            feedback.tone === "success"
              ? "green.50"
              : feedback.tone === "warning"
              ? "yellow.50"
              : feedback.tone === "error"
              ? "red.50"
              : "blue.50"
          }
        >
          <Text>{feedback.text}</Text>
        </Box>
      )}
      <Heading size="lg" mb={6}>
        Админ-панель пользователей
      </Heading>

      <Box borderWidth="1px" borderRadius="lg" p={4} mb={6}>
        <Text fontWeight="semibold" mb={3}>
          {selectedUserId ? "Редактирование пользователя" : "Создание пользователя"}
        </Text>
        <Stack gap={3}>
          <Input
            placeholder="Логин"
            value={form.username}
            onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <Input
            placeholder="Пароль"
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
          <Stack direction="row" gap={3}>
            <Button
              colorScheme="teal"
              loading={isCreating || isUpdating}
              onClick={handleSubmit}
            >
              {selectedUserId ? "Сохранить" : "Создать"}
            </Button>
            {selectedUserId && (
              <Button variant="ghost" onClick={() => setSelectedUserId(null)}>
                Отменить
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      <Heading size="md" mb={4}>
        Список пользователей
      </Heading>
      {isLoading ? (
        <Flex align="center" justify="center" minH="200px">
          <Spinner />
        </Flex>
      ) : (
        <Stack gap={3}>
          {users?.map((user) => (
            <Box key={user.id} borderWidth="1px" borderRadius="md" p={3}>
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="bold">
                    #{user.id} {user.username}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {user.email}
                  </Text>
                </Box>
                <Stack direction="row">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setForm({
                        username: user.username,
                        email: user.email,
                        password: user.password,
                      });
                    }}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    loading={isDeleting}
                    onClick={() => handleDelete(user.id)}
                  >
                    Удалить
                  </Button>
                </Stack>
              </Flex>
            </Box>
          ))}
          {!users?.length && <Text color="gray.600">Пользователи не найдены</Text>}
        </Stack>
      )}

      {selectedUser && (
        <Box mt={6} borderWidth="1px" borderRadius="md" p={3}>
          <Text fontWeight="bold">Детали пользователя #{selectedUser.id}</Text>
          <Text>Логин: {selectedUser.username}</Text>
          <Text>Email: {selectedUser.email}</Text>
        </Box>
      )}
    </Box>
  );
}
