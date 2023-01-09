import { Header } from './shared/components/Header'
import './index.css';
import { SideMenu } from './shared/components/SideMenu';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { SideBarProvider } from './shared/context';

function App() {

  return (
    <>
      <BrowserRouter>
        <SideBarProvider>
          <Header />
          <SideMenu>
            <AppRoutes />
          </SideMenu>
        </SideBarProvider>
      </BrowserRouter>
    </>
  )
}

export default App
