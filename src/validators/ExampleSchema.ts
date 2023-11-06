import { injectable } from 'inversify'
import Joi, { type Schema } from 'joi'

@injectable()
class ExampleSchema {
  public getUserSchema (): Schema {
    return Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required()
    })
  }
}

export default ExampleSchema
