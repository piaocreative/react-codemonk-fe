import styled from 'styled-components';
import media from 'themes/media';

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;

  .with-sidebar & {
    padding: 30px;
  }

  ${media.medium`
		padding: 30px 0;
	`};
`;

export default Content;
