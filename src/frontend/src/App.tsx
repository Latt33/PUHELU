import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DemoPage } from './pages/DemoPage';
import { ClinicianPage } from './pages/ClinicianPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/clinician" element={<ClinicianPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


