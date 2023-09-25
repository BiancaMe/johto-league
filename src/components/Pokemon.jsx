import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const filterType = (poke, id) => {
  let bool = false;
  if (poke) {
    const res = poke.types.map((aux) => {
      if (aux.type.name === id) { return true; }
      return false;
    });

    for (let i = 0; i <= res.length; i += 1) {
      if (res[i] === true) {
        bool = true;
        break;
      }
    }
  }
  return bool;
};

const Pokemon = ({ id }) => {
  const pokemon = useSelector(
    (state) => state.pokemon.pokemon,
  );

  return (
    <>
      <div className="clasification">
        <p className="c-text">
          {' '}
          POKEMON
          {' '}
          {id}
        </p>
      </div>
      <div className="pokemon-grid">
        {pokemon.map((poke) => {
          const res = filterType(poke, id);
          if (res === true) {
            return (
              <div className="pokemon" key={poke.name}>
                <img
                  src={poke.sprites.other.dream_world.front_default}
                  alt={poke.name}
                  className="poke-img"
                />
                <div className="poke-info">
                  <h2 className="p-name">{poke.name}</h2>
                  <p className="p-data">
                    -Weight :
                    {' '}
                    {poke.weight}
                  </p>
                  <p className="p-data">
                    -Ability :
                    {' '}
                    {poke.abilities.map((aux) => aux.ability.name)[0]}
                  </p>
                </div>
              </div>
            );
          }
          return ('');
        })}
      </div>
    </>
  );
};

Pokemon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Pokemon;
