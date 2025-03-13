import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository';
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';

@Module({
	providers: [//*repositorios injetados. Todo modulo que importar o DatabaseModule, ele podera injetar os respositories
		PrismaService, 
		PrismaQuestionsRepository,
		PrismaQuestionCommentsRepository,
		PrismaQuestionAttachmentsRepository,
		PrismaAnswersRepository,
		PrismaAnswerCommentsRepository,
		PrismaAnswerAttachmentsRepository,
	],
	//* pra que fique visival para outros modulos
	//* todo modulo que faz uso do DatabaseModule tem acesso PrismaService
	exports:[ 
		PrismaService,
		PrismaService, 
		PrismaQuestionsRepository,
		PrismaQuestionCommentsRepository,
		PrismaQuestionAttachmentsRepository,
		PrismaAnswersRepository,
		PrismaAnswerCommentsRepository,
		PrismaAnswerAttachmentsRepository,
	] 
})
export class DatabaseModule{}