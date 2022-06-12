import styled from 'styled-components';
import { primaryDarkNew, darkGray, primaryNew } from 'themes/variables';
import media from 'themes/media';

export const DropArea = styled.div`
  border: 1px dashed rgba(${primaryNew}, 0.2);
  border-radius: 10px;
  padding: 20px;
  &.file-uploaded {
    border: 1px solid rgba(${primaryNew}, 0.2);
  }
  ${media.medium`
    padding: 30px;
  `};
  &.file-dropzone {
    svg.cloud-upload {
      width: 40px;
      height: 40px;
      path {
        stroke: rgb(${primaryDarkNew}, 0.5);
      }
    }
    svg.paper-icon {
      width: 30px;
      height: 30px;
      flex: 0 0 30px;
      path {
        stroke: rgb(${primaryNew});
      }
    }
  }
  &.csv-uploader-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding-bottom: 30px;

    h4 {
      margin: 0 0 5px !important;
    }
    .sample-file {
      margin-bottom: 66px;
    }
  }
`;
DropArea.displayName = 'DropArea';

export const InnerDropArea = styled.div`
  margin-left: 20px;
  ${media.medium`
    text-align: left;
  `};

  .csv-uploader & {
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 991px) {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
  }
  .csv-uploader-modal & {
    margin: 0;
    flex-direction: column;

    .button-block {
      margin: 0 0 63px;
      justify-content: center;
      display: flex;
    }
    .upload-icon {
      margin: 0 0 20px;
    }
    .drop-content {
      margin: 0 0 10px;
    }
  }

  .file-dropzone & {
    margin-left: 20px;
  }

  h5,
  p {
    color: rgb(${darkGray});
  }

  p {
    font-size: 14px;
    margin-bottom: 12px;
    ${media.large`
      font-size: 16px;
      justify-content: start;
    `};
  }

  h5 {
    font-size: 20px;
    justify-content: center;
    ${media.medium`
      justify-content: start;
    `};
    ${media.large`
      font-size: 24px;
      justify-content: start;
    `};
  }
  .button-block {
    ${media.medium`
      margin-left: 20px;
    `};
    ${media.extraLarge`
      margin-left: 60px;
    `};

    .csv-uploader & {
      margin-left: 0;
    }
  }

  .upload-icon {
    width: 18px;
    margin-right: 10px;
    ${media.medium`
      width: 24px;
      margin-right: 15px;
    `};
    ${media.large`
      width: 28px;
    `};
  }
`;
InnerDropArea.displayName = 'InnerDropArea';

export const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  margin: 0;
  flex: 0 0 80px;
  display: flex;
  align-items: center;
  &.has-img {
    border: 1px solid rgba(${primaryNew}, 0.1);
  }
  svg {
    width: 80px;
    height: 80px;
  }
`;
ProfileImage.displayName = 'ProfileImage';

export const CountryCode = styled.div`
  width: 53%;
  ${media.small`
    width:79%;
  `};
  ${media.medium`
    width:77%;
  `};
  ${media.large`
    width:45%;
  `};
  ${media.extraLarge`
    width:40%;
  `};
`;
CountryCode.displayName = 'CountryCode';

export const CombinedFields = styled.div`
  .newSelectStyle {
    z-index: 8;
    position: absolute;
    max-height: 44px;
    top: 1px;
    left: 2px;
  }
  .custom-selectbox {
    div[class*='-control'] {
      border: 0px;
      box-shadow: none;
      width: 88px;
      min-height: 44px;
      &:hover {
        box-shadow: none;
      }
      div[class*='-IndicatorsContainer'] {
        border-right: 1px solid rgba(${primaryNew}, 0.2);
        height: 22px;
        margin-top: 10px;
      }
    }
    div[class*='-menu'] {
      z-index: 10;
      position: relative;
    }
  }
  div[class*='FormControlWrapper-'] {
    width: 100%;
    input {
      padding-left: 90px;
    }
  }
`;
