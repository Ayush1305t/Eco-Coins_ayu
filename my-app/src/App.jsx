import CleaningValidationPage from "./pages/CleaningValidationPage";
import Home from "./pages/Home";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/validation" element={<CleaningValidationPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;