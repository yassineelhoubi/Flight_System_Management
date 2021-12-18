var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thisfortestnode@gmail.com',
        pass: 'az12er34'
    }
});

module.exports = mailer = async (html, email, fName, lName) => {
    var mainOptions = {
        from: '"Tester" testmail@zoho.com',
        to: email,
        subject: 'Hello,'+ fName +' '+ lName ,
        html: html
    };

    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}