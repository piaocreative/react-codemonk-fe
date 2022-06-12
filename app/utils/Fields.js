/**
 * redux-form renderField are created here.
 * this renderField are used ex-cross the system.
 *
 * @author Innovify
 * @Developer Innovify
 */

import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import PlacesAutocomplete from 'react-places-autocomplete';
import { SearchOptions } from 'containers/TalentListingPage/styles';
import { Editor } from 'react-draft-wysiwyg';
import { ToolTipBlock } from 'containers/Auth/CreateProfilePage/style';
import { eyeIcon, eyeSlashIcon, attachIcon, circleTickIcon, deleteIcon } from 'containers/App/constants';
import {
  EditorWrapper,
  SelectTags,
  FormControl,
  FormControlWrapper,
  FormControlSelect,
  ValidationMessage,
  Ratings,
  CheckBoxContainer,
  LinkButtonMod,
  FormLabel,
  P,
} from 'components';
import { FormControlRadio, InputIconWrapper, DeleteIconFileWrapper, FormControlTextArea } from 'components/Input';

/* eslint-disable react/prop-types */
export const renderAddressField = ({
  disabled = false,
  handleChange,
  handleSelect,
  wrapperClassName,
  placeholder,
  meta: { touched, error, warning, active },
  input,
  errorMessageToShow = true,
}) => {
  const success = touched && !error ? 'success' : '';
  const errors = touched && error && !active ? ' has-error ' : success;
  return (
    <PlacesAutocomplete name={input.name} value={input.value} onSelect={handleSelect} onBlur={() => input.onBlur()} onChange={handleChange}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormControlWrapper className={errors + wrapperClassName}>
          <FormControl
            {...getInputProps({
              placeholder: `${placeholder}`,
              className: 'location-search-input',
              disabled,
            })}
          />
          {suggestions.length > 0 && (
            <SearchOptions className="m-0 autocomplete-dropdown-container">
              {loading && (
                <div className="p-2 text-center text-muted text-sm">
                  <small>Loading...</small>
                </div>
              )}
              {suggestions.map(suggestion => {
                const className = `suggestion-item ${suggestion.active ? 'suggestion-item--active' : ''}`;
                return (
                  <li {...getSuggestionItemProps(suggestion, { className })} key={suggestion.description}>
                    {suggestion.description}
                  </li>
                );
              })}
            </SearchOptions>
          )}
          {errorMessageToShow ? <ValidationMessage>{touched && (error || warning)}</ValidationMessage> : null}
        </FormControlWrapper>
      )}
    </PlacesAutocomplete>
  );
};

export const renderField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error, warning, active },
  readOnly = false,
  disabled = false,
  value,
  wrapperClassName,
  errorMessageToShow = true,
}) => {
  const success = touched && !error ? 'success' : '';
  const errors = touched && error && !active ? ' has-error ' : success;
  return (
    <FormControlWrapper className={`${errors} ${wrapperClassName}`}>
      <FormControl
        placeholder={placeholder}
        type={type}
        readOnly={readOnly}
        value={value}
        id={label}
        disabled={disabled}
        {...input}
        onBlur={() => input.onBlur()}
      />
      {errorMessageToShow ? <ValidationMessage>{touched && (error || warning)}</ValidationMessage> : null}
    </FormControlWrapper>
  );
};
export const renderSelectField = ({ input, label, defaultValue, className, meta: { touched, error, warning }, children }) => {
  const errors = touched && error;
  return (
    <FormControlSelect errorSelect={errors}>
      <FormGroup className="form-group">
        {label && <Label htmlFor={label}>{label}</Label>}
        <div className={`${errors} form-control-validated`}>
          <select
            value={defaultValue}
            className={`form-control ${className}`}
            onChange={event => input.onChange(event)}
            onBlur={event => input.onBlur(event)}
          >
            {children}
          </select>
          <ValidationMessage>{touched && (error || warning)}</ValidationMessage>
        </div>
      </FormGroup>
    </FormControlSelect>
  );
};

