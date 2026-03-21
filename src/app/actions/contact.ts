"use server";

import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  nume: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere."),
  email: z.string().email("Adresa de email nu este validă."),
  mesaj: z.string().min(10, "Mesajul trebuie să aibă cel puțin 10 caractere."),
});

export type ContactState = {
  success?: boolean;
  error?: string;
};

export async function trimiteContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const result = schema.safeParse({
    nume: formData.get("nume"),
    email: formData.get("email"),
    mesaj: formData.get("mesaj"),
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { nume, email, mesaj } = result.data;

  const apiKey = process.env.AUTH_RESEND_KEY;
  if (!apiKey) {
    console.error("[contact] AUTH_RESEND_KEY lipsește din environment");
    return { error: "Configurație lipsă. Contactează-ne direct pe email." };
  }

  const resend = new Resend(apiKey);

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error("[contact] ADMIN_EMAIL lipsește din environment");
    return { error: "Configurație lipsă. Contactează-ne direct pe email." };
  }

  const { error } = await resend.emails.send({
    from: "ContestațieAI <contact@contestatieamenda.ro>",
    to: adminEmail,
    replyTo: email,
    subject: `📬 Mesaj de la ${nume}`,
    html: `
      <p><strong>Nume:</strong> ${nume}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mesaj:</strong></p>
      <p style="white-space:pre-wrap">${mesaj}</p>
    `,
    text: `Nume: ${nume}\nEmail: ${email}\n\nMesaj:\n${mesaj}`,
  });

  if (error) {
    console.error("[contact] Eroare Resend:", error);
    return { error: `Eroare la trimitere: ${error.message}` };
  }

  return { success: true };
}
