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