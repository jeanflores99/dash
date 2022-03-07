import base64Url from 'base64-url';

const key = process.env.NEXT_PUBLIC_KEY || 'develop';

export const encrypt = (textPlain: string) => {
  const textEncrypt = `${key}:${textPlain}`;
  // eslint-disable-next-line import/no-named-as-default-member
  return base64Url.encode(textEncrypt);
}

export const decrypt = (textEncrypted: string, prefix = 'ID:') => {
  // eslint-disable-next-line import/no-named-as-default-member
  const textDecode = base64Url.decode(textEncrypted.split(prefix).pop() || '');
  return textDecode.split(':').pop();
}