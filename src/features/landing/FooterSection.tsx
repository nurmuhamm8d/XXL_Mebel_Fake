"use client";

import { Box, Flex, HStack, Input, Stack, Text, Button } from "@chakra-ui/react";

export function FooterSection() {
  return (
    <Box
      mt={16}
      bg="var(--surface-muted)"
      color="var(--text-strong)"
      py={10}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="var(--border)"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={10}
        px={{ base: 6, md: 10 }}
        justify="space-between"
      >
        <Stack gap={3}>
          <Text fontSize="lg" fontWeight="bold">
            SQ R3
          </Text>
          <Text color="var(--text-muted)">+8867 987 000989</Text>
          <Text color="var(--text-muted)">uxanding@domain.com</Text>
          <HStack gap={3}>
            <Box>🌐</Box>
            <Box>📘</Box>
            <Box>📸</Box>
          </HStack>
        </Stack>

        <Stack gap={2}>
          <Text fontWeight="semibold">Useful Links</Text>
          <Text color="var(--text-muted)">Home</Text>
          <Text color="var(--text-muted)">About</Text>
          <Text color="var(--text-muted)">Service</Text>
          <Text color="var(--text-muted)">Furniture</Text>
        </Stack>

        <Stack gap={2}>
          <Text fontWeight="semibold">FAQ</Text>
          <Text color="var(--text-muted)">User Support</Text>
          <Text color="var(--text-muted)">User Guide</Text>
          <Text color="var(--text-muted)">User History</Text>
        </Stack>

        <Stack gap={3} maxW="260px">
          <Text fontWeight="semibold">Newsletter</Text>
          <HStack>
            <Input placeholder="Email" bg="var(--surface)" color="var(--text-strong)" borderColor="var(--border)" />
            <Button bg="var(--accent)" color="var(--accent-contrast)" _hover={{ opacity: 0.9 }}>
              Join
            </Button>
          </HStack>
          <Button variant="outline" borderColor="var(--border)" color="var(--text-strong)">
            Download App
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
