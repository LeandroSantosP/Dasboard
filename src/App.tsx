import { CardCustom } from './shared/components/Card/'
import { Header } from './shared/components/Header'
import './index.css';
import { SideMenu } from './shared/components/SideMenu';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { SideBarProvider } from './shared/context';
import { ThemeProvider } from '@mui/material';

function App() {

  const objtest = {
    title: "Comida",
    description: "lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor",
    image: {
      src: "https://img.olhardigital.com.br/wp-content/uploads/2021/04/Junk-Food.jpg",
      alt: "imagem"
    },
    avaliation: 5
  }

  return (
    <div>
      <BrowserRouter>
        <SideBarProvider>
          <Header />
          <SideMenu>
            <AppRoutes />
          </SideMenu>
        </SideBarProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
