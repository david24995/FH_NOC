export interface Options {
  level: LogServeryLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export enum LogServeryLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public level: LogServeryLevel;
  public message: string;
  public createdAt?: Date;
  public origin: string;

  constructor(options: Options) {
    this.level = options.level;
    this.createdAt = new Date();
    this.message = options.message;
    this.origin = options.origin;
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({ level, message, origin });
    log.createdAt = new Date(createdAt);

    return log;
  }

  static fromObject(object: { [key: string]: any }): LogEntity {
    const { message, level, createdAt, origin } = object;

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    return log;
  }
}
