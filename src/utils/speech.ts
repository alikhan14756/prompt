// Web Speech API Pronunciation Utility for Anatomical Taxonomy & Latin nomenclature

export const speakTaxonomy = (text: string, lang = 'la') => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88;
  utterance.pitch = 1.0;

  // Attempt to select Latin or Romance/Italian/English voice
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice =
    voices.find(v => v.lang.startsWith(lang)) ||
    voices.find(v => v.lang.startsWith('it')) ||
    voices.find(v => v.lang.startsWith('en')) ||
    null;

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  window.speechSynthesis.speak(utterance);
};
