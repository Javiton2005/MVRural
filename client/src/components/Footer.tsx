/*import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div>
            <h3 className="title">VillageHub</h3>
            <p className="description">
              Connecting communities and promoting village tourism across the world.
            </p>
          </div>
          <div>
            <h3 className="title">Quick Links</h3>
            <ul className="link-list">
              <li><Link to="/" className="link">Home</Link></li>
              <li><Link to="/about" className="link">About</Link></li>
              <li><Link to="/villages" className="link">Explore Villages</Link></li>
              <li><Link to="/contact" className="link">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="title">Resources</h3>
            <ul className="link-list">
              <li><Link to="/faq" className="link">FAQ</Link></li>
              <li><Link to="/terms" className="link">Terms of Service</Link></li>
              <li><Link to="/privacy" className="link">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="title">Connect with Us</h3>
            <p className="subscribe-text">
              Subscribe to our newsletter for updates.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} VillageHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;*/


import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="footer-section">
            <h3 className="footer-title">VillageHub</h3>
            <p className="footer-description">
              Connecting communities and promoting village tourism across the world.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/villages" className="footer-link">Explore Villages</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Connect with Us</h3>
            <div className="social-links">
              <a href="#" className="social-link">
                {/* Facebook SVG */}
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="social-link">
                {/* Twitter SVG */}
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="social-link">
                {/* Instagram SVG */}
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            <p className="newsletter">
              Subscribe to our newsletter for updates.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} VillageHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;