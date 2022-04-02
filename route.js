const { response, genQuestion, formQuestion } = require("./security");
const UserModel = require("./model");
const route = require("express").Router();

// Define the questions.
round1QuestionBank = 5;
round2QuestionBank = 5;
round1QuestionForm = 5;
round2QuestionForm = 5;
route.post("/login", async (req, res) => {
    if (await UserModel.exists({ email: req.body.email })) {
        req.session.user = {
            email: req.body.email,
        };
        return response(res, true, "Welcome Back");
    }
    const query = new UserModel({
        name: req.body.name,
        email: req.body.email,
        questions: {
            r1: genQuestion(round1QuestionForm, round1QuestionBank),
            r2: genQuestion(round2QuestionForm, round2QuestionBank),
        },
    });
    query.save().then(
        (data) => {
            req.session.user = {
                email: data.email,
            };
            response(res, true, "Welcome to the Game");
        },
        (err) => response(res, false, "Sorry try again later", err)
    );
});
route.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) throw response(res, false, "Logout unsuccessful", err);
        response(res, true, "Logout Success");
    });
});
route.get("/r1/question", (req, res) => {
    UserModel.findOne({ email: req.session.user.email }, { que: 1 }).then(
        (data) => {
            const result = formQuestion(1, data.que.r1);
            response(res, true, "Here are your Ques", result);
        },
        (err) => response(res, false, "Are you Logged In", err)
    );
});
route.get("/r2/question", (req, res) => {
    UserModel.findOne({ email: req.session.user.email }, { que: 1 }).then(
        (data) => {
            const result = formQuestion(2, data.que.r2);
            response(res, true, "Here are your Ques", result);
        },
        (err) => response(res, false, "Are you Logged In", err)
    );
});
route.get("/r1/leaderboard", (req, res) => {
    UserModel.find({}, { name: 1, s_r1: 1 })
        .sort({ s_r1: -1 })
        .then(
            (data) => response(res, true, "Leaderboard for round 1", data),
            (err) => response(res, false, "Unable to fetch leaderBoard", err)
        );
});
route.get("/r2/leaderboard", (req, res) => {
    UserModel.find({}, { name: 1, s_r2: 1 })
        .sort({ s_r2: -1 })
        .then(
            (data) => response(res, true, "Leaderboard for round 2", data),
            (err) => response(res, false, "Unable to fetch leaderBoard", err)
        );
});
module.exports = route;
