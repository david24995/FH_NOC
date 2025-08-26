import { LogModel, MongoDatabase } from './data/mongodb';
import { Server } from './presentation/server';
import { envs } from './config/plugins/env.plugin';
import { PrismaClient } from './generated/prisma';

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // const prisma = new PrismaClient();

  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Text message Postgres',
  //     origin: 'App.ts',
  //   },
  // });
  // console.log(newLog);

  // const logs = await prisma.logModel.findMany();
  // console.log(logs);

  // await Server.start();
}
