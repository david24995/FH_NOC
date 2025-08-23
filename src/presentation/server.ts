import { CheckService } from '../domain/use-cases/checks/check-services';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystem = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
  public static start() {
    console.log('Server started');

    // const emailService = new EmailService(fileSystem);
    // emailService.sendEmailWithFileSystemLog([
    //   'david_cun_celima@hotmail.com',
    //   'davidhuamaccto24995@gmail.com',
    // ]);

    // const job = CronService.createJob('*/10 * * * * * ', () => {
    //   // new CheckService().execute('https://google.com');
    //   const url = 'http://google.com';

    //   new CheckService(
    //     () => console.log(`${url} is working!`),
    //     (err) => console.log(`${err} desde server.ts`),
    //     fileSystem
    //   ).execute(url);
    // });
  }
}
