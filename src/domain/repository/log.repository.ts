import { LogDataSource } from '../datasources/log.datasource';
import { LogEntity, LogServeryLevel } from '../entities/log.entity';

export abstract class LogRepository extends LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogServeryLevel): Promise<LogEntity[]>;
}
