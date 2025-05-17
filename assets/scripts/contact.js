/*
File: /assets/scripts/contact.js
Project: Noelle_Bhaduri_JSON_Final_Project
Author: Noelle Bhaduri
Last Updated: 05/16/2025
*/

/* Show flash message */
function showFlashMessage(msg, type) {
    const flashDiv = document.getElementById('flash-message');
    flashDiv.textContent = msg;
    flashDiv.className = type;
    flashDiv.style.display = 'block';
    setTimeout(() => {
      flashDiv.textContent = '';
      flashDiv.className = '';
      flashDiv.style.display = 'none';
    }, 5000);
  }
  
  /* Validate contact form */
  function validateContactForm(form) {
    if (!form.name.value.trim() || !form.email.value.trim() || !form.message.value.trim()) {
      showFlashMessage('Please fill in all required fields.', 'error');
      return false;
    }
    // Additional validation can be added here (email format, phone pattern)
    return true;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      if (!validateContactForm(form)) return;
  
      const contactData = {
        id: Date.now(),  // or uuid
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
        dateSubmitted: new Date().toISOString()
      };
  
      try {
        // Assuming you have a REST API to handle this at /contacts endpoint, served by db.json or json-server
        const response = await fetch('http://127.0.0.1:3000/submit-contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData)
        });
        if (!response.ok) throw new Error('Failed to send contact message');
  
        showFlashMessage('Thank you for contacting us!', 'success');
        form.reset();
      } catch (error) {
        console.error(error);
        showFlashMessage('Error sending message. Please try again.', 'error');
      }
    });
  });
  