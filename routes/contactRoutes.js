const express = require('express');
const sendEmail = require('../config/emailService'); // Importer le service d'envoi d'email
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;



  if (!name || !email || !message) {
 
    return res.status(400).json({ success: false, error: 'Tous les champs (nom, email, message) sont requis.' });
  }

  try {


    // Appel du service d'envoi d'email
    const response = await sendEmail({
      to: process.env.MAIL_FROM,  
      subject: 'Nouveau message via le formulaire de contact',
      text: `Nom : ${name}\nEmail : ${email}\nMessage : ${message}`,
      html: `<p><b>Nom :</b> ${name}</p>
             <p><b>Email :</b> ${email}</p>
             <p><b>Message :</b></p>
             <p>${message}</p>`,
    });

 


    if (response.success) {
     
      return res.status(200).json({ success: true, message: 'Email envoyé avec succès.' });
    } else {
    
   
      throw new Error(response.error || 'Erreur inconnue lors de l\'envoi de l\'email.');
    }
  } catch (error) {

  
    res.status(500).json({ success: false, error: error.message || 'Impossible d\'envoyer l\'email.' });
  }
});

module.exports = router;
