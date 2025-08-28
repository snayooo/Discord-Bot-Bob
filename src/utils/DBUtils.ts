import path from "path";
import { PrismaClient } from "../generated/prisma"; // Using the installed package

const db = new PrismaClient({ log: ['warn', 'error'] });

export default db;
