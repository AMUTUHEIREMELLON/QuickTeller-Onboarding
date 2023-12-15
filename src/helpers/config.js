import {
  PROD_DOMAIN,
  PROD_API_KEY,
  PROD_API_PASSWORD,
  PROD_SMILE_API_KEY,
  PROD_SMILE_PARTNER_ID,
  PROD_BASE_URL,
  PROD_ICI_URL,
  PROD_PAYPOINT_URL,
  DEV_DOMAIN,
  DEV_API_KEY,
  DEV_API_PASSWORD,
  DEV_SMILE_API_KEY,
  DEV_SMILE_PARTNER_ID,
  DEV_BASE_URL,
  DEV_ICI_URL,
  DEV_PAYPOINT_URL
} from '@env';

import * as Updates from 'expo-updates';

const ENV = {
  dev: {
    baseUrl: DEV_BASE_URL,
    freshdeskDomain: DEV_DOMAIN,
    apiKey: DEV_API_KEY,
    apiPassword: DEV_API_PASSWORD,
    smileApiKey: DEV_SMILE_API_KEY,
    smilePartnerId: DEV_SMILE_PARTNER_ID,
    iciUrl: DEV_ICI_URL,
    paypointUrl: DEV_PAYPOINT_URL
  },
  prod: {
    baseUrl: PROD_BASE_URL,
    freshdeskDomain: PROD_DOMAIN,
    apiKey: PROD_API_KEY,
    apiPassword: PROD_API_PASSWORD,
    smileApiKey: PROD_SMILE_API_KEY,
    smilePartnerId: PROD_SMILE_PARTNER_ID,
    iciUrl: PROD_ICI_URL,
    paypointUrl: PROD_PAYPOINT_URL
  },
};

const getEnvVars = () => {
  if (Updates.releaseChannel.startsWith('prod')) {
    return ENV.prod;
  } else {
    return ENV.dev;
  }
};

const env = __DEV__ ? ENV.dev : ENV.prod;
// const env = ENV.dev;

export const {
  baseUrl,
  iciUrl,
  freshdeskDomain,
  apiKey,
  apiPassword,
  smileApiKey,
  smilePartnerId,
  paypointUrl
} = env;
