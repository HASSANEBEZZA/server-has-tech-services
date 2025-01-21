const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

//  variables d'environnement
dotenv.config();

const sendEmail = async ({ to, subject, text, html }) => {
  try {

    const requiredEnvVars = [
      'SMTP_HOST',
      'SMTP_PORT',
      'SMTP_SECURE',
      'LWS_EMAIL_USERNAME',
      'LWS_EMAIL_PASSWORD',
      'MAIL_FROM'
    ];

    requiredEnvVars.forEach((envVar) => {
      if (!process.env[envVar]) {
        throw new Error(`Variable d'environnement manquante : ${envVar}`);
      }
    });

    //  transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true',  
      auth: {
        user: process.env.LWS_EMAIL_USERNAME,
        pass: process.env.LWS_EMAIL_PASSWORD,
      },
    });

    // Options de l'email
    const mailOptions = {
      from: process.env.MAIL_FROM,  // Expéditeur
      to,                          // Destinataire
      subject,                     // Sujet de l'email
      text,                        // Texte brut
      html,                        // HTML formaté
    };

    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions);


    return { success: true, messageId: info.messageId };
  } catch (error) {

    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;
