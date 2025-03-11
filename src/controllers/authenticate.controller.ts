import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const authenticateBodySchema = z.object({
	email: z.string()
		.email(),
	password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController{

	constructor(
		private jwt:JwtService,
		private prisma: PrismaService
	){}

	@Post()
	@UsePipes(new ZodValidationPipe(authenticateBodySchema))
	async handle(@Body() body:AuthenticateBodySchema){

		const {
			email,password
		} = body;

		const user = await this.prisma.user.findUnique({where:{email}});

		if(!user){
			throw new UnauthorizedException('User credential do not match');
		}

		const isPasswordMatch = await compare(password,user.password);

		if(!isPasswordMatch){
			throw new UnauthorizedException('User credential do not match');
		}

		const accessToken = this.jwt.sign({sub:user.id});
   
		return {access_token: accessToken};
	}
}