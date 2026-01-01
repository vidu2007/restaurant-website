import {mongoose, Schema} from "mongoose";

const userSchema = new Schema({
    userName: {
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
        select: false,
    }
});

const Users = mongoose.models.Users || mongoose.model('Users', userSchema);

export default Users;