## Project Root (`/final`)

final/
│
├── controllers/ # Controllers handle request logic for routes
│ ├── authController.js
│ ├── bookingController.js
│ ├── contactController.js
│ ├── dashboardController.js
│ ├── portfolioController.js
│ └── testimonialController.js
│
├── middleware/ # Custom middleware for auth, sessions, flash messages, file uploads
│ ├── authMiddleware.js
│ ├── flashMiddleware.js
│ ├── sessionMiddleware.js
│ └── upload.js
│
├── models/ # Mongoose schema models for MongoDB collections
│ ├── Booking.js
│ ├── ContactRequest.js
│ ├── Testimonial.js
│ └── User.js
│
├── public/ # Public assets served statically (CSS, JS, images)
│ ├── css/
│ │ ├── footer.css
│ │ ├── navbar.css
│ │ ├── styles.css
│ ├── navbar.js
│ └── img/
│ └── ... (images)
│
├── routes/ # Express route definitions, organized by feature
│ ├── authRoutes.js
│ ├── bookingRoutes.js
│ ├── contactRoutes.js
│ ├── dashboardRoutes.js
│ ├── mainRoutes.js
│ ├── portfolioRoutes.js
│ └── testimonialRoutes.js
│
├── views/ # EJS templates for rendering HTML views
│ ├── auth/ # Authentication pages
│ │ ├── login.ejs
│ │ └── register.ejs
│ │
│ ├── booking/ # Booking-related views
│ │ └── book.ejs
│ │ └── thankyou.ejs
│ │
│ ├── dashboard/ # User dashboard pages
│ │ ├── dashboard.ejs
│ │
│ ├── pages/ # Static/general pages
│ │ ├── about.ejs
│ │ ├── contact.ejs
│ │ ├── halloffame.ejs
│ │ └── notfound.ejs
│ │
│ ├── partials/ # Partial templates for layout (header, footer, navbar, scripts)
│ │ ├── footer.ejs
│ │ ├── header.ejs
│ │ ├── layout.ejs
│ │ ├── navbar.ejs
│ │ └── scripts.ejs
│ │
│ ├── testimonials/ # Testimonial views (list, new, edit)
│ │ ├── edit.ejs
│ │ ├── list.ejs
│ │ └── new.ejs
│ │
│ └── index.ejs # Homepage
│
├── index.js # Main Express app entry point
├── notes.md # This project notes and documentation file
├── README.md # Project README (optional but recommended)
├── package.json # npm project manifest and dependencies
└── .env # Environment variables (not committed to version control)


---

### Additional Notes:
- `index.js` sets up the Express server, middleware, view engine, static files, and route mounting.
- Environment variables (MongoDB URI, session secret, port) stored in `.env`.
- Middleware handles sessions, authentication, flash messages, and file uploads.
- Views are structured to separate concerns and reuse partials/layouts for consistent UI.
- Routes and controllers are split by feature/module for maintainability.

