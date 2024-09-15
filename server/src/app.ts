import express, { json } from "express";
import { clientController, wolController } from "./controller";
import cors from "cors";

/*
  ping after arp to get ip 
*/

const app = express();

app.use(cors());
app.use(json());
app.use(clientController);
app.use(wolController);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
