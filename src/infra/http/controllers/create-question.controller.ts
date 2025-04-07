import { BadRequestException, Body, Controller, Post, } from '@nestjs/common';
import { z } from 'zod';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

const createQuestionBodySchema = z.object({
	content: z.string(),
	title: z.string(),
	attachments: z.array(z.string()
		.uuid()),
});

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
export class CreateQuestionController{

	constructor(
		private createQuestionUseCase: CreateQuestionUseCase
	){}

	@Post()
	async handle(
		@Body(bodyValidationPipe) body:CreateQuestionBodySchema,
		@CurrentUser() user:UserPayload
	){
		const {
			title, content, attachments 
		} = body;

		const userId = user.sub;

		const result = await this.createQuestionUseCase.execute({
			title,
			attachmentsIds: attachments,
			authorId:userId,
			content
		});

		if (result.isLeft()) {
			throw new BadRequestException();
		}
				
	}


}