const nodeMailer=require('../config/nodemailer');


exports.newComment = (comment) => {
    let htmlString=nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'debasrita.banerjee26@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    }, (err,info) => {
        if(err){ 
            console.log('error in sending email',err);
            return;
        }

       // console.log('Mail Sent',info);
        return;
    });
}