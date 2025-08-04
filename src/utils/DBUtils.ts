import path from "path";
import { PrismaClient } from "../generated/client"; // Using the installed package

const db = new PrismaClient({ log: ['warn', 'error'] });

export default db;
