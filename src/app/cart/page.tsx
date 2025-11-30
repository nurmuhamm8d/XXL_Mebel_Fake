"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  Stack,
  Flex,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import CartSidebar from "@/features/cart/CartSidebar";
import {
  useCreateCartMutation,
  useDeleteCartMutation,
  useGetCartsQuery,
  useUpdateCartMutation,
} from "@/services/fakestoreApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCartItems } from "@/features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const localItems = useAppSelector((state) => state.cart.items);

  const { data: carts, isLoading: isCartsLoading, refetch } = useGetCartsQuery();
  const [createCart, { isLoading: isCreating }] = useCreateCartMutation();
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [deleteCart, { isLoading: isDeleting }] = useDeleteCartMutation();
  const [feedback, setFeedback] = useState<{ text: string; tone?: "success" | "warning" | "info" | "error" } | null>(null);

  const [selectedCartId, setSelectedCartId] = useState<number | null>(null);

  const userCarts = useMemo(() => {
    if (!carts) return [];
    if (!auth.userId) return carts;
    return carts.filter((cart) => cart.userId === auth.userId);
  }, [auth.userId, carts]);

  const selectedCart = userCarts.find((cart) => cart.id === selectedCartId);

  const notify = (text: string, tone: "success" | "warning" | "info" | "error" = "info") => {
    setFeedback({ text, tone });
    window.setTimeout(() => setFeedback(null), 4000);
  };

  const createCartFromLocal = async () => {
    if (!auth.userId) {
      notify("Неизвестен пользователь", "warning");
      return;
    }
    if (localItems.length === 0) {
      notify("В локальной корзине нет товаров", "warning");
      return;
    }
    await createCart({
      userId: auth.userId,
      products: localItems.map((item) => ({ id: item.id, quantity: item.quantity })),
    });
    notify("Корзина создана", "success");
    refetch();
  };

  const updateSelectedCart = async () => {
    if (!selectedCartId || !auth.userId) {
      notify("Выберите корзину", "warning");
      return;
    }
    await updateCart({
      id: selectedCartId,
      userId: auth.userId,
      products: localItems.map((item) => ({ id: item.id, quantity: item.quantity })),
    });
    notify("Корзина обновлена", "success");
    refetch();
  };

  const deleteSelectedCart = async () => {
    if (!selectedCartId) {
      notify("Выберите корзину", "warning");
      return;
    }
    await deleteCart(selectedCartId);
    notify("Корзина удалена", "success");
    setSelectedCartId(null);
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
        Корзина
      </Heading>

      <Flex gap={6} direction={{ base: "column", lg: "row" }}>
        <Box flex="1" borderWidth="1px" borderRadius="lg" p={4}>
          <Heading size="md" mb={4}>
            Локальная корзина
          </Heading>
          <CartSidebar />
          <Stack direction={{ base: "column", sm: "row" }} mt={4} gap={3}>
            <Button
              colorScheme="teal"
              loading={isCreating}
              onClick={createCartFromLocal}
            >
              Сохранить на сервер
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              loading={isUpdating}
              onClick={updateSelectedCart}
            >
              Обновить выбранную
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              loading={isDeleting}
              onClick={deleteSelectedCart}
            >
              Удалить выбранную
            </Button>
          </Stack>
        </Box>

        <Box flex="1" borderWidth="1px" borderRadius="lg" p={4}>
          <Heading size="md" mb={4}>
            Серверные корзины пользователя
          </Heading>
          {isCartsLoading ? (
            <Flex align="center" justify="center" minH="180px">
              <Spinner />
            </Flex>
          ) : (
            <Stack gap={3}>
              {userCarts.map((cart) => (
                <Box
                  key={cart.id}
                  borderWidth="1px"
                  borderRadius="md"
                  p={3}
                  bg={cart.id === selectedCartId ? "gray.50" : "transparent"}
                >
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text fontWeight="bold">Cart #{cart.id}</Text>
                      <Text fontSize="sm" color="gray.600">
                        User ID: {cart.userId}
                      </Text>
                    </Box>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedCartId(cart.id)}
                    >
                      Выбрать
                    </Button>
                  </Flex>
                  <Box h="1px" bg="gray.200" my={2} />
                  <Stack gap={2}>
                    {cart.products.map((p, idx) => (
                      <Flex key={`${p.id}-${idx}`} justify="space-between">
                        <Badge>Product {p.id}</Badge>
                        <Text>Qty: {p.quantity ?? 1}</Text>
                      </Flex>
                    ))}
                  </Stack>
                </Box>
              ))}
              {userCarts.length === 0 && (
                <Text color="gray.600">Нет сохранённых корзин</Text>
              )}
            </Stack>
          )}
          {selectedCart && (
            <>
              <Box h="1px" bg="gray.200" my={4} />
              <Button
                size="sm"
                onClick={() => {
                  const itemsFromCart = selectedCart.products.map((p) => ({
                    id: p.id,
                    title: `Товар ${p.id}`,
                    price: 0,
                    image: "",
                    quantity: p.quantity ?? 1,
                  }));
                  dispatch(setCartItems(itemsFromCart));
                  notify("Товары корзины загружены в локальное состояние (без цен)", "info");
                }}
              >
                Загрузить выбранную в локальную
              </Button>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
