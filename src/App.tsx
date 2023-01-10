import { Header } from './shared/components/Header'
import './index.css';
import { SideMenu } from './shared/components/SideMenu';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { SideBarProvider } from './shared/context';
import { LoginAuth } from './pages';
import { LoginProvider } from './shared/context/LoginContext';

function App() {

  return (
    <>
      <BrowserRouter>
        <LoginProvider>

          <LoginAuth>
            <SideBarProvider>

              <Header />
              <SideMenu>
                <AppRoutes />
              </SideMenu>

            </SideBarProvider>
          </LoginAuth>
        </LoginProvider>
      </BrowserRouter>
    </>
  )
}

export default App
