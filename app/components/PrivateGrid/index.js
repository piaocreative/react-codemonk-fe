import styled from 'styled-components';
import ContainerMod from 'components/ContainerMod';
import { primaryDarkNew, primaryNew } from 'themes/variables';
import Card from 'components/Card';
import media from 'themes/media';

const PrivateGrid = styled(ContainerMod)`
  padding-right: 16px;
  padding-left: 16px;

  .row {
    margin-right: -15px;
    margin-left: -15px;
  }
  .col-lg-9,
  .col-lg-3 {
    padding-right: 15px;
    padding-left: 15px;
  }

  ${Card} {
    padding: 20px;
    border-radius: 20px;
    margin-bottom: 30px;
    border: 1px solid rgb(${primaryNew}, 0.1);

    &.mb-10 {
      margin-bottom: 10px;
    }
    &.mb-20 {
      margin-bottom: 20px;
    }
    &.p-20 {
      padding: 20px;
    }
    &.p-30 {
      padding: 20px;
      ${media.large`
        padding: 30px;
      `};
    }
    &.p-40 {
      padding: 30px;
      ${media.large`
        padding: 40px;
      `};
    }
  }

  hr {
    margin: 40px 0;
  }

  .read-more-less-content,
  .read-more-less-content * {
    font-size: 16px;
    color: rgba(${primaryDarkNew}, 0.5);
    margin-bottom: 15px;
    line-height: 28px;
  }
  .read-more-less-content a {
    color: rgb(${primaryNew});
    text-decoration: underline;
  }
  .read-more-less-content p span {
    color: rgba(${primaryDarkNew}, 0.7) !important;
    background-color: transparent !important;
    font-size: 16px !important;
  }
  .read-more-less-content.opacity-100,
  .read-more-less-content.opacity-100 * {
    opacity: 1;
  }
  p.opacity-100,
  .read-more-less-content.opacity-100,
  .read-more-less-content.opacity-100 * {
    color: rgb(${primaryDarkNew}) !important;
  }
  .read-more-less-content .links {
    color: rgb(${primaryNew}) !important;
  }
  p.title {
    font-family: 'GT-Walsheim-Pro-Bold';
    margin-bottom: 5px;
  }
  p.list-view-title {
    margin-bottom: 15px;
  }
`;

export default PrivateGrid;
