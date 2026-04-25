import { BrowserRouter, Route, Routes } from 'react-router';
import Recipes from './Recipes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

const queryClient = new QueryClient();

//const root = ReactDOM.createRoot(document.getElementById('root'));
 return (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
  );
}

export default App;
