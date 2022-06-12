import styled from 'styled-components';
import { primaryNew, progressModBg, darkGray, dangerNew } from '../../themes/variables';
import media from '../../themes/media';

const EditorWrapper = styled.div`
  .editor-wrapper {
    margin-top: 10px;
    border: 1px solid rgba(${primaryNew}, 0.2);
    outline: none;
    border-radius: 10px;
  }
  .has-error {
    border-color: rgb(${dangerNew});
    box-shadow: 0px 0px 0px 2px rgba(${dangerNew}, 0.2);
  }
  .editor-textbox {
    border-radius: 10px;
    padding: 0px 20px;
    min-height: 160px;
    box-sizing: border-box;
    &:focus-within {
      border-color: rgb(${primaryNew});
      box-shadow: 0px 0px 0px 2px rgba(${primaryNew}, 0.2);
    }
    ${media.medium`
      min-height:200px;
    `};
    .input-sm & {
      min-height: 160px;
      font-size: 16px;
    }
  }
  .editor-toolbox {
    padding-left: 0px;
    padding-right: 0px;
    margin-bottom: 0px;
    background-color: ${progressModBg};
    color: rgb(${darkGray});
    ${media.medium`
      padding-left:5px;
      padding-right:5px;
    `};
  }
  .rdw-option-wrapper {
    border: none;
    background-color: transparent;
  }
  .rdw-embedded-modal {
    height: auto;
  }
`;

export default EditorWrapper;
