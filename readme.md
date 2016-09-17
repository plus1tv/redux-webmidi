# redux-midi

An intuitive midi state reducer for redux.

## Usage

```js
import { createStore, combineReducers } from 'redux';
import { midiReducer as midi } from 'redux-midi';

const reducers = {
  // Your other Reducers
  midi
};

const reducer = combineReducers(reducers);

const store = createStore(reducer);
```

```js
import { connect } from 'react-redux';

@connect((state) => ({midi: state.midi}))
let App = ({ midi }) => (
  <div>
    {midi.connections.map((c, i) => <InstrumentView data={c} key={i}/>)}
    <PianoRoll keys={midi.keys}/>
    <Synth keys={midi.keys}/>
    <Modal>{midi.error}</Modal>
  </div>
);

```