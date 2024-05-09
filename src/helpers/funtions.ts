import { customAlphabet } from 'nanoid';

const getCookie = (name: string)  =>{
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const setCookie = (name: string, value: string, options: {expires?: Date | number, path?: string, domain?: string, secure?: boolean} = {}) => {
  // Initialize an array to store cookie options
  let cookieString = `${name}=${encodeURIComponent(value)}`;

  // Check if an expiration date is provided and add it to the cookie
  if (options.expires !== undefined) {
    let expires = options.expires;
    if (expires === null) {
      // If expires is set to null, do not set an expiration date (cookie never expires)
    } else if (typeof expires === 'number') {
      const date = new Date();
      date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000); // Convert days to milliseconds
      expires = date;
    }
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  // Add path option to the cookie string if provided
  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  // Add domain option to the cookie string if provided
  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  // Add secure option to the cookie string if provided
  if (options.secure) {
    cookieString += '; secure';
  }

  // Set the cookie in the document
  document.cookie = cookieString;
};

const escapeHtml = (text: string) => {
  return text
      .replace(/&/g, '&amp;')  // Escape '&' to '&amp;'
      .replace(/</g, '&lt;')   // Escape '<' to '&lt;'
      .replace(/>/g, '&gt;');  // Escape '>' to '&gt;'
};

const createID = () => {
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 21);
  return nanoid();
};

export { getCookie, setCookie, escapeHtml, createID };
