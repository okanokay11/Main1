import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, Package, Ruler, Shield } from "lucide-react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productRes = await axios.get(`${API}/products/${productId}`);
        setProduct(productRes.data);

        // Fetch related products
        const relatedRes = await axios.get(
          `${API}/products?category=${productRes.data.category}`
        );
        setRelatedProducts(
          relatedRes.data
            .filter((p) => p.id !== productId)
            .slice(0, 4)
        );
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    setSelectedImage(0);
  }, [productId, navigate]);

  if (isLoading) {
    return (
      <main className="min-h-screen pt-20" data-testid="product-detail-loading">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="aspect-square bg-[#121212] animate-pulse" />
            <div className="space-y-6">
              <div className="h-4 bg-[#121212] w-1/4 animate-pulse" />
              <div className="h-10 bg-[#121212] w-3/4 animate-pulse" />
              <div className="h-6 bg-[#121212] w-1/4 animate-pulse" />
              <div className="h-32 bg-[#121212] w-full animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) return null;

  const allImages = [product.image_url, ...product.additional_images];

  return (
    <main className="min-h-screen pt-20" data-testid="product-detail-page">
      {/* Header */}
      <section className="py-8 px-6 md:px-12 lg:px-24 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-body text-[#a3a3a3]" data-testid="product-breadcrumb">
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-gold transition-colors">
              Collections
            </Link>
            <ChevronRight size={14} />
            <Link
              to={`/products/${product.category}`}
              className="hover:text-gold transition-colors"
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <ChevronRight size={14} />
            <span className="text-gold truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#a3a3a3] hover:text-gold transition-colors mb-8 font-body text-sm"
            data-testid="back-button"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="aspect-square overflow-hidden bg-[#121212] mb-4" data-testid="main-product-image">
                <img
                  src={allImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              {allImages.length > 1 && (
                <div className="flex gap-4" data-testid="product-thumbnails">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-gold"
                          : "border-transparent hover:border-[#262626]"
                      }`}
                      data-testid={`thumbnail-${index}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="tracking-luxury text-gold font-body" data-testid="product-category">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </p>

              <h1 className="font-heading text-3xl md:text-4xl text-[#e5e5e5]" data-testid="product-name">
                {product.name}
              </h1>

              <p className="font-accent text-3xl text-gold italic" data-testid="product-price">
                ${product.price.toFixed(2)}
              </p>

              <div className="border-t border-[#262626] pt-6">
                <p className="text-[#a3a3a3] font-body leading-relaxed" data-testid="product-description">
                  {product.description}
                </p>
              </div>

              {/* Product Details */}
              <div className="border-t border-[#262626] pt-6 space-y-4">
                <h3 className="tracking-luxury text-[#e5e5e5] font-body mb-4">
                  Product Details
                </h3>

                <div className="flex items-start gap-4">
                  <Package size={20} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#e5e5e5] font-body text-sm">Material</p>
                    <p className="text-[#a3a3a3] font-body text-sm" data-testid="product-material">
                      {product.material}
                    </p>
                  </div>
                </div>

                {product.dimensions && (
                  <div className="flex items-start gap-4">
                    <Ruler size={20} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#e5e5e5] font-body text-sm">Dimensions</p>
                      <p className="text-[#a3a3a3] font-body text-sm" data-testid="product-dimensions">
                        {product.dimensions}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <Shield size={20} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#e5e5e5] font-body text-sm">Authenticity</p>
                    <p className="text-[#a3a3a3] font-body text-sm">
                      100% Genuine · Certificate Included
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="border-t border-[#262626] pt-6">
                <p className="text-[#a3a3a3] font-body text-sm mb-4">
                  Interested in this piece? Contact us for inquiries.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center w-full gap-2 bg-gold text-black px-8 py-4 tracking-luxury font-body hover:bg-gold/90 transition-colors duration-300"
                  data-testid="inquire-button"
                >
                  Inquire About This Product
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#121212]" data-testid="related-products-section">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="tracking-luxury text-gold mb-4 font-body">You May Also Like</p>
              <h2 className="font-heading text-3xl text-[#e5e5e5]">
                Related Products
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="related-products-grid">
              {relatedProducts.map((prod, index) => (
                <ProductCard key={prod.id} product={prod} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default ProductDetailPage;
