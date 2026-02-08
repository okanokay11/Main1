import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import Footer from "../components/Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-20" data-testid="contact-page">
      {/* Header */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-b border-[#262626]" data-testid="contact-hero">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="tracking-luxury text-gold mb-6 font-body"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl text-[#e5e5e5] mb-6"
            data-testid="contact-title"
          >
            We'd Love to Hear From You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#a3a3a3] font-body text-base md:text-lg max-w-2xl mx-auto"
          >
            Have a question about our products, want to place a custom order, 
            or simply want to say hello? Drop us a message and we'll respond 
            as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="tracking-luxury text-gold mb-4 font-body">Contact Information</p>
              <h2 className="font-heading text-3xl text-[#e5e5e5] mb-8">
                Reach Out to Us
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4" data-testid="contact-address">
                  <div className="w-12 h-12 flex items-center justify-center border border-[#262626]">
                    <MapPin size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-body text-[#e5e5e5] mb-1">Visit Us</h3>
                    <p className="text-[#a3a3a3] font-body text-sm">
                      123 Artisan Lane<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-phone">
                  <div className="w-12 h-12 flex items-center justify-center border border-[#262626]">
                    <Phone size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-body text-[#e5e5e5] mb-1">Call Us</h3>
                    <p className="text-[#a3a3a3] font-body text-sm">
                      +1 (555) 123-4567<br />
                      Mon - Fri, 9am - 6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-email">
                  <div className="w-12 h-12 flex items-center justify-center border border-[#262626]">
                    <Mail size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-body text-[#e5e5e5] mb-1">Email Us</h3>
                    <p className="text-[#a3a3a3] font-body text-sm">
                      hello@qualityfinds.com<br />
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-12 aspect-video bg-[#121212] border border-[#262626] flex items-center justify-center" data-testid="contact-map">
                <p className="text-[#a3a3a3] font-body text-sm">
                  Interactive Map Coming Soon
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="tracking-luxury text-gold mb-4 font-body">Send a Message</p>
              <h2 className="font-heading text-3xl text-[#e5e5e5] mb-8">
                Contact Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#e5e5e5] font-body text-sm mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-[#121212] border-[#262626] text-[#e5e5e5] placeholder:text-[#a3a3a3]/50 focus:border-gold focus:ring-gold"
                    data-testid="contact-name-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#e5e5e5] font-body text-sm mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="bg-[#121212] border-[#262626] text-[#e5e5e5] placeholder:text-[#a3a3a3]/50 focus:border-gold focus:ring-gold"
                    data-testid="contact-email-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[#e5e5e5] font-body text-sm mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Product inquiry"
                    className="bg-[#121212] border-[#262626] text-[#e5e5e5] placeholder:text-[#a3a3a3]/50 focus:border-gold focus:ring-gold"
                    data-testid="contact-subject-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#e5e5e5] font-body text-sm mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    rows={6}
                    className="bg-[#121212] border-[#262626] text-[#e5e5e5] placeholder:text-[#a3a3a3]/50 focus:border-gold focus:ring-gold resize-none"
                    data-testid="contact-message-input"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold text-black hover:bg-gold/90 tracking-luxury font-body py-6 rounded-sm disabled:opacity-50"
                  data-testid="contact-submit-button"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
