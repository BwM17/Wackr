import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getStatus } from "../utils";

const prisma = new PrismaClient();

export const clientController = Router();

clientController.get("/clients", async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany();

    if (!clients) {
      throw new Error("error while reading databse");
    }

    let result = JSON.parse(JSON.stringify(clients));
    for (let i = 0; i < result.length; i++) {
      let status = await getStatus(result[i].mac);
      if (!status) {
        result[i].status = "offline";
      } else {
        result[i].status = "online";
        result[i].ip = status;
      }
    }

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.sendStatus(503);
  }
});

clientController.get("/client/:id", async (req: Request, res: Response) => {
  try {
    const client = await prisma.client.findFirst({
      where: {
        id: +req.params.id,
      },
    });

    if (!client) return res.sendStatus(400);
    let result = JSON.parse(JSON.stringify(client));

    const status = await getStatus(result.mac);
    if (!status) {
      result.status = "offline";
    } else {
      result.status = "online";
      result.ip = status;
    }

    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.sendStatus(503);
  }
});

clientController.post("/client", async (req: Request, res: Response) => {
  try {
    if (!req.body.name || !req.body.mac) return res.sendStatus(400);

    const client = await prisma.client.create({
      data: {
        name: req.body.name,
        mac: req.body.mac,
      },
    });

    if (!client) throw new Error("error while creating client");

    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(503);
  }
});

//wolController.patch("/client");

//wolController.delete("/client");

export default clientController;
