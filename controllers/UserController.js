const User = require('../model/User')
const jwt = require('jsonwebtoken')

exports.login = function (req, res) { 
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Remplissez les champs vides' })
  }
  User.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).json({
        'error': 'Il y a une erreur'
      })
    }

    if (!user) {
      return res.status(422).json({ 'error': 'Utilisateur invalide' })
    }

    if (user.hasSamePassword(password)) {
      json_token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        env.secret,
        { expiresIn: '1h' })

      return res.json(json_token)
    }
    else {
      return res.status(422).json({ 'error': 'E-mail ou mot de passe incorrect' })
    }
  })
}

exports.authMiddleware = function (req, res, next) {
  const json_token = req.headers.authorization
  try {
    if (json_token) {
      const user = parseToken(json_token)
      User.findById(user.userId, function (err, user) {
        if (err) {
          return res.status(422).json({
            'error': 'Il y a une erreur'
          })
        }
        if (user) {
          res.locals.user = user
          next()
        }
        else {
          return res.status(422).json({ 'error': 'Utilisateur no autorisé' })
        }
      })
    }
    else {
      return res.status(422).json({ 'error': 'Utilisateur no autorisé' })
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err
    })
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], env.secret)
}