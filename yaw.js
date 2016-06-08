const ANGLE_MIN = -135;
const ANGLE_MAX = 135;
const TOTAL_DURATION = 6000;

var CURRENT_ANGLE;

module.exports = {
    getTotalAngle: function ()
    {
        return Math.abs(ANGLE_MIN) + ANGLE_MAX;
    },
    getTotalDuration: function ()
    {
        return TOTAL_DURATION;
    },
    getMinAngle: function ()
    {
        return ANGLE_MIN;
    },
    getMaxAngle: function ()
    {
        return ANGLE_MAX;
    },
    getCurrentAngle: function ()
    {
        return CURRENT_ANGLE;
    },
    setCurrentAngle: function (angle)
    {
        CURRENT_ANGLE = angle;
    },
    toDuration: function (angle)
    {
        return Math.abs(Math.ceil(TOTAL_DURATION * angle / (Math.abs(ANGLE_MIN) + ANGLE_MAX)));
    },
    toAngle: function (duration)
    {
        return Math.ceil(parseInt(duration) * (Math.abs(ANGLE_MIN) + ANGLE_MAX) / TOTAL_DURATION);
    }
}
