import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../client'; 
import '../../styles/AddCreator.scss';

function AddCreator({ onCreatorAdded }) {
  const [imageURL, setImageURL] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYouTube] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from('creators')
        .insert([{ 
          imageURL, 
          name,
          description,
          twitter, 
          instagram,
          youtube 
        }]);
  
      if (error) {
        console.error('Error adding creator:', error.message);
        alert(`There was an error adding the creator: ${error.message}`);
      } else {
        alert('Creator added successfully!');
        onCreatorAdded(); 
        navigate('/');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert(`Unexpected error occurred: ${error.message}`);
    }
  };

  return (
    <div className="add-creator-container">
      <h2>Add a New Creator</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            id="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="Enter image URL"
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
            placeholder="Enter creator's name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description"
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
            placeholder="Enter Twitter URL"
          />
        </div>
        <div className="form-group">
          <label htmlFor="instagram">Instagram URL</label>
          <input
            type="text"
            id="instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Enter Instagram URL"
          />
        </div>
        <div className="form-group">
          <label htmlFor="youtube">YouTube URL</label> 
          <input
            type="text"
            id="youtube"
            value={youtube}
            onChange={(e) => setYouTube(e.target.value)}
            placeholder="Enter YouTube URL" 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCreator;
