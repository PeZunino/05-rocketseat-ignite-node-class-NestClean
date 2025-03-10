import { PipeTransform, BadRequestException, flatten } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  // unico metodo em um pipe, vai receber o valor e fazer algum transformacao.
  transform(value: unknown) { 
    try {
      return this.schema.parse(value)
    } catch (error) {
      
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: error.flatten().fieldErrors
        })
      }

      throw new BadRequestException('Validation failed')
    }
    
    return value
  }
}