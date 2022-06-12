/*
 * KeyProjects Pages
 *
 * This contains all the text for the KeyProjects component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.components.KeyProject';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Projects',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Projects',
  },
  headingKeyProjects: {
    id: `${scope}.headingKeyProjects`,
    defaultMessage: 'Projects',
  },
  projectTagLine: {
    id: `${scope}.projectTagLine`,
    defaultMessage: 'Add at least 3 projects that you worked on for us to generate your skills graph for personalised job matching',
  },
  labelAdd: {
    id: `${scope}.labelAdd`,
    defaultMessage: 'Add project',
  },
});
