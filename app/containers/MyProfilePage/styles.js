import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'components';
import Content from 'components/Content';
import { SkillListing } from 'containers/Talent/Dashboard/styles';
import { lightGray, primaryNew, primaryDarkNew, white } from 'themes/variables';
import media from 'themes/media';

export const SkillContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 20px;

  ${media.medium`
    margin-top: 30px;
    grid-template-columns: 1fr 1fr;
  `};

  .hard-skills {
    ${media.medium`
		  padding-right: 30px;
	  `};
    ${media.large`
		  padding-right: 50px;
	  `};
    ${media.extraLarge`
		  padding-right: 70px;
	  `};
  }
  .soft-skills {
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid rgba(${primaryNew}, 0.1);
    ${media.medium`
      margin-top: 0;
      padding-top: 0;
      padding-left: 30px;
      border-top: 0;
      border-left: 1px solid rgba(${primaryNew}, 0.1);
		  padding-left: 30px;
	  `};
    ${media.large`
		  padding-left: 50px;
	  `};
    ${media.extraLarge`
		  padding-left: 70px;
	  `};
  }
  ${SkillListing} {
    margin-top: 20px;
    li {
      .badge-sm {
        max-width: 160px;
      }
      .progress {
        max-width: 100px;
        ${media.medium`
          max-width: 100px;
        `};
        ${media.large`
          max-width: 130px;
        `};
        ${media.extraLarge`
          max-width: 190px;
        `};
      }
    }
  }
`;

export const RateDetailList = styled.div`
  p {
    font-size: 16px;
    letter-spacing: 0.25px;
    color: rgb(${primaryDarkNew});
    font-family: 'GT-Walsheim-Pro-Bold';
    margin-bottom: 10px;
    span {
      font-family: 'GT-Walsheim-Pro-Regular';
      color: rgba(${(primaryDarkNew, 0.5)});
    }
  }
  ul {
    li {
      font-size: 16px;
      line-height: 28px;
      font-family: 'GT-Walsheim-Pro-Regular';
      color: rgb(${primaryDarkNew});
    }
  }
`;

export const ProfileAction = styled(Button)`
  background: none;
  min-width: auto;
  padding: 0;
  display: flex;
  width: 34px;
  height: 34px;

  .action-icon {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }

  svg {
    path {
      stroke: rgba(${primaryDarkNew}, 0.5);
    }
  }

  &:hover {
    .action-icon {
      background: rgba(${primaryDarkNew}, 0.05);
    }
    svg {
      path {
        stroke: rgba(${primaryDarkNew}, 0.7);
      }
    }
  }
`;

export const ProfileContent = styled(Content)`
  padding: 20px 0 40px;
  ${media.large`
		padding: 30px 0 60px;
	`};
