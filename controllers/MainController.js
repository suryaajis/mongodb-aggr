const { connect, getDatabase } = require("../config/mongodb");
async function connection() {
  await connect();
  const db = await getDatabase();
  return db;
}

class MainController {
  static async readAllCollections(req, res) {
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
              { $unwind: "$product_order" },
            ],
            as: "customer_orders",
          },
        },
        { $project: { _id: 0 } },
        { $unwind: "$customer_orders" },
        { $sort: { wallet: -1 } },
      ];

      const response = await userColl.aggregate(pipeline).toArray();

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  }

  static async readUserOrders(req, res) {
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
        // { $match: { name: { $in: ["Aji", "Rezy"] } } },
        { $project: { _id: 0, name: 1, wallet: 1, customer_orders: 1 } },
        { $sort: { wallet: 1 } },
      ];

      const response = await userColl.aggregate(pipeline).toArray();
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  }

  static async newCollection(req, res) {
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
              { $unwind: "$product_order" },
            ],
            as: "customer_orders",
          },
        },
        { $project: { _id: 0 } },
        { $unwind: "$customer_orders" },
        { $sort: { wallet: -1 } },
        { $out: "newCollection" },
      ];

      const response = await userColl.aggregate(pipeline).toArray();

      res.status(200).json({ message: "new collection has been added" });
    } catch (err) {
      console.log(err);
    }
  }

  static async readQuantity(req, res, next) {
    try {
      const db = await connection();
      const orderCollection = db.collection("orders");

      const pipeline = [
        { $match: {} },
        { $group: { _id: "$customer", total_order: { $sum: "$quantity" } } },
      ];

      const response = await orderCollection.aggregate(pipeline).toArray();

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  }

  static async readTotalPrice(req, res, next) {
    try {
      const db = await connection();
      const orderCollection = db.collection("orders");

      const pipeline = [
        { $match: { product_name: { $in: ["Apple", "Fresh Meat"] } } },
        { $group: { _id: "$product_name", total: { $sum: "$total_price" } } },
        { $sort: { total: -1 } },
      ];

      const response = await orderCollection.aggregate(pipeline).toArray();

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  }

  static async readBillOrders(req, res) {
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
            total_price: { $sum: "$total_price" },
          },
        },
      ];

      const response = await orderColl.aggregate(pipeline).toArray();
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MainController;
