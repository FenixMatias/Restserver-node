const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    name:{
        type: String,
        required: [true, 'Campo obligatorio']
    },
    email:{
        type: String,
        required: [true, 'Campo obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Campo obligatorio']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user
}

module.exports = model('User', UserSchema);