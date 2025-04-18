const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://dipak291548:dipak291548@cluster0.hmkaqjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

console.log('Attempting to connect to MongoDB...');
console.log(`Connection string: ${MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`); // Hide credentials in logs

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB!');
  process.exit(0);
})
.catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
}); 