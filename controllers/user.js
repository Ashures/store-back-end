import { PrismaClient } from "@prisma/client";
import handleApi from "../utils/handleApi.js";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  await handleApi(res, async () => {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") 
      return res.status(400).json({ msg: "Invalid Content-Type. Expected application/json." });
    
    let user = await prisma.user.create({
      data: { ...req.body },
    });

    await prisma.userStats.create({
      data: { userId: user.id }
    });

    user = await prisma.user.findUnique({ 
      where: { name: String(req.body.name) },
      select: { 
        "id": true,
        "name": true,
        "stats": {
          "select": {
            "experience": true,
            "level": true,
            "skill": true
          }
        }
      }
    });

    return res.status(201).json({
      msg: `User '${user.name}' successfully created!`,
      data: user
    });
  });
};

const getUsers = async (req, res) => {
  await handleApi(res, async () => {
    const users = await prisma.user.findMany({ 
      select: { 
        "id": true,
        "name": true,
        "stats": {
          "select": {
            "experience": true,
            "level": true,
            "skill": true
          }
        }
      }
    });

    if (users.length === 0) return res.status(404).json({ msg: "No users found." });

    return res.json({ data: users });
  });
};

const getUser = async (req, res) => {
  await handleApi(res, async () => {
    const user = await prisma.user.findUnique({ 
      where: { name: String( req.params.name ) },
      select: { 
        "id": true,
        "name": true,
        "stats": {
          "select": {
            "experience": true,
            "level": true,
            "skill": true
          }
        }
      }
    });

    if (!user) return res.status(404).json({ msg: `User '${req.params.name}' does not exist.` });

    return res.json({ data: user });
  });
};

const updateUser = async (req, res) => {
  await handleApi(res, async () => {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") 
      return res.status(400).json({ msg: "Invalid Content-Type. Expected application/json." });

    let user = await prisma.user.findUnique({ 
      where: { name: String(req.params.name) }
    });

    if (!user) return res.status(404).json({ msg: `User '${req.params.name}' does not exist.` });

    user = await prisma.user.update({
      where: { name: String(req.params.name) },
      data: { ...req.body },
      select: {
        id: true,
        name: true,
        stats: {
          select: {
            experience: true,
            level: true,
            skill: true
          }
        }
      }
    });

    return res.json({ 
      msg: `User ${req.params.name} successfully updated!`,
      data: user
    });
  });
};

const deleteUser = async (req, res) => {
  await handleApi(res, async () => {
    const user = await prisma.user.findUnique({ 
      where: { name: String( req.params.name ) }
    });

    if (!user) return res.status(404).json({ msg: `User '${req.params.name}' does not exist.` });

    await prisma.user.delete({
      where: { name: String(req.params.name) }
    });

    return res.json({ msg: `User ${req.params.name} successfully deleted!` });
  });
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};