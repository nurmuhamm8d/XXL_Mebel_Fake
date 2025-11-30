"use client";

import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";

const testimonials = [
  {
    name: "Mr. Jone Ambrose",
    date: "26 07 21",
    text: "Our experience has been fantastic; high quality pieces and attentive service that made furnishing effortless.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Mr. Jane Ambrose",
    date: "26 07 21",
    text: "Beautiful craftsmanship and reliable delivery. The new sofa has become the centerpiece of our living room.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Mr. Jone Ambrose",
    date: "26 07 21",
    text: "Modern design, solid build, and friendly support. Highly recommended for anyone upgrading their home.",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
];

export function Testimonials() {
  return (
    <Box mt={16}>
      <Text fontSize="2xl" fontWeight="bold" mb={2} textAlign="center">
        What clients say about us
      </Text>
      <Text color="var(--text-muted)" textAlign="center" mb={8}>
        It is a long established fact that a reader will be distracted by the service.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        {testimonials.map((item) => (
          <Box
            key={item.name + item.date}
            borderWidth="1px"
            borderColor="var(--border)"
            borderRadius="lg"
            p={4}
            bg="var(--surface)"
            boxShadow="md"
          >
            <Flex align="center" gap={3} mb={3}>
              <Image
                src={item.avatar}
                alt={item.name}
                boxSize="48px"
                borderRadius="full"
                objectFit="cover"
              />
              <Box>
                <Text fontWeight="semibold">{item.name}</Text>
                <Text fontSize="xs" color="gray.500">
                  {item.date}
                </Text>
              </Box>
            </Flex>
            <Text color="var(--text-muted)" mb={2}>
              {item.text}
            </Text>
            <Text color="yellow.400">★★★★★</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
