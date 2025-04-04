import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list';
import { AnswersRepository } from '../repositories/answers-repository';

interface AnswerQuestionUseCaseRequest{
	authorId:string
	questionId:string
	content:string
	attachmentsIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<null,{answer:Answer}>

export class AnswerQuestionUseCase{

	constructor(
		private answersRepository:AnswersRepository
	){}

	async execute({
		authorId,questionId,content,attachmentsIds
	}:AnswerQuestionUseCaseRequest):Promise<AnswerQuestionUseCaseResponse>{
		const answer = Answer.create({
			authorId: new UniqueEntityID(authorId),
			questionId: new UniqueEntityID(questionId),
			content
		});

		const answerAttachments = attachmentsIds.map((attachmentId) => {
			return AnswerAttachment.create({
				attachmentId: new UniqueEntityID(attachmentId),
				answerId: answer.id,
			});
		});

		answer.attachments = new AnswerAttachmentList(answerAttachments);

		await this.answersRepository.create(answer);
    
		return right({answer});
	}
}