export const renderSelectProjectRoleField = ({ input, label, className, meta: { touched, error, warning }, children }) => {
  const errors = touched && error;
  return (
    <FormControlSelect errorSelect={errors}>
      <FormGroup className="form-group">
        {label && <Label htmlFor={label}>{label}</Label>}
        <div className={`${errors} form-control-validated`}>
          <select
            name={input.name}
            value={input.value}
            className={`form-control ${className}`}
            onChange={event => input.onChange(event)}
            onBlur={event => input.onBlur(event)}
          >
            {children}
          </select>
          <ValidationMessage>{touched && (error || warning)}</ValidationMessage>
        </div>
      </FormGroup>
    </FormControlSelect>
  );
};

export const renderTextEditor = ({ input, placeholder, meta: { touched, error, warning }, disabled = false }) => {
  const errorClass = touched && error ? 'has-error' : '';
  return (
    <React.Fragment>
      <EditorWrapper>
        <Editor
          name={input.name}
          toolbarHidden
          stripPastedStyles
          placeholder={placeholder}
          editorState={input.value}
          readOnly={disabled}
          toolbarClassName="editor-toolbox"
          wrapperClassName={`editor-wrapper ${errorClass}`}
          editorClassName="editor-textbox"
          onEditorStateChange={input.onChange}
          onBlur={() => input.onBlur()}
        />
      </EditorWrapper>
      <ValidationMessage>{touched && (error || warning)}</ValidationMessage>
    </React.Fragment>
  );
};

export const renderSelectTags = ({
  options,
  placeHolder,
  optionLimit,
  height,
  isMulti,
  closeMenuOnSelect,
  meta: { touched, error, warning },
  input,
}) => (
  <React.Fragment>
    <SelectTags
      placeholder={placeHolder}
      name={input.name}
      options={options}
      value={input.value}
      onChange={value => input.onChange(value)}
      onBlur={() => input.onBlur()}
      isMulti={isMulti}
      height={height}
      errorSelect={touched && error}
      optionLimit={optionLimit}
      className="custom-multi-select"
      closeMenuOnSelect={closeMenuOnSelect}
    />

    <ValidationMessage>{touched && (error || warning)}</ValidationMessage>
  </React.Fragment>
);

export const renderSelectRatings = props => {
  const { input, message, errorText, itemList, onChangeRating, index, noTooltip } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error2, setError] = useState('');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (Array.isArray(itemList) && !itemList.length && error2) {
      setError('');
    }
  }, [error2, itemList]);

  return (
    <React.Fragment>
      <Ratings
        {...props}
        setError={setError}
        index={index}
        name={input.name}
        itemList={itemList}
        onChangeRating={onChangeRating}
        onBlur={() => input.onBlur()}
      >
        <ToolTipBlock>
          <FormLabel className="d-inline-flex align-items-center">
            <FormattedMessage {...message} />
            {!noTooltip && (
              <P className="p14 ms-1 mb-0" opacityVal="0.5">
                {errorText.defaultMessage}
              </P>
            )}
          </FormLabel>
        </ToolTipBlock>
      </Ratings>

      {error2 && <ValidationMessage className="mt-2">{error2}</ValidationMessage>}
    </React.Fragment>
  );
};

export const renderFieldPassword = ({
  input,
  placeholder,
  onClick,
  type,
  meta: { touched, error, warning, active },
  errorMessageToShow = true,
  disabled = false,
}) => {
  const success = touched && !error ? 'success' : '';
  const errors = touched && error && !active ? 'has-error' : success;
  const iconName = type === 'password' ? eyeIcon : eyeSlashIcon;
  const tooltipText = type === 'password' ? 'Show password' : 'Hide password';
  return (
    <React.Fragment>
      <FormControlWrapper className={`${errors} input-group position-relative no-icon`}>
        <FormControl type={type} placeholder={placeholder} disabled={disabled} className={`${errors} form-control`} {...input} />
        <button type="button" onClick={onClick} className="btn eye-btn" title={tooltipText}>
          <SVG src={iconName} />
        </button>
        {errorMessageToShow ? (
          <ValidationMessage>{touched ? error || warning : input && input.value && (error || warning)}</ValidationMessage>
        ) : null}
      </FormControlWrapper>
    </React.Fragment>
  );
};

