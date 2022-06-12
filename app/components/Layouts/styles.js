import styled from 'styled-components';
import { primaryNew } from 'themes/variables';

export const PrivateWrapper = styled.div`
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(${primaryNew}, 0.03);
`;

export const SignInWrapper = styled.div`
  background-color: rgba(${primaryNew}, 0.03);
`;
