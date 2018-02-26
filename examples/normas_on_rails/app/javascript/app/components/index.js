import normasReact from 'normas/dist/js/integrations/react';
import normas from 'lib/normas'; // or may be you use global Normas instance
import React from 'react';
import ReactDOM from 'react-dom';

import ReactDemo from './ReactDemo';

normasReact({ normas, React, ReactDOM }, {
  ReactDemo,
});
