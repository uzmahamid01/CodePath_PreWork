import React, { useState, useEffect } from 'react';
import '@picocss/pico';
import './styles/global.scss';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Card from './components/card';
import AddCreator from './components/pages/AddCreator';
import ShowCreator from './components/pages/ShowCreators'; 
import ViewCreator from './components/pages/ViewCreator';
import EditCreator from './components/pages/EditCreator';
import About from './about'; 
import Contact from './contact';
import { supabase } from './client'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [creators, setCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleAddCreatorClick = () => {
    navigate('/add-creator');
  };

  const handleViewCreatorClick = () => {
    navigate('/view-creator');
  };

  const handleLogoClick = () => {
    navigate('/'); 
  };

  const fetchCreators = async () => {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6); 
  
    if (error) {
      console.error('Error fetching creators:', error);
    } else {
      setCreators(data);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const handleCreatorAdded = () => {
    fetchCreators(); 
  };

  const handleCloseShowCreator = () => {
    setSelectedCreator(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container-fluid">
      <header className='header'>
        <img
          src="cV2.png"
          alt="Logo"
          className='logo'
          onClick={handleLogoClick}
        />
        {/* <form className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form> */}
        <nav>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={
          <>
            <div className="landing">
              <h1>CreatorVerse</h1>
              <p>Welcome to the CreatorVerse, a community for you to find out about top creators and share your favorite creators with others.</p>
              <div className="button-container">
                <button type="button" onClick={handleViewCreatorClick}>View All Creators</button>
                <button type="button" onClick={handleAddCreatorClick}>Add a Creator</button>
              </div>
            </div> 
            <div>
              <h4 className="section-title">Top 6 Creators in CreatorVerse</h4>
              <div className="card-container">
                {filteredCreators.length > 0 ? (
                  filteredCreators.map((creator) => (
                    <Card key={creator.id} creator={creator} />
                  ))
                ) : (
                  <p>No creators found.</p>
                )}
              </div>
            </div>
          </>
        } />
        <Route path="/add-creator" element={<AddCreator onCreatorAdded={handleCreatorAdded} />} />
        <Route path="/view-creator" element={<ViewCreator />} />
        <Route path="/show-creator/:creatorId" element={
          <ShowCreator
            creator={selectedCreator}
            onClose={handleCloseShowCreator}
          />
        } />
        <Route path="/edit-creator/:creatorId" element={<EditCreator />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} /> 
      </Routes>

      <footer>
        <div className="footer-content">
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="uzma_hamid@tamu.edu"><FontAwesomeIcon icon={faEnvelope} /></a>
              <a href="https://uzmahamid.netlify.app/"><FontAwesomeIcon icon={faGlobe} /></a>
              <a href="https://www.instagram.com/__ame_errante/"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://www.linkedin.com/in/uzmah/"><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CreatorVerse. All rights reserved.</p>
        </div>
    </footer>
    </main>
  );
}

export default App;
