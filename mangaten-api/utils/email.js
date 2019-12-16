const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mailer.mangaten@gmail.com',
    pass: '10mangaten'
  }
})

function sendEmail(emailAddress, title, body) {
  const mailOptions = {
    from: 'mailer.mangaten@gmail.com', // sender address
    to: emailAddress, // list of receivers
    subject: title, // Subject line
    html: body // plain text body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    debugger
    if (err) {
      return console.log(err)
    }

    console.log(info)
  })
}

module.exports = {
  sendEmail
}