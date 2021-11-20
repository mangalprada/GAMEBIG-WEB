import mixpanel, { Dict } from 'mixpanel-browser';

const token = process.env.MIXPANEL_TOKEN;
if (token) mixpanel.init(token);

const env_check = process.env.NODE_ENV === 'production';

const actions = {
  identify: (id: string) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id: string) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name: string, props: Dict | undefined) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props: Dict) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
  // super properties
  register: (props: Dict) => {
    if (env_check) mixpanel.register(props);
  },
};

export const Mixpanel = actions;
