export const otpTemplate = (otp: string) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f7;padding:40px 0;">
    <tr>
      <td align="center">

        <!-- CARD -->
        <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;">

          <!-- HEADER WITH GRADIENT -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #4a3aff, #8a3aff);
              padding:30px 20px;
              text-align:center;
              font-family:Arial, sans-serif;
            ">
              <h1 style="margin:0;color:white;font-size:26px;font-weight:700;">
                SkyOffice Verification
              </h1>
              <p style="margin:8px 0 0;color:#e8e8ff;font-size:14px;">
                Secure • Fast • Professional
              </p>
            </td>
          </tr>

          <!-- BODY TEXT -->
          <tr>
            <td style="padding:25px 30px;font-family:Arial, sans-serif;color:#444;">
              <p style="font-size:16px;margin:0 0 12px;">
                Hi there,
              </p>

              <p style="font-size:16px;margin:0 0 20px;">
                Your One-Time Password (OTP) for verifying your SkyOffice account is:
              </p>

              <!-- OTP BOX -->
              <div style="
                margin:25px auto;
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

              <p style="font-size:14px;color:#666;margin:10px 0 0;">
                This OTP is valid for <strong>5 minutes</strong>.  
                Please do not share it with anyone.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
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
