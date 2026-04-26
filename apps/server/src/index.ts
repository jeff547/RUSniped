import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: { colorize: true },
    },
  },
});

await app.register(cors, {
  origin: process.env.PUBLIC_URL ?? "hhttp://localhost:5173",
  credentials: true,
});

app.get("/health", async () => ({
  ok: true,
  timestamp: new Date().toISOString(),
}));

app.get("/soc/api/*", async (request, reply) => {
  const url = `https://classes.rutgers.edu${request.url}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return reply
        .code(response.status)
        .send({ error: `Upstream ${response.status}` });
    }
  } catch (err) {
    request.log.error(err);
    return reply.code(502).send({ error: "Upstream fetch failed" });
  }
});

await app.listen({ port: 3000, host: "0.0.0.0" });
