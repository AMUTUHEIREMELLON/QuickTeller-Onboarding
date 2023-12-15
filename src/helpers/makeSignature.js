import { smileApiKey, smilePartnerId } from './config';
import { enc, algo } from 'crypto-js';

// import crypto from 'crypto';

function makeSignature() {
  let timestamp = new Date().toISOString();

  let hmac = algo.HMAC.create(algo.SHA256, smileApiKey);

  hmac.update(timestamp);
  hmac.update(smilePartnerId);
  hmac.update('sid_request');

  let signature = hmac.finalize().toString(enc.Base64);

  return { timestamp, partnerId: smilePartnerId, signature };
}

export { makeSignature };
