import './lib/jqueryAdditions';
import NormasBase from './mixins/base';
import normasEvents from './mixins/events';
import normasContent from './mixins/content';
import normasNavigation from './mixins/navigation';

const Normas =
  normasNavigation(
    normasContent(
      normasEvents(
        NormasBase
      )
    )
  );

export default Normas;