export const renderFileAttach = ({
  input,
  label,
  placeholder,
  onChangeFile,
  accept,
  type,
  readOnly,
  value,
  stateVar,
  docError,
  loading,
  wrapperClassName,
  meta: { touched, error, warning, active },
  disabled = false,
}) => {
  const success = touched && !error ? 'success' : '';
  const errors = touched && error && !active ? 'has-error' : success;
  const text = stateVar || <span className="placeholder">Attach file</span>;
  const icon = stateVar ? <SVG src={circleTickIcon} /> : <SVG src={attachIcon} />;

  const iconSpan = loading ? null : <span className="icon">{icon}</span>;

  return (
    <div className="attach-field">
      <div className="input-form">
        <InputIconWrapper className={errors + wrapperClassName} status={stateVar}>
          <Label htmlFor={label}>
            {label}
            <div className={`${errors} form-control-validated input-group`} />
            <span className="file-text text-ellipsis">{text}</span>
            <FormControl
              {...input}
              className="form-control"
              placeholder={placeholder}
              type={type}
              accept={accept}
              readOnly={readOnly}
              disabled={disabled}
              onChange={onChangeFile}
              value={value}
            />
            {iconSpan}
          </Label>
        </InputIconWrapper>
        <ValidationMessage>{touched && (error || warning)}</ValidationMessage>
        {!error && <ValidationMessage>{docError}</ValidationMessage>}
      </div>
    </div>
  );
};

export const renderFileReplacement = ({
  wrapperClassName,
  label,
  stateVar,
  onDeleteFile,
  meta: { touched, error, warning, active },
  editFlag = true,
}) => {
  const success = touched && !error ? 'success' : '';
  const errors = touched && error && !active ? 'has-error' : success;
  const text = stateVar || <span className="placeholder">Attach file</span>;

  const iconSpan = (
    <span className="icon">
      <SVG src={circleTickIcon} />
    </span>
  );
  return (
    <div className="attach-field">
      <div className={`${!editFlag ? 'input-disabled' : ''} input-form`}>
        <InputIconWrapper className={errors + wrapperClassName} status={stateVar}>
          <Label htmlFor={label}>
            {label}
            <div className={`${errors} form-control-validated input-group`} />
            <span className="file-text text-ellipsis">{text}</span>
            {iconSpan}
          </Label>
        </InputIconWrapper>
        <ValidationMessage>{touched && (error || warning)}</ValidationMessage>
      </div>
      {editFlag && (
        <DeleteIconFileWrapper>
          {stateVar !== '' ? (
            <LinkButtonMod
              color="link"
              onClick={() => {
                onDeleteFile(stateVar);
              }}
            >
              <SVG src={deleteIcon} />
              <small className="opacity-100">Delete file</small>
            </LinkButtonMod>
          ) : null}
        </DeleteIconFileWrapper>
      )}
    </div>
  );
};

export const renderTextAreaForm = ({
  input,
  placeholder,
  meta: { touched, error, warning, active },
  rows = 4,
  cols = 30,
  wrapperClassName,
  errorMessageToShow = true,
}) => {
  const success = touched && !error ? 'success' : '';
  const errors = touched && error && !active ? ' has-error ' : success;
  return (
    <FormControlWrapper className={`${errors} ${wrapperClassName}`}>
      <FormControlTextArea placeholder={placeholder} {...input} className="form-control" id="" cols={cols} rows={rows} />
      {errorMessageToShow ? <ValidationMessage>{touched && (error || warning)}</ValidationMessage> : null}
    </FormControlWrapper>
  );
};

