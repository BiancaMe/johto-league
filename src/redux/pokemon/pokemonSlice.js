import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const path = 'https://pokeapi.co/api/v2/pokemon?limit=251';
const pathType = 'https://pokeapi.co/api/v2/type';

const initialState = {
  pokemon: [],
  type: [],
  isLoading: true,
  error: undefined,
};

export const fetchPokemon = createAsyncThunk('pokemon/fetchPokemon', async (thunkAPI) => {
  let pokemon = [];
  try {
    const data = await fetch(path).then((res) => res.json()).then((data) => data);
    pokemon = await Promise.all(data.results.map(async (poke) => {
      const dataPoke = await fetch(poke.url).then((res) => res.json()).then((data) => data);
      return dataPoke;
    }));
    return pokemon;
  } catch (err) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

export const fetchType = createAsyncThunk('pokemon/fetchType', async (thunkAPI) => {
  try {
    return await fetch(pathType).then((res) => res.json()).then((data) => data);
  } catch (err) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemon = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.type = action.payload;
      })
      .addCase(fetchType.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default pokemonSlice.reducer;
