const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());


app.get("/api/chat-history", (req, res) => {
    fs.readFile("./chat-history.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.post("/api/chat-history", (req, res) => {
    fs.readFile("./chat-history.json", "utf8", (err, data) => {
        if (err) {
            const initialData = [];
            fs.writeFile("./chat-history.json", JSON.stringify(initialData), (err) => {
                if (err) {
                    res.status(500).send(err);
                }
            });
            data = JSON.stringify(initialData);
        }

        let chatHistory = JSON.parse(data);
        chatHistory.push(req.body);
        fs.writeFile("./chat-history.json", JSON.stringify(chatHistory), (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send({ message: "Message added successfully!" });
            }
        });
    });
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
