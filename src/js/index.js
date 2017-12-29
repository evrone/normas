import './lib/jqueryAdditions';
import NormasBase from './mixins/base';
import normasEvents from './mixins/events';
import normasContent from './mixins/content';
import normasNavigation from './mixins/navigation';
import normasViews from './mixins/views';

const Normas =
  normasViews(
    normasNavigation(
      normasContent(
        normasEvents(
          NormasBase
        )
      )
    )
  );

export default Normas;
