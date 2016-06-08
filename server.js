'use strict';

const Hapi = require('hapi');
const DC = require('dream-cheeky-thunder-driver');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Dream-cheeky-thunder is awake !');
    }
});

server.route({
    method: 'GET',
    path: '/move/{direction}/{duration}',
    handler: function (request, reply) {
        switch (request.params.direction) {
            case 'up':
                DC.moveUp(request.params.duration);
                break;
            case 'down':
                DC.moveDown(request.params.duration);
                break;
            case 'right':
                DC.moveRight(request.params.duration);
                break;
            case 'left':
                DC.moveLeft(request.params.duration);
                break;
            case 'park':
            default:
                DC.park();
                break;
        }
        var message = 'Dream-cheeky-thunder moving :<br>Direction: ' + encodeURIComponent(request.params.direction) + '<br>Duration: ' + encodeURIComponent(request.params.duration);
        reply(message);
    }
});

server.route({
    method: 'GET',
    path: '/fire/{shots}',
    handler: function (request, reply) {
        DC.fire(request.params.shots);
        var message = 'Dream-cheeky-thunder shooting :<br>Shots: ' + encodeURIComponent(request.params.shots);
        reply(message);
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});