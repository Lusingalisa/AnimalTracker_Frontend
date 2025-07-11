import { Link } from 'react-router-dom';
import { FaShieldAlt, FaMapMarkedAlt, FaBell, FaMobileAlt } from 'react-icons/fa';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section with Background Image */}
      <header className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <nav className="navbar">
              <div className="navbar-brand">Herd Track</div>
              <div className="nav-links">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="btn btn-primary">Get Started</Link>
              </div>
            </nav>
            
            <div className="hero-content">
              <h1>Protect Your Livestock with Smart Tracking</h1>
              <p className="lead">
                GPS and RFID technology to prevent cattle rustling and monitor your herd's 
                movements in real-time across Uganda
              </p>
              <div className="cta-buttons">
                <Link to="/signup" className="btn btn-primary btn-lg">Start Free Trial</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Ugandan Farmers Choose HerdGuard</h2>
          
          <div className="row">
            <div className="col-md-3 feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Theft Prevention</h3>
              <p>Instant alerts when cattle move beyond designated safe zones</p>
            </div>
            
            <div className="col-md-3 feature-card">
              <div className="feature-icon">
                <FaMapMarkedAlt />
              </div>
              <h3>Real-Time Tracking</h3>
              <p>Monitor your herd's location 24/7 from any device</p>
            </div>
            
            <div className="col-md-3 feature-card">
              <div className="feature-icon">
                <FaBell />
              </div>
              <h3>Health Alerts</h3>
              <p>Get notified about unusual behavior that may indicate illness</p>
            </div>
            
            <div className="col-md-3 feature-card">
              <div className="feature-icon">
                <FaMobileAlt />
              </div>
              <h3>Mobile Access</h3>
              <p>Manage your cattle from basic feature phones or smartphones</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Simple Protection in 3 Steps</h2>
          
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Attach the Tracker</h3>
              <p>Our durable GPS/RFID tags easily attach to your cattle's ear or collar</p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>Set Your Zones</h3>
              <p>Define your grazing areas and safe boundaries on our map</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>Monitor & Respond</h3>
              <p>Receive instant alerts and track movements via SMS or app</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5">
        <div className="container">
          <h2 className="text-center mb-5">Trusted by Ugandan Farmers</h2>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              "Since using HerdGuard, I've recovered 12 cattle that wandered into dangerous areas.
              The peace of mind is priceless for my family."
            </div>
            <div className="testimonial-author">
              <strong>John Okello</strong>, Cattle Farmer in Lira
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta py-5 bg-primary text-white">
        <div className="container text-center">
          <h2>Ready to Protect Your Livelihood?</h2>
          <p className="lead mb-4">Join thousands of Ugandan farmers securing their cattle today</p>
          <Link to="/signup" className="btn btn-light btn-lg">Start Your Free Trial</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>HerdGuard</h5>
              <p>Innovative livestock protection for Ugandan farmers</p>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <p>Kampala, Uganda<br/>+256 700 123456<br/>info@herdguard.ug</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <Link to="/login" className="d-block">Login</Link>
              <Link to="/signup" className="d-block">Sign Up</Link>
              <Link to="/about" className="d-block">About Us</Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>&copy; {new Date().getFullYear()} HerdGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;