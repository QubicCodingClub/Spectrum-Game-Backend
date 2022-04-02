const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

app.use(
    session({
        secret: "None_of_Your_Buisness_Ok",
        resave: false,
        saveUninitialized: true,
        proxy: true,
        cookie: { secure: false /*, sameSite: "none" */ },
        store: new MongoDBStore({
            uri: "mongodb://localhost:27017/SpectrumQubicGame",
            collection: "sessions",
        }),
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./route"));

app.listen(process.env.PORT || 8081, () => {
    console.log("Qubic Spectrum Game Server Started");
});
