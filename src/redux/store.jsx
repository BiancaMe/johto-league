import { configureStore } from '@reduxjs/toolkit';
import pokemonSlice from './pokemon/pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
  },
});

export default store;
