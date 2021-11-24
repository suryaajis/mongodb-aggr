const { connect, getDatabase } = require("./config/mongodb");

// connect()
// .then(() => {
//   console.log('Find list of all products sold (orders)');
//   const db = getDatabase();
//   const orderCollection = db.collection("orders")
//   return orderCollection.distinct("product_name")
// })
// .then((data) => console.log(data))
// .catch((err) => console.log(err))

async function connection() {
  await connect();
  const db = await getDatabase();
  return db;
}

const readQuantity = async () => {
  try {
    const db = await connection();
    const orderCollection = db.collection("orders");

    const pipeline = [
      { $match: {} },
      { $group: { _id: "$customer", total_order: { $sum: "$quantity" } } },
    ];

    const aggCursor = await orderCollection.aggregate(pipeline);
    aggCursor.forEach((el) => console.log(el));
  } catch (err) {
    console.log(err);
  }
};
// readQuantity()

const readTotalPrice = async () => {
  try {
    const db = await connection();
    const orderCollection = db.collection("orders");

    const pipeline = [
      { $match: { product_name: { $in: ["Apple", "Fresh Meat"] } } },
      { $group: { _id: "$product_name", total: { $sum: "$total_price" } } },
      { $sort: { total: -1 } },
    ];

    const aggCursor = await orderCollection.aggregate(pipeline);
    aggCursor.forEach((el) => console.log(el));
  } catch (err) {
    console.log(err);
  }
};
// readTotalPrice();

const readUserAge = async () => {
  try {
    const db = await connection();
    const userColl = db.collection("users");

    const pipeline = [
      { $match: {} },
      { $group: { _id: { age: "$info.age", name: "$name" } } },
      { $sort: { "_id.age": -1 } },
      { $limit: 2 },
    ];

    const aggCursor = await userColl.aggregate(pipeline);
    aggCursor.forEach((el) => console.log(el));
  } catch (err) {
    console.log(err);
  }
};
// readUserAge();

const readUserSpecifically = async () => {
  try {
    const db = await connection();
    const userColl = db.collection("users");

    const pipeline = [
      { $unwind: "$info.hobby" },
      { $project: { name: 1, email: 1, _id: 0, "info.age": 1, "info.hobby": 1 } },
    ];

    const aggCursor = await userColl.aggregate(pipeline);
    aggCursor.forEach((el) => console.log(el));
  } catch (err) {
    console.log(err);
  }
};
// readUserSpecifically();
