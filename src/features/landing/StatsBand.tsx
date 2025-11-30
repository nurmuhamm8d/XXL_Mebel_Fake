"use client";

import { Flex, Text } from "@chakra-ui/react";

const stats = [
  { value: "120 k", label: "Furniture Sale" },
  { value: "98 k", label: "Review ★ (4.5)" },
  { value: "125", label: "Furniture Categories" },
];

export function StatsBand() {
  return (
    <Flex
      mt={8}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="var(--border)"
      overflow="hidden"
      bg="var(--surface)"
      boxShadow="md"
      direction={{ base: "column", md: "row" }}
    >
      {stats.map((item, idx) => (
        <Flex
          key={item.label}
          flex="1"
          py={6}
          px={6}
          align="center"
          justify="center"
          borderRightWidth={idx === stats.length - 1 ? "0" : { base: "0", md: "1px" }}
          borderTopWidth={idx === 0 ? "0" : { base: "1px", md: "0" }}
          borderColor="gray.200"
          gap={2}
        >
          <Text fontSize="2xl" fontWeight="bold">
            {item.value}
          </Text>
          <Text color="gray.600">{item.label}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
