const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api", (req, res) => {
    let numQuestions = req.query.numQuestions;
    if (numQuestions != null) {
      console.log(numQuestions);
    }
    res.json({message: "Recieved request"})
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});