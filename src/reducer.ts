import { createReducer } from './utils';

const initialState = {
    ports: []
};

let addPort = (state: { ports: any[] }, port) => {

    let ports = [...state.ports];

    if (ports[port.id])
        ports[port.id].type = 'input/output';
    else
        ports[port.id] = Object.assign({}, port, {keys: []});

    return Object.assign({}, state, { ports });
}

let removePort = (state, port) => {

    let ports = [...state.ports];

    if (ports[port.id])
        if (ports[port.id].type === 'input/output')
            ports[port.id].type = 'input/output'.replace(new RegExp(`\/?${port.type}\/?`), '');
        else
            ports = ports.filter(p => p.id !== port.id);

    return Object.assign({}, state, { ports });
}

let queueMessage = (state, message) => {
    
    let ports = [...state.ports];
    let curId = message.currentTarget.id;

    let status = message.data[0];
    let curKey = message.data[1];
    let velocity = message.data[2];

    ports[curId].keys[curKey] = {status, velocity};

    return Object.assign({}, state, {ports});
}

export default createReducer(initialState, {

    MIDI_CONNECTED: addPort,

    MIDI_DISCONNECTED: removePort,

    MIDI_MESSAGE: queueMessage

});