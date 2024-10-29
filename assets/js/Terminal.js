document.getElementById('command-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim().toLowerCase();
        handleCommand(command);
        this.value = '';
    } else if (e.key === 'Tab') {
        e.preventDefault();
        autocompleteCommand();
    }
});

function handleCommand(command) {
    const output = document.getElementById('output');
    if (command === 'whoami') {
        toggleSection('whoami');
    } else if (command === 'ls /skills') {
        toggleSection('skills');
    } else if (command === 'cat /var/log/history.log') {
        toggleSection('experience');
    } else if (command === 'git clone projects') {
        toggleSection('projects');
    } else if (command === 'cat /etc/education.conf') {
        toggleSection('education');
    } else if (command === 'echo $contact') {
        toggleSection('contact');
    } else if (command === 'apt install cv') {
        toggleSection('cv');
    } else if (command === 'clear') {
        document.getElementById('output').innerHTML = '';
    } else if (command === 'help') {
        output.innerHTML += `\n\nAvailable commands:\n\n<b>whoami</b>                           : About Anass.\n<b>ls /skills</b>                       : List skills.\n<b>cat /var/log/history.log</b>         : Job experience.\n<b>git clone projects</b>               : View projects.\n<b>cat /etc/education.conf</b>          : Education background.\n<b>echo $CONTACT</b>                    : Contact info.\n<b>apt install cv</b>                   : Download My CV.\n<b>clear</b>                            : Clear screen.`;
    } else {
        output.innerHTML += `\nCommand not found: ${command}`;
    }
}

function toggleSection(sectionId) {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

function focusInput() {
    document.getElementById('command-input').focus();
}

function redirectToIndex() {
    window.location.href = "index.html";
}

function toggleFullscreen() {
    const container = document.querySelector('.container');
    container.classList.toggle('fullscreen');
    const terminal = document.getElementById('terminal');
    terminal.classList.toggle('fullscreen');
}

function hideTerminal() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('show-terminal-btn').classList.remove('hidden');
}

function showTerminal() {
    document.querySelector('.container').style.display = 'flex';
    document.getElementById('show-terminal-btn').classList.add('hidden');
}

function autocompleteCommand() {
    const input = document.getElementById('command-input');
    const value = input.value.trim().toLowerCase();
    const commands = [
        'whoami',
        'ls /skills',
        'cat /var/log/history.log',
        'git clone projects',
        'cat /etc/education.conf',
        'echo $contact',
        'apt install cv'
    ];
    const matchingCommands = commands.filter(cmd => cmd.startsWith(value));
    if (matchingCommands.length === 1) {
        input.value = matchingCommands[0];
    } else if (matchingCommands.length > 0) {
        const commonPrefix = matchingCommands.reduce((prefix, cmd) => {
            while (cmd.indexOf(prefix) !== 0) {
                prefix = prefix.slice(0, -1);
            }
            return prefix;
        }, matchingCommands[0]);
        input.value = commonPrefix;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showTerminal(); // Show terminal initially
});