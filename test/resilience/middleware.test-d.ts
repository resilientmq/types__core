import {Middleware} from "../../src/resilience/middleware";


const exampleMiddleware: Middleware = async (event, next) => {
  console.log('Middleware for:', event.type);
  await next();
};