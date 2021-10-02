describe('given a brand new user with no existing config', () => {
  describe('when the app is opened', () => {
    it.todo('should show the timer');
    it.todo('should have a default time of 25 mins');
  });

  describe('when the timer is started', () => {
    it.todo('should tick down every second');
    it.todo('should show the time in the menu bar');
    it.todo('should show the active icon in the menu bar');

    describe('when pause is pressed', () => {
      it.todo('should stop ticking down');
      it.todo('should show the stopped time in the menu bar');

      describe('when play is pressed', () => {
        it.todo('should tick down every second from where it left off');
        it.todo('should tick down every second in the menu bar');
      });
    });

    describe('when stop is pressed', () => {
      it.todo('should stop the timer');
      it.todo('should reset the timer');
      it.todo('should clear the time in the menu bar');
      it.todo('should show the inactive icon in the menu bar');

      describe('when play is pressed', () => {
        it.todo('should tick down every second from the beginning');
        it.todo('should show the time in the menu bar');
        it.todo('should show the active icon in the menu bar');
      });
    });
  });

  describe('when the user navigates to settings', () => {
    it.todo('should display the settings page');

    describe('when the user changes the timer duration to 10 minutes', () => {
      it.todo('should show 10 minutes as the new duration in the settings page');
      it.todo('should update the users config with the new settings');

      describe('when the user navigates back to the timer', () => {
        it.todo('should show a 10 minute timer');

        describe('when play is pressed', () => {
          it.todo('should tick down every second, starting at 10 minutes');
          it.todo('should show the time in the menu bar');
          it.todo('should show the active icon in the menu bar');

          describe('when stop is pressed', () => {
            it.todo('should stop the timer');
            it.todo('should reset the timer to 10 mins');
            it.todo('should clear the time in the menu bar');
            it.todo('should show the inactive icon in the menu bar');
          });
        });
      });
    });
  });

  describe('given the user starts a 10 minute timer', () => {
    describe('when they naviagte to settings and then back to the timer', () => {
      it.todo('should continue to tick down every second');
    });
  });

  describe('given the user starts a 10 minute timer', () => {
    describe('when the user navigates to settings and changes the timer to 20 minutes, and then navigates back to the timer', () => {
      it.todo('should still be counting down on the orginal timer');

      describe('when stop is pressed', () => {
        it.todo('should stop the timer');
        it.todo('should reset the timer to 20 minutes');
      });
    });
  });
});
