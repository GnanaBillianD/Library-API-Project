import { login } from "../../controllers/v1/sessions.controller";
import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import loginRouterOpts from "./session-login.router-option";


function sessionPublicRoutes(
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    opts: { prefix: string},
    next: (err?: Error) => void
){
    fastify.post('/login',loginRouterOpts, login)
    next();
}
export default sessionPublicRoutes;