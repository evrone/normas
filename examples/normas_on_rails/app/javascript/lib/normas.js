import Normas from 'normas';
import normasTurbolinks from 'normas/dist/js/integrations/turbolinks';
import normasViews from 'normas/dist/js/extensions/views';
// import Turbolinks from 'turbolinks';
import Turbolinks from '../../../vendor/turbolinks-debug';

const NormasWithTurbolinks =
  normasViews(
    normasTurbolinks(
      Normas
    )
  );

const normas = new NormasWithTurbolinks({
  Turbolinks,
  enabling: {                 // detailed enabling settings, each default `true`
    turbolinks: true,
    mutations: true,
  },
  debugMode: process.env.NODE_ENV === 'development', // default `true`
  logging: {                  // detailed logging settings, mostly default `true`
    hideInstancesOf: [Element, NormasWithTurbolinks.View],
    constructGrouping: 'groupCollapsed',
    // content: true,
    // Core level options
    // hideInstancesOf: [],      // list of constructors whose instances will be muted, ex: [Element, $, Normas.View, Normas]
    // construct: true,          // logs about constructing, default `false`, because noisy
    // constructGrouping: true,  // group logging about constructing
    // events: true,             // logs about events listening
    // eventsDebounced: true,    // events collect in debounced by 20ms batches
    // eventsTable: false,       // events subscriptions info as table, default `false`, because massive
    // App level options
    // elements: true,           // logs about element enter and leave
    // content: false,           // logs about content enter and leave, default `false`, because noisy
    // contentGrouping: true,    // group logging under content lifecycle
    // navigation: true,         // logs in navigation mixin
    // navigationGrouping: true, // group logging under page events
  },
  viewOptions: {
    logging: {
    },
  },
});

global.normas = normas;

export default normas;
