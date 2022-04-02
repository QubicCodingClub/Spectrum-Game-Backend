const que1 = require("./data/question_round1.json");
const que2 = require("./data/question_round2.json");
exports.response = (res, success = false, msg = "Default MSG", data = {}) =>
    res.json({ success, msg, data });

exports.genQuestion = (num, x) => {
    var res = [],
        temp = randomNum(x);
    while (num > 0) {
        while (res.includes(temp)) temp = randomNum(x);
        res.push(temp);
        num--;
    }
    return res;
};

exports.formQuestion = (game, arr) => {
    var res = [],
        temp;
    arr.forEach((id) => {
        switch (game) {
            case 1:
                temp = que1.filter((ele) => {
                    return ele.id === id;
                });
                break;
            case 2:
                temp = que2.filter((ele) => {
                    return ele.id === id;
                });
                break;
        }
        res.push(temp);
    });
    return res;
};

const randomNum = (x) => Math.floor(Math.random() * 1000) % x;
