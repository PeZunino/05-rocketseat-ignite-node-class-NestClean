import { Body, ConflictException, Controller, Post, UsePipes } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

const createAccountBodySchema = z.object({
	name: z.string(),
	email: z.string()
		.email(),
	password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController{

	constructor(private prisma:PrismaService){}

	@Post()
	@UsePipes(new ZodValidationPipe(createAccountBodySchema))
	async handle(@Body() body:CreateAccountBodySchema){

		const {
			name, email, password
		} = createAccountBodySchema.parse(body);

		const userWithSameEmail = await this.prisma.user.findUnique({where:{email}});

		if(userWithSameEmail){
			throw new ConflictException('E-mail already in use');
		}

		const hashedPassword = await hash(password,8);

		await this.prisma.user.create({
			data:{
				email,
				name,
				password: hashedPassword
			}
		});

	}
}