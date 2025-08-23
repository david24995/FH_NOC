import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogServeryLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

// TODO: Attachements
interface Attachment {
  fileName: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        subject,
        html: htmlBody,
        attachments,
        bcc: to,
      });

      console.log(sentInformation);
      this.logRepository.saveLog({
        level: LogServeryLevel.low,
        message: 'Email sent',
        origin: 'email.service.ts',
      });
      return true;
    } catch (error) {
      this.logRepository.saveLog({
        level: LogServeryLevel.high,
        message: `${error}`,
        origin: 'email.service.ts',
      });
      return false;
    }
  }

  async sendEmailWithFileSystemLog(to: string | string[]) {
    const subject = 'Log del servidor';
    const htmlBody = `
        <h2>Logs de Sistema - NOC</h2>
        <p>Ver logs adjuntos</p>
      `;
    const attachments: Attachment[] = [
      { fileName: 'logs-low.log', path: './logs/logs-low.log' },
      { fileName: 'logs-medium.log', path: './logs/logs-medium.log' },
      { fileName: 'logs-high.log', path: './logs/logs-high.log' },
    ];

    this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
