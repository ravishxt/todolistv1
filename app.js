// create an express app
const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// use the express-static middleware
app.use(express.static("public"));

let items = [];
let workItems = [];

// define the first route
app.get("/", function (req, res) {
    let day = date();   
    res.render("list", { listTitle: day, addedItem: items });
})

app.post("/", (req, res) => {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }

})

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work", addedItem: workItems })
})

// app.post("/work", (req, res) => {
//     res.redirect("/");
// })



app.listen(process.env.PORT || 3000, () => console.log("Server is listening on port 3000."));