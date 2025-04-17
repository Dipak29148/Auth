import React from 'react';
import { Link } from 'react-router-dom';
import Image2 from '../Images/2.jpeg';
import './styles/ProductDetail.css';

const ProductDetail2 = () => {
  return (
    <div className="product-detail-container" style={{ paddingBottom: '150px' }}>
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Featured Item</li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-md-6">
            <div className="product-image-container">
              <img src={Image2} alt="Featured Item" className="img-fluid rounded product-main-image" />
              <div className="image-gallery mt-3">
                <img src={Image2} alt="Thumbnail 1" className="img-thumbnail active" />
                <img src={Image2} alt="Thumbnail 2" className="img-thumbnail" />
                <img src={Image2} alt="Thumbnail 3" className="img-thumbnail" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="product-title">Featured Item</h1>
            <div className="product-rating mb-2">
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star-half-alt text-warning"></i>
              <span className="ms-2">(42 reviews)</span>
            </div>
            <h2 className="product-price mb-4">$89.99 <span className="text-muted text-decoration-line-through">$109.99</span></h2>
            <p className="product-description">
              Our most popular item with exceptional customer reviews. This featured product 
              has been a bestseller for the past six months. It offers a perfect balance of 
              quality, performance, and value that has made it a favorite among our customers.
            </p>
            
            <div className="product-features mb-4">
              <h4>Key Features:</h4>
              <ul>
                <li>Best-selling product in its category</li>
                <li>Perfect balance of quality and affordability</li>
                <li>Compact and lightweight design</li>
                <li>Improved ergonomics for comfortable use</li>
                <li>2-year extended warranty available</li>
              </ul>
            </div>
            
            <div className="product-actions">
              <div className="quantity-selector mb-3">
                <label htmlFor="quantity">Quantity:</label>
                <select className="form-select" id="quantity">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              
              <button className="btn btn-primary btn-lg me-2">Add to Cart</button>
              <button className="btn btn-outline-secondary btn-lg">Add to Wishlist</button>
            </div>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs" id="productTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="true">Description</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="specifications-tab" data-bs-toggle="tab" data-bs-target="#specifications" type="button" role="tab" aria-controls="specifications" aria-selected="false">Specifications</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab" aria-controls="reviews" aria-selected="false">Reviews</button>
              </li>
            </ul>
            <div className="tab-content p-4 border border-top-0 rounded-bottom" id="productTabContent">
              <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                <p>Our Featured Item has been designed with the customer in mind. We've analyzed thousands of customer reviews and feedback to create a product that addresses the most common needs and preferences. This approach has made it our best-selling product, with consistently high satisfaction ratings.</p>
                <p>The compact and lightweight design makes it perfect for everyday use, while its durability ensures it will withstand regular wear and tear. Whether you're using it at home, at work, or on the go, this featured item delivers reliable performance every time.</p>
              </div>
              <div className="tab-pane fade" id="specifications" role="tabpanel" aria-labelledby="specifications-tab">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Dimensions</th>
                        <td>8" x 6" x 2"</td>
                      </tr>
                      <tr>
                        <th>Weight</th>
                        <td>1.8 lbs</td>
                      </tr>
                      <tr>
                        <th>Materials</th>
                        <td>High-grade polymer with metal accents</td>
                      </tr>
                      <tr>
                        <th>Power Source</th>
                        <td>Dual power - Battery or AC adapter</td>
                      </tr>
                      <tr>
                        <th>Battery Life</th>
                        <td>Up to 8 hours of continuous use</td>
                      </tr>
                      <tr>
                        <th>Warranty</th>
                        <td>1-year standard warranty (extendable to 2 years)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                <div className="reviews-container">
                  <div className="review-item mb-4 pb-3 border-bottom">
                    <div className="review-header d-flex justify-content-between">
                      <div>
                        <h5 className="mb-1">Jennifer Adams</h5>
                        <div className="review-rating">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                        </div>
                      </div>
                      <small className="text-muted">Posted 2 weeks ago</small>
                    </div>
                    <p className="review-text mt-2">I've tried several similar products, but this one is by far the best. It's easy to use, durable, and performs exactly as advertised. I've already recommended it to several friends.</p>
                  </div>
                  
                  <div className="review-item mb-4 pb-3 border-bottom">
                    <div className="review-header d-flex justify-content-between">
                      <div>
                        <h5 className="mb-1">Michael Thompson</h5>
                        <div className="review-rating">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="far fa-star text-warning"></i>
                        </div>
                      </div>
                      <small className="text-muted">Posted 1 month ago</small>
                    </div>
                    <p className="review-text mt-2">Great product for the price. It has all the features I need and works well for my daily use. The only reason I didn't give it 5 stars is because the setup instructions could be clearer.</p>
                  </div>
                  
                  <div className="review-item mb-4 pb-3 border-bottom">
                    <div className="review-header d-flex justify-content-between">
                      <div>
                        <h5 className="mb-1">Lisa Rodriguez</h5>
                        <div className="review-rating">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star-half-alt text-warning"></i>
                        </div>
                      </div>
                      <small className="text-muted">Posted 3 months ago</small>
                    </div>
                    <p className="review-text mt-2">I've been using this product for three months now and I'm still impressed with how well it works. The battery life is good and the design makes it comfortable to use for extended periods.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail2; 