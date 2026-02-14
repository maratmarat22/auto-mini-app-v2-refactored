import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppRoot } from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import logo from '@/features/wizard/ui/steps/HeroStep/assets/logo.png';
import { tma } from './shared/lib/tma.ts';
import { preloadImage } from './shared/lib/preloadImage.ts';

await preloadImage(logo);
await tma.init();

const platform = tma.launchParameters?.tgWebAppPlatform ?? 'ios';
document.documentElement.setAttribute('platform', platform);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoot platform={platform === 'ios' ? 'ios' : 'base'} className="appRoot">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AppRoot>
  </StrictMode>,
);
