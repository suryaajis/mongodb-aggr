const { getDatabase } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Product {
  static async findAll() {
    const db = getDatabase();
    const userCollection = db.collection("products");
    const response = await userCollection.find().toArray();

    return response;
  }

  static async findOne(userMongoId) {
    const db = getDatabase();
    const userCollection = db.collection("products");

    const response = await userCollection
      .find({
        _id: ObjectId(`${userMongoId}`),
      })
      .toArray();

    if (response.length === 0) {
      throw { name: "UserNotFound" };
    }

    return response;
  }

  static async create({ name, price, stock, category }) {
    const db = getDatabase();
    const userCollection = db.collection("products");

    const response = await userCollection.insertOne({
      name,
      price,
      stock,
      category,
    });

    return response;
  }

  static async destroy(userMongoId) {
    const db = getDatabase();
    const userCollection = db.collection("products");

    const response = await userCollection.deleteOne({
      _id: ObjectId(`${userMongoId}`),
    });

    return response;
  }
}

module.exports = Product;
