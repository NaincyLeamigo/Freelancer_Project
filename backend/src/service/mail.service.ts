import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    },
});


export const sendMail = async (to: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: `"SkyOffice" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
         return true;
        } catch (err) {
        console.error("sendMail error", err);
        return false;
    }
};