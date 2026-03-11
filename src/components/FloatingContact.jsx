import React, { useState } from 'react';
import './FloatingContact.css';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: '📞',
      label: 'Call Us',
      value: '+91 98765 43210',
      link: 'tel:+919876543210',
      color: '#00d4ff'
    },
    {
      icon: '💬',
      label: 'WhatsApp',
      value: 'Chat Now',
      link: 'https://wa.me/919876543210',
      color: '#25d366'
    },
    {
      icon: '📧',
      label: 'Email',
      value: 'info@zenithguru.com',
      link: 'mailto:info@zenithguru.com',
      color: '#ff6b6b'
    }
  ];

  return (
    <div className={`floating-contact ${isOpen ? 'open' : ''}`}>
      {/* Toggle Button */}
      <button 
        className="contact-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact options"
      >
        <span className="toggle-icon">{isOpen ? '✕' : '💬'}</span>
        <span className="toggle-pulse"></span>
      </button>

      {/* Contact Options */}
      <div className="contact-options">
        {contactOptions.map((option, index) => (
          <a
            key={index}
            href={option.link}
            className="contact-option"
            style={{ '--delay': `${index * 0.1}s`, '--color': option.color }}
            target={option.link.startsWith('http') ? '_blank' : undefined}
            rel={option.link.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <span className="option-icon">{option.icon}</span>
            <div className="option-info">
              <span className="option-label">{option.label}</span>
              <span className="option-value">{option.value}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FloatingContact;
