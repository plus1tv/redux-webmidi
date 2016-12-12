let midi: Promise<WebMidi.MIDIAccess> = new Promise<any>(
  (res, rej) => rej('Could not load WebMidi. WebMidi is only supported on Chrome as of now.')
  );

if (navigator.requestMIDIAccess)
  midi = navigator.requestMIDIAccess();

export default midi;