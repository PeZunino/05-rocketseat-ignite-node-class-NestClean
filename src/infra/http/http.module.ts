import { DatabaseModule } from '@faker-js/faker/.';
import { Module } from '@nestjs/common';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';

@Module({
	imports:[
		DatabaseModule
	],
	controllers: [
		CreateQuestionController, 
		CreateAccountController, 
		AuthenticateController, 
		FetchRecentQuestionsController
	],
	
})
export class HttpModule{}