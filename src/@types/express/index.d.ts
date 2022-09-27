import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
      };
      swaggerDetails: {
        swaggerDefinition: {
          info: {
            title: string;
            description: string;
            contact: {
              name: string;
            };
            servers: string[];
          };
        };

        apis: string[];
      };
    }
  }
}
