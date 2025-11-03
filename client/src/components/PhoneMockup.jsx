import React from 'react';
import './PhoneMockup.css';

const PhoneMockup = ({ image, alt = "Phone screen content" }) => {
  return (
    <div className="phone-mockup">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          <img 
            src={image || "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=800&fit=crop"} 
            alt={alt}
            className="phone-image"
          />
        </div>
        <div className="phone-home-indicator"></div>
      </div>
    </div>
  );
};

export default PhoneMockup;