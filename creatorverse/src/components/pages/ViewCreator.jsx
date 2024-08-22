import React, { useState, useEffect } from 'react';
import '@picocss/pico';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../card'; 
import '../../styles/ViewCreator.scss';
import { supabase } from '../../client'; 

function ViewCreator() {
  const [creators, setCreators] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchCreators = async () => {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .order('created_at', { ascending: false });
  
    if (error) {
      console.error('Error fetching creators:', error);
    } else {
      setCreators(data);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container-fluid">
      <div className="creator-list">
        <h4 className="section-title">All Creators in CreatorVerse</h4>

        <form className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>

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
    </main>
  );
}

export default ViewCreator;
