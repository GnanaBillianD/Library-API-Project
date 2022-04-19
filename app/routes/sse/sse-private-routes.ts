import sseAuthenticate from "../../hooks/sse-authentication.hook";
import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

function ssePublicRoutes(
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    opts: {prefix: string},
    next: (err?: Error)=> void
){
    sseAuthenticate(fastify);
    next();
}

export default ssePublicRoutes;