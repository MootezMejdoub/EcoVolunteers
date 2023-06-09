const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");
const sendEmail = require("./utils/sendEmail");

// Define your routes and middleware
const usersRouter = require("./routes/users");
const UserRouter = require("./routes/UserRoute");
const PostRoute = require("./routes/PostRoute");
const ChatRoute = require("./routes/ChatRoute");
const MessageRoute = require("./routes/MessageRoute");
const CommentsRoute = require("./routes/CommentsRoute");
const UploadRoute = require("./routes/UploadRoute");
const localisationRouter = require("./routes/localisation");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.set("strictQuery", false);
const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/users", usersRouter);
app.use("/api/localisation", localisationRouter);
// app.use("/auth", AuthRoute);
app.use("/user", UserRouter);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
app.use("/comments", CommentsRoute);

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
const userBRouter = require("./routes/userban");
app.use("/api/userB", userBRouter);

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});

app.post("/api/sendemail", async (req, res) => {
  const { email } = req.body;

  //const { email } ="aya.ouertatani@esprit.tn";
  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "Thank You Message From NodeCourse";
    const message = `
        <h3>Hello Zino</h3>
        <p>Thank for your YouTube Tutorials</p>
        <p>Regards...</p>
    `;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
