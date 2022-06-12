import * as formValidations from 'utils/formValidations';

export const getFieldValidator = (fieldName, required) => {
  let validator = [];

  switch (fieldName) {
    // personal details
    case 'firstName':
    case 'lastName':
      validator = [formValidations.minLength2, formValidations.maxLength30];
      break;

    case 'countryCode':
    case 'gender':
    case 'timeZone':
    case 'country':
      validator = [formValidations.requiredSelect];
      break;
    case 'phoneNumber':
      validator = [formValidations.phoneNumberMax12];
      break;
    case 'dob':
      validator = [formValidations.requiredDate];
      break;
    case 'postcode':
      validator = [];
      break;
    case 'addressLineOne':
    case 'city':
      validator = [];
      break;
    case 'languageCount':
      validator = [formValidations.ratingCount];
      break;
    case 'languageRating':
      validator = [formValidations.skillsRating];
      break;
    case 'multiSelectField':
      validator = [formValidations.requiredArray];
      break;

    // professional details
    case 'briefHTML':
      validator = [formValidations.minLengthRichText50, formValidations.maxLengthRichText1000];
      break;
    case 'linkedInProfile':
      validator = [formValidations.linkedInURL];
      break;
    case 'githubProfile':
      validator = [formValidations.githubURL];
      break;
    case 'stackoverflowProfile':
      validator = [formValidations.stackoverflowURL];
      break;
    case 'dribbbleProfile':
      validator = [formValidations.dribbbleURL];
      break;
    case 'behanceProfile':
      validator = [formValidations.behanceURL];
      break;
    case 'personalProfile':
      validator = [formValidations.websiteURL];
      break;
    case 'primaryRole':
      validator = [formValidations.requiredSelect];
      break;
    case 'yearsOfExperience':
      validator = [formValidations.requiredSelect];
      break;
    case 'skillsCount':
      validator = [formValidations.maxRatingCount];
      break;
    case 'skillsRating':
      validator = [formValidations.skillsRating];
      break;

    // agency Fields
    case 'designation':
      validator = [formValidations.minLength2, formValidations.maxLength30];
      break;
    case 'companyName':
      validator = [formValidations.minLength2, formValidations.maxLength50];
      break;
    case 'companyregisteredNumber':
    case 'duns':
    case 'vatNumber':
      validator = [];
      break;
    case 'companyPincode':
    case 'tradingPostCode':
      validator = [];
      break;
    case 'companyCity':
    case 'companyAddressLineOne':
    case 'tradingLogo':
    case 'tradingCity':
    case 'tradingAddressLineOne':
      validator = [];
      break;
    case 'tradingWebsite':
      validator = [formValidations.websiteURL];
      break;
    case 'companyCountry':
    case 'tradingCountry':
      validator = [formValidations.requiredSelect];
      break;
    case 'tradingName':
      validator = [formValidations.minLength2, formValidations.maxLength50];

      break;
    case 'tradingSummary':
      validator = [formValidations.minLengthRichText50, formValidations.maxLengthRichText1000];
      break;
    case 'linkedInUrl':
      validator = [formValidations.linkedInURL];
      break;
    case 'gitHubUrl':
      validator = [formValidations.githubURL];
      break;
    case 'dribbbleUrl':
      validator = [formValidations.dribbbleURL];
      break;
    case 'clutchUrl':
      validator = [formValidations.clutchURL];
      break;
    case 'goodfirmsUrl':
      validator = [formValidations.goodfirmsURL];
      break;
    case 'otherWebsiteUrl':
      validator = [formValidations.websiteURL];
      break;
    default:
  }
  return required ? [formValidations.requiredField, ...validator] : validator;
};
