const express = require('express')
const path = require('path')
const ejsMate = require('ejs-mate')
const nodemailer = require('nodemailer')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

let val = null

app.get('/', (req, res) => {
  let msg = val
  val = null
  console.log(msg)
  res.render('pages/index', { msg })
})

app.post('/', (req, res) => {
  const contactInput = req.body.contact

  console.log('creating transporter')
  let transporter = nodemailer.createTransport({
    service: 'Zoho',
    auth: {
      user: process.env.ZOHO_CLIENT_ID,
      pass: process.env.ZOHO_CLIENT_PWD,
    },
  })

  console.log('Created transporter. Now creating message.')
  const message = {
    from: process.env.ZOHO_CLIENT_ID,
    to: process.env.EMAIL_INBOX,
    subject: `Contact Form Message: ${contactInput.contactSubject}`,
    text: `Name: ${contactInput.contactName}\nEmail: ${contactInput.contactEmail}\nMessage: ${contactInput.contactMessage}`,
  }

  console.log('Sending message.')
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err)
      val = 'error'
    } else {
      console.log('success')
      val = 'success'
    }

    return res.redirect('/#contact')
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Now serving on port 3000')
})
