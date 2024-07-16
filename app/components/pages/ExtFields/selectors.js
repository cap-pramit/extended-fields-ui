import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

/**
 * Direct selector to the extFields state domain
 */

const selectExtFieldsDomain = (state = fromJS({})) =>
  state.get(`${CURRENT_APP_NAME}-extFields`, initialState);

/**
 * Default selector used by extFields
 */

const makeSelectExtendedFieldsData = () =>
  createSelector(selectExtFieldsDomain, (substate = fromJS({})) => ({
    getExtFieldsStatus: substate.get('getExtFieldsStatus'),
    extendedFields: substate.get('extendedFields'),
  }));

export {
  selectExtFieldsDomain,
  makeSelectExtendedFieldsData,
};
