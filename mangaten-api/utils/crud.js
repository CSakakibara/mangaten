const getOne = (model) => async (req, res) => {
  const id = req.params.id // recebe o id

  try {
    const item = await model.findOne({ _id: id }).exec() // procura produto com o id

    res.json({ item }) // retorna o item
  } catch (error) {
    console.error(error)
    res.status(404).end()
  }
}

const getMany = (model) => async (req, res) => {
  try {
    const items = await model.find({}).exec() // traz todos os itens da coleção

    res.json({ items }) // retorna os itens
  } catch (error) {
    console.error(error)
    res.status(404).end()
  }
}

const createOne = (model) => async (req, res) => {
  const item = req.body // pega os dados na requisição

  try {
    const created = await model.create(item)
    res.status(201).json({ data: created })
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}

const updateOne = (model) => async (req, res) => {
  const id = req.params.id // recebe o id
  const item = req.body // pega os dados na requisição

  try {
    const updated = await model.findOneAndUpdate({ _id: id }, item, { new: true }).lean().exec()

    if (!updated) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updated })
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}

const removeOne = (model) => async (req, res) => {
  const id = req.params.id // recebe o id

  try {
    const removed = await model.findOneAndRemove({ _id: id })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}

function makeCrudController (model) {
  return {
    getOne: getOne(model),
    createOne: createOne(model),
    getMany: getMany(model),
    updateOne: updateOne(model),
    removeOne: removeOne(model)
  }
}

module.exports = makeCrudController
