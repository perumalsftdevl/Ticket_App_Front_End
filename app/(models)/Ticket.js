const mongoose = require("mongoose");
const { Schema } = mongoose;

const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// MongoDB connection URI from your .env file
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongoDB() {
  try {
    // Connect the client to the MongoDB server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Function to define and export the Mongoose Ticket model
function createTicketModel() {
  const ticketSchema = new Schema(
    {
      title: String,
      description: String,
      category: String,
      priority: Number,
      progress: Number,
      status: String,
      active: Boolean,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("Ticket", ticketSchema);
}

// Connect to MongoDB
connectToMongoDB();

// Create the Ticket model and export it
const Ticket = createTicketModel();
module.exports = Ticket;
