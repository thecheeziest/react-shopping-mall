import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { getClient } from './queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalStyle } from './styles/globalStyles.ts';
import GNB from './components/GNB.tsx';
import { RecoilRoot } from 'recoil';

const App = () => {
  const elem = useRoutes(routes);
  const queryClient = getClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <GNB />
        {elem}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
