const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.methods.toJSON = function() {
    const {__v, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);