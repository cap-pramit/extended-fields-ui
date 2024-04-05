/*
 * About Messages
 *
 * This contains all the text for the About component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'loyaltyPlus.components.pages.About';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the About component!',
  },
});
