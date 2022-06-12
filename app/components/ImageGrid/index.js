import styled from 'styled-components';
import { primaryNew, primaryDarkNew, white } from 'themes/variables';
// import media from 'themes/media';

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;

  .img-thumb {
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    height: 178px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 178px;
    background: rgba(${primaryNew}, 0.1);

    .btn-icon {
      position: absolute;
      right: 10px;
      top: 10px;
      background: rgba(${white}, 0.7);
      border-radius: 100%;
      min-width: auto;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(${white}, 1);
      }

      svg {
        width: 14px;
        height: 14px;
        path {
          stroke: rgb(${primaryDarkNew});
        }
      }
    }
  }
`;

export default ImageGrid;
