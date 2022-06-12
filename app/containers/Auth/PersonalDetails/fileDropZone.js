import React from 'react';
import Dropzone from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import LinesEllipsis from 'react-lines-ellipsis';
import { trashIcon, cloudUploadIcon, paperIcon, sampleFile, instructionFile } from 'containers/App/constants';
import { DownloadLink } from 'containers/Auth/Talent/AddTalentsPage/styles';
import { P, Button, H4 } from 'components';
import authMessages from 'containers/Auth/Talent/AddTalentsPage/messages';
import containerMessage from 'containers/messages';
import messages from './messages';
import { DropArea, InnerDropArea } from './style';
import { fileMinSize, fileMaxSize, acceptedFileTypes, dropAreaMessage, bytesToSize, getFileExtension, getFileName } from './utils';

export const getFileDropZone = (that, type, editFlag = true, fileName = '', uploadedFileSize, uploaderDisplayType = '') => {
  let dropzoneRef;

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
      multiple={false}
      disabled={!editFlag}
    >
      {({ getRootProps, getInputProps }) => (
        <DropArea {...getRootProps()} className={`file-dropzone ${fileName ? 'file-uploaded' : ''}`}>
          {uploaderDisplayType === 'csvUploaderModal' && (
            <React.Fragment>
              <H4 className="m-0">Upload file</H4>
              <DownloadLink href={sampleFile} className="btn-link sample-file" download="upload_talent_data_sample">
                {authMessages.linkSampleFile.defaultMessage}
              </DownloadLink>
            </React.Fragment>
          )}
          <input {...getInputProps()} />
          <div className="d-flex align-items-center">
            {!fileName ? <SVG src={cloudUploadIcon} className="cloud-upload" /> : <SVG src={paperIcon} className="paper-icon" />}
            <InnerDropArea className="d-flex w-100">
              {!fileName && (
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
              {fileName && (
                <>
                  <div className="w-50">
                    <P className="p16 mb-1 d-inline-flex">
                      <LinesEllipsis text={getFileName(fileName)} maxLine="1" ellipsis="..." trimRight basedOn="letters" />
                      <span>{getFileExtension(fileName)}</span>
                    </P>
                    <P className="p12 mb-0" opacityVal="0.5">
                      {bytesToSize(uploadedFileSize)}
                    </P>
                  </div>

                  <Button
                    className="btn-icon btn-link ms-auto"
                    disabled={!editFlag}
                    onClick={e => {
                      e.preventDefault();
                      that.deleteFile();
                    }}
                  >
                    <SVG src={trashIcon} className="me-1" />
                    Delete
                  </Button>
                </>
              )}
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
