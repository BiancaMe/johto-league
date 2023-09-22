import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPokemon, fetchType } from '../redux/pokemon/pokemonSlice';
import { filterType } from './Pokemon';
import pokemonImg from '../assets/pokemon.png';

const Clasification = () => {
  let typesFiltered;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingType, setLoadingType] = useState(true);
  const [loadingPokemon, setLoadingPokemon] = useState(true);
  const [search, setSearch] = useState('');

  const pokemon = useSelector(
    (state) => state.pokemon.pokemon,
  );

  const types = useSelector(
    (state) => state.pokemon.type.results,
  );

  useEffect(() => {
    dispatch(fetchType('pokemon')).then(() => {
      setLoadingType(false);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPokemon('pokemon')).then(() => {
      setLoadingPokemon(false);
    });
  }, [dispatch]);

  const countPokemon = (filter) => {
    let cont = 0;
    if (pokemon) {
      pokemon.map((poke) => {
        const res = filterType(poke, filter);
        if (res === true) cont += 1;
        return true;
      });
    }
    return <p>{cont}</p>;
  };

  const callingDetails = (type) => {
    navigate(`/details/${type}`);
  };

  if (loadingType === false) {
    typesFiltered = types.filter((aux) => {
      if (aux.name) {
        return aux.name.includes(search.toLocaleLowerCase());
      }
      return false;
    });
  }
  let cont = 1;
  let columColor = '';

  return (
    <>
      <header>
        <img className="h-title" alt="johto league" src={pokemonImg} />
        <div className="search">
          <input className="s-filter" type="text" onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn-search">Search</button>
        </div>
      </header>
      <div className="clasification">
        <p className="c-text"> POKEMON BY TYPE</p>
      </div>
      {loadingType ? (
        <div className="load-types">
          <span className="loader" />
        </div>
      ) : (
        <div className="types">
          {typesFiltered.map((type) => {
            columColor = `type type${cont}`;
            cont += 1;
            return (
              <button type="button" id={type.name} className={columColor} key={type.name} onClick={() => callingDetails(type.name)}>
                <div className="t-text">
                  <h1 className="t-title">
                    {type.name}
                  </h1>
                  <div className="t-numbers">
                    <p>Pokemon :&nbsp; </p>
                    {loadingPokemon ? (<div className="load-numbers"><span className="loader-number" /></div>) : (countPokemon(type.name))}
                  </div>
                </div>
              </button>
            );
          })}
          ;
        </div>
      )}

    </>
  );
};

export default Clasification;
