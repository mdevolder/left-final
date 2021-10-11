// const nodemailer = require('nodemailer')
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

import nodemailer from 'nodemailer'
if (process.env.NODE_ENV !== 'production') {
  import dotenv from 'dotenv'
  dotenv.config()
}

const contactForm = document.getElementById('contactForm')
const flashMsg = document.getElementById('flashMsg')
const successMsg =
  '<div class="alert alert-success alert-dismissible fade show" role="alert"><h4 class="alert-heading">Thank you for contacting us.</h4><p>We will be in touch shortly.</p><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
const errorMsg =
  '<div class="alert alert-danger alert-dismissible fade show" role="alert"><h4 class="alert-heading">Oops! Something went wrong.</h4><p>Please contact us at leftfinalaircraftleasing@gmail.com.</p><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

async function submitForm(event) {
  event.preventDefault()
  const contactName = contactForm.contactName.value
  const contactEmail = contactForm.contactEmail.value
  const contactSubject = contactForm.contactSubject.value
  const contactMessage = contactForm.contactMessage.value
  console.log(contactName, contactEmail, contactSubject, contactMessage)

  let transporter = await nodemailer.createTransport({
    service: 'Zoho',
    auth: {
      user: process.env.ZOHO_CLIENT_ID,
      pass: process.env.ZOHO_CLIENT_PWD,
    },
  })

  const message = {
    from: process.env.ZOHO_CLIENT_ID,
    to: 'matthew.devolder@gmail.com',
    subject: `Contact Form Message: ${contactSubject}`,
    text: `Name: ${contactName}\nEmail: ${contactEmail}\nMessage: ${contactMessage}`,
  }

  transporter.sendMail(message, (err) => {
    if (err) {
      console.log(err)
      flashMsg.innerHTML = errorMsg
    } else {
      contactForm.reset()
      flashMsg.innerHTML = successMsg
    }
  })
}

contactForm.addEventListener('submit', submitForm)
