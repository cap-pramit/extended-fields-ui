import contactReducer, { initialState } from '../reducer';

describe('contactReducer', () => {
  it('returns the initial state', () => {
    expect(contactReducer(undefined, {})).toEqual(initialState);
  });
});
