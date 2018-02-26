# Normas ![stability-stable](https://img.shields.io/badge/stability-stable-green.svg) ![npm](https://img.shields.io/npm/v/normas.svg)

Normal Lightweight Javascript Framework for server-side render

At the moment, the project is in the stage of active development and will be ready for production in early 2018.
Now you can clone this repo and try [example with Rails](examples/normas_on_rails).

Feel free to start watching and star project in order not miss the release or updates.

<a href="https://evrone.com/?utm_source=normas">
  <img src="https://user-images.githubusercontent.com/417688/34437029-dbfe4ee6-ecab-11e7-9d80-2b274b4149b3.png"
       alt="Sponsored by Evrone" width="308">
</a>

## Table of Contents

* [Philosophy](#philosophy)
* [Installation](#installation)
* [Usage and project structure](#usage-and-project-structure)
* [Events listening](#events-listening)
  * [`listenEvents`](#listenevents)
  * [`listenEventsOnElement`](#listeneventsonelement)
  * [`forgetEvents` && `forgetEventsOnElement`](#forgetevents--forgeteventsonelement)
  * [`trigger`](#trigger)
  * [Events logging](#events-logging)
* [Content control](#content-control)
  * [Content listening](#content-listening)
  * [Content broadcasting](#content-broadcasting)
    * [Mutation Observer](#mutation-observer)
    * [Manual content broadcasting](#manual-content-broadcasting)
* [Navigation](#navigation)
* [Views](#views)
* [Debugging](#debugging)
* [Helpers](#helpers)
* [Integrations](#integrations)
  * [Turbolinks integration](#turbolinks-integration)
  * [React.js integration](#reactjs-integration)
* [Roadmap](#roadmap)
* [Contributing](#contributing)

## Philosophy

A lot of people in the world have done, are doing and will do in the future
[multi-page applications](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Web_frameworks#A_few_good_web_frameworks)
on Ruby on Rails, Phoenix, Express, Django, Flask, ASP.NET etc.
This is a fairly stable approach for medium and serious applications with advanced business logic.

But developers constantly have a headache when try organizing a big-app for thin client.
Collisions between the scripts and callback-hell, causes people to seek refuge in the new hyped "frameworks",
But they require a more complex organization of the application code
and generate a new cluster of problems inherent in the thick client.

It should be understood that Normas is ideally suited for multi-page applications.
Describe your tracking once and it will work magically correctly
for any cases of changing content and pages,
automatically compatible with Turbolinks and any other custom content change.
Your application can not be distinguished from a SPA/PWA.

It does not oblige to avoid [React.js](https://reactjs.org/), [Vue.js](https://vuejs.org/) etc libs.
You can use them partially,
for interactive fragments in the form that they are just one of the custom components.
Read more in the [Integrations](#integrations) section.

## Installation

Your application can use the [`normas` npm package](https://www.npmjs.com/package/normas)
to install Normas as a module for build with tools like [webpack](http://webpack.github.io/).

1. Add the `normas` package to your application: `yarn add normas` or `npm install --save normas`.
2. Create your `normas.js` instance module (ex in your `js/lib`)
3. Import `Normas` class from package, configure and export your `normas` instance for usage in other app-files:

```js
import Normas from 'normas';

export default new Normas({
  debugMode: process.env.NODE_ENV === 'development',
  logging: {
    eventsTable: true,
    content: true,
  },
});
```

Full list of logging options see in [Debugging section](#debugging).

## Usage and project structure

In 90% of cases, it is sufficient to use two methods: `normas.listenEvents` and `normas.listenToElement`.
Also, for organizing more complex widgets, there is [Views-system](#views).
All you need to do is import your `normas` instance
and use it for all event bindings and content-flow.

```js
import normas from 'lib/normas';

normas.listenEvents('click body', () => alert('Body click!'));

normas.listenToElement('select', $select => console.log('See new select!', $select));
```

Normas does not limit file structure organization,
but it is strongly recommended to split app-logic into separate files
and group them into folders according to functionality.

In all examples, Normas instance called `normas`, but if you call it `app`, you'll be dead right!
There is everything to ensure that your app-code does not crack at the seams.

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
normas.trigger('cart:update', itemId, amount); // unlike jQuery `.trigger('cart:update', [itemId, amount])`
```

### Events logging

By default Normas collects information about events listening
started with a difference of less than 20ms
and displays in batches as soon as events cease to be registered.
There is a way to enable synchronous logging: the option `logging: { eventsDebounced: false }`.
If you need a more visible list of events, use option `logging: { eventsTable: true }`.
Full list of logging options see in [Debugging](#debugging) section.

## Content control

### Content listening

Don't use DOM-ready-like wrapping (like `$(() => { ... });`),
because app may use [Turbolinks](https://github.com/turbolinks/turbolinks) + many dynamic components.

If something needs to be done when enter or/and leave the page (navigation,
ie, the processing does not need randomly appearing in the content, such as popup),
you can wrap in a `listenToPage([enter][, leave])`:
```js
normas.listenToPage(
  $page => { /* page ready or body replaced by Turbolinks */ },
  $page => { /* page prepare to cache and disappearing */ }
);
```

If there is something to do with the appearance of content,
whether it's walking through the pages, or processing of the content appearing,
you need to turn in `listenToContent([enter][, leave])`:
```js
normas.listenToContent(
  $content => { /* $content already in DOM in this callback */ },
  $content => { /* $content disappear after this callback */ }
);
```
where second callback (on leave content) not necessary.

Next level of content listening is `listenToElement(elementSelector, enter[, leave = null][, { delay: 0 }])`:
```js
normas.listenToElement('.js-element',
  $element => { /* $element already in DOM in this callback */ },
  $element => { /* $element disappear after this callback */ },
  {
    delay: 100, // delay for `enter` callback
    silent: true, // dont log in development mode
  },
);
```

Options:
  - `delay: Number` Delay in milliseconds from detect new element to fire `enter`.
  If content disappears before `delay`, `enter` will not fire.

### Content broadcasting

#### Mutation Observer

Currently, [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
is enabled by default and is used to track changes in the DOM tree.
You can turn it off using option when construct your normas instance
and go into the manual content control mode.
This will require more care in your content management code.

```js
export default new Normas({
  ...
  enablings: {
    mutations: false,
  },
  ...
});
```

#### Manual content broadcasting

If you make app for IE <= 10, I sympathize with you. 
Mutation Observer not work for some part of your users.   
You must use Manual content broadcasting when manipulate DOM-tree.

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

## Debugging

The installation section describes that you are making your own application instance,
which can be configured with logging options.

```js
import Normas from 'normas';

export default new Normas({
  debugMode: process.env.NODE_ENV === 'development', // default `true`
  // logging works only when `debugMode === true`
  logging: {                  // detailed logging settings, mostly default `true`
    construct: true,          // logs about constructing
    events: true,             // logs about events listening
    eventsDebounced: true,    //
    eventsTable: false,       // logs events subscriptions info as table, default `false`, because massive
    element: true,            // logs about element enter and leave
    content: false,           // logs about content enter and leave, default `false`, because noisy
    navigation: true,         // logs in navigation mixin (page events)
  },
});
```

## Helpers

Normas has built-in helpers, which he uses to create magic. 
You can use them in your code, and in some cases reduce the included code.

+ `compact(array)`
+ `debounce(func, wait)`
+ `groupBy(array, key)`
+ `groupByInArray(array, key)`
+ `flatten(array)`
+ `deepMerge(destination, source)`
+ `filter(collection, conditions)`
+ `find(collection, conditions)`

### jQuery additions

Built-in jQuery `$.fn.*` helpers:

```js
$someElement
  .filter$($element => $element.data('inMemoryData') )
  .filter('.jquery-chain')
  .each((index, element) => { $(element).addClass(`.jquery-too_${index}`); })
  .each$(($element, index) => { $element.removeClass(`.jquery-too_${index}`); });
```

## Integrations

### Turbolinks integration

For integration with Turbolinks you need use extended Normas class
and [construct instance](#installation) with your Turbolinks instance:
```js
import Normas from 'normas';
import normasTurbolinks from 'normas/dist/js/integrations/turbolinks';
import Turbolinks from 'turbolinks';

const NormasWithTurbolinks = normasTurbolinks(Normas);

const normas = new NormasWithTurbolinks({
  Turbolinks,
  enablings: {
    // turbolinks: false, // you can disable Turbolinks integration
  },
);

export default normas;
```

### React.js integration

Just import integration module and use it:
```js
import normasReact from 'normas/dist/js/integrations/react';
import normas from 'lib/normas'; // or may be you use global Normas instance
import React from 'react';
import ReactDOM from 'react-dom';

import ComponentA from 'components/ComponentA';
import ComponentB from 'components/ComponentB';

normasReact({ normas, React, ReactDOM }, {
  ComponentA,
  ComponentB,
});
```

If you want to understand the mechanism, or realize your own, look at the [source](src/js/extensions/react.js).

If you use Ruby on Rails, you can define in your `app/helpers/*_helper.rb`:

```ruby
  def react_component(component_name, props = nil)
    content_tag :div, '', data: { react_component: component_name, props: props }
  end
 ```

***To be continued...***

## Roadmap

- More documentation
- More examples of usage with actual javascript plugins and libs
- Improve code style and quality
- Improve debugging
- Optional jQuery usage
- Example on node.js with Express.js
- Tests

## Contributing

If you want to get involved, please do so by
[creating issues](https://github.com/evrone/normas/issues/new) or submitting pull requests.
Before undertaking any major PR effort, **please** check the existing issues.
If there isn't one, please file a new issue so we can discuss and assign the work so effort is not duplicated.
Thank you!
