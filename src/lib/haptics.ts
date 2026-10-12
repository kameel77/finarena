/**
 * Web Haptics Utility
 * Subtelne wibracje haptyczne dla urządzeń dotykowych wspierających navigator.vibrate.
 * Bezpiecznie ignorowane na iOS i urządzeniach bez silnika wibracji.
 */

export function triggerHaptic(type: 'light' | 'medium' | 'success' = 'light') {
  if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.vibrate) {
    return;
  }

  try {
    switch (type) {
      case 'light':
        navigator.vibrate(8);
        break;
      case 'medium':
        navigator.vibrate(16);
        break;
      case 'success':
        navigator.vibrate([10, 35, 15]);
        break;
    }
  } catch {
    // Fail silently on browsers restricting vibration policies
  }
}
