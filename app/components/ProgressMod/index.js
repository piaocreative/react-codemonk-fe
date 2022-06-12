import styled from 'styled-components';
import { Progress } from 'reactstrap';
import { primaryNew } from 'themes/variables';
import media from 'themes/media';

const ProgressMod = styled(Progress)`
  background: rgba(${primaryNew}, 0.2);
  height: 7px;
  border-radius: 3.5px;

  &.sm {
    height: 4px;
  }

  &.onboarding-progress {
    margin-bottom: 15px;
    ${media.large`
			margin-bottom: 60px;
		`};
  }

  &.profile-complete-bar {
    max-width: 400px;
    margin: 0 auto;
  }

  & > div {
    border-radius: 3.5px;
    background: rgb(${primaryNew});
  }
`;

export default ProgressMod;
