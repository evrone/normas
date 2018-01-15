# Normas

Normal Lightweight Javascript Framework for server-side render compatible with Turbolinks

At the moment, the project is in the stage of active development and will be ready for production in early 2018.
Now you can clone this repo and try [example with Rails](examples/normas_on_rails). 

Feel free to start watching and star project in order not miss the release or updates.

<a href="https://evrone.com/?utm_source=normas">
  <img src="https://user-images.githubusercontent.com/417688/34437029-dbfe4ee6-ecab-11e7-9d80-2b274b4149b3.png" 
       alt="Sponsored by Evrone" width="308">
</a>

## Installation

Your application can use the [`normas` npm package](https://www.npmjs.com/package/normas) 
to install Normas as a module for build with tools like [webpack](http://webpack.github.io/).

1. Add the `normas` package to your application: `yarn --add normas` or `npm install --save normas`.
2. Create your `normas.js` (ex in your `js/lib`)
2. Import `Normas` class from package, configure and export your `normas` instance for usage in other app-files:

```js
import Normas from 'normas';

export default new Normas({
  debugMode: process.env.NODE_ENV === 'development', // default `true`
  // eventsDebug: true, // default `true`; works only if `debugMode === true`
});
```

## Project structure and usage

Normas does not limit file structure organization, 
but it is strongly recommended to split app-logic into separate files 
and group them into folders according to functionality. 
All you need to do is import your `normas` instance 
and use it for all event bindings and content-flow.

```js
import normas from 'lib/normas';

normas.listenEvents('click body', () => alert('Body click!'));
```

## Events listening

### `listenEvents`

```js
normas.listenEvents({
  click: handleDocumentClick,
  'click   .js-player .js-player__pause': handleClickPause1,
  '.js-player': {
    'player:load': handleLoad,
    'player:play/player:stop': handlePlayback,
    'click   .js-player__pause': handleClickPause2,
    '.js-player__pause': {
      click: ($pause, event) => {
        alert($pause.closest('.js-player'));
      },
    },
  },
});

normas.listenEvents('.js-player', {
  'player:load': handleLoad,
  'player:play/player:stop': handlePlayback,
  'click   .js-player__pause': handleClickPause2,
  '.js-player__pause': {
    click: handleClickPause3,
  },
});

normas.listenEvents('click/mouseenter    .js-player .js-player__pause', handleClickPause1);
normas.listenEvents('.js-player .js-player__pause', 'click/mouseenter', handleClickPause1);
```

### `listenEventsOnElement`

```js
normas.listenEventsOnElement($myElement, /* events notation like for `listenEvents` */);
```

### `forgetEvents` && `forgetEventsOnElement`

```js
const $myElement = $('.my-element:first');
const listeningArgs = normas.listenEventsOnElement($myElement, { 
  'click .inner-element': ($innerElement, event) => {
    alert($innerElement[0] === event.currentTarget && $(event.currentTarget).closest($myElement).length > 0);
    normas.forgetEventsOnElement($myElement, listeningArgs);
  }, 
});
```

### `trigger`

```js
normas.listenEvents('cart:update', (itemId, amount) => ...);
...
normas.trigger('cart:update', [itemId, amount]);
```

## Content control

### Content listening

Don't use DOM-ready-like wrapping (like `$(() => { ... });`), 
because app may use [Turbolinks](https://github.com/turbolinks/turbolinks) + many dynamic components. 

If something needs to be done when enter or/and leave the page (navigation, 
ie, the processing does not need randomly appearing in the content, such as popup), 
you can wrap in a `listenToPage([enter][, leave])`:
```js
normas.listenToPage(
  () => { /* page ready or body replaced by Turbolinks */ }, 
  () => { /* page prepare to cache and disappearing */ }
);
```

If there is something to do with the appearance of content, 
whether it's walking through the pages, or processing of the content appearing, 
you need to turn in `listenToContent([enter][, leave])`:
```js
normas.listenToContent(
  ($root) => { /* $root already in DOM in this callback */ }, 
  ($root) => { /* $root disappear after this callback */ }
);
```
where second callback (on leave content) not necessary.

Next level of content listening is `listenToElement(elementSelector, enter[, leave = null][, delay = 0])`:
```js
normas.listenToElement('.js-element',
  ($element) => { /* $element already in DOM in this callback */ }, 
  ($element) => { /* $element disappear after this callback */ },
  100, // delay for `enter` callback
);
```

### Content broadcasting

#### Mutation Observer

*A few words about mutations...* **Currently mutations mixin in experimental state!**
```js
import Normas from 'normas/dist/normasWithTurbolinks';
import normasMutations from 'normas/dist/normasMutations';
import Turbolinks from 'turbolinks';

const NormasWithMutations = normasMutations(Normas);

export default new NormasWithMutations({
  Turbolinks,
  debugMode: process.env.NODE_ENV === 'development', // default `true`
});
```

#### Manual content broadcasting

For broadcast events about content life use `sayAboutContentEnter` and `sayAboutContentLeave`:
```js
let $content = $('<div>Content</div>');
$content.appendTo($('body'));
normas.sayAboutContentEnter($content);
...
normas.sayAboutContentLeave($content);
$content.remove();
```

```js
normas.replaceContentInner($container, content);
```

```js
normas.replaceContent($content, $newContent);
```

## Navigation

- `visit(location)`
- `refreshPage()`
- `setHash(hash)`
- `back()`
- `replaceLocation(url)`
- `pushLocation(url)`
- `sayAboutPageLoading(state)`

## Views

If you like organize some instantiated code into classes, likeness Evrobone/Backbone-view,
for this there is an analog in the Normas.
 
```js
import normas from 'lib/normas';

// Define your view-class extends from `normas.View`
class MyPlayer extends normas.View {
  // Define selector for binding, like `el: '.b-my-player'` in Evrobone.
  static selector = '.b-my-player';

  // Events notation compliant with `listenEvents`
  static events = {
    'click  .b-my-player__full-screen': 'gotoFullScreen',
    '.b-my-player__playback-controls': {
      'click          .b-my-player__play': 'play',
    },
  };
  
  initialize(options) {
    // ... your actions after instance initialized
  }

  terminate() {
    // ... your actions before events unbinding
    super.terminate();
    // ... your actions after events unbinding
  }

  gotoFullScreen() {
    alert('No fullscreen :)');
  }
  
  play() {
    alert('Play!');
  }
}

// Register your view for auto-binding
normas.registerView(MyPlayer);
```

## Useful shortcuts

```js
$('.some-selector').filter('.jquery-chain').each$(($element) => { 
  $element.addClass('.jquery-too'); 
});
```

## Roadmap

- More readme and documentation
- Use rollup for build dist
- More examples of usage with actual javascript plugins and libs
- Improve debugging
- Optional jQuery usage
- Example on node.js with Express.js
- Tests
