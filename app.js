const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/test");
app.use(express.json());
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
//   timewatchedM: {
//     type: ObjectId,
//     ref: "moviesSchema",
//     timewatched: Number,
//   },
//   timewatchedTV: {
//     type: ObjectId,
//     ref: "TvshowSchema",
//     timewatched: Number,
//   },
});
const User = mongoose.model("User", userSchema);
//user crud
//create user
app.post("/user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send("user created");
    })
});
//read user info 
app.get("/user", (req, res) => {
    User.find()
    .then((user) => {
        res.send(user);
    }
    )
}
)
//update user
app.put("/user/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
        res.send(user);
    }
    )
}
)
//delete user
app.delete("/user/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => {
        res.send(user);
    }
    )
}
)



//app listens on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
