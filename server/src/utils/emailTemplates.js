export const verifyEmailTemplate = (name, url) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verify Your Email</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f6f9fc; width: 100%;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <!-- Main Container -->
        <table width="480" cellpadding="0" cellspacing="0" border="0" style="max-width: 480px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 40px 40px 20px 40px;">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); border-radius: 50%; margin-bottom: 24px; display: inline-block;"></div>
              <h1 style="margin: 0; color: #1a1f36; font-size: 28px; font-weight: 600; letter-spacing: -0.02em;">Verify your email</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td align="center" style="padding: 0 40px;">
              <p style="margin: 0 0 24px 0; color: #4a5568; font-size: 16px; line-height: 24px; text-align: left;">
                Hi <strong style="color: #1a1f36;">${name}</strong>,
              </p>
              <p style="margin: 0 0 32px 0; color: #4a5568; font-size: 16px; line-height: 24px; text-align: left;">
                Thanks for signing up! Please verify your email address to get started with your account.
              </p>
            </td>
          </tr>
          
          <!-- Button -->
          <tr>
            <td align="center" style="padding: 0 40px;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" bgcolor="#2563eb" style="background-color: #2563eb; border-radius: 8px;">
                    <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 40px; background-color: #2563eb; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px; border: 1px solid #2563eb; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Alternative Link -->
          <tr>
            <td align="center" style="padding: 24px 40px 0 40px;">
              <p style="margin: 0 0 16px 0; color: #718096; font-size: 14px; line-height: 20px;">
                Or copy this link:<br>
                <span style="color: #4a5568; word-break: break-all;">${url}</span>
              </p>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td align="center" style="padding: 24px 40px 0 40px;">
              <div style="height: 1px; background-color: #e2e8f0; width: 100%;"></div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 40px 40px 40px;">
              <p style="margin: 0 0 16px 0; color: #718096; font-size: 14px; line-height: 20px;">
                This link expires in 24 hours.<br>
                If you didn't create an account with us, please ignore this email.
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 18px;">
                © ${new Date().getFullYear()} Findora. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
        
        <!-- Extra Footer -->
        <table width="480" cellpadding="0" cellspacing="0" border="0" style="max-width: 480px; width: 100%; margin-top: 24px;">
          <tr>
            <td align="center" style="padding: 0 40px;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 18px;">
                Need help? Contact us at 
                <a href="mailto:support@findora.com" style="color: #2563eb; text-decoration: none;">support@findora.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const resetPasswordTemplate = (name, url) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f6f9fc; width: 100%;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="480" cellpadding="0" cellspacing="0" border="0" style="max-width: 480px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <tr>
            <td align="center" style="padding: 40px 40px 20px 40px;">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #0f766e 0%, #0f172a 100%); border-radius: 50%; margin-bottom: 24px; display: inline-block;"></div>
              <h1 style="margin: 0; color: #1a1f36; font-size: 28px; font-weight: 600; letter-spacing: -0.02em;">Reset your password</h1>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 40px;">
              <p style="margin: 0 0 24px 0; color: #4a5568; font-size: 16px; line-height: 24px; text-align: left;">
                Hi <strong style="color: #1a1f36;">${name}</strong>,
              </p>
              <p style="margin: 0 0 32px 0; color: #4a5568; font-size: 16px; line-height: 24px; text-align: left;">
                We received a request to reset your Findora password. If this was you, click below to set a new one.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 40px;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" bgcolor="#0f172a" style="background-color: #0f172a; border-radius: 8px;">
                    <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 40px; background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px; border: 1px solid #0f172a;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 24px 40px 0 40px;">
              <p style="margin: 0 0 16px 0; color: #718096; font-size: 14px; line-height: 20px;">
                Or copy this link:<br>
                <span style="color: #4a5568; word-break: break-all;">${url}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 24px 40px 40px 40px;">
              <p style="margin: 0 0 16px 0; color: #718096; font-size: 14px; line-height: 20px;">
                This reset link expires in 30 minutes.<br>
                If you didn't request this, you can safely ignore this email.
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 18px;">
                © ${new Date().getFullYear()} Findora. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
