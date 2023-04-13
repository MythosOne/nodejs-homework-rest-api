const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Mythos:PkwdS0wuD8xsWK8x@cluster0.ozn3mcl.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

// PkwdS0wuD8xsWK8x
