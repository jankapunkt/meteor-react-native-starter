import { createCollection } from '../lib/infrastructure/createCollection'

const map = new Map()

export const mockCollection = (context) => {
  if (!map.has(context.name)) {
    map.set(context.name, createCollection({
      name: context.name,
      isLocal: true
    }))
  }
  const collection = map.get(context.name)
  context.collection = () => collection
  return context
}

export const resetCollection = context => context.collection().remove({})

export const restoreCollection = context => {
  map.delete(context.name)
  context.collection = () => {
    throw new Error('is not initialized')
  }
}
