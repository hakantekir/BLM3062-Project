const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productSchema = require('./Schema/product');
dotenv.config();

try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to Mongo Successfully!");
} catch (error) {
    console.log(error);
}

const getLastDocument = async () => {
    try {
        const lastDocument = await productSchema.findOne().sort({ _id: -1 });
        return lastDocument;
    } catch (error) {
        console.log(error);
    }
}

getLastDocument().then((lastDocument) => {
    if (!lastDocument) {
        const product = new productSchema({
            value: 0
        });
        product.save().then(() => {
            console.log("Product created successfully!");
        }).catch((error) => {
            console.log(error);
        });
    }
})
