// "⌘K" on Apple devices, "Ctrl K" everywhere else.
const isApple = () => {
  if (typeof navigator === 'undefined') return false;
  const platform = navigator.userAgentData?.platform || navigator.platform || '';
  return /mac|iphone|ipad|ipod/i.test(platform);
};

export const paletteShortcut = () => (isApple() ? '⌘K' : 'Ctrl K');
