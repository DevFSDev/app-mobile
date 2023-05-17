import React from 'react';

const AppContext = React.createContext({
  skillLevel: '',
  setSkillLevel: () => {},
});

export default AppContext;