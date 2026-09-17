(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  window.SOUNDS = {
    flap: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const now = context.currentTime;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(1100, now);
        oscillator.frequency.exponentialRampToValueAtTime(420, now + 0.12);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(now);
        oscillator.stop(now + 0.12);
      } catch (error) {}
    },

    score: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const now = context.currentTime;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(180, now);
        oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
      } catch (error) {}
    },

    crash: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const now = context.currentTime;
        const duration = 0.28;
        const noiseBuffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let index = 0; index < noiseData.length; index += 1) {
          noiseData[index] = Math.random() * 2 - 1;
        }
        const noise = context.createBufferSource();
        const noiseGain = context.createGain();
        noise.buffer = noiseBuffer;
        noiseGain.gain.setValueAtTime(0.2, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        noise.connect(noiseGain);
        noiseGain.connect(context.destination);
        noise.start(now);
        noise.stop(now + duration);

        const rumble = context.createOscillator();
        const rumbleGain = context.createGain();
        rumble.type = 'sine';
        rumble.frequency.setValueAtTime(130, now);
        rumble.frequency.exponentialRampToValueAtTime(45, now + duration);
        rumbleGain.gain.setValueAtTime(0.18, now);
        rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        rumble.connect(rumbleGain);
        rumbleGain.connect(context.destination);
        rumble.start(now);
        rumble.stop(now + duration);
      } catch (error) {}
    }
  };
})();
