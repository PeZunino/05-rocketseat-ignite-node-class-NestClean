import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface GetQuestionBySlugRequest{
	slug:string
}

type GetQuestionBySlugResponse = Either<ResourceNotFoundError, {
	question:Question
}>
  
export class GetQuestionBySlug{

	constructor(
		private questionsRepository:QuestionsRepository
	){}

	async execute({slug}:GetQuestionBySlugRequest):Promise<GetQuestionBySlugResponse>{
		
		const question = await this.questionsRepository.findBySlug(slug);

		if(!question){
			return left(new ResourceNotFoundError());
		}

		return right({question});
	}
}

