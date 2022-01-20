const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: mongoose.Types.ObjectId,
        default: null,
    },
    token: {
        type: Boolean,
        default: false
    },
    JoinedAt: {
        type: String,
        immutable: true
    },
    description: {
        type: String,
        default: "This user has not set the description yet"
    },
    points: Number,
    comments: [{
        _id: mongoose.Types.ObjectId,
        user: mongoose.Types.ObjectId,
        userprof: mongoose.Types.ObjectId,
        nickname: String,
        text: String,
        points: Number,
        createdAt: {
            type: String,
            default: Date.now(),
            immutable: true
        },
        likes: [{
            type: mongoose.Types.ObjectId,
            unique: true
        }],
        photoid: mongoose.Types.ObjectId
    }],
    likes: [{
        type: mongoose.Types.ObjectId,
        unique: true
    }],
    posts: [{
        nickname: String,
        likes: [{
            type: mongoose.Types.ObjectId,
            unique: true
        }],
        text: String,
        _id: mongoose.Types.ObjectId,
        userprof: mongoose.Types.ObjectId,
        createdAt: Number,
        points: Number,
        photoid: mongoose.Types.ObjectId,
        comments: [{
            _id: {
                type: mongoose.Types.ObjectId,
                unique: true
            },
            user: mongoose.Types.ObjectId,
            userprof: mongoose.Types.ObjectId,
            nickname: String,
            text: String,
            points: Number,
            createdAt: Number,
            likes: [{
                type: mongoose.Types.ObjectId,
                unique: true
            }],
            photoid: mongoose.Types.ObjectId
        }]
    }],
    saved: [{
        type: mongoose.Types.ObjectId
    }]
})

module.exports = mongoose.model("users", userSchema)