import { type Schema, type ValidationOptions } from 'joi'
import type Joi from 'joi'

class JoiService {
  validate (data: any, schema: Schema, options?: ValidationOptions): Joi.ValidationResult {
    return schema.validate(data, options)
  }
}

export default JoiService
