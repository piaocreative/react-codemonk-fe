import React from 'react';
import Dropzone from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import { userProfileIcon, logoPlaceholder, fileIcon, sampleFile, instructionFile } from 'containers/App/constants';
import { DownloadLink } from 'containers/Auth/Talent/AddTalentsPage/styles';
import { P, Button, H4 } from 'components';
import authMessages from 'containers/Auth/Talent/AddTalentsPage/messages';
import containerMessage from 'containers/messages';
import messages from './messages';
import { DropArea, InnerDropArea, ProfileImage } from './style';
import { fileMinSize, fileMaxSize, acceptedFileTypes, dropAreaMessage } from './utils';

export const renderDeleteButton = (that, type, editFlag) => {
  let output = '';
  if (type === 'logoUploader' || type === 'profilePhotoUploader') {
    output = (
      <Button
        className="btn-outline"
        disabled={!editFlag}
        onClick={e => {
          e.preventDefault();
          that.deletePhoto();
        }}
      >
        <FormattedMessage {...containerMessage.deleteButton} />
      </Button>
    );
  } else if (type === 'csvUploader' || type === 'cvUploader') {
    output = (
      <Button
        className="btn-outline"
        disabled={!editFlag}
        onClick={e => {
          e.preventDefault();
          that.deleteFile();
        }}
      >
        <FormattedMessage {...containerMessage.deleteFile} />
      </Button>
    );
  }
  return output;
};

export const getModalClass = (type, uploaderDisplayType) => {
  let output = '';

  if (type === 'csvUploader' && uploaderDisplayType === '') {
    output = 'csv-uploader';
  } else if (type === 'cvUploader') {
    output = 'csv-uploader';
  } else if (type === 'csvUploader' && uploaderDisplayType === 'csvUploaderModal') {
    output = 'csv-uploader-modal';
  }
  return output;
};

export const getDropZone = (that, type = 'profilePhotoUploader', editFlag = true, fileName = '', uploaderDisplayType = '') => {
  let dropzoneRef;
  const { image } = that.state;
  const DefaultIcon = type === 'logoUploader' ? logoPlaceholder : userProfileIcon;

  const modalClass = getModalClass(type, uploaderDisplayType);
  const deleteBtn = renderDeleteButton(that, type, editFlag);
  const browseBtn = (
    <Button
      className="btn-outline"
      onClick={e => {
        e.preventDefault();
        dropzoneRef.open();
      }}
    >
      <FormattedMessage {...containerMessage.browseButton} />
    </Button>
  );
  let renderButton;
  if (type === 'logoUploader' || type === 'profilePhotoUploader') {
    if (image) {
      renderButton = deleteBtn;
    } else {
      renderButton = browseBtn;
    }
  }
  if (type === 'csvUploader' || type === 'cvUploader') {
    if (fileName) {
      renderButton = deleteBtn;
    } else {
      renderButton = browseBtn;
    }
  }

  return (
    <Dropzone
      id="dropZone"
      ref={node => {
        dropzoneRef = node;
      }}
      // minSize={type === 'csvUploader' ? CSV_MIN_FILE_SIZE : MIN_FILE_SIZE}
      minSize={fileMinSize(type)}
      // maxSize={MAX_FILE_SIZE}
      maxSize={fileMaxSize(type)}
      onDrop={(acceptedFiles, rejectedFiles) => that.onDrop(acceptedFiles, rejectedFiles, type)}
      // accept={type === 'csvUploader' ? '.csv,.xls,.xlsx' : '.jpeg,.jpg,.png'}
      accept={acceptedFileTypes(type)}
      noClick
      noKeyboard
      multiple={false}
      disabled={!editFlag}
    >
      {({ getRootProps, getInputProps }) => (
        <DropArea {...getRootProps()} className={modalClass}>
          {uploaderDisplayType === 'csvUploaderModal' && (
            <React.Fragment>
              <H4 className="m-0">Upload file</H4>
              <DownloadLink href={sampleFile} className="btn-link sample-file" download="upload_talent_data_sample">
                {authMessages.linkSampleFile.defaultMessage}
              </DownloadLink>
            </React.Fragment>
          )}
          <input {...getInputProps()} />
          <div className="d-md-flex align-items-center">
            {type !== 'csvUploader' && type !== 'cvUploader' ? (
              <ProfileImage>{image ? <img src={image} className="img-fluid" alt="img" /> : <SVG src={DefaultIcon} />}</ProfileImage>
            ) : (
              ''
            )}
            <InnerDropArea className="d-lg-flex">
              {!fileName && (
                <div className="d-flex align-items-start justify-content-center justify-content-md-start csv-content">
                  <div className="drop-content">
                    <P className="p16" opacityVal="0.5">
                      <FormattedMessage {...messages.dragAndDrop} />
                    </P>
                    <P className="p12" opacityVal="0.5">
                      {dropAreaMessage(type)}
                    </P>
                  </div>
                </div>
              )}
              {fileName && (
                <div className="d-flex align-items-center mb-3">
                  <img className="me-2" src={fileIcon} alt="file" />
                  {that.state.fileName}
                </div>
              )}
              <div className="button-block">{renderButton}</div>
            </InnerDropArea>
          </div>
          {uploaderDisplayType === 'csvUploaderModal' && (
            <P className="text-center p-sm mb-0">
              {authMessages.textIntructions.defaultMessage}
              <DownloadLink href={instructionFile} className="btn-link ms-1" download="step_to_create_upload_multiple_talents">
                {authMessages.linkHere.defaultMessage}
              </DownloadLink>
            </P>
          )}
        </DropArea>
      )}
    </Dropzone>
  );
};
