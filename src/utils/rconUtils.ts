import { Rcon } from 'rcon-client'
import db from './DBUtils'

const rconClients: Map<string, Rcon> = new Map();

export async function connectAllServers() {
  const servers = await db.server.findMany();

  for (const server of servers) {
    await connectToServer(server.value, server.ip, server.rconPort, server.rconPassword);
  }
}

export async function connectToServer(value: string, host: string, port: number, password: string) {
  // If already connected, check if it's still alive
  const existing = rconClients.get(value);
  if (existing) {
    try {
      await existing.send("list"); // simple ping test
      console.log(`♻️ Reusing existing RCON connection for server ${value}`);
      return existing;
    } catch {
      console.warn(`⚠️ Existing RCON connection for server ${value} is dead, reconnecting...`);
      existing.end(); // clean up dead connection
      rconClients.delete(value);
    }
  }

  // Create a new connection
  try {
    const rcon = await Rcon.connect({ host, port, password });
    console.log(`✅ Connected to server ${value} (${host}:${port})`);
    rconClients.set(value, rcon);

    // Optional: auto-remove if connection closes
    rcon.on("end", () => {
      console.warn(`🔌 RCON connection to server ${value} closed`);
      rconClients.delete(value);
    });

    return rcon;
  } catch (err) {
    console.error(`❌ Failed to connect to server ${value}:`, err);
    return undefined;
  }
}

export function getRconClient(value: string): Rcon | undefined {
  return rconClients.get(value);
}