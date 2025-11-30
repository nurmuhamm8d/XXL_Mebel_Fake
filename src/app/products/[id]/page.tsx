import { Box, Text } from "@chakra-ui/react";
import { ProductDetails } from "@/features/products/ProductDetails";

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.id);

  if (Number.isNaN(productId)) {
    return (
      <Box p={8}>
        <Text>Некорректный идентификатор товара</Text>
      </Box>
    );
  }

  return <ProductDetails id={productId} />;
}
