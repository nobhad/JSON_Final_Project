// File: /controllers/hallOfFameController.js
// Purpose: Handle logic for Hall Of Fame page


exports.showHallOfFame = (req, res) => {
  const dogs = [
    { name: 'Arrow', breed: 'Australian Cattle Dog Mix', image: '/img/arrow1.jpg' },
    { name: 'Arrow', breed: 'G.O.A.T.', image: '/img/arrow2.jpg' },
    { name: 'Arrow', breed: 'Ever Expadning Force of Love', image: '/img/arrow3.jpg' },
    { name: 'Peggy', breed: 'Arizona Desert Dog', image: '/img/peggy.jpg' },
    { name: 'Stella', breed: 'Arizona Desert Dog', image: '/img/stella.jpg' },
    { name: 'Sheena', breed: 'Boston Terrier', image: '/img/sheena.jpg' }
  ];

  res.render('pages/halloffame', { dogs, user: req.session.user || null, title: 'Hall of Fame' });
};
