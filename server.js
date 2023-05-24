const express = require("express");
const app = express();
const port = process.env.Port || 3500;

app.listen(port, () => console.log(`app start at port-${port}`));
