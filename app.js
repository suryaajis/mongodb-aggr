const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;
const app = express();

const { connect } = require("./config/mongodb");
const MainController = require("./controllers/MainController");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', MainController.readAllCollections)
app.get('/users/orders', MainController.readUserOrders)
app.get("/orders/quantity", MainController.readQuantity);
app.get("/orders/totalPrice", MainController.readTotalPrice);
app.get("/orders/bill", MainController.readBillOrders);


connect().then(() => {
  app.listen(port, (_) => {
    console.log("This mongo server running on port:", port);
  });
});
