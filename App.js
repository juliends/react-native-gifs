import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, Button, Alert, TouchableHighlight,  } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  list: {
  },
  gif: {
    width: 100,
    height: 100
  },
  mainGif: {
    width: 200,
    height: 200
  },
  input: {
    height: 50
  }
});

const giphy = require('giphy-api')('fwyZq0pVmzjsbbqSNwuc51Y86Ved2ATP'); // API KEY

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifIds: ['xT9IgDEI1iZyb2wqo8', 'xT9IgDEI1iZyb2wqo8'],
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
      <View style={styles.container}>
        <Gif giphyId={this.state.selectedGif} style={styles.mainGif} />
        <SearchBar handleChange={this.searchGif} />
        <ScrollView>
          <GifList style={styles.list} gifIds={this.state.gifIds} handleSelectedGif={this.handleSelectedGif} />
        </ScrollView>
        <Button
          onPress={() => {
            Alert.alert('You tapped the button!');
          }}
          title="Press Me"
        />
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
    <View>
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

