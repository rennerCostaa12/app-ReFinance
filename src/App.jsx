import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ApresentationAppRoute from "./routes/ApresentationAppRoute";
import ApplicationRoute from "./routes/ApplicationRoute";
import ProtectedRoutes from './routes/ProtectedRoutes';

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}


