import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import Clasification from '../components/Clasification';
import pokemonReducers from '../redux/pokemon/pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducers,
  },
});

describe('Funcions in pokemonSlice', () => {
  it('Get pokemon', async () => {
    const dataType = {
      count: 20,
      next: null,
      previous: null,
      results: [{ name: 'normal' },
        { name: 'fighting' },
        { name: 'flying' },
        { name: 'poison' },
      ],
    };

    const dataPokemon = {
      count: 1292,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=2&limit=2',
      previous: null,
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
    };

    fetchMock.mockResponse((request) => {
      if (request.url.startsWith('https://pokeapi.co/api/v2/type')) {
        return dataType;
      }
      return dataPokemon;
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Clasification />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => expect(screen.getByText('normal')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('poison')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('flying')).toBeInTheDocument());
  });
});
