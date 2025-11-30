'use client';

import { Box, Text, Image, Flex, Button } from "@chakra-ui/react";
import { useGetProductQuery } from "@/services/fakestoreApi";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/features/cart/cartSlice";

interface ProductDetailsProps {
  id: number;
}

export function ProductDetails({ id }: ProductDetailsProps) {
  const { data, isLoading, isError } = useGetProductQuery(id);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <Box p={8}>
        <Text>Загрузка...</Text>
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box p={8}>
        <Text>Ошибка загрузки товара</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Flex gap={8} direction={{ base: "column", md: "row" }}>
        <Box flex="1">
          <Image
            src={data.image}
            alt={data.title}
            maxH="320px"
            objectFit="contain"
            mx="auto"
          />
        </Box>
        <Box flex="1">
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {data.title}
          </Text>
          <Text color="gray.600" mb={4}>
            {data.category}
          </Text>
          <Text mb={4}>{data.description}</Text>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {data.price} $
          </Text>
          <Button
            colorScheme="teal"
            onClick={() =>
              dispatch(
                addToCart({
                  id: data.id,
                  title: data.title,
                  price: data.price,
                  image: data.image,
                })
              )
            }
          >
            В корзину
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
