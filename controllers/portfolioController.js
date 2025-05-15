// File: /controllers/portfolioController.js
// Purpose: Handle logic for portfolio page

exports.showPortfolio = (req, res) => {
    // Sample dog data (replace with DB data if preferred)
    const dogs = [
      { name: 'Buddy', breed: 'Golden Retriever', image: '/images/dogs/buddy.jpg' },
      { name: 'Luna', breed: 'Siberian Husky', image: '/images/dogs/luna.jpg' },
      { name: 'Charlie', breed: 'Beagle', image: '/images/dogs/charlie.jpg' }
    ];
  
    res.render('portfolio', { dogs, user: req.session.userId });
  };

  