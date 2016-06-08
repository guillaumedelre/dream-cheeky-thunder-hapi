'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

const DC    = require('dream-cheeky-thunder-driver');
const Pitch = require('./pitch');
const Yaw   = require('./yaw');

var debug = function () {
    console.log(Pitch.getCurrentAngle());
    console.log(Yaw.getCurrentAngle());
}

var setCurrentPitch = function (angle) {
    Pitch.setCurrentAngle(parseInt(angle));
}

var setCurrentYaw = function (angle) {
    Yaw.setCurrentAngle(parseInt(angle));
}

var getCurrentAngles = function () {
    return {
        'yaw': Yaw.getCurrentAngle(),
        'pitch': Pitch.getCurrentAngle(),
    }
}

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        DC.park(1000);
        setCurrentPitch(Pitch.getMaxAngle());
        setCurrentYaw(Yaw.getMinAngle());
        reply(getCurrentAngles());
    }
});

/**
 * todo update pitch and yaw current angle
 */
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
                DC.park(1000);
                setCurrentPitch(Pitch.getMaxAngle());
                setCurrentYaw(Yaw.getMinAngle());
                break;
        }
        reply(getCurrentAngles());
    }
});

/**
 * Yaw: Left-Right rotation
 */
server.route({
    method: 'GET',
    path: '/yaw/{angle}',
    handler: function (request, reply) {
        var moveAngle = parseInt(Yaw.getCurrentAngle() - parseInt(request.params.angle));
        var duration = Yaw.toDuration(moveAngle);
        if (request.params.angle > Yaw.getCurrentAngle()) {
            DC.moveRight(duration);
        } else {
            DC.moveLeft(duration);
        }
        setCurrentYaw(request.params.angle);
        reply(getCurrentAngles());
    }
});

/**
 * Pitch: Up-Down rotation
 */
server.route({
    method: 'GET',
    path: '/pitch/{angle}',
    handler: function (request, reply) {
        var moveAngle = parseInt(Pitch.getCurrentAngle() - parseInt(request.params.angle));
        var duration = Pitch.toDuration(moveAngle);
        if (request.params.angle < Pitch.getCurrentAngle()) {
            DC.moveUp(duration);
        } else {
            DC.moveDown(duration);
        }
        setCurrentPitch(request.params.angle);
        reply(getCurrentAngles());
    }
});

server.route({
    method: 'GET',
    path: '/fire/{shots}',
    handler: function (request, reply) {
        DC.fire(request.params.shots);
        reply(getCurrentAngles());
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});