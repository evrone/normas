import React from 'react';

export default class ReactDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demoText: this.props.demoText,
    };
    this.handleClickDemoText = this.handleClickDemoText.bind(this);
  }

  render() {
    return (
      <div
        className="react-demo-component"
        style={{ fontSize: '28px' }}
        onClick={this.handleClickDemoText}
      >
        {this.state.demoText}
      </div>
    );
  }

  handleClickDemoText() {
    const demoWords = this.state.demoText.split(/\s+/);
    demoWords.unshift(demoWords.pop());
    this.setState({ demoText: demoWords.join(' ') });
  }
};
