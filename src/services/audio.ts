/** Single shared HTMLAudioElement — lives for the whole app lifetime. */
export const audio = new Audio();
audio.preload = 'auto';
audio.crossOrigin = 'anonymous';