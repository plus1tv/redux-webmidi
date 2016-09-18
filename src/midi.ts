let midi: Promise<WebMidi.MIDIAccess>;

if (navigator.requestMIDIAccess)
  midi = navigator.requestMIDIAccess();

export default midi;