const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})

//runs this before running userSchema.save function
userSchema.pre("save", async function(next){
    try {
        if(!this.isModified("password")){
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(passwordToCheck, next){
    try {
        let isMatch = await bcrypt.compare(passwordToCheck, this.password);
        return isMatch;
    } catch(err) {
        return next(err);
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;