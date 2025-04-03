import { Injectable } from '@nestjs/common';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository{
	constructor(private prisma:PrismaService){}
	
	async save(question: Question): Promise<void> {
		const data = PrismaQuestionMapper.toPrisma(question);

		await this.prisma.question.update({
			where: {id: question.id.toString(),},
			data,
		});
	}
	async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
		const questions = await this.prisma.question.findMany({
			orderBy: {createdAt: 'desc',},
			take: 20,
			skip: (page - 1) * 20,
		});

		return questions.map(PrismaQuestionMapper.toDomain);
	}
	async create(question: Question): Promise<void> {
		const data = PrismaQuestionMapper.toPrisma(question);

		await this.prisma.question.create({data,});
	}
	async findBySlug(slug: string): Promise<Question | null> {
		const question = await this.prisma.question.findUnique({where:{slug}});

		if(!question){
			return null; 
		}

		return PrismaQuestionMapper.toDomain(question);
	}
	async findById(id: string): Promise<Question | null> {
		const question = await this.prisma.question.findUnique({where:{id}});

		if(!question){
			return null; 
		}

		return PrismaQuestionMapper.toDomain(question);
	}
	async delete(question: Question): Promise<void> {
		const data = PrismaQuestionMapper.toPrisma(question);

		await this.prisma.question.delete({where: {id: data.id,},});
	}
  
}