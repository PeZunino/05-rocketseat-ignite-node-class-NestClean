import { makeQuestion } from 'test/factories/make-question';
import { makeQuestionAttachment } from 'test/factories/make-question-attachments';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error';
import { EditQuestionUseCase } from './edit-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;

let sut: EditQuestionUseCase;

describe('Edit Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);

		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();

		sut = new EditQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionAttachmentsRepository,
		);	
	});

	it('should be able to edit a question', async () => {
		const newQuestion = makeQuestion(
			{authorId: new UniqueEntityID('author-1'),},
			new UniqueEntityID('question-1'),
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		inMemoryQuestionAttachmentsRepository.items.push(
			makeQuestionAttachment({
				questionId: newQuestion.id,
				attachmentId: new UniqueEntityID('1'),
			}),
			makeQuestionAttachment({
				questionId: newQuestion.id,
				attachmentId: new UniqueEntityID('2'),
			}),
		);
		
		await sut.execute({
			questionId: newQuestion.id.toValue(),
			authorId: 'author-1',
			title: 'Pergunta teste',
			content: 'Conteúdo teste',
			attachmentsIds: [
				'1', '3'
			],
		});

		expect(inMemoryQuestionsRepository.items[0])
			.toMatchObject({
				title: 'Pergunta teste',
				content: 'Conteúdo teste',
			});
	});

	it('should not be able to edit a question from another user', async () => {
		const newQuestion = makeQuestion(
			{authorId: new UniqueEntityID('author-1'),},
			new UniqueEntityID('question-1'),
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			questionId: newQuestion.id.toValue(),
			authorId: 'author-2',
			title: 'Pergunta teste',
			content: 'Conteúdo teste',
			attachmentsIds: []
		});

		expect(result.isLeft())
			.toBe(true);

		expect(result.value)
			.toBeInstanceOf(NotAllowedError);
	});
});