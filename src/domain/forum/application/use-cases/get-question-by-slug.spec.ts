import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { GetQuestionBySlug } from './get-question-by-slug';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;

let sut: GetQuestionBySlug;

describe('Create Question', ()=>{
  
	beforeEach(()=>{
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();

		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);

		sut = new GetQuestionBySlug(inMemoryQuestionsRepository);
	});

	it('should be able to get a question by slug', async ()=>{
		const newQuestion = makeQuestion({slug: Slug.create('example-question')});
    
		inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({slug: 'example-question'});

		expect(result.value)
			.toMatchObject({question: expect.objectContaining({title: newQuestion.title,}),});

	
	});

});
