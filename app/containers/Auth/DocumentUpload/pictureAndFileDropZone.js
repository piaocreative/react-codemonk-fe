import React from 'react';
import Dropzone from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import LinesEllipsis from 'react-lines-ellipsis';
import { trashIcon, cloudUploadIcon, paperIcon, downloadIcon } from 'containers/App/constants';
import { P, Button } from 'components';
import containerMessage from 'containers/messages';
import {
  fileMinSize,
  fileMaxSize,
  acceptedFileTypes,
  dropAreaMessage,
  bytesToSize,
  getFileExtension,
  getFileName,
} from 'containers/Auth/PersonalDetails/utils';
import { DropArea, InnerDropArea } from 'containers/Auth/PersonalDetails/style';
import messages from 'containers/Auth/PersonalDetails/messages';

export const getPictureAndFileDropZone = (that, type, isDisable = true, uploadedFileName, uploadedFileSize, fieldName) => {
  let dropzoneRef;

  return (
    <Dropzone
      id="dropZone"
      ref={node => {
        dropzoneRef = node;
      }}
      minSize={fileMinSize(type)}
      maxSize={fileMaxSize(type)}
      onDrop={(acceptedFiles, rejectedFiles) => that.onDrop(acceptedFiles, rejectedFiles, type, fieldName)}
      accept={acceptedFileTypes(type)}
      noClick
      noKeyboard
      multiple={false}
      disabled={!isDisable}
    >
      {({ getRootProps, getInputProps }) => (
        <DropArea {...getRootProps()} className={`file-dropzone ${uploadedFileName ? 'file-uploaded' : ''}`}>
          <input {...getInputProps()} />
          <div className="d-flex align-items-center">
            {!uploadedFileName ? <SVG src={cloudUploadIcon} className="cloud-upload" /> : <SVG src={paperIcon} className="paper-icon" />}
            <InnerDropArea className="d-flex w-100">
              {!uploadedFileName && (
                <div className="d-flex align-items-center">
                  <div className="drop-content">
                    <P className="p16" opacityVal="0.5">
                      <FormattedMessage {...messages.dragAndDrop} />
                      <Button
                        btnClassName="mx-1 btn-link"
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
              )}
              {uploadedFileName && (
                <>
                  <div className="w-50">
                    <P className="p16 mb-1 d-inline-flex">
                      <LinesEllipsis text={getFileName(uploadedFileName)} maxLine="1" ellipsis="..." trimRight basedOn="letters" />
                      <span>{getFileExtension(uploadedFileName)}</span>
                    </P>
                    {uploadedFileSize !== '' ? (
                      <P className="p12 mb-0" opacityVal="0.5">
                        {bytesToSize(uploadedFileSize)}
                      </P>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="d-flex ms-auto">
                    <Button
                      className="btn-icon btn-link"
                      disabled={!isDisable}
                      onClick={e => {
                        e.preventDefault();
                        that.downloadRecord(fieldName);
                      }}
                    >
                      <SVG src={downloadIcon} className="me-1" />
                      Download
                    </Button>
                    <Button
                      className="btn-icon btn-link ms-3"
                      disabled={!isDisable}
                      onClick={e => {
                        e.preventDefault();
                        that.deleteFile(fieldName);
                      }}
                    >
                      <SVG src={trashIcon} className="me-1" />
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </InnerDropArea>
          </div>
        </DropArea>
      )}
    </Dropzone>
  );
};
