## Project Root (`/Noelle_Bhaduri_JSON_Final_Project`)

Noelle_Bhaduri_JSON_Final_Project/
├── assets                 # Images and other media
│ ├── css/                 # All CSS files for styling the site
│ │ ├── footer.css         # Footer-specific styles
│ │ ├── navbar.css         # Navbar-specific styles
│ │ └── styles.css         # Shared/global CSS styles
│ └── img/                 # Image assets used in the project
│ │ ├── arrow1.jpg         # Hall of Fame Card 1
│ │ ├── arrow2.jpg         # Hall of Fame Card 2
│ │ ├── arrow3.jpg         # Hall of Fame Card 3
│ │ ├── peggy.jpg          # Hall of Fame Card 4
│ │ ├── sheena.jpg         # Hall of Fame Card 5
│ │ └── stella.jpg         # Hall of Fame Card 6
│ │ ├── branding/          # Project branding assets
│ │ │  ├── logo.png        # Website logo displayed in the navbar
│ │ │  └── fav-icon.ico    # Browser tab favicon
│ └── js/                  # JavaScript functionality scripts
│ │ ├── script.js          # Shared JavaScript (DOM interactions, UI logic)
│ │ └── weather.js         # Weather API logic and data display
│ └── pages/               # Internal pages linked from navigation
│ │ ├── contact.html       # Contact form page (submits to db.json)
│ │ ├── portfolio.html     # Portfolio section: Hall of Fame and Testimonials
│ │ └── services.html      # Services offered by the subject or business
├── .gitignore             # Specifies files/folders Git should ignore
├── db.json                # Stores submitted contact form data (local JSON db)
├── external.json          # Simulated external data (e.g., services, weather)
├── index.html             # Main homepage for the site
└── notes.md               # This project notes and documentation file





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
│ │ └── styles.css
│ ├── navbar.js
│ └── img/
│ └── logo.png
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
│ │ └── navbar.ejs
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

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