"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { useGetProductsQuery } from "@/services/fakestoreApi";

export function ProductsShowcase() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetProductsQuery();
  const products = useMemo(() => data ?? [], [data]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <Box mt={16}>
      <Box textAlign="center" mb={8}>
        <Text fontSize="2xl" fontWeight="bold">
          Our Furniture
        </Text>
        <Text color="var(--text-muted)">
          It is a long established fact that a reader will be distracted by the service.
        </Text>
      </Box>

      <Flex
        mb={6}
        gap={3}
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
      >
          <Flex
            flex="1"
            borderWidth="1px"
            borderColor="var(--border)"
            borderRadius="md"
            overflow="hidden"
            bg="var(--surface)"
            align="center"
          >
            <Input
              border="none"
              placeholder="Search a furniture"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              _focus={{ boxShadow: "none" }}
            />
            <Button borderRadius="0" bg="var(--accent)" color="var(--accent-contrast)" _hover={{ opacity: 0.9 }}>
              🔍
            </Button>
          </Flex>

        <Flex gap={2} wrap="wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "solid" : "outline"}
              bg={activeCategory === cat ? "var(--accent)" : "transparent"}
              color={activeCategory === cat ? "var(--accent-contrast)" : "var(--text-strong)"}
              borderColor="var(--border)"
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "all" ? "All" : cat}
            </Button>
          ))}
        </Flex>
      </Flex>

      {isLoading && (
        <Text textAlign="center" color="var(--text-muted)">
          Loading products...
        </Text>
      )}
      {isError && (
        <Text textAlign="center" color="red.500">
          Ошибка загрузки товаров
        </Text>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
        {filtered.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderColor="var(--border)"
            borderRadius="lg"
            overflow="hidden"
            bg="var(--surface)"
            boxShadow="md"
          >
            <Box as={Link} href={`/products/${product.id}`} display="block">
              <Image
                src={product.image}
                alt={product.title}
                h="180px"
                w="100%"
                objectFit="contain"
                bg="gray.50"
              />
            </Box>
            <Box p={4}>
              <Text fontWeight="semibold" mb={1} noOfLines={1}>
                {product.title}
              </Text>
              <Text color="var(--text-muted)" fontSize="sm" noOfLines={2} mb={3}>
                {product.description}
              </Text>
              <Flex justify="space-between" align="center" mb={3}>
                <Text fontWeight="bold">${product.price}</Text>
                <Button
                  size="sm"
                  variant="solid"
                  bg="var(--accent)"
                  color="var(--accent-contrast)"
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
                  Order Now
                </Button>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {filtered.length === 0 && !isLoading && (
        <Text textAlign="center" color="gray.500" mt={6}>
          Ничего не найдено.
        </Text>
      )}

      <Stack align="center" mt={10}>
        <Button colorScheme="gray" variant="outline">
          View All
        </Button>
      </Stack>
    </Box>
  );
}
