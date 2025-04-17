/* About Component */
import React from 'react';
import Image4 from '../Images/4.jpeg';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <h2>About Us</h2>
        <p>Welcome to our platform. We are dedicated to providing the best services...</p>
      </div>
      <div className="about-image">
        <img src={Image4} alt="About Us" />
      </div>
    </div>
  );
};

export default About;