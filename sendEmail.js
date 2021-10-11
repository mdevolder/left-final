const nodemailer = require('nodemailer')
if (process.env.NODE_ENV !== production) {
  require('dotenv').config()
}

async function sendEmail(message) {
  let transporter = await nodemailer.createTransport({
    service: 'Zoho',
    auth: {
      user: process.env.ZOHO_CLIENT_ID,
      pass: process.env.ZOHO_CLIENT_PWD,
    },
  })
}
