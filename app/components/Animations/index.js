import { keyframes } from 'styled-components';

export const Rotate = keyframes`
  0% {
    transform: translateY(-50%) rotate(0deg);
  }

  100% {
    transform: translateY(-50%) rotate(360deg);
  }
`;
Rotate.displayName = 'rotate';
