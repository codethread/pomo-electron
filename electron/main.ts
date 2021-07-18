// eslint-disable-next-line import/no-extraneous-dependencies
import { menubar } from 'menubar';
import { isDev, isIntegration } from '@shared/constants';
import url from 'url';
import path from 'path';
import { checkForUpdates, logger, setUpDevtools } from '@electron/services';
import { ipcMain } from '@electron/electron';
import { fakeRepositories, productionRepositories } from '@electron/repositories';
import { handlers, setupIpcHandlers } from '@electron/ipc';

checkForUpdates(logger);

const mb = menubar({
  index: getPage(),
  preloadWindow: true,
  browserWindow: {
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
    },
    alwaysOnTop: true,
  },
  showDockIcon: false,
  // ...(isDev && { windowPosition: 'topLeft' }),
});

const repos = isIntegration ? fakeRepositories() : productionRepositories();

mb.on('ready', () => {
  logger.info('app ready');
  setUpDevtools(logger);

  setupIpcHandlers(ipcMain, handlers(repos));

  // setInterval(() => {
  //   const [width, height] = mb.window?.getContentSize() ?? [0, 0];
  //   mb.window?.setContentSize(width, height > 500 ? 300 : 700, true);
  // }, 3000);
});

function getPage(): string {
  return isDev
    ? 'http://localhost:4000'
    : url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      });
}
