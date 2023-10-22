import { NextResponse } from "next/server";

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://perumalkce2022:zORuZI7pZA55R2kC@cluster0.8hsthk7.mongodb.net/ticketDB"; // Replace with your MongoDB connection URI
const client = new MongoClient(uri);

// Example usage of the Ticket model to find all tickets
export async function GET() {
  try {
    await client.connect();
    const db = client.db("ticketDB");
    const collection = db.collection("tickets");

    const tickets = await collection.find({});
    const obj = {
      data: tickets,
    };
    console.log(tickets);
    return NextResponse.json({
      message: "Ticket Created",
      data: obj,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await client.connect();

    const db = client.db("ticketDB");
    const collection = db.collection("tickets");

    const body = await req.json();
    const ticketsData = body.formData;
    const result = await collection.insertOne(ticketsData);

    // Create a single document
    console.log("Inserted document ID:", result.insertedId);
    return NextResponse.json({ message: "Ticket Created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    alert(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await client.close();
  }
}
