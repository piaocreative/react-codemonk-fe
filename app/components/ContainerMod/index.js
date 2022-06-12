import styled from 'styled-components';
import { Container } from 'reactstrap';
import media from 'themes/media';

const ContainerMod = styled(Container)`
  padding-right: 16px;
  padding-left: 16px;

  .with-sidebar & {
    max-width: 100%;
    padding: 0;
    margin: 0;
  }
  ${media.large`
		.auth-layout & {
			max-width:1331px;
		}
	`};
`;

export default ContainerMod;