`;
export const UserInfo = styled.div`
  padding-top: 4px;

  .card-sm & {
    padding-top: 0;

    .user-location {
      margin-bottom: 0;
      min-height: 36px;
    }
  }

  h4 {
    color: rgb(${primaryNew});
    font-size: 20px;
    letter-spacing: 0.31px;
    font-family: 'GT-Walsheim-Pro-Medium';
    margin-bottom: 4px;
    text-transform: capitalize;
  }

  .user-location {
    display: flex;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
`;

export const BackLink = styled(Button)`
  color: rgb(${primaryNew});
  font-size: 16px;
  letter-spacing: 0.25px;
  margin-bottom: 10px;
  display: inline-block;
  position: relative;
  background: none;
  text-align: left;
  padding: 0 !important;
  height: auto;
  font-family: 'GT-Walsheim-Pro-Medium';

  &:hover {
    color: rgb(${primaryNew});
    text-decoration: underline;
    background: none;
  }

  &:before {
    content: '';
    height: 8px;
    width: 8px;
    padding: 3px;
    margin-left: 3px;
    margin-right: 4px;
    display: inline-block;
    border: solid #4c00ff;
    border-width: 0px 3px 3px 0px;
    transform: rotate(135deg) translateY(1px);
  }
`;

export const SwitchBlock = styled.div`
  opacity: 0.3;
  pointer-events: none;
`;

export const UserProfile = styled.div`
  position: relative;
  display: inline-flex;
  width: 60px;
  height: 60px;
  margin-right: 15px;

  ${media.medium`
    margin-right: 20px;
    width: 115px;
    height: 115px;
  `};

  ${media.large`
    margin-right: 30px;
  `};

  .card-sm & {
    width: 40px;
    height: 40px;
    margin-right: 0;
  }

  button,
  a.profile-edit {
    width: 20px;
    height: 20px;
    position: absolute;
    bottom: 10px;
    right: -15px;
    background: #8180a7;
    border: 1px solid rgb(${white});

    ${media.medium`
      width: 28px;
      height: 28px;
      min-width: 28px;
    `};

    svg {
      width: 10px;
      height: 10px;

      path {
        stroke: rgb(${white});
      }

      ${media.medium`
        width: 14px;
        height: 14px;
      `};
    }
  }
`;

export const UserProfileImg = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  ${media.medium`
    width: 115px;
    height: 115px;
  `};
  img {
    width: 100%;
  }
  .card-sm & {
    width: 40px;
    height: 40px;
  }
`;

export const ActionIcon = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 34px;
  min-width: 34px;
  height: 34px;
  padding: 0;
  min-width: auto;
  background: transparent;

  svg {
    width: 16px;
    height: 16px;
    path {
      stroke: rgb(${primaryDarkNew}, 0.5);
    }
  }

  &:hover {
    background: rgb(${primaryDarkNew}, 0.05);
    & svg {
      path {
        stroke: rgb(${primaryDarkNew}, 0.7);
      }
    }
  }
`;

export const ActionIconLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  padding: 0;
  min-width: auto;
  background: transparent;
  border-radius: 23px;

  svg {
    width: 16px;
    height: 16px;
    path {
      stroke: rgb(${primaryDarkNew}, 0.5);
    }
  }

  &:hover {
    background: rgb(${primaryDarkNew}, 0.05);
    & svg {
      path {
        stroke: rgb(${primaryDarkNew}, 0.7);
      }
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;

  .title-icon {
    width: 20px;
    height: 20px;
    path {
      stroke: rgb(${primaryNew});
    }
  }
`;

export const CardBody = styled.div``;

export const ProfileList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  margin-bottom: 0;
  flex-wrap: wrap;
  li {
    margin-right: 12px;
    svg:not(.earth-icon) {
      path,
      g {
        fill: rgba(${primaryDarkNew}, 0.5);
      }
    }
    svg.earth-icon {
      path {
        stroke: rgba(${primaryDarkNew}, 0.5);
      }
    }
  }
`;

export const PreferencesList = styled.ul`
  padding: 0;
  list-style: none;
  margin-bottom: 0;

  .card-sm {
    & > li {
      padding-left: 24px;
    }
  }
  &.inline-list {
    display: inline-flex;
    flex-wrap: wrap;
    li {
      margin-right: 30px;
      margin-bottom: 0;
      img {
        top: 5px;
      }
      &:last-child {
        margin-left: 0;
      }
    }
  }
  &.hire-card-list {
    & > li {
      img,
      svg {
        top: 5px;
      }
    }
  }
  & > li {
    position: relative;
    padding-left: 26px;
    margin-bottom: 12px;

    p.comma-list {
      span {
        margin-right: 4px;
        &:after {
          content: ',';
        }
        &:last-child {
          margin-right: 0;
          &:after {
            content: '';
          }
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }

    &.team-icon {
      img,
      svg {
        top: 7px;
      }
    }
    img,
    svg {
      position: absolute;
      left: 0;
      top: 0;
      width: 18px;
      height: 18px;
      path {
        stroke: rgba(${primaryDarkNew}, 0.5);
      }
    }
  }
`;

export const ProjectInfo = styled.div`
  padding: 12px 25px;
  border: 1px solid rgb(${lightGray});
  border-radius: 2px;
  margin-bottom: 27px;
  min-height: 74px;

  &.list-view {
    padding: 0 0 0 30px;
    border: 0;
    position: relative;

    & p.title {
      margin-bottom: 15px;
    }

    &:before {
      content: '';
      width: 6px;
      height: 6px;
      background: rgb(${primaryNew});
      position: absolute;
      top: 8px;
      left: 0;
    }
  }

  a {
    font-size: 16px;
    color: rgb(${primaryNew});
    text-decoration: underline;
    font-family: 'GT-Walsheim-Pro-Medium';
    display: block !important;
  }

  & p.title {
    margin-bottom: 0;
  }
`;

export const VerifiedContainer = styled.div`
  width: 28px;
  &.team-tab {
    position: relative;
    bottom: 2px;
  }
`;
