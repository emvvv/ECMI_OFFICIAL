import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrayerRequest() {
  const navigate = useNavigate();   
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    request: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Replace this with your actual Google Apps Script URL after deployment
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIhKZzm1p1A7E2bjPrSKlVAos2j3Mb9gf2DVBzh5VtMzUvYdeGTieDNKDyvrDzfbAC/exec';

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Create URL parameters from form data
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('phone', formData.phone);
      params.append('request', formData.request);

      // Send to Google Apps Script
      const response = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
      });

      // With 'no-cors', we can't read the response
      // So we assume success if no error was thrown
      
      setSubmitStatus({
        type: 'success',
        message: 'Your prayer request has been submitted. Our team will be praying for you! 🙏'
      });
      
       setSubmitted(true);
      // Clear form
      setFormData({ name: '', phone: '', request: '' });
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="prayer-page">

          {/* exit icon/button */}
      <button
        className="exit-button"
        onClick={() => navigate('/')}
        aria-label="Close prayer request"
      >
        ×
      </button>
      
      <h1>Prayer Request</h1>
    { !submitted &&  <p>If you need prayer, please use the form below and our team will pray with you.</p>
    }
      {submitStatus.message && (
        <div className={`status-message ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}


     {submitted && (
       <button
        className="prayer-submit"
        onClick={() => navigate('/')}
        style={{ marginTop: '1rem' }}
        >
        Back to Home
       </button>
     )}
     
       { !submitted &&  <form className="prayer-form" onSubmit={handleSubmit}>
            <label htmlFor="name">
            Your name
            <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="First Name and Last Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
            />
            </label>
            
            <label htmlFor="phone">
            Your phone number
            <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="ex. 09123456789"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
            />
            </label>
            
            <label htmlFor="request">
            How can we pray for you?
            <textarea 
                id="request" 
                name="request" 
                placeholder="Please type in here your prayer request details"
                rows="5"
                value={formData.request}
                onChange={handleChange}
                required
                disabled={isSubmitting}
            />
            </label>
            
            <button 
            type="submit" 
            className="prayer-submit"
            disabled={isSubmitting}
            >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
        </form>
}

    </div>
  );
}