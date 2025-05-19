import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialiser Resend avec votre clé API
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Récupérer les données du formulaire
    const { name, email, subject, message } = await request.json();

    // Valider les données reçues
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Envoyer l'email
    const data = await resend.emails.send({
      from: 'Contact Form <contact@insytra.com>', // Utilisez une adresse vérifiée sur Resend
      to: 'contact@insytra.com', // Votre adresse de destination
      subject: `Nouveau message: ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
} 