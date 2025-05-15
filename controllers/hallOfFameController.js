// File: /controllers/hallOfFameController.js
// Purpose: Handle logic for Hall Of Fame page

exports.showHallOfFame = (req, res) => {
  const dogs = [
    { name: 'Buddy', breed: 'Golden Retriever', image: '/img/placeholder.png' },
    { name: 'Luna', breed: 'Siberian Husky', image: '/img/placeholder.png' },
    { name: 'Charlie', breed: 'Beagle', image: '/img/placeholder.png' }
  ];

  res.render('pages/halloffame', { dogs, user: req.session.user || null, title: 'Hall of Fame' });
};
