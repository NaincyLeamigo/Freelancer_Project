export const verifyAccountTemplate = (otp: string) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f8;padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;">

          <!-- Gradient Header -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #4a3aff, #8a3aff);
              padding:32px 20px;
              text-align:center;
              font-family:Arial, sans-serif;
            ">
              <h1 style="margin:0;color:white;font-size:26px;font-weight:700;">
                Verify Your Account
              </h1>
              <p style="margin:8px 0 0;color:#e8e8ff;font-size:14px;">
                SkyOffice — Smart & Secure Work Platform
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;font-family:Arial, sans-serif;color:#444;">

              <p style="font-size:16px;margin:0 0 15px;">
                Thank you for signing up at <strong>SkyOffice</strong> 🎉
              </p>

              <p style="font-size:16px;line-height:22px;margin:0 0 22px;">
                To complete your registration, please verify your email using the OTP below:
              </p>

              <!-- OTP Box -->
              <div style="
                margin:26px auto;
                text-align:center;
                font-size:36px;
                font-weight:bold;
                letter-spacing:10px;
                color:#4a3aff;
                background:#f5f4ff;
                padding:18px 0;
                width:80%;
                border-radius:10px;
                border:1px solid #e0dfff;
              ">
                ${otp}
              </div>

              <p style="font-size:14px;color:#666;margin:20px 0 0;">
                This code is valid for <strong>5 minutes</strong>.  
                If you didn’t sign up for SkyOffice, you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px;text-align:center;color:#aaa;font-family:Arial, sans-serif;font-size:12px;border-top:1px solid #eee;">
              © ${new Date().getFullYear()} SkyOffice. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
`;
