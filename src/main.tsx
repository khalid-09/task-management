import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { ThemeProvider } from './components/theme-provider.tsx';
import store from './store/index.ts';
import { Toaster } from './components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster position="top-left" />
    </ThemeProvider>
  </StrictMode>
);
