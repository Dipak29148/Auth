import React from 'react';
import { Link } from 'react-router-dom';
import Image1 from '../Images/1.jpg';
import './styles/ProductDetail.css';

const ProductDetail1 = () => {
  return (
    <div className="product-detail-container" style={{ paddingBottom: '150px' }}>
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Premium Product</li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-md-6">
            <div className="product-image-container">
              <img src={Image1} alt="Premium Product" className="img-fluid rounded product-main-image" />
              <div className="image-gallery mt-3">
                <img src={Image1} alt="Thumbnail 1" className="img-thumbnail active" />
                <img src={Image1} alt="Thumbnail 2" className="img-thumbnail" />
                <img src={Image1} alt="Thumbnail 3" className="img-thumbnail" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="product-title">Premium Product</h1>
            <div className="product-rating mb-2">
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <span className="ms-2">(25 reviews)</span>
            </div>
            <h2 className="product-price mb-4">$129.99</h2>
            <p className="product-description">
              This premium product offers exceptional quality and innovative features. 
              Designed with precision and built with high-quality materials, this product 
              stands out from the competition. It provides excellent performance while 
              maintaining a sleek and modern design.
            </p>
            
            <div className="product-features mb-4">
              <h4>Key Features:</h4>
              <ul>
                <li>High-quality materials for durability</li>
                <li>Advanced technology for superior performance</li>
                <li>Elegant and modern design</li>
                <li>Energy efficient operation</li>
                <li>1-year warranty included</li>
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
                <p>Our Premium Product is the result of years of research and development. We've taken the time to understand customer needs and preferences to create a product that exceeds expectations. This product combines the latest technology with a user-friendly design to deliver an exceptional experience.</p>
                <p>Whether you're a professional looking for reliable equipment or a hobbyist who values quality, this product is designed to meet your needs. Its versatility makes it suitable for a variety of applications, while its durability ensures it will last for years to come.</p>
              </div>
              <div className="tab-pane fade" id="specifications" role="tabpanel" aria-labelledby="specifications-tab">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Dimensions</th>
                        <td>10" x 8" x 3"</td>
                      </tr>
                      <tr>
                        <th>Weight</th>
                        <td>2.5 lbs</td>
                      </tr>
                      <tr>
                        <th>Materials</th>
                        <td>Premium grade aluminum and reinforced polymer</td>
                      </tr>
                      <tr>
                        <th>Power Source</th>
                        <td>Rechargeable lithium-ion battery</td>
                      </tr>
                      <tr>
                        <th>Battery Life</th>
                        <td>Up to 10 hours of continuous use</td>
                      </tr>
                      <tr>
                        <th>Warranty</th>
                        <td>1-year limited warranty</td>
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
                        <h5 className="mb-1">David Wilson</h5>
                        <div className="review-rating">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                        </div>
                      </div>
                      <small className="text-muted">Posted 1 month ago</small>
                    </div>
                    <p className="review-text mt-2">This product is amazing! The build quality is exceptional and it performs better than expected. Definitely worth the investment.</p>
                  </div>
                  
                  <div className="review-item mb-4 pb-3 border-bottom">
                    <div className="review-header d-flex justify-content-between">
                      <div>
                        <h5 className="mb-1">Sarah Johnson</h5>
                        <div className="review-rating">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="far fa-star text-warning"></i>
                        </div>
                      </div>
                      <small className="text-muted">Posted 2 months ago</small>
                    </div>
                    <p className="review-text mt-2">Very good product that has served me well. The only minor issue is the battery life could be a bit longer, but overall I'm satisfied with my purchase.</p>
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

export default ProductDetail1; 