const { connect, getDatabase } = require("./config/mongodb");

// $match, $group ($sum, $avg, $max, $min), $sort, $count, $limit, $project, $unwind, $out

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

    const aggCursor = await orderCollection.aggregate(pipeline).toArray();
    console.log(aggCursor);
  } catch (err) {
    console.log(err);
  }
};
// readTotalPrice();

const readAverageOrder = async () => {
  try {
    const db = await connection();
    const orderColl = db.collection("orders");

    const pipeline = [
      { $group: { _id: "$product_name", avgQuantity: { $avg: "$quantity" } } },
      { $sort: { avgQuantity: -1 } },
    ];

    const aggCursor = await orderColl.aggregate(pipeline);
    aggCursor.forEach((el) => console.log(el));
  } catch (err) {
    console.log(err);
  }
};
// readAverageOrder();

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
      {
        $project: { name: 1, email: 1, _id: 0, "info.age": 1, "info.hobby": 1 },
      },
    ];

    const aggCursor = await userColl.aggregate(pipeline);
    aggCursor.forEach((el) => console.log(el));
  } catch (err) {
    console.log(err);
  }
};
// readUserSpecifically();

const readCountOfProduct = async () => {
  try {
    const db = await connection();
    const productColl = db.collection("products");

    const pipeline = [{ $count: "total_product" }];

    const aggCursor = await productColl.aggregate(pipeline);
    aggCursor.forEach((el) => console.log(el));
  } catch (err) {
    console.log(err);
  }
};
// readCountOfProduct()

const userAndOrder = async () => {
  try {
    const db = await connection();
    const userColl = db.collection("users");

    const pipeline = [
      {
        $lookup: {
          from: "orders",
          localField: "name",
          foreignField: "customer",
          as: "customer_orders",
        },
      },
      { $match: { name: { $in: ["Aji", "Rezy"] } } },
      { $project: { _id: 0, name: 1, wallet: 1, customer_orders: 1 } },
      { $sort: { wallet: 1 } },
    ];

    const aggCursor = await userColl.aggregate(pipeline).toArray();
    console.log(aggCursor);
  } catch (err) {
    console.log(err);
  }
};
// userAndOrder();

const allCollection = async () => {
  try {
    const db = await connection();
    const userColl = db.collection("users");

    const pipeline = [
      { $match: { wallet: { $gt: 60000 } } },
      {
        $lookup: {
          from: "orders",
          localField: "name",
          foreignField: "customer",
          pipeline: [
            {
              $lookup: {
                from: "products",
                localField: "product_name",
                foreignField: "name",
                as: "product_order",
              },
            },
          ],
          as: "customer_orders",
        },
      },
      { $project: { _id: 0 } },
      { $unwind: "$customer_orders" },
      { $sort: { wallet: -1 } },
    ];

    const aggCursor = await userColl.aggregate(pipeline).toArray();

    console.log(aggCursor, "here");
  } catch (err) {
    console.log(err);
  }
};
// allCollection();

const billOrder = async () => {
  try {
    const db = await connection();
    const orderColl = db.collection("orders");

    const pipeline = [
      {
        $lookup: {
          from: "products",
          localField: "product_name",
          foreignField: "name",
          as: "product_order",
        },
      },
      {
        $group: {
          _id: "$customer",
          total_order: { $sum: "$quantity" },
          max_price: { $max: "$total_price" },
          min_price: { $min: "$total_price" },
          average_price: { $avg: "$total_price" },
          total_price: { $sum: "$total_price"}
        },
      },
    ];

    const aggCursor = await orderColl.aggregate(pipeline).toArray();
    console.log(aggCursor);
  } catch (err) {
    console.log(err);
  }
};
// billOrder();
