const { MongoClient } = require('mongodb');

async function main() {
  const url = "mongodb://127.0.0.1:27017/mydb";
  
  try {
    const client = await MongoClient.connect(url);
    console.log("Connected to MongoDB");

    const db = client.db("mydb");

    // Create collection
    await db.createCollection("customers");
    console.log("Collection created!");

    // Insert document
    const collection = db.collection("customers");
    const myobj = { name: "Company Inc", address: "Highway 37" };
    const result = await collection.insertOne(myobj);
    console.log(`${result.insertedCount} document inserted`);

    // Insert multiple documents
    const myManyObj = [
      { name: 'John', address: 'Highway 71'},
      { name: 'Peter', address: 'Lowstreet 4'},
      { name: 'Amy', address: 'Apple st 652'},
      { name: 'Hannah', address: 'Mountain 21'},
      { name: 'Michael', address: 'Valley 345'},
      { name: 'Sandy', address: 'Ocean blvd 2'},
      { name: 'Betty', address: 'Green Grass 1'},
      { name: 'Richard', address: 'Sky st 331'},
      { name: 'Susan', address: 'One way 98'},
      { name: 'Vicky', address: 'Yellow Garden 2'},
      { name: 'Ben', address: 'Park Lane 38'},
      { name: 'William', address: 'Central st 954'},
      { name: 'Chuck', address: 'Main Road 989'},
      { name: 'Viola', address: 'Sideway 1633'}
    ];
    const manyResult = await collection.insertMany(myManyObj);
    console.log(`${manyResult.insertedCount} documents inserted`);

     // Find one document
     const foundDocument = await collection.findOne({});
     console.log("Found document:", foundDocument);

     // Find all documents
     const allDocuments = await collection.find({}).toArray();
     console.log("All documents:", allDocuments);

    //additional data
    const additionalResult = await collection.find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray();
    console.log("Additional Result:", additionalResult);

    //additional data
    const query = { address: "Park Lane 38" };
    const additionalResults = await collection.find(query).toArray();
    console.log("Additional Results:", additionalResults);


    const query2 = { address: /^S/ };
    const additionalResult2 = await collection.find(query2).toArray();
    console.log("Additional Result 2:", additionalResult2);

    const mysort = { name: 1 };
    const sortedResult = await collection.find().sort(mysort).toArray();
    console.log("Sorted Result:", sortedResult);

    const myquery = { address: 'Mountain 21' };
    const deleteResult = await collection.deleteOne(myquery);
    console.log("Deleted count:", deleteResult.deletedCount);

    const myquery2 = { address: /^O/ };
    const deleteResult2 = await collection.deleteMany(myquery2);
    console.log("Deleted count:", deleteResult2.deletedCount);

    const updateQuery = { address: "Valley 345" };
    const updateValues = { $set: { name: "Mickey", address: "Canyon 123" } };
    const updateResult = await collection.updateOne(updateQuery, updateValues);
    console.log("Updated count:", updateResult.modifiedCount);

    const updateQuery2 = { address: /^S/ };
    const updateValues2 = { $set: { name: "Minnie" } };
    const updateResult2 = await collection.updateMany(updateQuery2, updateValues2);
    console.log("Updated count:", updateResult2.modifiedCount);

      // Add code for limiting results
      const limitedResult = await collection.find().limit(5).toArray();
      console.log("Limited Result:", limitedResult);

      // Additional code for aggregation
    const ordersCollection = db.collection("orders");
    const aggregationResult = await ordersCollection.aggregate([
      { $lookup:
         {
           from: 'products',
           localField: 'product_id',
           foreignField: '_id',
           as: 'orderdetails'
         }
       }
    ]).toArray();
    console.log("Aggregation Result:", aggregationResult);

  

    // const delOK = await collection.drop();
    // if (delOK) console.log("Collection deleted");


    // Close connection
    client.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
