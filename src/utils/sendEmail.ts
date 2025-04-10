import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

interface EmailOptions {
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

export async function sendEmail({
	to,
	subject,
	text,
	html,
}: EmailOptions): Promise<void> {
	const transporter = nodemailer.createTransport({
        service: "gmail", // or use 'smtp.ethereal.email' for testing
		// host: "smtp.gmail.com", // or use 'smtp.ethereal.email' for testing
		// secure: true,
		// port: 587, // 465 for secure, 587 for TLS
		auth: {
			user: process.env.EMAIL_USER, // your email
			pass: process.env.EMAIL_PASS, // your email password or app password
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject,
		text,
		html,
	};

	console.log("EMAIL_USER:", process.env.EMAIL_USER);
	console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
	console.log(mailOptions);

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent:", info.response);
	} catch (error) {
		console.error("Error sending email:", error);
	}
}
