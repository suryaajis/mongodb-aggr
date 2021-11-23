const { getDatabase, connect } = require("../config/mongodb");

const products = [
  {
    name: "Lemon",
    price: 15000,
    stock: 20,
    category: "Fruit",
  },
  {
    name: "Apple",
    price: 25000,
    stock: 50,
    category: "Fruit",
  },
  {
    name: "Fresh Meat",
    price: 45000,
    stock: 35,
    category: "Protein",
  },
  {
    name: "Salmon",
    price: 35000,
    stock: 15,
    category: "Protein",
  },
  {
    name: "Shrimp",
    price: 10000,
    stock: 100,
    category: "Protein",
  },
  {
    name: "Garlic",
    price: 8000,
    stock: 200,
    category: "Vegetable",
  },
  {
    name: "Carrot",
    price: 5000,
    stock: 80,
    category: "Vegetable",
  },
  {
    name: "Chili",
    price: 10000,
    stock: 40,
    category: "Vegetable",
  },
  {
    name: "Spinach",
    price: 3000,
    stock: 120,
    category: "Vegetable",
  },
];

connect()
  .then(() => {
    const db = getDatabase();
    return db.collection("products").insertMany(products);
  })
  .then((data) => {
    console.log(data);
    console.log("Success seeding products");
  })
  .catch((err) => console.log(err));
