import normas from 'lib/normas';
// import View from 'normas/src/js/view';


import 'css/b-my-player';

class MyPlayer extends normas.View {
  static selector = '.b-my-player';

  static events = {
    'click  .b-my-player__full-screen': 'gotoFullScreen',
    '.b-my-player__playback-controls': {
      'click          .b-my-player__play': 'play',
      'click         .b-my-player__pause': 'pause',
      'click          .b-my-player__stop': 'stop',
    },
  };

  gotoFullScreen() {
    alert('No fullscreen :)');
  }
  
  play($play) {
    $play.hide();
    this.$('.b-my-player__pause, .b-my-player__stop').show();
  }

  pause($pause) {
    $pause.hide();
    this.$('.b-my-player__play').show();
    this.$('.b-my-player__stop').hide();
  }

  stop($stop) {
    $stop.hide();
    this.$('.b-my-player__play').show();
    this.$('.b-my-player__pause').hide();
  }
}

// const testPlayer0 = new normas.View({ $el: $('div:last') });
// const testPlayer = new My2Player({ $el: $('div:last') });

normas.registerView(MyPlayer);
