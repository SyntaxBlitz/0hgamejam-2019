const state = {
    room: 'commons',
    inventory: [],
    time: 0,
};

const renderTime = time => '1:' + (time + '').padStart(2, '0') + ' AM';

const itemFlavor = {
    'printer': 'With great difficulty, you manage to lift the printer. You are now carrying... a printer.',
    'a buzzcard': 'The buzzcard belongs to one "Austin J. Adams". You\'re not quite sure who that is, but it seems familiar, somehow...',
};

const rooms = {
    'commons': {
        'flavor': 'You are in the commons of the College of Computing. It is CURRENT_TIME. To your right is the 2200 and 2340 TA lab. Ahead of you is the 1331 lab. If you take a left, you can approach the 1332 TA lab.',
        'items': ['printer', 'buzzcard'],
    },
};

const currentString = () => {
    return (
        rooms[state.room].flavor
        + '\n\n'
        + (rooms[state.room].items.length ? ('You see: ' + rooms[state.room].items.join(', ') + '\n\n') : '')
        + 'You\'re carrying' + (state.inventory.length ? ': ' + state.inventory.join(', ') : ' nothing!') + '\n\n'
        + 'What do you do?'
    );
};

while (true) {
    const command = prompt(currentString()).toLowerCase();
    
    const takeMatch = command.match(/^(grab|take) (.*)/i);
    if (takeMatch) {
        const object = takeMatch[2].trim();
        if (!rooms[state.room].items.includes(object)) {
            alert('That\'s not in this room!');
            continue;
        }

        rooms[state.room].items = rooms[state.room].items.filter(i => i !== object);
        state.inventory.push(object);
        alert(itemFlavor[object]);
        continue;
    }

    

    alert('...what?');
}