const mongoose = requires("mongoose");
const dbName = process.env.DB_NAME;
//connect to mongoDB server
mongoose
  .connect("mongodb://localhost/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to " + dbName + " database!");
  })
  .catch((err) => {
    console.log(
      "There was an error connecting to the " + dbName + " database!"
    );
  });
