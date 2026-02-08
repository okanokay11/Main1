import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ProductsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${API}/products${category ? `?category=${category}` : ""}`),
          axios.get(`${API}/categories`),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);

        if (category) {
          const cat = categoriesRes.data.find((c) => c.slug === category);
          setCurrentCategory(cat || null);
        } else {
          setCurrentCategory(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const handleCategoryChange = (value) => {
    if (value === "all") {
      navigate("/products");
    } else {
      navigate(`/products/${value}`);
    }
  };

  return (
    <main className="min-h-screen pt-20" data-testid="products-page">
      {/* Header */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-body text-[#a3a3a3] mb-8" data-testid="breadcrumb">
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-gold transition-colors">
              Collections
            </Link>
            {currentCategory && (
              <>
                <ChevronRight size={14} />
                <span className="text-gold">{currentCategory.name}</span>
              </>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl text-[#e5e5e5] mb-4" data-testid="products-title">
              {currentCategory ? currentCategory.name : "All Collections"}
            </h1>
            <p className="text-[#a3a3a3] font-body max-w-2xl">
              {currentCategory
                ? currentCategory.description
                : "Explore our complete range of handcrafted leather goods and artisan silver jewellery."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 md:px-12 lg:px-24 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[#a3a3a3] font-body text-sm">
            {isLoading ? "Loading..." : `${products.length} products`}
          </p>

          <div className="flex items-center gap-4">
            <span className="tracking-luxury text-[#a3a3a3] font-body">Category:</span>
            <Select
              value={category || "all"}
              onValueChange={handleCategoryChange}
              data-testid="category-filter"
            >
              <SelectTrigger className="w-[180px] bg-[#121212] border-[#262626] text-[#e5e5e5]" data-testid="category-select-trigger">
                <SelectValue placeholder="All Collections" />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-[#262626]">
                <SelectItem value="all" className="text-[#e5e5e5] focus:bg-[#1a1a1a]">
                  All Collections
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.slug}
                    className="text-[#e5e5e5] focus:bg-[#1a1a1a]"
                    data-testid={`filter-option-${cat.slug}`}
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="products-loading">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-[#121212] mb-4" />
                  <div className="h-4 bg-[#121212] w-1/3 mb-2" />
                  <div className="h-6 bg-[#121212] w-2/3 mb-2" />
                  <div className="h-4 bg-[#121212] w-1/4" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16" data-testid="no-products">
              <p className="text-[#a3a3a3] font-body text-lg">
                No products found in this category.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-gold hover:text-gold/80 tracking-luxury font-body mt-4 transition-colors"
              >
                View All Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="products-grid">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Links */}
      {!category && (
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#121212]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="tracking-luxury text-gold mb-4 font-body">Shop by Category</p>
              <h2 className="font-heading text-3xl text-[#e5e5e5]">
                Find Your Perfect Piece
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" data-testid="category-links">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/products/${cat.slug}`}
                    className="block p-6 border border-[#262626] hover:border-gold text-center transition-colors duration-300 group"
                    data-testid={`category-quick-link-${cat.slug}`}
                  >
                    <span className="font-body text-[#e5e5e5] group-hover:text-gold transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default ProductsPage;
