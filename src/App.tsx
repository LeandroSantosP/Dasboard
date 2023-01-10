import { Header } from './shared/components/Header'
import './index.css';
import { SideMenu } from './shared/components/SideMenu';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { SideBarProvider } from './shared/context';
import { LoginAuth } from './pages';
import { AuthProvider } from './shared/context/AuthContext';
import { Resgister } from './pages/Register/Register';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>


          <LoginAuth>
            <SideBarProvider>

              <Header />
              <SideMenu>
                <AppRoutes />
              </SideMenu>

            </SideBarProvider>
          </LoginAuth>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
