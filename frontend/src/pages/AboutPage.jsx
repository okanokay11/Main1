import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Clock, Heart, Leaf } from "lucide-react";
import Footer from "../components/Footer";

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Crafted with Passion",
      description:
        "Every piece is made by artisans who have dedicated their lives to perfecting their craft. Their passion shows in every stitch and detail.",
    },
    {
      icon: Award,
      title: "Genuine Materials",
      description:
        "We use only the finest materials—full-grain leather, 925 sterling silver, and premium hardware that will stand the test of time.",
    },
    {
      icon: Clock,
      title: "Timeless Design",
      description:
        "Our designs transcend trends. Each piece is created to be cherished for generations, growing more beautiful with age.",
    },
    {
      icon: Leaf,
      title: "Sustainable Practice",
      description:
        "We prioritize sustainable sourcing and ethical production, ensuring our craft respects both people and planet.",
    },
  ];

  return (
    <main className="min-h-screen pt-20" data-testid="about-page">
      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden" data-testid="about-hero">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1637221023356-eb86f7df5df6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwzfHxsZWF0aGVyJTIwY3JhZnRpbmclMjB0b29scyUyMGNsb3NlJTIwdXAlMjBkYXJrJTIwbW9vZHxlbnwwfHx8fDE3NzA1MzY0MDh8MA&ixlib=rb-4.1.0&q=85"
            alt="Leather crafting"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="tracking-luxury text-gold mb-6 font-body"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#e5e5e5] mb-8 leading-tight"
            data-testid="about-title"
          >
            A Legacy of <span className="text-gold">Craftsmanship</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#a3a3a3] font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Quality Finds was born from a simple belief: that in a world of 
            disposable goods, there's still a place for things made to last. 
            We curate the finest handcrafted leather goods and artisan silver 
            jewellery from master craftsmen around the world.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24" data-testid="about-story">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <p className="tracking-luxury text-gold mb-4 font-body">The Beginning</p>
              <h2 className="font-heading text-3xl md:text-4xl text-[#e5e5e5] mb-6">
                From Passion to Purpose
              </h2>
              <p className="text-[#a3a3a3] font-body leading-relaxed mb-6">
                Our journey began in a small leather workshop in Florence, where 
                we witnessed artisans creating beauty with nothing but their hands 
                and decades of experience. That moment of awe sparked a mission: 
                to bring these exceptional pieces to people who appreciate true 
                craftsmanship.
              </p>
              <p className="text-[#a3a3a3] font-body leading-relaxed mb-6">
                Today, we work directly with master craftsmen across Italy, India, 
                and Mexico, each specializing in techniques passed down through 
                generations. We don't just sell products—we share stories, 
                traditions, and the unmistakable quality that only human hands 
                can create.
              </p>
              <p className="text-[#a3a3a3] font-body leading-relaxed">
                Every wallet, every ring, every bag in our collection has been 
                touched by hands that understand the material deeply, shaped by 
                eyes that notice every detail, and finished with the pride of 
                someone who has mastered their craft.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531188929123-0cfa61e6c770?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxsZWF0aGVyJTIwY3JhZnRpbmclMjB0b29scyUyMGNsb3NlJTIwdXAlMjBkYXJrJTIwbW9vZHxlbnwwfHx8fDE3NzA1MzY0MDh8MA&ixlib=rb-4.1.0&q=85"
                  alt="Workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-gold/30 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#121212]" data-testid="about-values">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="tracking-luxury text-gold mb-4 font-body">What We Believe</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#e5e5e5]">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-[#262626] hover:border-gold/30 transition-colors duration-300"
                data-testid={`value-${index}`}
              >
                <value.icon size={32} className="text-gold mb-6" />
                <h3 className="font-heading text-xl text-[#e5e5e5] mb-4">
                  {value.title}
                </h3>
                <p className="text-[#a3a3a3] font-body leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24" data-testid="about-process">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="tracking-luxury text-gold mb-4 font-body">Our Process</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#e5e5e5]">
              How We Curate
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="process-grid">
            {[
              {
                step: "01",
                title: "Source",
                description:
                  "We travel to workshops worldwide, meeting artisans and understanding their techniques and materials.",
              },
              {
                step: "02",
                title: "Select",
                description:
                  "Only pieces meeting our exacting standards make it to our collection. Quality is non-negotiable.",
              },
              {
                step: "03",
                title: "Share",
                description:
                  "Each piece comes with its story—the artisan who made it, the materials used, and the tradition behind it.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
                data-testid={`process-step-${index}`}
              >
                <span className="font-accent text-6xl text-gold/30 italic">
                  {item.step}
                </span>
                <h3 className="font-heading text-2xl text-[#e5e5e5] mb-4 -mt-4">
                  {item.title}
                </h3>
                <p className="text-[#a3a3a3] font-body leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#121212]" data-testid="about-cta">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="tracking-luxury text-gold mb-4 font-body">Ready to Explore?</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#e5e5e5] mb-6">
              Discover Our Collections
            </h2>
            <p className="text-[#a3a3a3] font-body mb-8 max-w-xl mx-auto">
              Browse our curated selection of handcrafted leather goods and 
              artisan silver jewellery, each piece chosen for its exceptional 
              quality and timeless design.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-gold text-black px-8 py-4 tracking-luxury font-body hover:bg-gold/90 transition-colors duration-300"
              data-testid="about-cta-button"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
