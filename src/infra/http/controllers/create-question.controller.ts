import { Body, Controller, Post, UseGuards, } from '@nestjs/common';
import { z } from 'zod';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

const createQuestionBodySchema = z.object({
	content: z.string(),
	title: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
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
			content,title
		} = body;

		const userId = user.sub;

		this.createQuestionUseCase.execute({
			title,
			attachmentsIds:[],
			authorId:userId,
			content
		});

	}


}