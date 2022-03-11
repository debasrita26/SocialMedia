const queue=require('../config/kue');
const commentmailer=require('../mailers/comments_mailer');


queue.process('emails',function(job,done){
    console.log('email worker is processing a job',job.data);

    commentmailer.newComment(job.data);
    done();
});