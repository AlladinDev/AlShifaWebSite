import { Facebook, Twitter, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo / About */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">AShifa</h3>
          <p className="text-gray-400 text-sm">
            We simplify healthcare by connecting patients with trusted clinics
            and experienced doctors. Book appointments online, anytime, hassle-free.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#about" className="hover:text-blue-400 transition">About Us</a></li>
            <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
            <li><a href="#faq" className="hover:text-blue-400 transition">FAQ</a></li>
            <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-white">Contact</h4>
          <div className="flex items-center gap-2 text-gray-400">
            <Phone className="w-4 h-4" /> +1 (123) 456-7890
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Mail className="w-4 h-4" /> support@alshifa.com
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Address: zoonimar srinagar
          </p>
        </div>

        {/* Social Media */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-white">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-blue-500 transition"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-sky-400 transition"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-600 transition"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AlShifa. All rights reserved.
      </div>
    </footer>
  );
}
