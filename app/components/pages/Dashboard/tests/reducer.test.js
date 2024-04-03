import dashboardReducer, { initialState } from '../reducer';

const error = new Error('error');

describe('Dashboard Reducer', () => {
  it('it handles the reducer with default type', () => {
    expect(dashboardReducer(undefined, {})).toEqual(initialState);
  });
});
