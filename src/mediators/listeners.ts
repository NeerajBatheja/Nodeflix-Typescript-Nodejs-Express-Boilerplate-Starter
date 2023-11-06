import { dependencyLocator } from '../di-container'

export async function rabbitmqListeners (): Promise<void> {
  const rabbitMqConnection = await dependencyLocator.getRabbitMqConnection()
  await rabbitMqConnection.init()
  const consumers = ['ExampleConsumer']
  for(const consumer of consumers){
    const consumerModule = await dependencyLocator.getConsumer(consumer)
    await consumerModule.initialize()
  }
  
}
