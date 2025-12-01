'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  Image,
  Spinner,
  Center,
  Flex,
  Stack,
  Input,
  Textarea,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  type Product,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/services/fakestoreApi";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/features/cart/cartSlice";

const PAGE_SIZE = 6;

export default function ProductsPage() {
  const { data, isLoading, isError, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [feedback, setFeedback] = useState<{ text: string; tone?: "success" | "warning" | "info" | "error" } | null>(null);

  const notify = (text: string, tone: "success" | "warning" | "info" | "error" = "info") => {
    setFeedback({ text, tone });
    window.setTimeout(() => setFeedback(null), 4000);
  };

  const products = useMemo(() => data ?? [], [data]);
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const pageProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [page, products]);

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", price: "", description: "", category: "", image: "" });
  };

  const handleSubmit = async () => {
    const priceValue = Number(form.price);
    if (!form.title || Number.isNaN(priceValue)) {
      notify("Заполните название и цену", "warning");
      return;
    }

    if (editingId) {
      await updateProduct({
        id: editingId,
        title: form.title,
        price: priceValue,
        description: form.description,
        category: form.category,
        image: form.image,
      });
      notify("Товар обновлен", "success");
    } else {
      await createProduct({
        title: form.title,
        price: priceValue,
        description: form.description,
        category: form.category,
        image: form.image,
      });
      notify("Товар создан", "success");
    }
    resetForm();
    refetch();
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: String(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    notify("Товар удален", "info");
    refetch();
  };

  if (isLoading) {
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    );
  }

  if (isError || !data) {
    return (
      <Center minH="100vh">
        <Text>Ошибка загрузки товаров</Text>
      </Center>
    );
  }

  return (
    <Box p={8}>
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
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Каталог товаров
      </Text>

      <Box borderWidth="1px" borderRadius="lg" p={4} mb={6}>
        <Text fontWeight="semibold" mb={3}>
          {editingId ? "Редактирование товара" : "Создать товар"}
        </Text>
        <Stack gap={3}>
          <Input
            placeholder="Название"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />
          <Input
            placeholder="Цена"
            value={form.price}
            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
          />
          <Input
            placeholder="Категория"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          />
          <Input
            placeholder="Ссылка на изображение"
            value={form.image}
            onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
          />
          <Textarea
            placeholder="Описание"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />
          <Stack direction="row" gap={3}>
            <Button
              colorScheme="teal"
              loading={isCreating || isUpdating}
              onClick={handleSubmit}
            >
              {editingId ? "Сохранить" : "Создать"}
            </Button>
            {editingId && (
              <Button variant="ghost" onClick={resetForm}>
                Отменить
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} mb={6}>
        {pageProducts.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
          >
            <ChakraLink as={Link} href={`/products/${product.id}`} display="block">
              <Image
                src={product.image}
                alt={product.title}
                mx="auto"
                maxH="200px"
                objectFit="contain"
                mb={4}
              />
            </ChakraLink>
            <ChakraLink as={Link} href={`/products/${product.id}`} display="block">
              <Text fontWeight="semibold" lineClamp={2} mb={2}>
                {product.title}
              </Text>
            </ChakraLink>
            <Flex justify="space-between" align="center" mt={2}>
              <Text fontWeight="bold">{product.price} $</Text>
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                    })
                  )
                }
              >
                В корзину
              </Button>
            </Flex>
            <Flex gap={2} mt={3}>
              <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                Редактировать
              </Button>
              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                loading={isDeleting}
                onClick={() => handleDelete(product.id)}
              >
                Удалить
              </Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <Flex justify="center" align="center" gap={4}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Назад
        </Button>
        <Text>
          Страница {page} / {totalPages}
        </Text>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Вперед
        </Button>
      </Flex>
    </Box>
  );
}
