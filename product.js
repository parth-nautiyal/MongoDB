const mongoose = require('mongoose');
const {Schema} = mongoose;
 
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Demo');
    console.log("Connected with Mongoose")
}

// Define a schema for a user
const UserSchema = new Schema({
    name: String,
    age: Number,
    addresses: [
        {
            _id: { _id: false },// if you want to disable the _id
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
});

// Make a model
const User = mongoose.model('User', UserSchema);
// make a new user 
const makeUser = async()=>{
    const user = new User({
        name: 'John',
        age: 25,
        addresses: [
            { street: '123 Main St', city: 'New York', state: 'NY', country: 'USA' },
            { street: '123 Elm St', city: 'San Francisco', state: 'CA', country: 'USA' }
        ]
    });
    await user.save()
    console.log(user)
}

makeUser();