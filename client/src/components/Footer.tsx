import { Link } from "react-router-dom";
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

export default Footer;


/*<p>&copy; {new Date().getFullYear()} VillageHub. All rights reserved.</p> */
