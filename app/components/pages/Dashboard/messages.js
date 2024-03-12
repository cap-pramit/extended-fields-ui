/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'yourApp.components.pages.Dashboard';

export default defineMessages({
  loyaltySales: {
    id: `${scope}.loyaltySales`,
    defaultMessage: 'Loyalty Sales',
  },
  totalLoyaltyBase: {
    id: `${scope}.totalLoyaltyBase`,
    defaultMessage: 'Total Loyalty Base',
  },
  activeMembers: {
    id: `${scope}.activeMembers`,
    defaultMessage: 'Active Members',
  },
  totalLoyaltySales: {
    id: `${scope}.totalLoyaltySales`,
    defaultMessage: 'Total Loyalty Sales',
  },
  loyaltyLifetimeValue: {
    id: `${scope}.loyaltyLifetimeValue`,
    defaultMessage: 'Loyalty Lifetime Value',
  },
  churnRate: {
    id: `${scope}.churnRate`,
    defaultMessage: 'Churn Rate',
  },
});
