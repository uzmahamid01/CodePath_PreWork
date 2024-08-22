import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../client';
import '../../styles/EditCreator.scss';

function EditCreator() {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState(''); 

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
        setImageURL(data.imageURL);
        setName(data.name);
        setDescription(data.description);
        setTwitter(data.twitter);
        setInstagram(data.instagram);
        setYoutube(data.youtube); // Set YouTube URL state
      }
    };

    fetchCreator();
  }, [creatorId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from('creators')
      .update({ imageURL, name, description, twitter, instagram, youtube }) // Include YouTube URL in update
      .eq('id', creatorId);

    if (error) {
      console.error('Error updating creator:', error.message);
      alert(`There was an error updating the creator: ${error.message}`);
    } else {
      alert('Creator updated successfully!');
      navigate('/');
      window.location.reload();
    }
  };

  if (!creator) return <div>Loading...</div>;

  return (
    <div className="edit-creator-container">
      <h2>Edit Creator</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            id="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="twitter">Twitter URL</label>
          <input
            type="text"
            id="twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="instagram">Instagram URL</label>
          <input
            type="text"
            id="instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
        <div className="form-group"> 
          <label htmlFor="youtube">YouTube URL</label>
          <input
            type="text"
            id="youtube"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditCreator;
