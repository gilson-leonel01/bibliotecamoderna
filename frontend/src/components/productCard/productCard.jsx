import { Star } from "lucide-react";

export default function ProductCard({ product, featured = false }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${featured ? 'w-64' : ''}`}>
      {product.discount && (
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
          -{product.discount}%
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">
          {product.category}
        </p>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
          ))}
          
          <span className="text-xs text-gray-500 ml-1">
            (5.0)
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-red-900">
              AO {(product.price / 1000).toFixed(3)}
            </p>
          </div>
        </div>

        <button className="w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-800 transition hover:cursor-pointer font-semibold">
          Adicionar
        </button>
      </div>
    </div>
  );
};
