import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateQuestionController } from './controllers/create-question.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true // global para todos os modulos
    }),
    AuthModule
  ],
  controllers: [CreateQuestionController, CreateAccountController, AuthenticateController],
  providers: [PrismaService],
})

export class AppModule {}
