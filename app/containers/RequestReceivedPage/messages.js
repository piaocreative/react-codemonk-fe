/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.RequestReceivedPage';

const textIntro1 = 'We will be in touch within next 48 hours to discuss your requirements in more details.';
const textIntro2 = ' In the meanwhile, we recommend you to checkout the talent who may work on your project.';
export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Request received',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Request received',
  },
  textIntro: {
    id: `${scope}.textIntro`,
    defaultMessage: `${textIntro1}${textIntro2}`,
  },
  headingRequestReceived: {
    id: `${scope}.headingRequestReceived`,
    defaultMessage: 'We have received your request.',
  },
  buttonExploreTalent: {
    id: `${scope}.buttonExploreTalent`,
    defaultMessage: 'Explore talent',
  },
});
