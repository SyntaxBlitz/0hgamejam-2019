const state = {
    room: 'commons',
    inventory: [],
    dead: false,
};

const itemFlavor = {
    'printer': 'With great difficulty, you manage to lift the printer. You are now carrying... a printer.',
    'buzzcard': 'The buzzcard belongs to one "Austin J. Adams". You\'re not quite sure who that is, but it seems familiar, somehow...',
    'chessboard': 'You\'ve never really been sure why there\'s a chessboard in this room. You have definitely never seen anyone playing chess here. Still, maybe it\'ll come in handy. You pack up the chessboard and take it with you.',
    'key': 'You pick up a brass key. It should get you into an office somewhere around this building.',
};

const move = room => () => {
    state.room = room;
};

const tryHB = () => {
    if (state.inventory.includes('key')) {
        move('hb')();
    } else {
        alert('You try Dr. HB\'s door, but it\'s locked. You\'ll have to find a key.');
    }
};

const try2110 = () => {
    if (state.inventory.includes('buzzcard')) {
        move('2110')();
    } else {
        alert('You try the door, but it\'s locked. There\'s a buzzcard reader by the door.');
    }
};

const rooms = {
    'commons': {
        'flavor': 'You are in the commons of the College of Computing. To your right (r) is the 2200 and 2340 TA lab. Ahead of you (a) is the 1331 lab. If you take a left (l), you can approach the 1332 TA lab.',
        'items': ['printer', 'buzzcard'],
        'commands': {
            'l': move('hallway'),
            'r': move('2200'),
            'a': move('1331'),
        },
    },
    'hallway': {
        'flavor': 'You\'re on the way to the 1332 TA lab, in the hallway with the instructors\' offices. You\'ve stopped just by the office of Dr. Mary Hudachek-Buswell. You can proceed ahead to the TA lab (a), move left into Dr. HB\'s office (l), move right to the 2110 lab (r), or go back to the commons (b).',
        'items': [],
        'commands': {
            'a': () => alert('You try the door to the 1332 lab, but it\'s locked.' + (state.inventory.includes('buzzcard') ? ' The buzzcard you\'re carrying proves ineffective.' : '')),
            'l': tryHB,
            'b': move('commons'),
            'r': try2110,
        },
    },
    '2200': {
        'flavor': 'You\'ve entered the 2200/2340 TA lab. but it\'s dark. The lightswitch is ineffective -- only the glow from the commons illuminates the room at all. You are likely to be eaten by a grue. You can move left to the 1331 lab (l), move backward to the commons (b), or try to light up the room with your cell phone (light).',
        'items': [],
        'commands': {
            'l': move('1331'),
            'b': move('commons'),
            'light': () => {
                alert('As you fumble with your cell phone, you hear a noise.');
                alert('You have been eaten by a grue.');
                state.dead = true;
            }
        }
    },
    '2110': {
        'flavor': 'Inside the 2110 lab is... Brandon Whitehead? Didn\'t he graduate?\n\n"I challenge you to a game." You can accept (a) or reject (r).',
        'items': [],
        'commands': {
            'a': () => {
                if (state.inventory.includes('chessboard')) {
                    alert('You challenge Brandon to a game of chess.');
                    alert('The game is going well, until...');
                    alert('Brandon starts chanting.  B R A N D O N A C C I !');
                    alert('He vanishes. Now that you are unblocked, you proceed to the 1332 TA lab.');
                    move('1332')();
                } else {
                    alert('"What did you bring for me to play?" asks Brandon. You don\'t have anything to challenge him with, though...\n\nYou leave the lab the way you came.');
                    move('hallway')();
                }
            },
            'r': move('hallway'),
        },
    },
    '1331': {
        'flavor': 'You are in the 1331 TA lab. You can leave (b), or move right into the 2200 lab (r).',
        'items': ['chessboard'],
        'commands': {
            'b': move('commons'),
            'r': move('2200'),
        },
    },
    '1332': {
        'flavor': 'You are in the 1332 lab. You can exit ahead to the hallway (a) or behind to the 2110 lab (b).',
        'items': ['key'],
        'commands': {
            'a': move('hallway'),
            'b': move('2110'),
        },
    },
    'hb': {
        'flavor': 'You are inside Dr. HB\'s office. She\'s left her computer on, unlocked. You can leave the room (b) or use the computer (computer).',
        'items': [],
        'commands': {
            'b': move('hallway'),
            'computer': () => {
                alert('You start using the computer.');
                alert('Before you realize what\'s happening, you find that your fingers have typed http://ta-app.cc.gatech.edu.');
                alert('You are in the administration panel of the TA app.');
                alert('The 1332 TA rankings are open.');
                alert('To the right: Austin J. Adams, "very" interested.');
                alert('Drag.');
                alert('Drag.');
                alert('Commit.');
                alert('Austin J. Adams is at the top of the list.');
                alert('You have hired Austin J. Adams as a 1332 TA. Congratulations.');
                alert('...');
                alert('...');
                alert('...');
                alert('Two days pass.');
                alert('You go to your classes.');
                alert('Things are okay. But something seems strange.');
                alert('Out of the corner of your eye... something?');
                alert('Nothing. Every time you look, there\'s nothing.');
                alert('That night, maybe with a bit of unease, you find yourself drifting to sleep.');
                alert('The next morning,');
                alert('you do not wake up.');
                alert('You have been slain.');
                alert('Monica Sweat stands beside your bed, bloody knife in hand.');
                alert('Was it worth it?');
                state.dead = true;
            },
        }
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
    if (state.dead) {
        break;
    }

    const command = prompt(currentString()).toLowerCase();

    if (command in rooms[state.room].commands) {
        rooms[state.room].commands[command]();
        continue;
    }

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