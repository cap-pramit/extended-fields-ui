import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

/**
 * Direct selector to the loyaltyTags state domain
 */

const selectLoyaltyTagsDomain = (state = fromJS({})) =>
  state.get('loyaltyTags', initialState);

/**
 * Default selector used by loyaltyTags
 */

const makeSelectTagsData = () =>
  createSelector(selectLoyaltyTagsDomain, (substate = fromJS({})) => ({
    loyaltyTagsStatus: substate.get('loyaltyTagsStatus'),
    loyaltyTags: substate.get('loyaltyTags'),
  }));

export {
  selectLoyaltyTagsDomain,
  makeSelectTagsData,
};
