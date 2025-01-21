const sendEmail = require('../config/emailService');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

const sendEmailController = async (req, res) => {
  const { name, email, message } = req.body;

  // Vérification des champs
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    // Récupérer l'email du destinataire et le préfixe du sujet depuis les variables d'environnement
    const emailDestinataire = process.env.EMAIL_DESTINATAIRE;
    const subjectPrefix = process.env.EMAIL_SUBJECT_PREFIX || 'Nouveau message de';

    // Appel de la fonction d'envoi d'email
    const result = await sendEmail({
      to: emailDestinataire, // Utiliser l'email configuré dans .env
      subject: `${subjectPrefix} ${name}`, // Utiliser le préfixe configuré dans .env
      text: `De : ${name} <${email}>\n\nMessage:\n${message}`,
      html: `<p><strong>De :</strong> ${name} &lt;${email}&gt;</p><p><strong>Message :</strong></p><p>${message}</p>`,
    });

    // Vérification de l'envoi de l'email
    if (result.success) {
      return res.status(200).json({ message: 'Email envoyé avec succès.' });
    } else {
      return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

module.exports = { sendEmailController };
