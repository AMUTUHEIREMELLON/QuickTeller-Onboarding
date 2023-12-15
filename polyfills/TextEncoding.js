import TextEncodingPolyfill from 'text-encoding';
import BigInt from 'big-integer';
Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
  BigInt: BigInt,
});
