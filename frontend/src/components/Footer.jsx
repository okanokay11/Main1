import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#262626]" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading text-2xl text-gold">Quality Finds</span>
            </Link>
            <p className="text-[#a3a3a3] font-body max-w-md leading-relaxed">
              Curating genuine handcrafted goods for the discerning collector. 
              Each piece tells a story of heritage, craftsmanship, and timeless elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="tracking-luxury text-[#e5e5e5] mb-6 font-body">Explore</h4>
            <ul className="space-y-4">
              {[
                { href: "/products/wallets", label: "Leather Wallets" },
                { href: "/products/jewelry", label: "Silver Jewellery" },
                { href: "/products/bags", label: "Leather Bags" },
                { href: "/products/belts", label: "Leather Belts" },
                { href: "/products/watches", label: "Watches" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[#a3a3a3] hover:text-gold transition-colors duration-300 font-body text-sm"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="tracking-luxury text-[#e5e5e5] mb-6 font-body">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a3a3a3]">
                <MapPin size={18} className="mt-1 text-gold shrink-0" />
                <span className="font-body text-sm">
                  1207 St. Gunes/Kepez<br />
                  Antalya, Turkey
                </span>
              </li>
              <li className="flex items-center gap-3 text-[#a3a3a3]">
                <Phone size={18} className="text-gold shrink-0" />
                <span className="font-body text-sm">+90 537 768 8988</span>
              </li>
              <li className="flex items-center gap-3 text-[#a3a3a3]">
                <Phone size={18} className="text-gold shrink-0" />
                <span className="font-body text-sm">+971 50 784 9858</span>
              </li>
              <li className="flex items-center gap-3 text-[#a3a3a3]">
                <Mail size={18} className="text-gold shrink-0" />
                <span className="font-body text-sm">hello@qualityfinds.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#a3a3a3] text-sm font-body">
            © 2025 Quality Finds. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="text-[#a3a3a3] hover:text-gold text-sm font-body transition-colors">
              Our Story
            </Link>
            <Link to="/contact" className="text-[#a3a3a3] hover:text-gold text-sm font-body transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
