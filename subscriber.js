var mqtt = require('mqtt')
var client = mqtt.connect({ port: 1883, host: 'localhost'})

function publish () {
  client.publish('test', JSON.stringify({data: 'testing'}), { qos: 1, retain: true })
}

function subscribe () {
  client.subscribe('test', { qos: 1 }, publish)
}

client.on('connect', subscribe)

client.on('offline', function () {
  console.log('offline')
})

client.on('error', function () {
  console.log('reconnect!')
  client.stream.end()
})

process.on('SIGINT', function () {
  console.log('stop!')
  process.exit(0)
})