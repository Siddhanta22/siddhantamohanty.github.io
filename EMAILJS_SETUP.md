# EmailJS Setup Guide

This guide will help you set up EmailJS to make your contact form functional so that messages are actually sent to your email inbox.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:**
```
New message from {{from_name}} - {{subject}}
```

**Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>New Contact Form Message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">New Message from Your Portfolio</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Message Details:</h3>
            <p><strong>From:</strong> {{from_name}} ({{from_email}})</p>
            <p><strong>Subject:</strong> {{subject}}</p>
            <p><strong>Date:</strong> {{date}}</p>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #1e40af;">Message:</h4>
            <p style="white-space: pre-wrap;">{{message}}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
                This message was sent from your portfolio contact form at siddhantamohanty.github.io
            </p>
        </div>
    </div>
</body>
</html>
```

4. Save the template and note down the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys" in your dashboard
2. Copy your **Public Key**

## Step 5: Configure Your Portfolio

You have two options to configure EmailJS:

### Option A: Environment Variables (Recommended)

1. Create a `.env` file in your portfolio root directory:
```bash
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

2. Replace the placeholder values with your actual IDs from EmailJS

### Option B: Direct Configuration

1. Open `src/config/emailjs.js`
2. Replace the placeholder values:
```javascript
export const emailjsConfig = {
  serviceId: 'your_service_id_here',
  templateId: 'your_template_id_here',
  publicKey: 'your_public_key_here',
  toEmail: 'siddhantamohanty22@gmail.com'
};
```

## Step 6: Test the Form

1. Start your development server: `npm start`
2. Go to the contact section
3. Fill out the form and submit
4. Check your email inbox for the message

## Step 7: Deploy

1. If using environment variables, make sure to add them to your deployment platform
2. For GitHub Pages, you'll need to use Option B (direct configuration) since environment variables aren't supported
3. Deploy your changes: `npm run deploy`

## Troubleshooting

### Common Issues:

1. **"Service not found" error**: Double-check your Service ID
2. **"Template not found" error**: Double-check your Template ID
3. **"Invalid public key" error**: Double-check your Public Key
4. **Messages not arriving**: Check your spam folder and EmailJS dashboard for delivery status

### EmailJS Dashboard Features:

- **Email Logs**: Check if emails are being sent successfully
- **Analytics**: See how many emails are sent per month
- **Rate Limits**: Free plan allows 200 emails/month

## Security Notes

- The public key is safe to expose in frontend code
- EmailJS handles the email sending securely
- No sensitive credentials are stored in your code

## Free Plan Limits

- 200 emails per month
- 2 email services
- 5 email templates
- Basic support

For higher limits, consider upgrading to a paid plan.

---

Once you've completed this setup, your contact form will be fully functional and messages will be delivered directly to your email inbox! 