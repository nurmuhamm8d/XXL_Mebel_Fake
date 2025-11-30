"use client";

import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

const heroBg =
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80";

export function Hero() {
  return (
    <Box position="relative" overflow="hidden" borderRadius="2xl" bg="var(--surface)" boxShadow="lg">
      <Box
        backgroundImage={`linear-gradient(90deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35)), url(${heroBg})`}
        backgroundSize="cover"
        backgroundPosition="center"
        minH={{ base: "360px", md: "520px" }}
        filter="blur(0.4px)"
      />
      <Flex
        position="absolute"
        inset="0"
        align="center"
        justify="center"
        px={{ base: 4, md: 10 }}
      >
        <Box
          bg="rgba(255,255,255,0.12)"
          border="1px solid rgba(255,255,255,0.25)"
          backdropFilter="blur(18px)"
          borderRadius="xl"
          maxW="720px"
          w="100%"
          px={{ base: 5, md: 10 }}
          py={{ base: 8, md: 12 }}
          textAlign="center"
          color="white"
          boxShadow="0 24px 80px rgba(0,0,0,0.45)"
        >
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="semibold"
            letterSpacing="0.4px"
            mb={4}
          >
            Enjoy your life in our luxurious furniture
          </Text>
          <Text opacity={0.92} mb={8}>
            If you are looking for furniture, then you have come to the right place.
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} justify="center" gap={4}>
            <Button
              variant="outline"
              size="lg"
              color="white"
              borderColor="rgba(255,255,255,0.6)"
              _hover={{ bg: "rgba(255,255,255,0.1)" }}
            >
              About Us
            </Button>
            <Button
              size="lg"
              bg="var(--accent)"
              color="var(--accent-contrast)"
              _hover={{ opacity: 0.9 }}
            >
              Order Now
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
