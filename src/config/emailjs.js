// EmailJS Configuration
// You need to set up EmailJS at https://www.emailjs.com/
// 1. Create an account
// 2. Add an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your service ID, template ID, and public key

export const emailjsConfig = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_EMAILJS_SERVICE_ID',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_EMAILJS_TEMPLATE_ID',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_EMAILJS_PUBLIC_KEY',
  toEmail: 'siddhantamohanty22@gmail.com'
};

// Email template variables that will be available:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{subject}} - Email subject
// {{message}} - Email message
// {{to_email}} - Your email address 