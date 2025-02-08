//one to many : A farm with many products
const mongoose = require('mongoose');
const {Schema} = mongoose;

main().catch(err => console.log(err));
        async function main() {
            await mongoose.connect('mongodb://127.0.0.1:27017/Demo');
            console.log("Connected with Mongoose")
        }
        
const ProductSchema = new Schema({ 
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
})

const FarmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = mongoose.model('Product', ProductSchema);
const Farm = mongoose.model('Farm', FarmSchema);

const makeFarm = async()=>{
    const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA' });
    const melon = new Product({ name: 'Watermelon', price: 4.99, season: 'Summer' });
    melon.save();
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
}

Farm.findOne({ name: 'Full Belly Farms' })
.populate('products')
.then(farm => console.log(farm))