import { PrismaClient } from "@prisma/client";
import handleApi from "../utils/handleApi.js";

const prisma = new PrismaClient();

const getUserStats = async (req, res) => {
  await handleApi(res, async () => {
    const userStatss = await prisma.userStats.findMany({ 
      select: { 
        "experience": true,
        "level": true,
        "skill": true,
      }
    });

    if (userStatss.length === 0) return res.status(404).json({ msg: "No userStatss found." });

    return res.json({ data: userStatss });
  });
};

const getUserStat = async (req, res) => {
  await handleApi(res, async () => {
    const userStats = await prisma.userStats.findUnique({ 
      where: { name: String( req.params.name ) },
      select: { 
        "experience": true,
        "level": true,
        "skill": true,
      }
    });

    if (!userStats) return res.status(404).json({ msg: `UserStats '${req.params.name}' does not exist.` });

    return res.json({ data: userStats });
  });
};

const updateUserStat = async (req, res) => {
  await handleApi(res, async () => {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") 
      return res.status(400).json({ msg: "Invalid Content-Type. Expected application/json." });

    let userStats = await prisma.userStats.findUnique({ 
      where: { name: String(req.params.name) }
    });

    if (!userStats) return res.status(404).json({ msg: `UserStats '${req.params.name}' does not exist.` });

    userStats = await prisma.userStats.update({
      where: { name: String(req.params.name) },
      data: { ...req.body },
      select: { 
        "experience": true,
        "level": true,
        "skill": true,
      }
    });

    return res.json({ 
      msg: `UserStats ${req.params.name} successfully updated!`,
      data: userStats
    });
  });
};

export {
  getUserStats,
  getUserStat,
  updateUserStat,
};