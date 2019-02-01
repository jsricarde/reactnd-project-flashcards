import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {Card, CardItem, Body, H1, H3, Button, Text} from 'native-base';
import {connect} from 'react-redux'
import {globalStyles} from '../utils/helpers'

class DeckScreen extends React.Component {
  render() {
    const {deck, deckId} = this.props
    return (
      <View>
        <Card style={styles.card}>
          <CardItem header style={globalStyles.centeredText}>
            <H1>{deck.title}</H1>
          </CardItem>
          <CardItem>
            <Body>
              <H3 style={globalStyles.centeredText}>{deck.questions.length} Cards</H3>
              <View style={styles.buttonsContainer}>
               {deck.questions.length > 0 && <Button
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate(
                    'Quiz',
                    {questionId: 0, deckId, correct: 0, incorrect: 0}
                  )}>
                  <Text>Start the Quiz</Text>
                </Button>}
                <Button
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate(
                    'CreateCard',
                    {keyDeck: deckId}
                  )}>
                  <Text>Add a Card</Text>
                </Button>
              </View>
            </Body>
          </CardItem>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 35,
    marginLeft: 30,
    marginRight: 30
  },
  buttonsContainer: {
    marginTop: 40,
    marginBottom: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    flexDirection: 'row'
  },
  button: {
    marginRight: 5,
    marginLeft: 5,
  }
});

function mapStateToProps(decks, {navigation}) {
  const {deckId} = navigation.state.params
  const deck = decks[deckId]
  return {
    deck,
    deckId
  }
}
export default connect(mapStateToProps)(DeckScreen)

