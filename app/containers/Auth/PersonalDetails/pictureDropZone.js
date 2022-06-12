import React from 'react';
import Dropzone from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import { userProfileIcon, trashIcon, logoPlaceholder } from 'containers/App/constants';
import { P, Button } from 'components';
import containerMessage from 'containers/messages';
import messages from './messages';
import { DropArea, InnerDropArea, ProfileImage } from './style';
import { fileMinSize, fileMaxSize, acceptedFileTypes, dropAreaMessage } from './utils';

export const getPictureDropZone = (that, type, maxFiles = 1, isDisable = true) => {
  let dropzoneRef;
  const { image } = that.state;
  const imagePlaceholder = type === 'profilePhotoUploader' ? userProfileIcon : logoPlaceholder;
  return (
    <Dropzone
      id="dropZone"
      ref={node => {
        dropzoneRef = node;
      }}
      minSize={fileMinSize(type)}
      maxSize={fileMaxSize(type)}
      onDrop={(acceptedFiles, rejectedFiles) => that.onDrop(acceptedFiles, rejectedFiles, type)}
      accept={acceptedFileTypes(type)}
      noClick
      noKeyboard
      multiple={maxFiles !== 1}
      maxFiles={maxFiles}
      disabled={!isDisable}
    >
      {({ getRootProps, getInputProps }) => (
        <DropArea {...getRootProps()} className={`${image ? 'file-uploaded' : ''}`}>
          <input {...getInputProps()} />
          <div className={`${type === 'multiplePhotosUploader' ? 'justify-content-center' : ''} d-flex align-items-center`}>
            {type !== 'multiplePhotosUploader' && (
              <ProfileImage className={image ? 'has-img' : ''}>
                {image ? <img src={image} className="img-fluid" alt="img" /> : <SVG src={imagePlaceholder} />}
              </ProfileImage>
            )}
            {(!image || type === 'multiplePhotosUploader') && (
              <InnerDropArea className={`${type === 'multiplePhotosUploader' ? 'ms-0 text-center' : ''} d-flex`}>
                <div className="d-flex align-items-start justify-content-center justify-content-md-start">
                  <div className="drop-content">
                    <P className="p16" opacityVal="0.5">
                      {type === 'multiplePhotosUploader' ? (
                        <FormattedMessage {...messages.dragAndDropImgs} />
                      ) : (
                        <FormattedMessage {...messages.dragAndDrop} />
                      )}
                      <Button
                        btnClassName="mx-1 btn-link"
                        disabled={!isDisable}
                        onClick={e => {
                          e.preventDefault();
                          dropzoneRef.open();
                        }}
                      >
                        <FormattedMessage {...containerMessage.browseButton} />
                      </Button>
                      to upload
                    </P>
                    <P className="p12 mb-0" opacityVal="0.5">
                      {dropAreaMessage(type)}
                    </P>
                  </div>
                </div>
              </InnerDropArea>
            )}
            {image && type !== 'multiplePhotosUploader' && (
              <Button
                className="btn-icon btn-link ms-auto"
                onClick={e => {
                  e.preventDefault();
                  that.deletePhoto();
                }}
              >
                <SVG src={trashIcon} className="me-1" />
                Delete
              </Button>
            )}
          </div>
        </DropArea>
      )}
    </Dropzone>
  );
};
