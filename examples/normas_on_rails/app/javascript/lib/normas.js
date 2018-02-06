import Normas from 'normas/dist/js/normasWithTurbolinks';
import normasMutations from 'normas/dist/js/normasMutations';
// import Turbolinks from 'turbolinks';
import Turbolinks from '../../../vendor/turbolinks-debug';

const NormasWithMutations = normasMutations(Normas);

const normas = new NormasWithMutations({
  Turbolinks,
  debugMode: process.env.NODE_ENV === 'development', // default `true`
  logging: {                  // detailed logging settings, mostly default `true`
    construct: true,          // logs about constructing, default `false`, because noisy
    events: true,             // logs about events listening
    eventsDebounced: true,    //
    eventsTable: true,        // logs events subscriptions info as table, default `false`, because massive
    element: true,            // logs about element enter and leave
    content: true,            // logs about content enter and leave, default `false`, because noisy
    navigation: true,         // logs in navigation mixin
  },
  enabling: {                 // detailed enabling settings, each default `true`
    turbolinks: true,
    mutations: true,
  },
  // $el: $(document),         // default `$(document)`
});

global.normas = normas;

export default normas;
