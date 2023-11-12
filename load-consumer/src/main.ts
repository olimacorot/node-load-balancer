import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {INestApplication, Logger} from "@nestjs/common";
import chalk from "chalk";

async function bootstrap(): Promise<void> {

  const initialPort: number = 3300;
  const totalApps: number = 4;

  for (let i = 0; i < totalApps; i++) {

    const app: INestApplication<unknown> = await NestFactory.create(AppModule);
    app.enableCors();
    const logger = new Logger();
    let port: number = initialPort + i;
    await app.listen(port);

    logger.log(`Server init [${await app.getUrl()}]`);

  }
}
bootstrap();
