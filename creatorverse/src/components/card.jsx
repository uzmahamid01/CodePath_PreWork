import React, { useState } from 'react';
import { FaEdit, FaTwitter, FaInstagram, FaInfoCircle, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client'; 
import ConfirmationModal from './window/Confirmation';
import '../styles/card.scss';

const Card = ({ creator, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const backgroundImage = `url(${creator.imageURL})`;

  const handleExpandClick = () => {
    navigate(`/show-creator/${creator.id}`);
  };

  const handleEditClick = () => {
    navigate(`/edit-creator/${creator.id}`);
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);

    const { data, error } = await supabase
      .from('creators')
      .delete()
      .eq('id', creator.id);

    if (error) {
      console.error('Error deleting creator:', error);
    } else {
      console.log('Creator deleted:', data);

      if (typeof onDelete === 'function') {
        onDelete(creator.id); 
      }

      navigate(0); 
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <article style={{ backgroundImage }}>
      <div className="card-header">
        <div className="name-expand">
          <h3>{creator.name}</h3>
          <FaInfoCircle
            className="expandicon"
            title="Expand"
            onClick={handleExpandClick}
          />
        </div>
        <div className="editicon">
          <FaEdit title="Edit" onClick={handleEditClick} />
          <FaTrash id="trash" title="Delete" onClick={handleDeleteClick} />
        </div>
      </div>
      <div className="socials">
        <a href={creator.twitter} target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href={creator.instagram} target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
      <div className="description">
        <p>{creator.description.split('\n').slice(0, 3).join('\n')}</p>
      </div>

      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this creator?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </article>
  );
};

export default Card;
