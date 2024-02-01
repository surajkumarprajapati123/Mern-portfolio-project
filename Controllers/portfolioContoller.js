const nodemailer = require("nodemailer");

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525, // or the port your SMTP provider specifies
      // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Error sending email",
          error,
        });
      }

      console.log("Email sent: %s", info.messageId);
      res.json({
        success: true,
        message: "Email sent successfully",
        emailInfo: info,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = sendEmailController;

// Create a transporter using your email provider's SMTP settings

// const SednMailTouser = async (req, res) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.elasticemail.com",
//     port: 2525, // or the port your SMTP provider specifies
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });

//   // Define email options
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: req.body.email,
//     subject: "This is the subject",
//     text: "And this is the body",
//   };

//   // Send the email
//   await transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.error(error);
//     }
//     res.json({
//       message: "Email sedn successfully",
//       Email: info,
//     });
//   });
// };

// module.exports = SednMailTouser;
