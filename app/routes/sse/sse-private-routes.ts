import sseAuthenticate from "../../hooks/sse-authentication.hook";
import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { connect } from "../../controllers/v1/sse.controller";
import sseAlertsRouterOpts from "./sse-alert-router-option";

function ssePublicRoutes(
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    opts: {prefix: string},
    next: (err?: Error)=> void
){
    sseAuthenticate(fastify);
    fastify.get('/sse', sseAlertsRouterOpts, connect);
    next();
}

export default ssePublicRoutes;