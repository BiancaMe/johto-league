import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Pokemon from '../components/Pokemon';
import store from '../redux/store';

describe('Functions in Pokemon Component', () => {
  it('Get pokemon', async () => {
    const poke = renderer.create(
      <Provider store={store}>
        <Pokemon id="normal" />
      </Provider>,
    );

    expect(poke).toMatchSnapshot();
  });
});
