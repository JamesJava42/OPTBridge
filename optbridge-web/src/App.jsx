import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import Refund from './pages/Refund.jsx';
import Join from './pages/Join.jsx';
import Login from './pages/Login.jsx';
import Tracker from './pages/Tracker.jsx';
import SupportDesk from './pages/SupportDesk.jsx';
import Admin from './pages/Admin.jsx';
import Account from './pages/Account.jsx';
import Help from './pages/Help.jsx';
import Contact from './pages/Contact.jsx';
import OwnerInbox from './pages/OwnerInbox.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join" element={<Join />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tracker" element={<ProtectedRoute roles={['subscriber']}><Tracker /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute roles={['subscriber']}><Account /></ProtectedRoute>} />
      <Route path="/help" element={<ProtectedRoute roles={['subscriber']}><Help /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute roles={['employee', 'admin']}><SupportDesk /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute roles={['admin']}><Admin /></ProtectedRoute>} />
      <Route path="/admin/inbox" element={<ProtectedRoute roles={['admin']}><OwnerInbox /></ProtectedRoute>} />
      <Route path="*" element={<RouteNotFound />} />
    </Routes>
  );
}

function RouteNotFound() {
  return <main className="route-not-found"><h1>Page not found</h1><a href="/">Return to OPTBridge</a></main>;
}

export default App;
