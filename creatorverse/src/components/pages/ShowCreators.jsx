// ShowCreator.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/ShowCreators.scss';
import { supabase } from '../../client'; 

const ShowCreator = () => {
  const { creatorId } = useParams();
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', creatorId)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [creatorId]);

  if (!creator) return <div>Loading...</div>;

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <main className="container-fluid">
      <div className="show-creator">
        <button className="close-button" onClick={handleClose}>Close</button>
        <h2>{creator.name}</h2>
        <img src={creator.imageURL} alt={creator.name} />
        <p>{creator.description}</p>
        <div className="socials">
          <a href={creator.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href={creator.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </main>
  );
};

export default ShowCreator;