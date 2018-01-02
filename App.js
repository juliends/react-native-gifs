import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gif: {
    width: 150,
    height: 150
  }
});

const giphy = require('giphy-api')('fwyZq0pVmzjsbbqSNwuc51Y86Ved2ATP'); // API KEY

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifIds: [],
      selectedGif: 'xT9IgDEI1iZyb2wqo8'
    };
  }
  searchGif = (term) => {
    const word = term.target.value;
    giphy.search(word, (err, res) => {
      this.setState({ gifIds: res.data.slice(0, 10).map(gif => gif.id) });
    });
  }
  handleSelectedGif = (id) => {
    this.setState({ selectedGif: id });
  }
  render() {
    return (
      <View style={styles.container}>
        <Gif giphyId={this.state.selectedGif}/>
      </View>
    );
  }
}

class Gif extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.giphyId !== nextProps.giphyId;
  // }
  render() {
    const gif = {
      uri: `https://media.giphy.com/media/${this.props.giphyId}/giphy.gif`
    };
    return (
      <Image source={gif} style={styles.gif} />
    );
  }
}

