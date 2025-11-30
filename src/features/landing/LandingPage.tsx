"use client";

import { Box, Container, Stack } from "@chakra-ui/react";
import { Hero } from "./Hero";
import { StatsBand } from "./StatsBand";
import { AboutSection } from "./AboutSection";
import { ServiceHighlights } from "./ServiceHighlights";
import { ProductsShowcase } from "./ProductsShowcase";
import { Testimonials } from "./Testimonials";
import { FooterSection } from "./FooterSection";

export function LandingPage() {
  return (
    <Box bg="var(--page-bg)" color="var(--text-strong)" minH="100vh">
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={10}>
        <Stack spacing={12}>
          <Hero />
          <StatsBand />
          <AboutSection />
          <ServiceHighlights />
          <ProductsShowcase />
          <Testimonials />
          <FooterSection />
        </Stack>
      </Container>
    </Box>
  );
}
