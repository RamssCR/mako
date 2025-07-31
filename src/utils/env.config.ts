import { 
  frontendSchema, 
  firebaseSchema, 
  nodeSchema 
} from '@schemas/environment'
import { z } from 'zod'

const { 
  DEV,
  PROD,
} = import.meta.env

const frontend = frontendSchema.safeParse(import.meta.env)
const firebase = firebaseSchema.safeParse(import.meta.env)
const node = nodeSchema.safeParse(import.meta.env)

if (!frontend.success) {
  console.error('❌ Invalid frontend env:', z.treeifyError(frontend.error))
  console.info('🧾 Please check your .env file. Did you forget to copy from .env.example?')
  throw new Error('Invalid environment variables, please check your .env file or environment configuration.', {
    cause: { frontend: z.treeifyError(frontend.error) }
  })
}


if (!firebase.success) {
  console.error('❌ Invalid Firebase env:', z.treeifyError(firebase.error))
  console.info('🧾 Please check your .env file. Did you forget to copy from .env.example?')
  throw new Error('Invalid environment variables, please check your .env file or environment configuration.', {
    cause: { firebase: z.treeifyError(firebase.error) }
  })
}

if (!node.success) {
  console.error('❌ Invalid Node env:', z.treeifyError(node.error))
  console.info('🧾 Please check your .env file. Did you forget to copy from .env.example?')
  throw new Error('Invalid environment variables, please check your .env file or environment configuration.', {
    cause: { node: z.treeifyError(node.error) }
  })
}

export const env = {
  DEV,
  PROD,
  frontend: frontend.data,
  firebase: firebase.data,
  node: node.data,
}