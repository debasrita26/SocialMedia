const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../prodution_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});

const development={
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'social_media_db',
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: 'api.new21',
            pass: 'apicreatedbyme'
        },
        tls:{
            rejectUnauthorized: false
        }
    },
    google_client_id: "590796045264-mafvqdof5vuk9tf4a7upaucvtm1ojdbi.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan:{
        mode:'dev',
        options: {stream: accessLogStream}
    }
}

const production={
    name: 'production',
    asset_path: process.env.port,
    session_cookie_key: process.env.SESSION_COOKIE_KEY , //3qrKt5n8Sdni0YCy9gkdUDOaMQMoa1Bi
    db: process.env.DB,
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        },
        tls:{
            rejectUnauthorized: false
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.JWT_SECRET,
    morgan:{
        mode:'combined',
        options: {stream: accessLogStream}
    }
}

module.exports=eval(process.env.NAME)==undefined ? development: eval(process.env.NAME);