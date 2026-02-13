import {
  closingBehavior,
  hapticFeedback,
  init,
  miniApp,
  retrieveLaunchParams,
  swipeBehavior,
  themeParams,
  viewport,
  type NotificationHapticFeedbackType,
  type RetrieveLaunchParamsResult,
} from '@tma.js/sdk-react';

class TMA {
  launchParameters: RetrieveLaunchParamsResult | undefined;

  async init() {
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
    viewport.bindCssVars();

    this.launchParameters = retrieveLaunchParams();

    miniApp.ready();
  }

  close() {
    if (miniApp.isMounted()) {
      miniApp.close();
    }
  }

  hapticNotification(type: NotificationHapticFeedbackType) {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.notificationOccurred(type);
    }
  }
}

export const tma = new TMA();
