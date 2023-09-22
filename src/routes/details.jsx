import React from 'react';
import { useNavigate, useParams } from 'react-router';
import Pokemon from '../components/Pokemon';
import '../style/details.css';

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const back = () => {
    navigate('/');
  };

  return (
    <>
      <header>
        <button type="button" className="back" onClick={() => back()}><span>&#8249;</span></button>
        <h1 className="d-text">{id}</h1>
      </header>
      <Pokemon id={id} />
    </>
  );
};

export default Details;
