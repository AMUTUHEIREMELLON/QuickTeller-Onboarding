import * as yup from "yup";

import Messages from "./../constants/Messages";
import Regexp from "./../constants/Regexps";

export const agentInfoValidationSchema = yup.object().shape({
  agentType: yup.string().required(Messages.optionsMessage),
});

export const contactInfoValidationSchema = yup.object().shape({
  AgentName: yup
    .string()
    .matches(Regexp.twoNamesRegexp, Messages.validMessage)
    .required(Messages.requiredMessage),
  AgentNin: yup
    .string()
    // .matches(Regexp.ninRegexp, Messages.validMessage)
    .required(Messages.requiredMessage),
  Phone: yup
    .string()
    // .matches(Regexp.phoneNumberRegexp, Messages.validMessage)
    .required(Messages.requiredMessage),
  Email: yup.string().email(Messages.validMessage),
  // TIN_No: yup
  //   .string()
  //   .matches(Regexp.tinRegexp, Messages.validMessage)
  //   .required(Messages.requiredMessage),
  Sex: yup.string().required(Messages.optionsMessage),
  // DateOfBirth: yup.date(Messages.validMessage),
  // NatureofBusiness: yup.string().required(Messages.requiredMessage),
});

export const companyInfoValidationSchema = yup.object().shape({
  DirectorName: yup.string().required(Messages.requiredMessage),
  CompanyRegistrationNumber: yup
    .string()
    .matches(Regexp.regNoRegexp, Messages.validMessage),
  NumberOfOutlets: yup
    .string()
    .matches(Regexp.numRegexp, Messages.requiredMessage)
    .required(Messages.requiredMessage),
  CompanyWebsite: yup.string().url(Messages.validMessage),
  // IsLicensedBusiness: yup.string().required(Messages.optionsMessage),
});

export const locationInfoValidationSchema = yup.object().shape({
  PhysicalLocation: yup.string().required(Messages.requiredMessage),
  GPS_Co_ordinates: yup.string().required(Messages.requiredMessage),
  Region: yup.string().required(Messages.requiredMessage),
  District: yup.string().required(Messages.requiredMessage),
  Village: yup.string().required(Messages.requiredMessage),
  LC: yup.string().required(Messages.requiredMessage),
  WorkinginAreaSince: yup.number().required(Messages.requiredMessage),
  TypeofShop: yup.string().required(Messages.requiredMessage),
  RuralUrban: yup.string().required(Messages.requiredMessage),
  ResidentinArea: yup.string().required(Messages.requiredMessage),
  Ownership: yup.string().required(Messages.requiredMessage),
});

export const beneficiaryValidationSchema = yup.object().shape({
  NameofBeneficiary: yup
    .string()
    .matches(Regexp.twoNamesRegexp, Messages.validMessage),
  BeneficiaryPhoneNumber: yup
    .string()
    .matches(Regexp.phoneNumberRegexp, Messages.validMessage),
});

export const termsValidationSchema = yup.object().shape({
  agreed: yup.string().required(Messages.requiredMessage),
  verified: yup.string().required(Messages.requiredMessage),
});

export const existingValidationSchema = yup.object().shape({
  agentID: yup.string().required(Messages.requiredMessage),
  operatorLocation: yup.string().required(Messages.requiredMessage),
});

export const issueValidationSchema = yup.object().shape({
  subject: yup.string().required(Messages.requiredMessage),
  priority: yup.string().required(Messages.optionsMessage),
});

export const loginValidationSchema = yup.object().shape({
  Username: yup.string().required(Messages.requiredMessage),
  Password: yup.string().required(Messages.requiredMessage),
});
