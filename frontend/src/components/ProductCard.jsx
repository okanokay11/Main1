import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product, index = 0 }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
      data-testid={`product-card-${product.id}`}
    >
      <Link to={`/product/${product.id}`} data-testid={`product-link-${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#121212] mb-4">
          {!isImageLoaded && (
            <div className="absolute inset-0 img-loading" />
          )}
          <img
            src={product.image_url}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="tracking-luxury text-[#e5e5e5] font-body bg-black/50 px-6 py-3 backdrop-blur-sm">
              View Details
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="tracking-luxury text-[#a3a3a3] font-body">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </p>
          <h3 className="font-heading text-xl text-[#e5e5e5] group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-accent text-lg text-gold italic">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
