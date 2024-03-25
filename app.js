import express, { json, urlencoded } from "express";
import cors from "cors";

import routes from "./routes/index.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ "extended": false }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;