# dream-cheeky-thunder-hapi

### [GET] /

### [GET] /move/{direction}/{duration}
{direction} : ['up', 'down', 'left', 'right', 'park']
{duration} : in millisecond (>= 0)

### [GET] /fire/{shots}
{shots} : number of shot to fire (>= 0)

### [GET] /yaw/{angle}
{angle} : angle to go (-135 .. 135)

### [GET] /pitch/{angle}
{angle} : angle to go (-5 .. 45)
