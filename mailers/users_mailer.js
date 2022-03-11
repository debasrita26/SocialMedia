const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.resetPassword = (user) =>
{
    let htmlString = nodeMailer.renderTemplate({user: user}, '/users/password_reset.ejs');
    console.log('Inside resetPassword Mailer');

    nodeMailer.transporter.sendMail({
        from: 'debasrita.banerjee26@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: "Reset Your Password", // Subject line
        html: htmlString // html body
        } ,
        (err , info) =>
        {
        if(error){
            console.log("Error in sending mail",err);
            return;
        }

        //console.log("Message Sent" , info);
        return;
      }
    );
}


exports.signupSuccess = (user) => 
{
    let htmlString = nodemailer.renderTemplate({user: user}, '/users/signup_successful.ejs');
    console.log('Inside signupSuccessful Mailer');

    nodeMailer.transporter.sendMail
    (
        {
            from: 'debasrita.banerjee26@gmail.com',
            to: user.email,
            subject: "Welcome to Codeial!",
            html: htmlString
        },
        (err, info) =>
        {
            if(err)
            {
                console.log('Error in sending mail', err);
                return;
            }
            //console.log('Message sent', info);
            return;
        }
    );
}