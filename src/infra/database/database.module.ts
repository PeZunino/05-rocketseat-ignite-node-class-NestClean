import { Module } from '@nestjs/common';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository';
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository';
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository';

@Module({
	providers: [//*repositorios injetados. Todo modulo que importar o DatabaseModule, ele podera injetar os respositories
		PrismaService, 
		{
			provide: QuestionsRepository,
			useClass: PrismaQuestionsRepository
		},
		{
			provide: StudentsRepository,
			useClass: PrismaStudentsRepository,
		},
		{
			provide: QuestionCommentsRepository,
			useClass: PrismaQuestionCommentsRepository
		},
		{
			provide: QuestionAttachmentsRepository,
			useClass: PrismaQuestionAttachmentsRepository,
		},
		{
			provide: AnswersRepository,
			useClass: PrismaAnswersRepository
		},
		{
			provide: AnswerCommentsRepository,
			useClass:PrismaAnswerCommentsRepository
		},
		{
			provide: AnswerAttachmentsRepository,
			useClass:PrismaAnswerAttachmentsRepository
		},
		{
			provide: AttachmentsRepository,
			useClass: PrismaAttachmentsRepository,
		},
		
	],
	//* pra que fique visival para outros modulos
	//* todo modulo que faz uso do DatabaseModule tem acesso PrismaService
	exports:[ 
		PrismaService,
		QuestionsRepository,
		QuestionCommentsRepository,
		QuestionAttachmentsRepository,
		AnswersRepository,
		AnswerCommentsRepository,
		AnswerAttachmentsRepository,
		StudentsRepository,
		AttachmentsRepository
	] 
})
export class DatabaseModule{}