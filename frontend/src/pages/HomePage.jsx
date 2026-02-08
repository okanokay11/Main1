import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${API}/products?featured=true`),
          axios.get(`${API}/categories`),
        ]);
        setFeaturedProducts(productsRes.data.slice(0, 6));
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollToContent = () => {
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1531188929123-0cfa61e6c770?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxsZWF0aGVyJTIwY3JhZnRpbmclMjB0b29scyUyMGNsb3NlJTIwdXAlMjBkYXJrJTIwbW9vZHxlbnwwfHx8fDE3NzA1MzY0MDh8MA&ixlib=rb-4.1.0&q=85"
            alt="Leather crafting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="tracking-luxury text-gold mb-6 font-body"
          >
            Handcrafted Excellence
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#e5e5e5] mb-6 leading-tight"
            data-testid="hero-title"
          >
            Where Heritage Meets
            <span className="text-gold block mt-2">Modern Elegance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-[#a3a3a3] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover our curated collection of genuine leather goods and 
            artisan silver jewellery, each piece crafted with centuries-old 
            techniques and timeless design.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-gold text-black px-8 py-4 tracking-luxury font-body hover:bg-gold/90 transition-colors duration-300"
              data-testid="hero-cta-explore"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 border border-[#262626] text-[#e5e5e5] px-8 py-4 tracking-luxury font-body hover:border-gold hover:text-gold transition-colors duration-300"
              data-testid="hero-cta-story"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#a3a3a3] hover:text-gold transition-colors cursor-pointer"
          aria-label="Scroll to content"
          data-testid="scroll-indicator"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.button>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-24 px-6 md:px-12 lg:px-24" data-testid="featured-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="tracking-luxury text-gold mb-4 font-body">Curated Selection</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#e5e5e5]">
              Featured Pieces
            </h2>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-[#121212] mb-4" />
                  <div className="h-4 bg-[#121212] w-1/3 mb-2" />
                  <div className="h-6 bg-[#121212] w-2/3 mb-2" />
                  <div className="h-4 bg-[#121212] w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="featured-products-grid">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 tracking-luxury font-body transition-colors"
              data-testid="view-all-products"
            >
              View All Collections
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]" data-testid="categories-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="tracking-luxury text-gold mb-4 font-body">Browse by Category</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#e5e5e5]">
              Our Collections
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="categories-grid">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <Link
                  to={`/products/${category.slug}`}
                  data-testid={`category-link-${category.slug}`}
                >
                  <div className={`relative ${index === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-[4/3]"} overflow-hidden`}>
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-heading text-2xl md:text-3xl text-[#e5e5e5] mb-2 group-hover:text-gold transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-[#a3a3a3] text-sm font-body line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24" data-testid="story-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1637221023356-eb86f7df5df6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwzfHxsZWF0aGVyJTIwY3JhZnRpbmclMjB0b29scyUyMGNsb3NlJTIwdXAlMjBkYXJrJTIwbW9vZHxlbnwwfHx8fDE3NzA1MzY0MDh8MA&ixlib=rb-4.1.0&q=85"
                  alt="Leather crafting detail"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-gold/30 -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="tracking-luxury text-gold mb-4 font-body">Our Philosophy</p>
              <h2 className="font-heading text-3xl md:text-4xl text-[#e5e5e5] mb-6">
                Crafted with Purpose,<br />Built to Last
              </h2>
              <p className="text-[#a3a3a3] font-body leading-relaxed mb-6">
                In a world of mass production, we stand for something different. 
                Every piece in our collection is handcrafted by skilled artisans 
                who have dedicated their lives to their craft. We source only the 
                finest materials—full-grain leather that develops a rich patina 
                over time, and sterling silver that gains character with wear.
              </p>
              <p className="text-[#a3a3a3] font-body leading-relaxed mb-8">
                Our commitment is simple: genuine quality, transparent craftsmanship, 
                and pieces that become more beautiful with age. These aren't just 
                accessories—they're heirlooms in the making.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-gold hover:text-gold/80 tracking-luxury font-body transition-colors"
                data-testid="story-cta"
              >
                Learn More About Us
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#121212]" data-testid="cta-section">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="tracking-luxury text-gold mb-4 font-body">Get In Touch</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#e5e5e5] mb-6">
              Have Questions?<br />We'd Love to Help
            </h2>
            <p className="text-[#a3a3a3] font-body mb-8 max-w-xl mx-auto">
              Whether you're looking for the perfect gift or want to learn more 
              about our craftsmanship process, our team is here to assist you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gold text-black px-8 py-4 tracking-luxury font-body hover:bg-gold/90 transition-colors duration-300"
              data-testid="cta-contact"
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HomePage;
