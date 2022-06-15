const express = require("express");
const { copyFileSync } = require("fs");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/Netflix");
app.use(express.json());

//hhh
const categorySchema = mongoose.Schema({
  name: String,
  movies: {
    type: mongoose.ObjectId,
    ref: "moviesSchema",
    Optional: true,
  },

  Shows: {
    type: mongoose.ObjectId,
    ref: "TvshowSchema",
    Optional: true,
  },
});

const category = mongoose.model("category", categorySchema);

const TvshowSchema = mongoose.Schema({
  title: String,
  year: Number,
  seasons: Number,
  description: String,
  Prefersage: Number,
  catagoreyid: {
    type: mongoose.ObjectId,
    ref: "category",
  },
});

const Tvshow = mongoose.model("Tvshow", TvshowSchema);

//jjj
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
  timewatchedM: {
    type: mongoose.ObjectId,
    ref: "moviesSchema",
    timewatched: Number,
  },
  timewatchedTV: {
    type: mongoose.ObjectId,
    ref: "TvshowSchema",
    timewatched: Number,
  },
});
const User = mongoose.model("User", userSchema);
//user crud
//create user
app.post("/user/create", (req, res) => {
  const user = new User(req.body);
  user.save().then(() => {
    res.send("user created");
  });
});
//read user info
app.get("/users", (req, res) => {
  User.find({}).then((user) => {
    res.send(user);
  });
});
//update user
app.put("/user/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (user) => {
      res.send(user);
    }
  );
});
//delete user
app.delete("/user/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id).then((user) => {
    res.send(user);
  });
});

// ---------------------------------------------
// Tvshows Schema
// ---------------------------------------------

//insert
app.post("/Tvshow/create", (req, res) => {
  const Tvshows = new Tvshow({
    title: req.body.title,
    year: req.body.year,
    seasons: req.body.seasons,
    description: req.body.description,
    Prefersage: req.body.Prefersage,
    catagoreyid: req.body.catagoreyid,
  });
  Tvshows.save().then(() => res.json({ msg: "Tvshows crated" }));
});

//find
app.get("/Tvshows", (req, res) => {
  Tvshow.find({})
    .populate("catagoreyid", { name: 1, _id: 0 })
    .then((data) => {
      console.log(Tvshow);
      res.json(data);
    });
});

// update
app.put("/Tvshow/update/", (req, res) => {
  Tvshow.updateOne({ _id: req.body.id }, { name: req.body.name }).then(() => {
    res.json({ msg: "updated" });
  });
});

//   delete
app.delete("/Tvshow/delete/", (req, res) => {
  Tvshow.deleteOne({ _id: req.body.id }).then(() => {
    res.json({ msg: "task deleted" });
  });
});

// -----------------------------------------------------------------------------

// -------Yazeed-------

app.post("/category/create", (req, res) => {
  const catagory = new category({
    name: req.body.name,
    Shows: req.body.Shows,
    movies: req.body.movies,
  });
  catagory.save().then(() => res.json({ msg: "categoryCreated" }));
});

app.get("/categories", (req, res) => {
  category.find({}).then((data) => {
    res.json(data);
  });
});

app.delete("/category/delete/:id", (req, res) => {
  category.deleteOne(req.body).then(() => {
    res.json({ msg: "category deleted" });
  });
});

app.put("/category/update/:id", (req, res) => {
  category.updateOne(req.body).then(() => {
    res.json({ msg: "category updated" });
  });
});
//------------------------------------------------------
// Meshal reviws
const reviewsSchema = mongoose.Schema({
  reviw: String,
  userid: {
    type: mongoose.ObjectId,
    ref: "userSchema",
  },
  movieid: {
    type: mongoose.ObjectId,
    ref: "moviesSchema",
  },
  tvshowid: {
    type: mongoose.ObjectId,
    ref: "TvshowSchema",
  },
});
const reviews = mongoose.model("reviews", reviewsSchema);

app.get("/user/reviws", (req, res) => {
  reviews.find({}).then((data) => {
    res.json(data);
  });
});

app.put("/user/reviws/update", (req, res) => {
  reviews.one(req, body).then(() => {
    res.json("user update");
  });
});

app.post("/user/reviws/create", (req, res) => {
  const review = new reviews(req.body);
  review.save().then(() => {
    res.send("riview created");
  });
});

app.delete("/user/reviws/delete", (req, res) => {
  reviews.one(req, body).then(() => {
    res.json("user delet");
  });
});

//------------------------------------------------------

const moviesSchema = mongoose.Schema({
  title: String,
  year: Number,
  description: String,
  Prefersage: Number,
  catagoreyid: {
    type: mongoose.ObjectId,
    ref: "category",
  },
});
const Movie = mongoose.model("Movie", moviesSchema);
app.post("/Movie/create", (req, res) => {
  const movies = new Movie({
    title: req.body.title,
    year: req.body.year,
    description: req.body.description,
    Prefersage: req.body.Prefersage,
    catagoreyid: req.body.catagoreyid,
  });
  movies.save().then(() => res.json("The movie has been added"));
});
app.get("/movies", (req, res) => {
  Movie.find({})
    .populate("catagoreyid", { name: 1, _id: 0 })
    .then((data) => {
      res.json(data);
    });
});
app.put("/movie/update/:id", (req, res) => {
  Movie.updateOne({ _id: req.params.id }, { title: req.body.title }).then(
    () => {
      res.json({ msg: "Movie is update" });
    }
  );
});
app.delete("/movie/delete/:id", (req, res) => {
  Task.deleteOne({ _id: req.params.id }).then(() => {
    res.json({ msg: "movie is deleted" });
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
