const SHOT_MIN = 0;
const SHOT_MAX = 4;

var SHOT_LEFT;

module.exports = {
    getTotalShot: function ()
    {
        return SHOT_MAX;
    },
    getMinShot: function ()
    {
        return SHOT_MIN;
    },
    getMaxShot: function ()
    {
        return SHOT_MAX;
    },
    getShotLeft: function ()
    {
        return SHOT_LEFT;
    },
    setShotLeft: function (shotLeft)
    {
        return SHOT_LEFT = shotLeft;
    }
}