## Project Root (`/Noelle_Bhaduri_JSON_Final_Project`)

Noelle_Bhaduri_JSON_Final_Project/
├── assets                 # Images and other media
│ ├── css/                 # All CSS files for styling the site
│ │ ├── footer.css         # Footer-specific styles
│ │ ├── navbar.css         # Navbar-specific styles
│ │ ├── styles.css         # Shared/global CSS styles
│ │ └── testimonials.css   # Testimonails-specific styles
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
│ └── scripts/             # JavaScript functionality scripts
│ │ ├── contact.js
│ │ ├── script.js          # Shared JavaScript (DOM interactions, UI logic)
│ │ ├── testimonials.js
│ │ └── weather.js         # Weather API logic and data display
├── pages/               # Internal pages linked from navigation
│ │ ├── about.html         # About Page
│ │ ├── contact.html       # Contact form page (submits to db.json)
│ │ ├── halloffame.html    # Hall of Fame
│ │ ├── services.html      # Services offered by the subject or business
│ │ └── testimonials.html  # Testimonials (submits to couchDB)
├── .gitignore             # Specifies files/folders Git should ignore
├── db.json                # Stores submitted contact form data (local JSON db)
├── external.json          # Simulated external data (e.g., services, weather)
├── index.html             # Main homepage for the site
├── notes.md               # This project notes and documentation file
├── package-lock.json
├── package.json
├── README.md
└── server.js