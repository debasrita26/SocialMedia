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
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: C5uPaSEp9KAbYdkfD5bI9DYFxupzwFiT,//process.env.JWT_SECRET,//'codeial',
    morgan:{
        mode:'dev',
        options: {stream: accessLogStream}
    }
}

const production={
    name: 'production',
    asset_path: process.env.ASSET_PATH,
    session_cookie_key: process.env.SESSION_COOKIE_KEY , //YXhW0OlhLCHD3j2jFRRP0t1ZUoqffshf
    db: process.env.DB,
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: process.env.USER,
            pass: process.env.PASSWORD
        },
        tls:{
            rejectUnauthorized: false
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: "C5uPaSEp9KAbYdkfD5bI9DYFxupzwFiT",
    morgan:{
        mode:'combined',
        options: {stream: accessLogStream}
    }
}

module.exports=eval(process.env.ENVIRONMENT)==undefined ? development: eval(process.env.ENVIRONMENT);