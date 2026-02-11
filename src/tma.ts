import {
  closingBehavior,
  hapticFeedback,
  init,
  miniApp,
  swipeBehavior,
  themeParams,
  viewport,
} from '@tma.js/sdk-react';

export const tma = {
  init: async () => {
    init();

    miniApp.mount();

    themeParams.mount();
    themeParams.bindCssVars();

    swipeBehavior.mount();
    swipeBehavior.disableVertical();

    closingBehavior.mount();
    closingBehavior.enableConfirmation();

    await viewport.mount();
    viewport.expand();

    miniApp.ready();
  },
  safeAreaInsetBottom: viewport.safeAreaInsetBottom,
  close: miniApp.close,
  hapticSuccess: () => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.notificationOccurred('success');
    }
  },
  hapticError: () => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.notificationOccurred('error');
    }
  },
};
