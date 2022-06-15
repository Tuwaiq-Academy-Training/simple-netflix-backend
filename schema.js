userSchema = {
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
    type: ObjectId,
    ref: "moviesSchema",
    timewatched: Number,
  },
  timewatchedTV: {
    type: ObjectId,
    ref: "TvshowSchema",
    timewatched: Number,
  },
}
moviesSchema = {
  title: String,
  year: Number,
  description: String,
  Prefersage: Number,
  catagoreyid: {
    type: ObjectId,
    ref: "catagory",
  },
}
TvshowSchema = {
  title: String,
  year: Number,
  seasons: Number,
  description: String,
  Prefersage: Number,
  catagoreyid: {
    type: ObjectId,
    ref: "catagory",
  },
}
catagorySchema = {
  name: [String],
  movies: [
    {
      type: ObjectId,
      ref: "moviesSchema",
    },
  ],
  Shows: [
    {
      type: ObjectId,
      ref: "TvshowSchema",
    },
  ],
}
reviwsSchema = {
  reviw: String,
  userid: {
    type: ObjectId,
    ref: "userSchema",
  },
  movieid: {
    type: ObjectId,
    ref: "moviesSchema",
  },
  tvshowid: {
    type: ObjectId,
    ref: "TvshowSchema",
  },
}
