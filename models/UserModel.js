const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name.'],
        trim: true
    },

    titleHome: {
        type: String,
        required: [true, 'Please provide a title.']
    },

    cvLink: {
        type: String,
        required: [true, 'Please provide your CV link.'],
        validate: [validator.isURL, 'Please provide a valid URL for your CV.']
    },

    aboutMe: {
        type: String,
        required: [true, 'Please provide information about yourself.']
    },

    softSkill: {
        type: [String],
        required: [true, 'Please provide your soft skills.']
    },

    techSkill: {
        type: [String],
        required: [true, 'Please provide your technical skills.']
    },

    projects: [{
        projectTitle: {
            type: String,
            required: true
        },
        projectDescription: {
            type: String,
            required: true
        },
        projectLink: {
            type: String,
            required: [true, 'Please provide your Project link.'],
            validate: [validator.isURL, 'Please provide a valid URL for your Project.']
        },
    }],},
    { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined; 
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
