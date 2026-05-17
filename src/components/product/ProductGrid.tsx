import ProductCard from "@/components/product/ProductCard";
import MotionWrapper from "@/components/ui/MotionWrapper";
import type { Product } from "@/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <MotionWrapper key={product.id} delay={Math.min(index * 0.035, 0.2)}>
          <ProductCard product={product} />
        </MotionWrapper>
      ))}
    </div>
  );
}
