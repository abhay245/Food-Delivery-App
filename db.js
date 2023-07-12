const mongoose = require('mongoose');
require('dotenv').config()
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const foodItems = await mongoose.connection.db.collection('food_items').find({}).toArray();
    const catData = await mongoose.connection.db.collection('food_Category').find({}).toArray();

    global.food_items = foodItems;
    global.foodCategory = catData;
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
}

module.exports = connectToDatabase;

