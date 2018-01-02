import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, Button, Alert, TouchableHighlight,  } from 'react-native';

const styles = {
  main: {
    flex: 1
  },
  container: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  gif: {
    width: 120,
    height: 120
  },
  input: {
    height: 50
  }
};

const giphy = require('giphy-api')('fwyZq0pVmzjsbbqSNwuc51Y86Ved2ATP'); // API KEY

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifIds: [],
      selectedGif: 'xT9IgDEI1iZyb2wqo8'
    };
  }
  searchGif = (word) => {
    giphy.search(word, (err, res) => {
      this.setState({ gifIds: res.data.slice(0, 10).map(gif => gif.id) });
    });
  }
  handleSelectedGif = (id) => {
    this.setState({ selectedGif: id });
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Gif giphyId={this.state.selectedGif} />
          <SearchBar handleChange={this.searchGif} />
        </View>
        <View>
          <ScrollView>
            <GifList gifIds={this.state.gifIds} handleSelectedGif={this.handleSelectedGif} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

class Gif extends Component {
  render() {
    const gif = {
      uri: `https://media.giphy.com/media/${this.props.giphyId}/giphy.gif`
    };
    return (
      <TouchableHighlight
          onPress={() => {
            this.props.handleSelectedGif(this.props.giphyId);
          }}>
        <Image source={gif} style={styles.gif} />
      </TouchableHighlight>
    );
  }
}

const GifList = (props) => {
  return (
    <View style={styles.list}>
      {
        props.gifIds.map(id => <Gif key={id} giphyId={id} handleSelectedGif={props.handleSelectedGif} />)
      }
    </View>
  );
};

class SearchBar extends Component {
  render() {
    return (
      <TextInput
        style={styles.input}
        placeholder="Search a gif"
        onChangeText={text => this.props.handleChange(text)}
      />
    );
  }
}

