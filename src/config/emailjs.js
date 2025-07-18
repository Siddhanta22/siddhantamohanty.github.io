// EmailJS Configuration
// You need to set up EmailJS at https://www.emailjs.com/
// 1. Create an account
// 2. Add an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your service ID, template ID, and public key

export const emailjsConfig = {
  serviceId: 'service_pvqs3hx',
  templateId: 'template_ch7vrmq',
  publicKey: 'NJVUxvcGu_QqCNhPZ',
  toEmail: 'siddhantamohanty22@gmail.com'
};

// Email template variables that will be available:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{subject}} - Email subject
// {{message}} - Email message
// {{to_email}} - Your email address 