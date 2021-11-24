const { getDatabase, connect } = require("../config/mongodb");

const users = [
  {
    name: "Surya",
    email: "surya@mail.com",
    wallet: 150000,
    info: {
      age: 20,
      job: "Fullstack Developer",
      hobby: ["Sport", "Game", "Coding"]
    }
  },
  {
    name: "Aji",
    email: "aji@mail.com",
    wallet: 250000,
    info: {
      age: 23,
      job: "Backend Developer",
      hobby: ["Reading", "Game", "Coding"]
    }
  },
  {
    name: "Rezy",
    email: "rezy@mail.com",
    wallet: 50000,
    info: {
      age: 32,
      job: "Fullstack Developer",
      hobby: ["Sport", "Shoping", "Coding"]
    }
  },
  {
    name: "Vira",
    email: "vira@mail.com",
    wallet: 750000,
    info: {
      age: 22,
      job: "Frontend Developer",
      hobby: ["Shoping", "Writing", "Coding"]
    }
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
