"use client";

import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";

const aboutImg =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

const partners = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Alibaba.com_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Stripe_logo.svg",
];

export function AboutSection() {
  return (
    <Flex
      mt={14}
      gap={{ base: 6, md: 10 }}
      direction={{ base: "column", md: "row" }}
      align="center"
    >
      <Box flex="1">
        <Image
          src={aboutImg}
          alt="Living room"
          borderRadius="lg"
          w="100%"
          objectFit="cover"
          boxShadow="lg"
        />
      </Box>
      <Box flex="1">
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Learn about us
        </Text>
        <Text color="var(--text-muted)" mb={5}>
          We design and curate premium furniture pieces that blend comfort and
          contemporary elegance. From living rooms to home offices, our collections
          are crafted to elevate your everyday life.
        </Text>
        <Button
          size="md"
          mb={6}
          bg="var(--accent)"
          color="var(--accent-contrast)"
          _hover={{ opacity: 0.9 }}
        >
          Learn about us
        </Button>
        <Stack direction="row" gap={6} align="center" flexWrap="wrap">
          {partners.map((src) => (
            <Image key={src} src={src} alt="partner" h="32px" objectFit="contain" />
          ))}
        </Stack>
      </Box>
    </Flex>
  );
}
