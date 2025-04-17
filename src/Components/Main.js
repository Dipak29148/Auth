import React from 'react';
import { Link } from 'react-router-dom';
import Image1 from '../Images/1.jpg';
import Image2 from '../Images/2.jpeg';
import Image3 from '../Images/3.jpeg';
import './styles/Main.css'; // Import CSS for hover effects
const Main = () => {
  return (
    <div className="main-content" style={{ paddingBottom: '150px' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Welcome to Our Platform</h1>
              <p className="lead">Discover amazing features and services tailored just for you</p>
              <div className="hero-buttons">
                <Link to="/registration" className="btn btn-primary me-3">Get Started</Link>
                <Link to="/about" className="btn btn-outline-secondary">Learn More</Link>
              </div>
            </div>
            <div className="col-md-6">
              <img src={Image1} alt="Hero" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Features</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100 feature-card">
                <div className="card-body text-center">
                  <i className="fas fa-shield-alt fa-3x mb-3"></i>
                  <h5 className="card-title">Secure</h5>
                  <p className="card-text">
                    Your data is protected with industry-leading security measures.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 feature-card">
                <div className="card-body text-center">
                  <i className="fas fa-bolt fa-3x mb-3"></i>
                  <h5 className="card-title">Fast</h5>
                  <p className="card-text">
                    Lightning fast performance for an exceptional user experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 feature-card">
                <div className="card-body text-center">
                  <i className="fas fa-mobile-alt fa-3x mb-3"></i>
                  <h5 className="card-title">Responsive</h5>
                  <p className="card-text">
                    Works perfectly on any device, from desktop to mobile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="popular-items py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Popular Items</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100 product-card">
                <img src={Image1} className="card-img-top" alt="Item 1" />
                <div className="card-body">
                  <h5 className="card-title">Premium Product</h5>
                  <p className="card-text">
                    This is a high-quality product with exceptional features.
                  </p>
                  <Link to="/product/1" className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 product-card">
                <img src={Image2} className="card-img-top" alt="Item 2" />
                <div className="card-body">
                  <h5 className="card-title">Featured Item</h5>
                  <p className="card-text">
                    Our most popular item with great customer reviews.
                  </p>
                  <Link to="/product/2" className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 product-card">
                <img src={Image3} className="card-img-top" alt="Item 3" />
                <div className="card-body">
                  <h5 className="card-title">New Release</h5>
                  <p className="card-text">
                    The latest addition to our collection of premium items.
                  </p>
                  <Link to="/product/3" className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Users Say</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial-card p-4 mb-4">
                <div className="mb-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
                <p className="testimonial-text">"This platform exceeded all my expectations. The features are amazing!"</p>
                <div className="testimonial-author">
                  <strong>John Doe</strong>
                  <p className="text-muted">CEO, Tech Company</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card p-4 mb-4">
                <div className="mb-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
                <p className="testimonial-text">"The customer service is outstanding. They helped me every step of the way."</p>
                <div className="testimonial-author">
                  <strong>Jane Smith</strong>
                  <p className="text-muted">Marketing Director</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card p-4 mb-4">
                <div className="mb-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
                <p className="testimonial-text">"I've tried many solutions, but this one is by far the best in the market."</p>
                <div className="testimonial-author">
                  <strong>Michael Johnson</strong>
                  <p className="text-muted">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">Join thousands of satisfied customers today!</p>
          <Link to="/registration" className="btn btn-light btn-lg">Sign Up Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Main;
