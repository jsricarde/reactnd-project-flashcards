import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux'
import {Card, CardItem, Body, H1, H3} from 'native-base';
import {fetchDecksResults} from '../utils/api'
import {receiveDecks} from '../actions';
import {globalStyles} from '../utils/helpers'

class HomeScreen extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const {dispatch} = this.props
    fetchDecksResults()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  renderItem = (item) => {
    const deck = this.props.decks[item]
    return (
      <View>
        <Card style={styles.card}>
          <CardItem button onPress={() => this.props.navigation.navigate(
            'Deck',
            {deckId: item}
          )}>
            <Body>
              <H1 style={globalStyles.centeredText}>
                {deck.title}
              </H1>
              <Text style={globalStyles.centeredText}>
                Cards: {deck.questions.length}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    )
  }

  render() {
    const {decks} = this.props;
    return (
      <View style={globalStyles.container}>
        <ScrollView style={globalStyles.container}>
          {decks &&
            <FlatList
              data={Object.keys(decks)}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 15
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(HomeScreen)