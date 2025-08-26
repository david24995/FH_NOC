import { LogServeryLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-services';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-services-multiple';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresDataSource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(new PostgresDataSource());

export class Server {
  public static async start() {
    console.log('Server started');

    // const emailService = new EmailService(fileSystem);
    // emailService.sendEmailWithFileSystemLog([
    //   'david_cun_celima@hotmail.com',
    //   'davidhuamaccto24995@gmail.com',
    // ]);

    // const logs = await logRepository.getLogs(LogServeryLevel.high);
    // console.log(logs);

    const job = CronService.createJob('*/10 * * * * * ', () => {
      // new CheckService().execute('https://google.com');
      const url = 'http://google.com';

      // new CheckServiceMultiple(
      new CheckService(
        () => console.log(`${url} is working!`),
        (err) => console.log(`${err} desde server.ts`),
        mongoLogRepository
        // [fsLogRepository, mongoLogRepository, postgresLogRepository]
      ).execute(url);
    });
  }
}
