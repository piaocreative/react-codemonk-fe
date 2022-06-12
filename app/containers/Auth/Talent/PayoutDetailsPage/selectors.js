/**
 * PayoutDetails selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPayoutDetails = state => state.PayoutDetails || initialState;

const makeSelectBankName = () =>
  createSelector(
    selectPayoutDetails,
    payoutDetailsState => payoutDetailsState.bankName,
  );

const makeSelectAccountNumber = () =>
  createSelector(
    selectPayoutDetails,
    payoutDetailsState => payoutDetailsState.bankAccountNumber,
  );

const makeSelectBankCode = () =>
  createSelector(
    selectPayoutDetails,
    payoutDetailsState => payoutDetailsState.bankCode,
  );

export { selectPayoutDetails, makeSelectBankName, makeSelectAccountNumber, makeSelectBankCode };
