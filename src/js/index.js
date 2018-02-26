/*!
 * Normas <https://github.com/evrone/normas>
 *
 * @license MIT
 * @copyright Dmitry Karpunin <koderfunk@gmail.com>, 2017-2018
 */

import MinimalNormas from './minimalNormas';
import normasMutations from './mixins/mutations';
import normasViews from './mixins/views';

export default
  normasViews(
    normasMutations(
      MinimalNormas
    )
  );
