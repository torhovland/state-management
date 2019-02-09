const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) =>
  res.send([
    {
      id: 1,
      text: "Mop the floor",
      creationTime: 1548359826873
    },
    {
      id: 2,
      text: "Binge Netflix",
      creationTime: 1549046574990
    }
  ])
);

app.listen(port, () => console.log(`Server app listening on port ${port}!`));
