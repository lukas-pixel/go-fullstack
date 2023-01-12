const express = ('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

exports.login = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (user === null) {
        res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            } else {
              res.status(200).json({
                userId: user._id,
                token: 'TOKEN'
              });
            }
          })
          .catch(error => res.status(500).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
}

modules.exports = router;