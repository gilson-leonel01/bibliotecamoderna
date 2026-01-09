import { useState } from 'react';
import { productsMockup } from '../../mockups/productsMockup';
import ProductCard from '../productCard/productCard';

export default function ProductsGrid() {
  const [visibleProducts, setVisibleProducts] = useState(6);

  return (
    <section id="produtos" className="py-16 bg-linear-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-red-900 mb-12">Produtos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsMockup.slice(0, visibleProducts).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {visibleProducts < productsMockup.length && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setVisibleProducts(prev => prev + 3)}
              className="px-8 py-3 bg-red-900 text-white rounded-full hover:bg-red-800 transition font-semibold"
            >
              Ver mais
            </button>
          </div>
        )}
      </div>
    </section>
  );
};