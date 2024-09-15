import { Router, Request, Response } from "express";
import { wake, getStatus } from "../utils";
import { PrismaClient } from "@prisma/client";
import { setTimeout } from "timers/promises";

const prisma = new PrismaClient();

export const wolController = Router();

wolController.get("/wol/:id", async (req: Request, res: Response) => {
  try {
    const client = await prisma.client.findFirst({
      where: { id: +req.params.id },
    });

    if (!client) return res.sendStatus(400);

    wake(client.mac);
    await setTimeout(10000);
    const ip = await getStatus(client.mac);

    if (!ip) {
      return res.status(200).json({ status: "offline" });
    }

    console.log(ip);

    return res.status(200).json({ status: "online", ip: ip });
  } catch (e) {
    console.error(e);
    return res.sendStatus(503);
  }
});
export default wolController;
