import { LogEntity, LogServeryLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface ICheckServiceMultiple {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements ICheckServiceMultiple {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
    private readonly logRepository: LogRepository[]
  ) {}

  private callLogs(logEntity: LogEntity) {
    this.logRepository.forEach((log) => log.saveLog(logEntity));
  }

  public async execute(url: string): Promise<boolean> {
    const fileNameParts = __filename.split('/');
    const fileName = fileNameParts[fileNameParts.length - 1];

    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const newLog = new LogEntity({
        level: LogServeryLevel.low,
        message: `Service ${url} working`,
        origin: String(fileName),
      });
      this.callLogs(newLog);
      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const newLog = new LogEntity({
        level: LogServeryLevel.high,
        message: errorMessage,
        origin: String(fileName),
      });
      this.callLogs(newLog);

      this.errorCallback(errorMessage);

      return false;
    }
  }
}
