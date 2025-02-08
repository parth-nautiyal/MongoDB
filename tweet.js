//one to many : A farm with many products
const mongoose = require('mongoose');
const {Schema} = mongoose;

main().catch(err => console.log(err));
        async function main() {
            await mongoose.connect('mongodb://127.0.0.1:27017/Demo');
            console.log("Connected with Mongoose")
        }
        
const userSchema = new Schema({ 
    name: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async()=>{
    const user = new User({ name: 'John', age: 25 });
    const tweet1 = new Tweet({ text: 'I love my dog', likes: 0 });
    tweet1.user = user;
    user.save();
    tweet1.save();
}
makeTweets();