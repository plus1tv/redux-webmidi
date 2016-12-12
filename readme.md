![Cover Image][cover-url]

# redux-webmidi

[![License][license-img]][license-url]
[![Dependency Status][david-img]][david-url]
[![devDependency Status][david-dev-img]][david-dev-url]

An intuitive Redux reducer/action creators for handling MIDI devices.

```bash
npm i redux-webmidi -S
```

## Usage

```js
import { createStore, combineReducers } from 'redux';
import { midiReducer as midi, midiProvider } from 'redux-webmidi';

const reducer = combineReducers({
  // Your other reducers
  midi
});

const store = createStore(reducer);

// Wrap your store with a proxy provider
midiProvider(store);

```

```js
import { connect } from 'react-redux';

@connect((state) => ({midi: state.midi}))
let App = ({ midi }) => (
  <div>
    {midi.ports.map((c, i) => <InstrumentView data={c} key={i}/>)}
    <Synth keys={(midi.ports[0]) ? midi.ports[0].keys : null}/>
  </div>
);

```

## Data Layout

```js
type KeyMap {
  // The index is the key on the keyboard.
  [index: number]: {
    // The status keycode
    status: number,
    velocity: number
  }
};

type MidiDevice: {
  id: number,
  name: string,
  manufacturer: string,
  state: 'connected' | 'disconnected',
  type: 'input' | 'output' | 'input/output',
  keys: KeyMap
};

type WebMidiState = {
  ports: MidiDevice[]
};
```

Refer to the official [Midi specification](https://www.midi.org/specifications/item/table-1-summary-of-midi-message) or [WebMidi](https://webaudio.github.io/web-midi-api/) specification if you have any other questions.

The first byte (denoted as zero in all examples in the table) describes the midi channel, whereas the larger byte describes the actual message.

| Message  | Status |
|----------|--------|
| Note Off | `0x80` |
| Note On  | `0x90` | 

```js
let {keys} = this.state.port[0];
keys.map( key => {
  if (key.status & 0x90) {
    playSound('./bee.wav');
  }
});
```

[cover-url]: docs/cover.png
[license-img]: http://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
[david-url]: https://david-dm.org/stelatech/redux-webmidi
[david-img]: https://david-dm.org/stelatech/redux-webmidi.svg?style=flat-square
[david-dev-url]: https://david-dm.org/stelatech/redux-webmidi#info=devDependencies
[david-dev-img]: https://david-dm.org/stelatech/redux-webmidi/dev-status.svg?style=flat-square
[travis-img]: https://img.shields.io/travis/stelatech/redux-webmidi.svg?style=flat-square
[travis-url]:https://travis-ci.org/stelatech/redux-webmidi
[codecov-img]:https://img.shields.io/codecov/c/github/stelatech/redux-webmidi.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/stelatech/redux-webmidi
[npm-img]: https://img.shields.io/npm/v/redux-webmidi.svg?style=flat-square
[npm-url]: http://npm.im/redux-webmidi
[npm-download-img]: https://img.shields.io/npm/dm/redux-webmidi.svg?style=flat-square