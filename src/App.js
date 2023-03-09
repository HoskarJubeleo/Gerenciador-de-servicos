import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import Newproject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

import Conteiner from './components/layout/Conteiner'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>

      <Navbar />

      <Conteiner customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />}> </Route>
          <Route path="/projects" element={<Projects />}> </Route>
          <Route path="/company" element={<Company />}> </Route>
          <Route path="/contact" element={<Contact />}> </Route>
          <Route path="/newproject" element={<Newproject />}> </Route>
          <Route path="/project/:id" element={<Project />}> </Route>
        </Routes>
        
      </Conteiner>

      <Footer />

    </Router>
  );
}

export default App;
