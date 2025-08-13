
import { Credentials } from '../types';

const generateRandomHex = (length: number): string =>
  [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export const generateCredentials = (): Credentials => {
  const subdomain = generateRandomHex(8);
  const endpoint = `${subdomain}.us-east.nprotocol.io`;
  
  // More complex session key
  const sessionKey = `NPSEC-${generateRandomHex(8).toUpperCase()}-${generateRandomHex(4).toUpperCase()}-${generateRandomHex(4).toUpperCase()}-${generateRandomHex(12).toUpperCase()}`;

  return { endpoint, sessionKey };
};