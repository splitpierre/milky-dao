import { randomStringForEntropy } from '@stablelib/random';

/**
 * This method leverages a native CSPRNG with support for both browser and Node.js
 * environments in order generate a cryptographically secure nonce for use in the
 * SiweMessage in order to prevent replay attacks.
 *
 * 96 bits has been chosen as a number to sufficiently balance size and security considerations
 * relative to the lifespan of it's usage.
 *
 * @returns cryptographically generated random nonce with 96 bits of entropy encoded with
 * an alphanumeric character set.
 */
export const generateNonce = (): string => {
  return randomStringForEntropy(96);
};

export function toHex(str) {
  const arr1 = [];
  for (let n = 0, l = str.length; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}
