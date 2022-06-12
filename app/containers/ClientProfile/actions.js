import { EDIT_CREATE_PROFILE_FORM } from './constants';

export function submitEditProfile(data) {
  return {
    type: EDIT_CREATE_PROFILE_FORM,
    data,
  };
}
