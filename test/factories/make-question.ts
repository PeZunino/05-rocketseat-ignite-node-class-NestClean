import {faker} from '@faker-js/faker';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export function makeQuestion(overwrite?:Partial<Question>, id?:UniqueEntityID){

	return Question.create({
		authorId: new UniqueEntityID(),
		title: faker.lorem.sentence(),
		slug: Slug.create('example-question'),
		content: faker.lorem.text(),
		...overwrite
	},id );
}