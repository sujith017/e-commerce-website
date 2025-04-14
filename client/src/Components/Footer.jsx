import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Vishal Super Market</h2>
          <p className="text-gray-400">
            Your trusted destination for high-quality grocery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Shop grocery
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-400">📍 Tiruppur , Tamil Nadu, India</p>
          <p className="text-gray-400">📞 +91 95006 28734</p>
          <p className="text-gray-400">📧 vellimuthu99@yahoo.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Vishal Super Market. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
