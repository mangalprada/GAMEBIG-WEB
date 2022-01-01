import mixpanel from 'mixpanel-browser';
const token = process.env.MIXPANEL_TOKEN;
if (token) mixpanel.init(token, { debug: true, ignore_dnt: true });
export default mixpanel;
