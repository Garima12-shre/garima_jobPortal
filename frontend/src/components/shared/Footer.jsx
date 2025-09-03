import { FaEnvelope, FaFacebookF, FaLinkedinIn, FaPhone, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Job Hunt</h2>
            <p className="text-sm leading-6">
              Your trusted platform for connecting students and recruiters. 
              Find your dream job or the right candidate with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/jobs" className="hover:text-white transition">Jobs</a></li>
              <li><a href="/companies" className="hover:text-white transition">Companies</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact + Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Get in Touch</h3>
            <p className="flex items-center space-x-2 mb-2">
              <FaEnvelope className="text-gray-400" /> <span>support@jobhunt.com</span>
            </p>
            <p className="flex items-center space-x-2 mb-4">
              <FaPhone className="text-gray-400" /> <span>+977-9800000000</span>
            </p>

            <div className="flex space-x-4">
              <a href="https://facebook.com" className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition">
                <FaFacebookF className="text-white w-4 h-4" />
              </a>
              <a href="https://twitter.com" className="p-2 rounded-full bg-gray-700 hover:bg-sky-500 transition">
                <FaTwitter className="text-white w-4 h-4" />
              </a>
              <a href="https://linkedin.com" className="p-2 rounded-full bg-gray-700 hover:bg-blue-500 transition">
                <FaLinkedinIn className="text-white w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Job Hunt. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
