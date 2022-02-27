const nodemailer = require('nodemailer');
const config = require('../core/config');
const logger = require('../core/logger');

const transport = nodemailer.createTransport(config.email.smtp);
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, html) => {
  const msg = { from: config.email.from, to, subject, text, html };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const testSendMail = async (to) => {
  const subject = 'Test Mail';
  const html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html lang="en" xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>nebula</title></head><body style="width:100%;margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%"><table width="100%" height="100%" cellPadding="0" cellSpacing="0" border="0" align="left" valign="top"><tbody><tr><td align="center" valign="top"><table width="600" align="center" cellPadding="0" cellSpacing="0" style="background-color:#000;padding:25px;width:100%" border="0" valign="top"><tbody><tr><td align="center" style="background-color:#000;padding:25px 25px 25px 25px"><span style="font-family:sans-serif;font-size:14px;line-height:14px;color:#000"><h1><a href="https://getnebula.app" target="_blank" style="color:#eee;text-decoration:none"><img style="width:157px;height:44px;padding-right:10px" src="https://uploads.codesandbox.io/uploads/user/f30bad22-cadb-433b-a299-967e03a37930/T_nT-nebula-logo-html-email-314x88.png" alt="nebula"/></a></h1></span><span style="font-family:sans-serif;font-size:14px;line-height:14px;color:#000"><h2 style="color:#eee;font-size:16px">Download the Nebula particle system designer for MacOS</h2></span></td></tr><table align="center" style="width:600px" cellPadding="0" cellSpacing="0" border="0" valign="top"><tbody><tr><td style="background-color:#222;padding:50px 50px 0px 50px;border-radius:6px 6px 0px 0px"><span style="font-family:sans-serif;font-size:14px;line-height:14px;color:#eee"><h2>Hi there 👋,</h2></span></td></tr><tr><td style="background-color:#222;padding:0px 50px 0px 50px"><span style="font-family:sans-serif;font-size:18px;line-height:18pxpx;color:#eee"><p>Thanks for signing up for the <b>Nebula</b> particle system designer alpha. Please download the app by clicking the download button below.</p><p>As part of the alpha, we&#x27;d really appreciate it if you could let us know your thoughts about the app in our <a href="https://spectrum.chat/nebula" style="color:#9f82ff">spectrum.chat</a> space.</p><p> You can also submit any bugs or issues to our <a href="https://github.com/creativelifeform/nebula-issues/issues" style="color:#9f82ff">issue tracker</a>.</p></span></td></tr><tr><td align="center" style="background-color:#222;padding:25px 50px 25px 50px"><a href="https://getnebula.app/download" target="_blank" style="color:white;text-decoration:none;font-size:22px;display:inline-block;background:#4202ff;padding:20px 100px;border-radius:6px 6px 6px 6px">Download Nebula</a></td></tr><tr><td style="background-color:#222;padding:0px 50px 50px 50px;border-radius:0px 0px 6px 6px"><span style="font-family:sans-serif;font-size:14px;line-height:14px;color:#999"><p>If you&#x27;re having trouble accessing the link, copy and paste the following link into your web browser <a target="_blank" style="color:#9f82ff;text-decoration:underline">https://getnebula.app/download</a></p></span></td></tr></tbody></table><tr><td align="center" style="background-color:#000;padding:25px 25px 25px 25px"><span style="font-family:sans-serif;font-size:14px;line-height:14px;color:#999">© <a href="http://creativelifeform.com" target="_blank" style="color:#999;text-decoration:underline">Creativelifeform</a> 2022 all rights reserved.</span></td></tr></tbody></table></td></tr></tbody></table></body></html>
  `;
  await sendEmail(to, subject, '', html);
};

module.exports = {
  transport,
  sendEmail,
  testSendMail,
};
