const fastify = require('fastify')()
const fs = require('fs')
const path = require('path')

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public', // optional: default '/'
})

// fastify.get('/another/path', function(req, reply) {
fastify.get('/big5', async (request, reply) => {
    // reply.sendFile('big5/big5.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
    const stream = fs.createReadStream(path.join(__dirname, 'big5', 'big5.html'), 'utf8')
    reply.type('text/html').send(stream)
})

fastify.get('/big5/dev', async (request, reply) => {
    const stream = fs.createReadStream(path.join(__dirname, 'big5', 'dev.html'), 'utf8')
    reply.type('text/html').send(stream)
})

fastify.listen(3010, (err, address) => {
    if (err) {
        throw err
    }
    fastify.log.info(`server listening on ${address}`)
})
