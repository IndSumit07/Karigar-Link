import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const sender = {
      email: process.env.BREVO_SENDER_EMAIL,
      name: "KarigarLink",
    };

    await transEmailApi.sendTransacEmail({
      sender,
      to: [{ email: to }],
      subject,
      htmlContent,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(
      "❌ Email send error:",
      error.response?.text || error.message
    );
  }
};

//
// 🌟 1. Registration OTP Email
//
export const sendVerificationEmail = async (to, otp) => {
  const subject = "Verify Your Email - KarigarLink";
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification - KarigarLink</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6fb;
      font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
    }
    .container {
      max-width: 620px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      border: 1px solid #eaeaea;
    }
    .header {
      background: linear-gradient(135deg, #0072ff, #00c6ff);
      color: #fff;
      padding: 35px 25px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px;
      text-align: center;
      color: #333;
    }
    .content h2 {
      font-size: 22px;
      margin-bottom: 12px;
      color: #0072ff;
    }
    .content p {
      font-size: 15px;
      line-height: 1.6;
      color: #444;
    }
    .otp-box {
      display: inline-block;
      margin: 20px 0;
      padding: 15px 40px;
      border-radius: 8px;
      background: #f0f7ff;
      border: 2px dashed #0072ff;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 5px;
      color: #003366;
    }
    .note {
      font-size: 13px;
      color: #777;
      margin-top: 10px;
    }
    .footer {
      background: #f4f6fb;
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #555;
      border-top: 1px solid #eaeaea;
    }
    .footer a {
      color: #0072ff;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>KarigarLink</h1>
      <p>Empowering Rural Creators</p>
    </div>

    <div class="content">
      <h2>Email Verification</h2>
      <p>Thank you for joining <strong>KarigarLink</strong>!<br>
      Please use the OTP below to verify your email address:</p>

      <div class="otp-box">{{OTP_CODE}}</div>

      <p class="note">This OTP will expire in <strong>10 minutes</strong>.<br>
      Do not share it with anyone.</p>
    </div>

    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:support@karigarlink.com">support@karigarlink.com</a><br>
      © 2025 KarigarLink. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`.replace("{{OTP_CODE}}", otp);

  await sendEmail(to, subject, htmlContent);
};

//
// 🌟 2. Successfully Registered Email
//
export const sendRegistrationSuccessEmail = async (to, userName) => {
  const subject = "Welcome to KarigarLink 🎉 - Registration Successful";
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to KarigarLink</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6fb;
      font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
    }
    .container {
      max-width: 620px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      border: 1px solid #eaeaea;
    }
    .header {
      background: linear-gradient(135deg, #00c6ff, #0072ff);
      color: #fff;
      text-align: center;
      padding: 35px 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px;
      text-align: center;
      color: #333;
    }
    .content h2 {
      font-size: 22px;
      color: #0072ff;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 15px;
      color: #555;
      line-height: 1.6;
    }
    .highlight {
      background: #f0f7ff;
      border-left: 4px solid #0072ff;
      padding: 12px;
      margin: 20px 0;
      border-radius: 6px;
      color: #333;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #0072ff, #00c6ff);
      color: #fff !important;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 15px;
    }
    .footer {
      background: #f4f6fb;
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #555;
      border-top: 1px solid #eaeaea;
    }
    .footer a {
      color: #0072ff;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to KarigarLink 🎉</h1>
    </div>

    <div class="content">
      <h2>Hi ${userName || "there"}, your registration is successful!</h2>
      <p>We’re excited to have you join <strong>KarigarLink</strong> — a digital bridge empowering artisans, creators, and entrepreneurs across India.</p>

      <div class="highlight">
        Explore opportunities, connect with buyers, and grow your craft with trust and transparency.
      </div>

      <a href="https://karigar-link.vercel.app" class="button">Go to Dashboard</a>
    </div>

    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:support@karigarlink.com">support@karigarlink.com</a><br>
      © 2025 KarigarLink. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

  await sendEmail(to, subject, htmlContent);
};

//
// 🌟 3. Forgot Password Reset OTP Email
//
export const sendPasswordResetEmail = async (to, otp) => {
  const subject = "Reset Your Password - KarigarLink";
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset - KarigarLink</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6fb;
      font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
    }
    .container {
      max-width: 620px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      border: 1px solid #eaeaea;
    }
    .header {
      background: linear-gradient(135deg, #ff512f, #dd2476);
      color: #fff;
      text-align: center;
      padding: 35px 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px;
      text-align: center;
      color: #333;
    }
    .content h2 {
      font-size: 22px;
      margin-bottom: 12px;
      color: #dd2476;
    }
    .content p {
      font-size: 15px;
      color: #555;
      line-height: 1.6;
    }
    .otp-box {
      display: inline-block;
      margin: 20px 0;
      padding: 15px 40px;
      border-radius: 8px;
      background: #fff5f8;
      border: 2px dashed #dd2476;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 5px;
      color: #8b0038;
    }
    .note {
      font-size: 13px;
      color: #777;
      margin-top: 10px;
    }
    .footer {
      background: #f4f6fb;
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #555;
      border-top: 1px solid #eaeaea;
    }
    .footer a {
      color: #dd2476;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>

    <div class="content">
      <h2>Forgot Your Password?</h2>
      <p>Don’t worry, we’ve got you covered! Use the OTP below to reset your password for <strong>KarigarLink</strong>:</p>

      <div class="otp-box">{{OTP_CODE}}</div>

      <p class="note">This OTP will expire in <strong>10 minutes</strong>.<br>
      If you didn’t request this, you can safely ignore this email.</p>
    </div>

    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:support@karigarlink.com">support@karigarlink.com</a><br>
      © 2025 KarigarLink. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`.replace("{{OTP_CODE}}", otp);

  await sendEmail(to, subject, htmlContent);
};
