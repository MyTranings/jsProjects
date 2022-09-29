const NOTE_DETAILS = [
  { note: "C", key: "Z", frequency: 261.626, active: false },
  { note: "Db", key: "S", frequency: 277.183, active: false },
  { note: "D", key: "X", frequency: 293.665, active: false },
  { note: "Eb", key: "D", frequency: 311.127, active: false },
  { note: "E", key: "C", frequency: 329.628, active: false },
  { note: "F", key: "V", frequency: 349.228, active: false },
  { note: "Gb", key: "G", frequency: 369.994, active: false },
  { note: "G", key: "B", frequency: 391.995, active: false },
  { note: "Ab", key: "H", frequency: 415.305, active: false },
  { note: "A", key: "N", frequency: 440, active: false },
  { note: "Bb", key: "J", frequency: 466.164, active: false },
  { note: "B", key: "M", frequency: 493.883, active: false }
]

const context = new AudioContext()

document.addEventListener('keydown', e => {
  if (e.repeat) {
    return
  }

  const noteObj = checkKey(e.key);

  if (noteObj == null) {
    return
  }

  noteObj.active = true;
  playNotes();
})

document.addEventListener('keyup', e => {
  const noteObj = checkKey(e.key);

  if (noteObj == null) {
    return
  }

  noteObj.active = false;

  playNotes();
})

function checkKey(key) {
  const keyClicked = key.toUpperCase();
  return NOTE_DETAILS.find(item => item.key === keyClicked)
}

function playNotes() {
  NOTE_DETAILS.forEach(note => {
    const keyEl = document.querySelector(`[data-note="${note.note}"]`)
    keyEl.classList.toggle('active', note.active);

    if (note.oscillator != null) {
      note.oscillator.stop();
      note.oscillator.disconnect();
    }
  })

  const activeNotes = NOTE_DETAILS.filter(n => n.active)
  const gain = 1 / activeNotes.length;

  activeNotes.forEach(note => {
    startNote(note, gain);
  })
}

function startNote(noteDetails, gain) {
  const gainNode = context.createGain()
  gainNode.gain.value = gain

  const oscillator = context.createOscillator()

  oscillator.frequency.value = noteDetails.frequency
  oscillator.connect(gainNode).connect(context.destination);
  oscillator.start();
  noteDetails.oscillator = oscillator;
}