const mongoose = require('mongoose');

const multer= require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String
     },
     accessToken:
    {
        type: String,
        default: 'abc'
    },
    isTokenValid:
    {
        type: Boolean,
        default: false
    },
    friendship : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]
}, 
{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  //static methods
userSchema.statics.uploadedAvatar= multer({ 
    storage: storage ,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.jfif')  {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
}).single('avatar');

userSchema.statics.avatarPath=AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;