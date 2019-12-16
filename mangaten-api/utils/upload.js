const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(__dirname, '..', 'uploads', 'images');

    cb(null, folderPath)
  },
  filename: (req, file, cb) => {
    debugger
    const fileName = `${Date.now()}-${file.originalname}`

    cb(null, fileName)
  }
})

const upload = multer({ storage })

module.exports = upload