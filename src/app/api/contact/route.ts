import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, service, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json(
        { message: 'Wszystkie wymagane pola muszą być wypełnione.' },
        { status: 400 }
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Brak konfiguracji GMAIL_USER lub GMAIL_APP_PASSWORD w zmiennych środowiskowych.');
      return NextResponse.json(
        { message: 'Błąd po stronie serwera. Skontaktuj się z administratorem lub poczekaj na konfigurację.' },
        { status: 500 }
      );
    }

    // Configure Nodemailer transporter setup for Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const targetEmail = process.env.GMAIL_RECEIVER || process.env.GMAIL_USER;

    const senderName = process.env.GMAIL_SENDER_NAME || 'Finarena Formularz';

    const mailOptions = {
      from: `"${senderName}" <${process.env.GMAIL_USER}>`, 
      to: targetEmail, 
      replyTo: email,
      subject: `Nowe Zapytanie: ${service} od ${firstName} ${lastName}`,
      html: `
        <h2>Nowe zapytanie z formularza kontaktowego Finarena</h2>
        <p><strong>Imię i nazwisko:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
        <p><strong>Obszar zainteresowania:</strong> ${service}</p>
        <br/>
        <h3>Wiadomość:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Wiadomość została wysłana.' }, { status: 200 });
  } catch (error) {
    console.error('Błąd podczas wysyłania wiadomości e-mail:', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' },
      { status: 500 }
    );
  }
}
