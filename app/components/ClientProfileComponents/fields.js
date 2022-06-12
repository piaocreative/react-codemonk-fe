import * as formValidations from 'utils/formValidations';

export const getFieldValidator = (fieldName, required) => {
  let validator = [];
  const nameValidator = [formValidations.minLength2, formValidations.maxLength30];

  switch (fieldName) {
    // client onBoarding Create-Profile
    case 'individualfirstName':
    case 'companyfirstName':
    case 'companyAuthorityfirstName':
      validator = nameValidator;
      break;
    case 'individuallastName':
    case 'companylastName':
    case 'companyAuthoritylastName':
      validator = nameValidator;
      break;
    case 'individualjobTitle':
    case 'companyjobTitle':
    case 'companyAuthorityjobTitle':
      validator = [formValidations.minLength2, formValidations.maxLength30];
      break;

    case 'companyAuthorityemail':
      validator = [formValidations.email];
      break;

    case 'individualpostcode':
    case 'companyPersonalpostcode':
    case 'companyPincode':
    case 'companyAuthoritypostcode':
      validator = [];
      break;
    case 'individualaddressLineOne':
    case 'companyaddressLineOne':
    case 'companyAddressLineOne':
    case 'companyAuthorityaddressLineOne':
      validator = [];
      break;
    case 'individualcity':
    case 'companycity':
    case 'companyCity':
    case 'companyAuthoritycity':
      validator = [];
      break;
    case 'companyName':
      validator = [];
      break;
    case 'companyregisteredNumber':
    case 'vatNumber':
      validator = [];
      break;
    case 'companyAuthorityphoneNumber':
    case 'phoneNumber':
      validator = [formValidations.phoneNumberMax12];
      break;
    case 'website':
      validator = [formValidations.websiteURL];
      break;

    // client onBoarding Billing
    case 'companyProfessionInsuranceValue':
    case 'companyPublicInsurancesValue':
    case 'companyEmployerInsuranceValue':
      validator = [formValidations.rateValidation];
      break;
    case 'bankName':
    case 'bankAccountNumber':
    case 'bankCode':
      validator = [];
      break;
    case 'payPalEmail':
      validator = [formValidations.email];
      break;
    default:
  }
  return required ? [formValidations.requiredField, ...validator] : validator;
};
