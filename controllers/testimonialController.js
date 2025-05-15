/**
 * File: /controllers/testimonialController.js
 * Purpose: Controller logic for testimonials CRUD operations.
 * Notes:
 * - Uses Mongoose model Testimonial.
 * - Checks ownership before allowing edit/delete.
 * - Handles optional image upload during create/update.
 * - Deletes old image file when replaced or on delete.
 */

const Testimonial = require('../models/Testimonial');
const fs = require('fs');
const path = require('path');

exports.newForm = (req, res) => {
  res.render('testimonials/new', { success: null, error: null });
};

exports.createTestimonial = async (req, res) => {
  try {
    const newTestimonial = new Testimonial({
      content: req.body.content,
      userId: req.session.userId,
    });

    if (req.file) {
      newTestimonial.image = req.file.filename;
    }

    await newTestimonial.save();
    res.redirect('/testimonials');
  } catch (err) {
    console.error('Error creating testimonial:', err);
    res.status(500).send('Error saving testimonial.');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).lean();
    if (!testimonial) {
      return res.status(404).send('Testimonial not found');
    }
    if (testimonial.userId.toString() !== req.session.userId) {
      return res.status(403).send('Not authorized');
    }

    res.render('testimonials/edit', { testimonial });
  } catch (err) {
    console.error('Error showing edit form:', err);
    res.status(500).send('Server error');
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).send('Testimonial not found');
    }
    if (testimonial.userId.toString() !== req.session.userId) {
      return res.status(403).send('Not authorized');
    }

    // Update content
    testimonial.content = req.body.content;

    // Handle new image upload
    if (req.file) {
      // Delete old image file if exists
      if (testimonial.image) {
        const oldImagePath = path.join(__dirname, '..', 'public', 'uploads', testimonial.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.warn('Failed to delete old image:', err);
        });
      }
      testimonial.image = req.file.filename;
    }

    await testimonial.save();
    res.redirect('/testimonials');
  } catch (err) {
    console.error('Error updating testimonial:', err);
    res.status(500).send('Server error');
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).send('Testimonial not found');
    }
    if (testimonial.userId.toString() !== req.session.userId) {
      return res.status(403).send('Not authorized');
    }

    // Delete image file if exists
    if (testimonial.image) {
      const imagePath = path.join(__dirname, '..', 'public', 'uploads', testimonial.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn('Failed to delete image:', err);
      });
    }

    await Testimonial.deleteOne({ _id: req.params.id });
    res.redirect('/testimonials');
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).send('Server error');
  }
};
