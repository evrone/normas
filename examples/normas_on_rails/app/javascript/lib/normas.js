import Normas from 'normas/dist/js/normasWithTurbolinks';
import normasMutations from 'normas/dist/js/normasMutations';
// import Turbolinks from 'turbolinks';
import Turbolinks from '../../../vendor/turbolinks-debug';

const NormasWithMutations = normasMutations(Normas);

const normas = new NormasWithMutations({
  Turbolinks,
  debugMode: process.env.NODE_ENV === 'development', // default `true`
  eventsDebug: true,           // default `true`; works only if `debugMode === true`
  // $el: $(document),         // default `$(document)`
  // turbolinksEnabled: true,  // default ``
});

global.normas = normas;

export default normas;
