import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ResumeOverview } from './pages/ResumeOverview';
import { ResumeAnalyzer } from './pages/ResumeAnalyzer';
import { InterviewOverview } from './pages/InterviewOverview';
import { MockInterview } from './pages/MockInterview';
import { PreparationHub } from './pages/PreparationHub';
import { CompanyPrep } from './pages/CompanyPrep';
import { Dashboard } from './pages/Dashboard';
import { RecruiterHub } from './pages/RecruiterHub';
import { RecruiterCandidates } from './pages/RecruiterCandidates';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="resume" element={<ResumeOverview />} />
          <Route path="resume/analyze" element={<ResumeAnalyzer />} />
          <Route path="interview" element={<InterviewOverview />} />
          <Route path="interview/mock" element={<MockInterview />} />
          <Route path="preparation" element={<PreparationHub />} />
          <Route path="preparation/companies" element={<CompanyPrep />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="recruiter" element={<RecruiterHub />} />
          <Route path="recruiter/candidates" element={<RecruiterCandidates />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
