import { DataSource } from "typeorm";
import "dotenv/config";

// ------ Docker Config -------- //
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  logging: true,
  synchronize: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource;

// ------ Heroku Config ------- //
// const AppDataSource = new DataSource({
//   type: "postgres",
//   url: process.env.DATABASE_URL,
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : false,
//   logging: true,
//   synchronize: false,
//   entities:
//     process.env.NODE_ENV === "production"
//       ? ["dist/entities/*.js"]
//       : ["src/entities/*.ts"],
//   migrations:
//     process.env.NODE_ENV === "production"
//       ? ["dist/migrations/*.js"]
//       : ["src/migrations/*.ts"],
// });
// AppDataSource.initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization", err);
//   });
// export default AppDataSource;
