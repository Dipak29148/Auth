import React from 'react';
import { Link } from 'react-router-dom';
import Image3 from '../Images/3.jpeg';
import './styles/ProductDetail.css';

const ProductDetail3 = () => {
  return (
    <div className="product-detail-container" style={{ paddingBottom: '150px' }}>
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">New Release</li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-md-6">
            <div className="product-image-container">
              <img src={Image3} alt="New Release" className="img-fluid rounded product-main-image" />
              <div className="image-gallery mt-3">
                <img src={Image3} alt="Thumbnail 1" className="img-thumbnail active" />
                <img src={Image3} alt="Thumbnail 2" className="img-thumbnail" />
                <img src={Image3} alt="Thumbnail 3" className="img-thumbnail" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <span className="badge bg-success mb-2">New Release</span>
            <h1 className="product-title">New Release Product</h1>
            <div className="product-rating mb-2">
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <i className="fas fa-star text-warning"></i>
              <span className="ms-2">(7 reviews)</span>
            </div>
            <h2 className="product-price mb-4">$149.99</h2>
            <p className="product-description">
              The latest addition to our collection of premium products. This newly released 
              item incorporates cutting-edge technology and innovative design elements. 
              It represents the next generation of our product line with significant 
              improvements over previous models.
            </p>
            
            <div className="product-features mb-4">
              <h4>Key Features:</h4>
              <ul>
                <li>Brand new technology never seen before</li>
                <li>30% faster performance than previous models</li>
                <li>Advanced connectivity options</li>
                <li>Enhanced user interface</li>
                <li>Premium finish and materials</li>
              </ul>
            </div>
            
            <div className="product-actions">
              <div className="mb-3">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="color" id="color1" value="black" checked/>
                  <label className="form-check-label" htmlFor="color1">Black</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="color" id="color2" value="silver"/>
                  <label className="form-check-label" htmlFor="color2">Silver</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="color" id="color3" value="gold"/>
                  <label className="form-check-label" htmlFor="color3">Gold</label>
                </div>
              </div>
              
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
                <p>Introducing our latest innovation, the New Release Product. After years of research and development, we're proud to present this groundbreaking addition to our product line. It combines the best features of our previous models with exciting new capabilities that set a new standard in the industry.</p>
                <p>We've listened carefully to customer feedback and incorporated numerous improvements to create a product that's not only more powerful but also more intuitive and user-friendly. The enhanced interface makes it easier than ever to access all features, while the improved performance ensures smooth operation even during the most demanding tasks.</p>
                <p>The premium design reflects our commitment to quality, with carefully selected materials that are both beautiful and durable. This is truly a product that looks as good as it performs.</p>
              </div>
              <div className="tab-pane fade" id="specifications" role="tabpanel" aria-labelledby="specifications-tab">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Dimensions</th>
                        <td>9.5" x 7.2" x 2.8"</td>
                      </tr>
                      <tr>
                        <th>Weight</th>
                        <td>2.2 lbs</td>
                      </tr>
                      <tr>
                        <th>Materials</th>
                        <td>Aircraft-grade aluminum with tempered glass</td>
                      </tr>
                      <tr>
                        <th>Processor</th>
                        <td>Next-gen quad-core processor</td>
                      </tr>
                      <tr>
                        <th>Connectivity</th>
                        <td>Wi-Fi 6, Bluetooth 5.2, USB-C</td>
                      </tr>
                      <tr>
                        <th>Battery Life</th>
                        <td>Up to 12 hours of continuous use</td>
                      </tr>
                      <tr>
                        <th>Colors Available</th>
                        <td>Black, Silver, Gold</td>
                      </tr>
                      <tr>
                        <th>Warranty</th>
                        <td>2-year comprehensive warranty</td>
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
                        <h5 className="mb-1">Robert Chen</h5>
                        <div className="review-rating">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                        </div>
                      </div>
                      <small className="text-muted">Posted 3 days ago</small>
                    </div>
                    <p className="review-text mt-2">I was lucky enough to get this product on the first day of release, and I'm blown away by the improvements. The interface is intuitive, and the performance is noticeably better than the previous model. Well worth the upgrade!</p>
                  </div>
                  
                  <div className="review-item mb-4 pb-3 border-bottom">
                    <div className="review-header d-flex justify-content-between">
                      <div>
                        <h5 className="mb-1">Emily Watson</h5>
                        <div className="review-rating">
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                          <i className="fas fa-star text-warning"></i>
                        </div>
                      </div>
                      <small className="text-muted">Posted 1 week ago</small>
                    </div>
                    <p className="review-text mt-2">This new release exceeds all my expectations. The design is stunning, and the new features make a real difference in day-to-day use. I especially love the improved battery life, which has been a game-changer for me.</p>
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

export default ProductDetail3; 