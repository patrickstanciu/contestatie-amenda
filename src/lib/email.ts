import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function sendVerificationEmail(params: {
  to: string;
  url: string;
  expires: Date;
}) {
  const { to, url, expires } = params;

  const expiresIn = Math.round(
    (expires.getTime() - Date.now()) / 1000 / 60
  );

  const html = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Autentificare ContestațieAI</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <!-- Card -->
        <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td bgcolor="#4f46e5" style="background-color:#4f46e5;padding:36px 40px;text-align:center;">
              <p style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                ⚖️ ContestațieAI
              </p>
              <p style="margin:8px 0 0;font-size:14px;color:#c7d2fe;">
                Contestă amenda ta cu ajutorul inteligenței artificiale
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">
                Salut! 👋
              </h1>
              <p style="margin:0 0 24px;font-size:16px;color:#4b5563;line-height:1.6;">
                Ai solicitat autentificarea în contul tău <strong>ContestațieAI</strong>.
                Apasă butonul de mai jos pentru a te conecta — nu este nevoie de parolă.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 28px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td bgcolor="#4f46e5" style="background-color:#4f46e5;border-radius:10px;">
                          <a href="${url}"
                             style="display:inline-block;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;padding:14px 36px;border-radius:10px;letter-spacing:0.1px;">
                            ✉️ &nbsp; Conectează-te acum
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Info box -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;">
                    <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
                      🔒 &nbsp;Acest link este <strong>securizat</strong> și expiră în
                      <strong>${expiresIn} minute</strong>.<br/>
                      Dacă nu ai solicitat tu această autentificare, ignoră acest email — contul tău este în siguranță.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;word-break:break-all;">
                Dacă butonul nu funcționează, copiază și deschide acest link în browser:<br/>
                <a href="${url}" style="color:#6366f1;text-decoration:none;">${url}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">
                © ${new Date().getFullYear()} TECHNEST LABS SRL · CUI 49393956
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Principala 14, Dulcele, jud. Arad ·
                <a href="https://www.contestatieamenda.ro" style="color:#6366f1;text-decoration:none;">contestatieamenda.ro</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card -->

      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Salut!

Ai solicitat autentificarea în ContestațieAI.
Apasă linkul de mai jos pentru a te conecta (expiră în ${expiresIn} minute):

${url}

Dacă nu ai solicitat tu această autentificare, ignoră acest email.

---
TECHNEST LABS SRL · contestatieamenda.ro`;

  await resend.emails.send({
    from: "ContestațieAI <contact@contestatieamenda.ro>",
    to,
    subject: "🔐 Link de autentificare ContestațieAI",
    html,
    text,
  });
}
