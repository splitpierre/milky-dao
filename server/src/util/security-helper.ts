export function checkAllowedOrigins(url: string, allowedOrigins: string[]) {
  let result = false;

  // url has localhost
  if (url.indexOf('localhost') > 0) {
    allowedOrigins.forEach((val) => {
      if (val.includes('localhost')) result = true;
    });
    return result;
  }

  // production or stage
  const domain = new URL(url);
  url = domain.protocol + '//' + domain.hostname;
  if (allowedOrigins.includes(url)) result = true;
  return result;
}
