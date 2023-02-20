const express = require("express");
const app = express();
const db = require("./utils/database");
const usersRouter = require("./users/users.router");
const authRouter = require('./auth/auth.router')

const responseHandlers = require("./utils/handleResponses");

app.use(express.json());

app.use("/api/v1/users", usersRouter);

app.use('/api/v1/auth', authRouter)

db.authenticate()
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Error: " + err);
    });

db.sync()
    .then(() => {
        console.log("Database synchronized");
    })
    .catch((err) => {
        console.log("Error: " + err);
    });

app.get("/", (req, res) => {
    res.json({
        message: " server has been initialized succssefully",
    });
});

app.get("/", (req, res) => {
    responseHandlers.success({
        res,
        status: 200,
        message: " server has been initialized",
        data: {
            users: "http://localhost:9000/api/v1/users",
            conversations: "http://localhost:9000/api/v1/conversations",
        },
    });
});

app.use("*", (req, res) => {
    responseHandlers.error({
        res,
        status: 404,
        message: "URL not found pleas try at http://localhost:9000/",
    });
});

app.listen(9000, () => {
    console.log("Server started at port 9000");
});

module.exports = app;