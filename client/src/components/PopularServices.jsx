import React, { useEffect, useRef, useState } from 'react';
import './PopularServices.css';

const PopularServices = () => {
  const [activeService, setActiveService] = useState(0);
  const serviceRefs = useRef([]);
  const timelineRef = useRef(null);

  const services = [
    {
      id: 0,
      title: "B2B Bulk Sourcing (RFQ)",
      description: "Connect with verified suppliers for bulk orders. Submit RFQs and get competitive quotes from trusted manufacturers."
    },
    {
      id: 1,
      title: "QR-Verified Authenticity",
      description: "Every product comes with QR verification ensuring authenticity and quality. Scan to verify genuine artisan products."
    },
    {
      id: 2,
      title: "Verified Artisan Directory",
      description: "Browse our curated directory of skilled artisans. All craftspeople are verified for quality and reliability."
    },
    {
      id: 3,
      title: "Track Your Impact",
      description: "Monitor your contribution to local communities. See how your purchases support artisan livelihoods and traditions."
    }
  ];

  useEffect(() => {
    const observers = [];

    serviceRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const rect = entry.boundingClientRect;
                const windowHeight = window.innerHeight;
                const elementCenter = rect.top + rect.height / 2;
                const screenCenter = windowHeight / 2;
                
                // Check if element is in the center viewport area
                if (Math.abs(elementCenter - screenCenter) < windowHeight * 0.25) {
                  setActiveService(index);
                }
              }
            });
          },
          {
            threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
            rootMargin: '-30% 0px -30% 0px'
          }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section className="popular-services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Services</h2>
          <p className="section-subtitle">Discover what makes KarigarLink special</p>
        </div>

        <div className="services-container">
          {/* Left Column - Timeline */}
          <div className="timeline-column">
            <div className="timeline" ref={timelineRef}>
              <div 
                className="timeline-progress" 
                style={{ 
                  height: `${(activeService / (services.length - 1)) * 100}%` 
                }}
              />
              {services.map((_, index) => (
                <div
                  key={index}
                  className={`timeline-dot ${index <= activeService ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="content-column">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={el => serviceRefs.current[index] = el}
                className={`service-item ${index === activeService ? 'active' : ''}`}
              >
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;