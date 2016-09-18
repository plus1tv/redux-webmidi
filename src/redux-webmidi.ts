import {Store} from 'redux';
import midiPromise from './midi';
import midiReducer from './reducer';

let refreshPorts = (store, access) => {
  
    for (let input of access.inputs) {
      let curInput = input[1];
      let {id, name, manufacturer, state, type} = curInput;

      store.dispatch({
        type: 'MIDI_CONNECTED',
        payload: {
          id,
          name,
          manufacturer,
          state,
          type
        }
      });

      curInput.onmidimessage = (e) => {
        store.dispatch({ type: 'MIDI_MESSAGE', payload: e});
      }

    }

    for (let output of access.outputs) {
      let curOutput = output[1];
      let {id, name, manufacturer, state, type} = curOutput;

      store.dispatch({
        type: 'MIDI_CONNECTED',
        payload: {
          id,
          name,
          manufacturer,
          state,
          type
        }
      });

    }
}

let midiProvider = (store: Store<any>) => {

  midiPromise.then(access => {
    
    refreshPorts(store, access);

    access.onstatechange = (e) => {
      
      let {id, name, manufacturer, state, type} = e.port;

      let copy = {id, name, manufacturer, state, type};

      if (copy.state === 'disconnected')
        store.dispatch({type: 'MIDI_DISCONNECTED', payload: copy})

      if (copy.state === 'connected')
        store.dispatch({type: 'MIDI_CONNECTED', payload: copy})
    }

  });
}

export {midiProvider, midiPromise, midiReducer};