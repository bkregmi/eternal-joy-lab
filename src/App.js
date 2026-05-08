import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Pranayama from './components/Pranayama';
import SlokaViewer from './components/SlokaViewer';
import DocViewer from './components/DocViewer';
import prayerData from './data/daily-prayers.json';
import gopiGeet from './data/gopi-geet.json';
import govindaAdipurusha from './data/govinda-adipurusha.json';
import gitaDhyanam from './data/gita-dhyanam.json';
import gitaVerses from './data/gita-selected-verses.json';
import suryastakam from './data/suryashtakam.json';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <header className="app-header"><h1>Eternal Joy Lab</h1></header>
      <Menu />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prayers" element={<SlokaViewer data={prayerData} pageTitle="Daily Prayers" />} />
          <Route path="/pranayama" element={<Pranayama />} />
          <Route path="/bhagavatam" element={<SlokaViewer data={[...gopiGeet, ...govindaAdipurusha]} pageTitle="Srimad Bhagavatam Verses" />} />
          <Route path="/gita" element={<SlokaViewer data={[...gitaDhyanam, ...gitaVerses]} pageTitle="Srimad Bhagawat Gita" />} />
          <Route path="/devas" element={<SlokaViewer data={suryastakam} pageTitle="Devi/Devata Prayers" />} />
          <Route path="/view/:loc/:doc/:type" element={<DocViewer />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
