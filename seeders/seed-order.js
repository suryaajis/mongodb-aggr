const { getDatabase, connect } = require("../config/mongodb");

const orders = [
  {
    product_name: "Spinach",
    quantity: 10,
    total_price: 30000,
    customer: "Surya"
  },
  {
    product_name: "Fresh Meat",
    quantity: 1,
    total_price: 45000,
    customer: "Surya"
  },
  {
    product_name: "Apple",
    quantity: 1,
    total_price: 25000,
    customer: "Surya"
  },
  {
    product_name: "Garlic",
    quantity: 2,
    total_price: 16000,
    customer: "Aji"
  },
  {
    product_name: "Apple",
    quantity: 2,
    total_price: 50000,
    customer: "Aji"
  },
  {
    product_name: "Fresh Meat",
    quantity: 2,
    total_price: 90000,
    customer: "Aji"
  },
  {
    product_name: "Garlic",
    quantity: 5,
    total_price: 40000,
    customer: "Aji"
  },
  {
    product_name: "Shrimp",
    quantity: 3,
    total_price: 30000,
    customer: "Aji"
  },
  {
    product_name: "Spinach",
    quantity: 5,
    total_price: 15000,
    customer: "Aji"
  },
  {
    product_name: "Lemon",
    quantity: 2,
    total_price: 30000,
    customer: "Rezy"
  },
  {
    product_name: "Chili",
    quantity: 2,
    total_price: 20000,
    customer: "Rezy"
  },
  {
    product_name: "Lemon",
    quantity: 5,
    total_price: 75000,
    customer: "Vira"
  },
  {
    product_name: "Apple",
    quantity: 3,
    total_price: 75000,
    customer: "Vira"
  },
  {
    product_name: "Fresh Meat",
    quantity: 5,
    total_price: 225000,
    customer: "Vira"
  },
  {
    product_name: "Chili",
    quantity: 10,
    total_price: 100000,
    customer: "Vira"
  },
  {
    product_name: "Garlic",
    quantity: 20,
    total_price: 160000,
    customer: "Vira"
  },
];

connect()
  .then(() => {
    const db = getDatabase();
    return db.collection("orders").insertMany(orders);
  })
  .then((data) => {
    console.log(data);
    console.log("Success seeding orders");
  })
  .catch((err) => console.log(err));
