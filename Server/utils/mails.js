"use strict";

const nodemailer        = require("nodemailer"),                    // Module for sending mails
      sendgridTransport = require("nodemailer-sendgrid-transport"); // Module for using SendGrid


exports.senderAddress = "mapad@areu.lombardia.it";

/* Creates a transporter. */
exports.transporter = () => {

    const transporter = nodemailer.createTransport(sendgridTransport({ auth: { api_key: process.env.NODEMAILER_KEY } }));
    // const transporter = nodemailer.createTransport({ host: "smtp.areu.lombardia.it", port: 25, secure: false });

    transporter.verify(err => { if (err) console.error(`Error setting up the transporter: ${err}`) });

    return transporter;

};

/* Return the html content of the confirmation email */
exports.generateConfirmEmailContent = link => {

    return `

        <p style="margin-bottom: 50px; font-weight: 700; font-size: 40px; color: #171A2B">
            Thank you for signing in!
        </p>
        
        <p style="font-size: 18px; color: #5E5E5E">
            To confirm your DefibrillatorHunter account, please click the link below:
        </p>
        
        <a href="${link}"
           style="text-transform: uppercase;
                  font-weight: 500;
                  font-size: 18px;
                  cursor: pointer;
                  outline: none !important;">
            confirm now
        </a>
        
        <p style="font-size: 18px; color: #5E5E5E; margin-top: 40px">
            If you've received this email by mistake, please delete it.
        </p>
    
    `
};

/* Return the html content of the rest password email */
exports.generateResetPwContent = link => {

    return `

    <body style="padding: 10px 20px">
    
    <p style="margin-bottom: 50px; font-weight: 700; font-size: 40px; color: #171A2B">Reset Your Password</p>
    
    <p style="font-size: 18px; color: #5E5E5E; line-height: 1.4">
        You requested to rest your password for your DefibrillatorHunter account.
        <br>
        Use the button below to reset it. The link is only valid for the next hour.
    </p>
    
    <a href="${link}"
       style="text-transform: uppercase;
              font-weight: 500;
              font-size: 18px;
              cursor: pointer;
              outline: none !important;">
       reset your password
    </a>
    
    <p style="font-size: 18px; color: #5E5E5E; line-height: 1.4; margin-top: 40px">
        If you didn't ask to change your password, don't worry!
        <br>
        You password is still valid and you can safely delete this email.
    </p>
    
    </body>
        
    `;

};