import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import Refund from './pages/Refund.jsx';
import Join from './pages/Join.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join" element={<Join />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund" element={<Refund />} />
    </Routes>
  );
}

export default App;
