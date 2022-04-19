import { FastifyReply, FastifyRequest } from 'fastify';
import { filter } from 'lodash';

interface ConnectionSSE {
  id: number;
  reply: FastifyReply;
}

interface ConnectedClients {
  [deviceId: string]: ConnectionSSE[];
}

const clients: ConnectedClients = {};

async function handleConnection(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.currentUser.id.toString();
  // console.log("userId is--------",userId);

  const clientId = req.id;
  // console.log("clientId is--------",clientId);

  const currentClients = clients[userId] || [];
  // console.log("currentclients is--------",currentClients);

  const newConnection = {
    reply,
    id: clientId
  };
  // console.log("newConnection--------",newConnection);

  clients[userId] = currentClients.concat(newConnection);
  // console.log('clients[userId]--------',clients[userId]);

  const messages = clientId;

  reply.sse(messages);

  setInterval(function () {
    reply.raw.write(`data:${new Date().toISOString()}\n`);
  }, 1000);

  req.raw.on('close', () => {
    const updatedClients = filter(currentClients, (client) => {
      return client.id !== clientId;
    });
    clients[userId] = updatedClients;
  });
}

export { handleConnection };
