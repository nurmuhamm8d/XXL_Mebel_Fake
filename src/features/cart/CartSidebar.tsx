"use client";

import { Box, Flex, Text, IconButton, Button, Image } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  type CartItem,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "./cartSlice";

const CartSidebar = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = items.reduce((sum: number, item: CartItem) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <Box w="100%" h="100%" p={4}>
        <Text fontSize="lg" fontWeight="medium">
          Корзина пуста
        </Text>
      </Box>
    );
  }

  return (
    <Box w="100%" h="100%" p={4} display="flex" flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Корзина
        </Text>
        <Button size="sm" variant="ghost" onClick={() => dispatch(clearCart())}>
          Очистить
        </Button>
      </Flex>

      <Box flex="1" overflowY="auto">
        {items.map((item: CartItem) => (
          <Box key={item.id} borderWidth="1px" borderRadius="md" p={3} mb={3}>
            <Flex gap={3}>
              <Box w="80px" h="80px" flexShrink={0}>
                <Image
                  src={item.image}
                  alt={item.title}
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              </Box>

              <Flex flex="1" flexDirection="column">
                <Text fontWeight="medium" mb={1}>
                  {item.title}
                </Text>

                <Text fontSize="sm" mb={2}>
                  {item.price.toFixed(2)} $
                </Text>

                <Flex justifyContent="space-between" alignItems="center">
                  <Flex alignItems="center">
                    <IconButton
                      aria-label="Уменьшить количество"
                      size="sm"
                      variant="outline"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      mr={2}
                    >
                      -
                    </IconButton>

                    <Text minW="24px" textAlign="center">
                      {item.quantity}
                    </Text>

                    <IconButton
                      aria-label="Увеличить количество"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            image: item.image,
                          })
                        )
                      }
                      ml={2}
                    >
                      +
                    </IconButton>
                  </Flex>

                  <IconButton
                    aria-label="Удалить товар"
                    size="sm"
                    variant="ghost"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ×
                  </IconButton>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Box>

      <Box borderTopWidth="1px" mt={4} pt={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={3}>
          <Text fontWeight="medium">Итого:</Text>
          <Text fontWeight="bold">{total.toFixed(2)} $</Text>
        </Flex>

        <Button w="100%" colorScheme="blue">
          Оформить заказ
        </Button>
      </Box>
    </Box>
  );
};

export default CartSidebar;
