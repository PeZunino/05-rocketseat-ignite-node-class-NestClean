import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteAnswerUseCase } from './delete-answer';
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error';

let inMemoryAnswersRepository: InMemoryAnswersRepository;

let inMemoryAnswerAttachmentsRepository : InMemoryAnswerAttachmentsRepository;

let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();

		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);

		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
	});

	it('should be able to delete a answer', async () => {
		const newAnswer = makeAnswer(
			{authorId: new UniqueEntityID('author-1'),},
			new UniqueEntityID('answer-1'),
		);

		await inMemoryAnswersRepository.create(newAnswer);

		await sut.execute({
			answerId: 'answer-1',
			authorId: 'author-1',
		});

		expect(inMemoryAnswersRepository.items)
			.toHaveLength(0);
	});

	it('should not be able to delete a answer from another user', async () => {
		const newAnswer = makeAnswer(
			{authorId: new UniqueEntityID('author-1'),},
			new UniqueEntityID('answer-1'),
		);

		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			answerId: 'answer-1',
			authorId: 'author-2',
		});

		expect(result.isLeft())
			.toBe(true);

		expect(result.value)
			.toBeInstanceOf(NotAllowedError);
	});
});