const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB } = require("./config/app_config");
const errors = require("./middleware/errors");
const swaggerUi = require("swagger-ui-express"), swaggerDocument = require("./swagger.json")

mongoose.Promise = global.Promise;
mongoose
    .connect(MONGO_DB.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        () => {
            console.log("Database Connected");
        },
        (error) => {
            console.log("Database Cant Be Connected: " + error);
        }
    )

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/app_route"));
app.use(errors.errorHandler);
app.use("api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.port || 4000, function() {
    console.log("Server Running on port 4000")
});