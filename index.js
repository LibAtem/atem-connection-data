const fs = require('fs')
const path = require('path')
const { AtemSocket } = require('atem-connection/dist/lib/atemSocket')
const { DEFAULT_PORT } = require('atem-connection')
const prompt = require('prompt');

prompt.start();

const properties = [
    {
        name: 'ip',
        description: 'Enter the ip of your atem',
    },
    {
        name: 'filename',
        description: 'Enter the name of this case (eg. mini-v8.1)',
    }
];

prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    console.log('starting');
    const socket = new AtemSocket({
        debug: false,
        log: console.log,
        disableMultithreaded: true,
        address: result.ip,
        port: DEFAULT_PORT
    })
    socket.on('disconnect', () => {
        console.log('disconnect')
        process.exit(1)
    })
    
    const output = []
    
    socket.on('commandsReceived', cmds => {
        const initComplete = cmds.find(cmd => cmd.constructor.name === 'InitCompleteCommand')
        if (initComplete) {
            console.log('complete')
    		const filePath = path.resolve(__dirname, `./${result.filename}.data`)
            fs.writeFileSync(filePath, output.join('\n'))
            process.exit(0)
        }
    })
    
    const origParse = (socket._parseCommands).bind(socket)
    socket._parseCommands = (payload) => {
        output.push(payload.toString('hex'))
        return origParse(payload)
    }
    
    socket.connect()
    console.log('connecting')
});
