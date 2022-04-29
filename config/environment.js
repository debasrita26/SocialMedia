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
            pass: process.env.PASSWORD
        },
        tls:{
            rejectUnauthorized: false
        }
    },
    google_client_id: "590796045264-mafvqdof5vuk9tf4a7upaucvtm1ojdbi.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8111/users/auth/google/callback",
    jwt_secret: "C5uPaSEp9KAbYdkfD5bI9DYFxupzwFiT",
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
    google_call_back_url: "http://sociobuzz.herokuapp.com/users/auth/google/callback",
    jwt_secret: process.env.SOCIO_JWT_SECRET,
    morgan:{
        mode:'combined',
        options: {stream: accessLogStream}
    }
}

module.exports=eval(process.env.NODE_ENVIRONMENT)==undefined ? development: eval(process.env.ENVIRONMENT);