const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory=path.join(__dirname,'../prodution_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});

const development={
    name: 'development',
    asset_path: './public/assets',
    session_cookie_key: 'blahsomething',
    db: 'social_media_db',
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: 'api.new21',
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
        mode:'dev',
        options: {stream: accessLogStream}
    }
}

const production={
    name: 'production',
    asset_path: process.env.SOCIO_ASSET_PATH,
    session_cookie_key: process.env.SOCIO_SESSION_COOKIE_KEY ,
    db: process.env.SOCIO_DB,
    smtp: { 
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: process.env.SOCIO_USER,
            pass: process.env.SOCIO_PASSWORD
        },
        tls:{
            rejectUnauthorized: false
        }
    },
    google_client_id: process.env.SOCIO_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIO_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.SOCIO_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SOCIO_JWT_SECRET,
    morgan:{
        mode:'combined',
        options: {stream: accessLogStream}
    }
}

module.exports=eval(process.env.ENVIRONMENT)==undefined ? development: eval(process.env.ENVIRONMENT);