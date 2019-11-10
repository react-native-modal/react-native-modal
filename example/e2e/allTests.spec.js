describe('Example', () => {
  const waitFor = delay => new Promise(accept => setTimeout(accept, delay));

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
      await element(by.id(`${modalName}-modal-open-button`)).tap();

      const modal = element(by.id(`modal`));
      await expect(modal).toBeNotVisible();
      await element(by.id(`modal-open-button`)).tap();
      await expect(modal).toBeVisible();
      await element(by.id('close-button')).tap();
      await expect(modal).toBeNotVisible();
      element(by.id('header-back')).tap();
      await waitFor(500);
    }
  });

  describe('swipeable modal', () => {
    it('should close the bottom-half modal by swiping down', async () => {
      await element(by.id(`swipeable-modal-open-button`)).tap();

      const modal = element(by.id('modal'));
      await expect(modal).toBeNotVisible();
      await element(by.id('modal-open-button')).tap();
      await expect(modal).toBeVisible();
      await modal.swipe('down', 'fast', 0.5);
      await expect(modal).toBeNotVisible();
    });

    it('should NOT close the bottom-half modal by swiping up', async () => {
      await element(by.id(`swipeable-modal-open-button`)).tap();

      const modal = element(by.id('modal'));
      await expect(modal).toBeNotVisible();
      await element(by.id('modal-open-button')).tap();
      await expect(modal).toBeVisible();
      await modal.swipe('up', 'fast', 0.5);
      await expect(modal).toBeVisible();
    });
    it('should NOT close the bottom-half modal by swiping right', async () => {
      await element(by.id(`swipeable-modal-open-button`)).tap();

      const modal = element(by.id('modal'));
      await expect(modal).toBeNotVisible();
      await element(by.id('modal-open-button')).tap();
      await expect(modal).toBeVisible();
      await modal.swipe('right', 'fast', 0.5);
      await expect(modal).toBeVisible();
    });
    it('should NOT close the bottom-half modal by swiping left', async () => {
      await element(by.id(`swipeable-modal-open-button`)).tap();

      const modal = element(by.id('modal'));
      await expect(modal).toBeNotVisible();
      await element(by.id('modal-open-button')).tap();
      await expect(modal).toBeVisible();
      await modal.swipe('left', 'fast', 0.5);
      await expect(modal).toBeVisible();
    });
  });
});
