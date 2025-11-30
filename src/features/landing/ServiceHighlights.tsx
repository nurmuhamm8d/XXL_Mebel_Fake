"use client";

import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

const cards = [
  { title: "Free Delivery", desc: "Delivered to your door with care." },
  { title: "100% Guarantee", desc: "Quality assurance on every order." },
  { title: "Best Quality", desc: "Premium materials and craftsmanship." },
  { title: "24/7 Support", desc: "We are here any time you need us." },
];

export function ServiceHighlights() {
  return (
    <Box mt={14}>
      <Text fontSize="2xl" fontWeight="bold" mb={2} textAlign="center">
        We provide that service
      </Text>
      <Text color="var(--text-muted)" textAlign="center" mb={8}>
        It is a long established fact that a reader will be distracted by the service.
      </Text>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={5}
      >
        {cards.map((card) => (
          <GridItem key={card.title}>
            <Box
              borderWidth="1px"
              borderColor="var(--border)"
              borderRadius="lg"
              p={5}
              bg="var(--surface)"
              boxShadow="md"
              minH="150px"
            >
              <Flex
                w="48px"
                h="48px"
                borderRadius="md"
                align="center"
                justify="center"
                bg="gray.900"
                color="white"
                mb={4}
              >
                ★
              </Flex>
              <Text fontWeight="semibold" mb={2}>
                {card.title}
              </Text>
              <Text color="var(--text-muted)">{card.desc}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
