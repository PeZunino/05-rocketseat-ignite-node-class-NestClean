import { Injectable } from '@nestjs/common';
import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';
import { QuestionsRepository } from '../repositories/questions-repository';

interface CreateQuestionUseCaseRequest{
	title:string
	content:string
	authorId: string
	attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<null,{
	question:Question
}>
	
@Injectable()
export class CreateQuestionUseCase{

	constructor(
		private questionsRepository:QuestionsRepository
	){}

	async execute({
		authorId,content,title,attachmentsIds
	}:CreateQuestionUseCaseRequest):Promise<CreateQuestionUseCaseResponse>{
		
		const question = Question.create({
			authorId: new UniqueEntityID(authorId),
			content,
			title
		});

		const questionAttachments = attachmentsIds.map(id=>{
			return QuestionAttachment.create({
				attachmentId: new UniqueEntityID(id),
				questionId: question.id
			});
		});

		question.attachments = new QuestionAttachmentList(questionAttachments);

		await this.questionsRepository.create(question);

		return right({question});
	}
}

