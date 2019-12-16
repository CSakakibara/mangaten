const User = require('./user.model')

const { encryptPassword } = require('../../utils/auth')

function getMe (req, res) {
  res.status(200).json({ data: req.user })
}

async function updateMe (req, res) {
  const update = { ...req.body }

  try {
    if (req.body.username || req.body.email) {
      const query = {
        $or: []
      }

      if (req.body.username) {
        query.$or.push({ username: req.body.username })
      }
      if (req.body.email) {
        query.$or.push({ email: req.body.email })
      }

      const registered = await User.findOne(query).lean().exec()

      if (registered) {
        return res.json({ message: 'Email ou username ocupado por outra conta' })
      }
    }

    if (req.body.password) {
      update.password = await encryptPassword(req.body.password)
    }

    const user = await User.findByIdAndUpdate(req.user._id, update, { projection: { password: 0, __v: 0 } }).lean().exec()

    res.status(200).json({ data: user })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

async function getMany (req, res) {
  try {
    const projections = {
      password: 0,
      __v: 0
    }
    const users = await User.find({}, projections).exec() // traz todos os itens da coleção
    res.json({ users }) // retorna os itens
  } catch (error) {
    res.status(404).end(error)
  }
}

const controller = {
  getMe,
  updateMe,
  getMany
}

module.exports = controller
