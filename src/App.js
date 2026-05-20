import BlissfulStuties from './components/BlissfulStuties';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Pranayama from './components/Pranayama';
import Yogasana from './components/Yogasana';
import SlokaViewer from './components/SlokaViewer';
import Bhajans from './components/Bhajans';
import SwadhayaVerses from './components/SwadhayaVerses';
import SwadhayaAudio from './components/SwadhayaAudio';
import SatsangaAudio from './components/SatsangaAudio';
import PersonalAudio from './components/PersonalAudio';
import DocViewer from './components/DocViewer';
import prayerData from './data/daily-prayers.json';
import gopiGeet from './data/gopi-geet.json';
import govindaAdipurusha from './data/govinda-adipurusha.json';
import gitaDhyanam from './data/gita-dhyanam.json';
import gitaVerses from './data/gita-selected-verses.json';
import suryastakam from './data/suryashtakam.json';
import Wisdom from './components/Wisdom';
import InvocationSlokas from './data/invokation-slokas.json';

import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <header className="app-header"><h1>Eternal Bliss Lab (EBL)</h1></header>
      <Menu />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prayers" element={<SlokaViewer data={[...prayerData,...InvocationSlokas]} pageTitle="Daily Prayers" />} />
          <Route path="/pranayama" element={<Pranayama />} />
          <Route path="/yogasana" element={<Yogasana />} />
          <Route path="/scripture-verses" element={<SwadhayaVerses />} />
          <Route path="/scripture-audio" element={<SwadhayaAudio />} />
          <Route path="/bhajans" element={<Bhajans />} />
          <Route path="/satsanga-audio" element={<SatsangaAudio />} />
          <Route path="/personal-audio" element={<PersonalAudio />} />
          <Route path="/devas" element={<SlokaViewer data={suryastakam} pageTitle="Devi/Devata Prayers" />} />
          <Route path="/wisdom" element={<Wisdom />} />
          <Route path="/view/:loc/:doc/:type" element={<DocViewer />} />
          <Route path="/blissful-stuties" element={<BlissfulStuties />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
