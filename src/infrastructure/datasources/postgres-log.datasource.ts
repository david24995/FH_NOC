import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogServeryLevel } from '../../domain/entities/log.entity';
import { PrismaClient, SeverityLevel } from '../../generated/prisma';

const prisma = new PrismaClient();

export class PostgresDataSource extends LogDataSource {
  constructor() {
    super();
  }

  async saveLog(log: LogEntity): Promise<void> {
    const level = String(log.level.toUpperCase());
    const newLog = await prisma.logModel.create({
      data: {
        message: log.message,
        origin: log.origin,
        level: level as SeverityLevel,
      },
    });

    console.log(`Postgres log created: ${newLog.id}`);
    return;
  }
  async getLogs(severityLevel: LogServeryLevel): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany({
      where: {
        level: severityLevel.toUpperCase() as SeverityLevel,
      },
    });

    return logs.map((log) => LogEntity.fromObject(log));
  }
}
