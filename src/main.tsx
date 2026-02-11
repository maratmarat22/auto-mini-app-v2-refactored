import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppRoot } from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { tma } from './tma.ts';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import logo from '@/features/wizard/ui/steps/HeroStep/assets/logo.png';

const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
};

await preloadImage(logo);

await tma.init();
const lp = retrieveLaunchParams();

const platform = lp.tgWebAppPlatform;
document.documentElement.setAttribute('platform', platform);

document.documentElement.style.setProperty(
  '--bottom-inset',
  `${tma.safeAreaInsetBottom()}px`,
);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot platform={platform === 'ios' ? 'ios' : 'base'} className="appRoot">
      <div className="themeProvider">
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </div>
    </AppRoot>
  </StrictMode>,
);