export const renderFieldoptCheckbox = ({ onClick, input, type, message, meta: { touched, error }, disabled = false }) => {
  const errors = touched && error ? 'has-error' : '';
  return (
    <FormGroup className="form-group">
      <CheckBoxContainer className={`${errors} form-control-validated`}>
        <Label className="checkbox-label small">
          {message}
          <Input {...input} type={type} disabled={disabled} onClick={onClick} />
          <span className="checkmark rounded-1" />
        </Label>
      </CheckBoxContainer>
    </FormGroup>
  );
};

export const renderDynamicField = ({ input, type, meta: { touched, error, warning, active } }) => {
  const success = touched && !error ? 'success' : '';
  const errors = touched && error && !active ? 'has-error' : success;
  return (
    <div className={`${errors} form-control-validated`}>
      <input {...input} type={type} className="form-control" />
      <span className="required  cond-error">{touched && (error || warning)}</span>
    </div>
  );
};
export const RadioButton = props => {
  const {
    value,
    name,
    label,
    Component,
    onChangeRadio,
    checked,
    condition,
    className,
    selectedRadio,
    selectedRadioClassName,
    input,
  } = props;
  const selectedRadioClass = selectedRadio === value ? selectedRadioClassName : '';
  return (
    <React.Fragment>
      <FormControlRadio className="d-flex radio-div">
        <label htmlFor={value} className={`radio-label ${className} ${checked} ${selectedRadioClass}`}>
          <input
            id={value}
            type="radio"
            value={value}
            name={(input && input.name) || name}
            {...props}
            onChange={onChangeRadio}
            checked={checked}
          />
          <P className="p16 m-0" opacityVal="0.7">
            {label}
          </P>
          <span className="checkmark" />
        </label>
      </FormControlRadio>
      {(condition && Component) || null}
    </React.Fragment>
  );
};
export const RenderRadio = props => {
  const {
    data,
    groupName,
    selectedRadio,
    onChangeRadio,
    meta: { touched, error, warning },
    editFlag = true,
  } = props;

  return (
    <FormControlRadio>
      <div className={`${editFlag ? 'disabled-radio' : ''} form-control-validated `}>
        {data.map(item =>
          selectedRadio === item.value ? (
            <RadioButton
              {...item}
              name={groupName}
              onChangeRadio={onChangeRadio}
              selectedRadio={selectedRadio}
              disabled={editFlag}
              checked
            />
          ) : (
            <RadioButton {...item} name={groupName} onChangeRadio={onChangeRadio} selectedRadio={selectedRadio} disabled={editFlag} />
          ),
        )}
        <span className="required  cond-error">{touched && (error || warning)}</span>
      </div>
    </FormControlRadio>
  );
};
export const RenderRadioPreference = props => {
  const { data, groupName, onChangeRadio, defaultValue, checked, className } = props;
  return (
    <FormControlRadio>
      <div className="form-control-validated">
        {data.map(item => (
          <RadioButton
            {...item}
            checked={typeof checked === 'function' ? checked(item) : defaultValue === item.value}
            name={groupName}
            className={className}
            onChangeRadio={onChangeRadio}
          />
        ))}
      </div>
    </FormControlRadio>
  );
};
export const RenderRadioSingle = props => {
  const {
    selectedRadio,
    onChangeRadio,
    groupName,
    data,
    meta: { touched, error, warning },
  } = props;

  return (
    <FormControlRadio>
      <div className="form-control-validated">
        {data.map(item =>
          selectedRadio === item.value ? (
            <RadioButton {...item} name={groupName} onChangeRadio={onChangeRadio} selectedRadio={selectedRadio} checked />
          ) : (
            <RadioButton {...item} name={groupName} onChangeRadio={onChangeRadio} selectedRadio={selectedRadio} />
          ),
        )}

        <span className="required  cond-error">{touched && (error || warning)}</span>
      </div>
    </FormControlRadio>
  );
};

export const renderCheckBox = ({ input, label, checked, type, wrapperClassName }) => (
  <CheckBoxContainer className={`${wrapperClassName} ${checked}`}>
    <Label className="checkbox-label">
      {label}
      <Input {...input} type={type} checked={checked} />
      <span className="checkmark"> </span>
    </Label>
  </CheckBoxContainer>
);
