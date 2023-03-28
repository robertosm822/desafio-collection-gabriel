import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  //--- CONFIGURAR DOCUMENTACAO Swagger ----------------------------
  const configDoc = new DocumentBuilder()
    .setTitle('Documentação com Swagger - API do Desafio do Gabriel')
    .setDescription(
      'O Swagger (aka OpenApi) é uma biblioteca muito conhecida no universo backend, estando disponível para diversas linguagens e frameworks. Ela gera um site interno no seu backend que descreve, com muitos detalhes, cada endpoint e estrutura de entidades presentes na sua aplicação.',
    )
    .setVersion('1.0')
    .addTag('feed')
    //.addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('api', app, document);
  // ----- FIM DA CONFIGURACAO SWAGGER -----------------------------

  const port: number = parseInt(process.env.APP_PORT) || 3001;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port, () => {
    console.log('[WEB]', `http://localhost:${port}`);
  });
}

bootstrap();
