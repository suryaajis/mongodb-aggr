const { getDatabase, connect } = require("../config/mongodb");

const users = [
  {
    name: "Surya",
    email: "surya@mail.com",
    wallet: 150000
  },
  {
    name: "Aji",
    email: "aji@mail.com",
    wallet: 250000,
  },
];

connect()
  .then(() => {
    const db = getDatabase();
    return db.collection("users").insertMany(users);
  })
  .then((data) => {
    console.log(data);
    console.log("Success seeding users");
  })
  .catch((err) => console.log(err));
