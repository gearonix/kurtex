import { z }         from 'zod'
import { AnyObject } from '@kurtex/std'
import { EnvSchema } from '@/env/env.schema'

export const createEnvValues = () => {
  return class EnvValues {} as {
    new (): z.infer<typeof EnvSchema>
  }
}

export class EnvValues extends createEnvValues() {}

export const validate = (raw: AnyObject) => {
  try {
    return { values: EnvSchema.parse(raw) }
  } catch (error) {
    const isZodError = error instanceof z.ZodError

    if (!isZodError) throw new Error('Unknown error parsing .env file')

    console.error('Invalid .env file. See below for detailed info.')
    console.info('\n')
    console.info(error.format())

    process.exit(1)
  }
}
