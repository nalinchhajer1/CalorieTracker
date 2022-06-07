import Parse from './Parse';

export const parseSetup = () => {
  Parse.initialize('YOUR_APP_ID', 'YOUR_JAVASCRIPT_KEY');
  Parse.serverURL = 'http://YOUR_PARSE_SERVER:1337/parse';
};
