/*
File: /assets/scripts/testimonials.js
Project: Noelle_Bhaduri_JSON_Final_Project
Author: Noelle Bhaduri
Last Updated: 05/16/2025
*/

/* Show flash message */
function showTestimonialMessage(msg, type) {
    const messageDiv = document.getElementById('testimonialMessage');
    messageDiv.textContent = msg;
    messageDiv.className = type;
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = '';
    }, 5000);
  }
  
  /* Validate form input including image file size/type */
  function validateTestimonialForm(form) {
    if (
      !form.firstName.value.trim() ||
      !form.lastName.value.trim() ||
      !form.dogName.value.trim() ||
      !form.message.value.trim()
    ) {
      showTestimonialMessage('Please fill in all required fields.', 'error');
      return false;
    }
  
    const file = form.image.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        showTestimonialMessage('Only jpg and png images are allowed.', 'error');
        return false;
      }
      if (file.size > 2 * 1024 * 1024) {
        showTestimonialMessage('Image size exceeds 2MB limit.', 'error');
        return false;
      }
    }
    return true;
  }
  
  /* Read image as DataURL helper */
  function readImageAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  }
  
  /* Fetch testimonials from CouchDB */
  async function loadTestimonials() {
    try {
      const response = await fetch('http://127.0.0.1:5984/testimonials/_all_docs?include_docs=true');
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      return data.rows.map(row => row.doc);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  /* Create testimonial card element */
  function createTestimonialCard(testimonial) {
    const card = document.createElement('article');
    card.className = 'testimonial-card';
    card.tabIndex = 0;
  
    if (testimonial.imageData) {
      const img = document.createElement('img');
      img.src = testimonial.imageData;
      img.alt = `Image uploaded by ${testimonial.firstName} ${testimonial.lastName ? testimonial.lastName[0] + '.' : ''}`;
      img.className = 'testimonial-image';
      card.appendChild(img);
    }
  
    const msgP = document.createElement('p');
    msgP.className = 'testimonial-message';
    msgP.textContent = `"${testimonial.message}"`;
    card.appendChild(msgP);
  
    const footer = document.createElement('footer');
    footer.className = 'testimonial-footer';
  
    const author = document.createElement('span');
    author.className = 'author';
    author.textContent = testimonial.lastName
      ? `${testimonial.firstName} ${testimonial.lastName[0]}.`
      : testimonial.firstName;
    footer.appendChild(author);
  
    const dogs = document.createElement('span');
    dogs.className = 'dogs';
    dogs.textContent = testimonial.dogName;
    footer.appendChild(dogs);
  
    const dateSpan = document.createElement('span');
    dateSpan.className = 'date-posted';
    const date = new Date(testimonial.dateSubmitted);
    dateSpan.textContent = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    footer.appendChild(dateSpan);
  
    card.appendChild(footer);
  
    return card;
  }
  
  /* Render testimonials to page */
  async function renderTestimonials() {
    const container = document.getElementById('testimonials-container');
    container.innerHTML = '';
    const testimonials = await loadTestimonials();
    testimonials.forEach(t => {
      container.appendChild(createTestimonialCard(t));
    });
  }
  
  /* Form submit handler */
  document.addEventListener('DOMContentLoaded', () => {
    renderTestimonials();
  
    const form = document.getElementById('testimonialForm');
    if (!form) return;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      if (!validateTestimonialForm(form)) return;
  
      const firstName = form.firstName.value.trim();
      const lastName = form.lastName.value.trim();
      const dogName = form.dogName.value.trim();
      const message = form.message.value.trim();
  
      let imageData = null;
      if (form.image.files.length > 0) {
        try {
          imageData = await readImageAsDataURL(form.image.files[0]);
        } catch {
          showTestimonialMessage('Error reading image file.', 'error');
          return;
        }
      }
  
      const newTestimonial = {
        _id: 'testimonial_' + Date.now(),  // unique id for CouchDB doc
        firstName,
        lastName,
        dogName,
        message,
        dateSubmitted: new Date().toISOString(),
        imageData
      };
  
      try {
        const response = await fetch('http://127.0.0.1:5984/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTestimonial)
        });
        if (!response.ok) throw new Error('Failed to save testimonial');
        showTestimonialMessage('Thank you for your testimonial!', 'success');
        form.reset();
        renderTestimonials();
      } catch (error) {
        console.error(error);
        showTestimonialMessage('Error saving testimonial.', 'error');
      }
    });
  });
  