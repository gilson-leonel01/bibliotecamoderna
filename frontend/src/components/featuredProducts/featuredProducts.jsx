import { productsMockup } from '../../mockups/productsMockup';
import ProductCard from '../productCard/productCard';

export default function FeaturedProducts() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {productsMockup.slice(0, 5).map(product => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>
      </div>
    </section>
  );
};