import * as yup from "yup";

import Messages from "./../constants/Messages";
import Regexp from "./../constants/Regexps";

export const iciValidationSchema = yup.object().shape({
    cardPan: yup.string().matches(Regexp.panRegexp, Messages.invalidPan).required(Messages.requiredMessage),
    phoneNumber: yup.string().required(Messages.requiredMessage),
    nin: yup.string().required(Messages.invalidNin),
    personTitle: yup.string().required(Messages.requiredMessage),
    surname: yup.string().required(Messages.requiredMessage),
    givenName: yup.string().required(Messages.requiredMessage),
    address1: yup.string().required(Messages.requiredMessage),
    address2: yup.string().optional(),
    email: yup.string().matches(Regexp.emailRegexp, Messages.invalidEmail).optional()
  });