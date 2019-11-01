describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should open and close all the modals', async () => {
    const modals = [
      'default',
      'slide',
      'slow',
      'fancy',
      'bottom-half',
      'backdrop-close',
      'swipeable',
      'custom-backdrop',
    ];
    for (let modalName of modals) {
      const modal = element(by.id(`${modalName}-modal`));
      await expect(modal).toBeNotVisible();
      await element(by.id(`${modalName}-modal-open-button`)).tap();
      await expect(modal).toBeVisible();
      await element(by.id('all-modal-close-button')).tap();
      await expect(modal).toBeNotVisible();
    }
  });

  describe('swipeable modal', () => {
    it('should close the bottom-half modal by swiping down', async () => {
      const modal = element(by.id('swipeable-modal'));
      await expect(modal).toBeNotVisible();
      await element(by.id('swipeable-modal-open-button')).tap();
      await expect(modal).toBeVisible();
      await modal.swipe('down', 'fast', 0.5);
      await expect(modal).toBeNotVisible();
    });

    it('should NOT close the bottom-half modal by swiping up', async () => {
      const modal = element(by.id('swipeable-modal'));
      await expect(modal).toBeNotVisible();
      await element(by.id('swipeable-modal-open-button')).tap();
      await expect(modal).toBeVisible();
      await modal.swipe('up', 'fast', 0.5);
      await expect(modal).toBeVisible();
    });
    it('should NOT close the bottom-half modal by swiping right', async () => {
      const modal = element(by.id('swipeable-modal'));
      await expect(modal).toBeNotVisible();
      await element(by.id('swipeable-modal-open-button')).tap();
      await expect(modal).toBeVisible();
      await modal.swipe('right', 'fast', 0.5);
      await expect(modal).toBeVisible();
    });
    it('should NOT close the bottom-half modal by swiping left', async () => {
      const modal = element(by.id('swipeable-modal'));
      await expect(modal).toBeNotVisible();
      await element(by.id('swipeable-modal-open-button')).tap();
      await expect(modal).toBeVisible();
      await modal.swipe('left', 'fast', 0.5);
      await expect(modal).toBeVisible();
    });
  });
});
