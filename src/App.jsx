import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ApresentationAppRoute from "./routes/ApresentationAppRoute";
import ApplicationRoute from "./routes/ApplicationRoute";
import ProtectedRoutes from './routes/ProtectedRoutes';
import AddRoute from "./routes/AddRoute";
import EditRoute from "./routes/EditRoute";

import { GlobalStyle } from "./style/GlobalStyle";


export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<ApresentationAppRoute />} />
          <Route path="/financas"
            element={
              <ProtectedRoutes>
                <ApplicationRoute />
              </ProtectedRoutes>
            } />

          <Route path="financas/add"
            element={
              <ProtectedRoutes>
                <AddRoute />
              </ProtectedRoutes>
            }
          />

          <Route path="financas/editar/:id"
            element={
              <ProtectedRoutes>
                <EditRoute />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


