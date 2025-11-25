import {mongoose, Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: Text,
        required: true
    },
    email: {
        type:Text,
        required: true
    },
    password: {
        type: Text,
        required: true
    }
});

const Users = mongoose.models.Users || mongoose.model('Users', userSchema);

export default Users;