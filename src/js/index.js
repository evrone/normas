/**
 * Normas
 *
 * @see {@link https://github.com/evrone/normas|Github}
 * @license MIT
 * @copyright Dmitry Karpunin <koderfunk@gmail.com>, 2017-2018
 */

import './lib/jqueryAdditions';
import NormasBase from './mixins/base';
import NormasLogging from './mixins/logging';
import normasEvents from './mixins/events';
import normasContent from './mixins/content';
import normasElements from './mixins/elements';
import normasNavigation from './mixins/navigation';
import normasMutations from './mixins/mutations';

const NormasSubBase = NORMAS_DEBUG ? NormasLogging(NormasBase) : NormasBase;

const NormasCore = normasEvents(NormasSubBase);

const Normas =
  normasMutations(
    normasNavigation(
      normasElements(
        normasContent(
          NormasCore
        )
      )
    )
  );

Normas.NormasCore = NormasCore;

export default Normas;
