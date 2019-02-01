import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import {Card, CardItem, Body, Button, Text, H2} from 'native-base';
import {
  clearLocalNotification,
  setLocalNotification,
  globalStyles
} from '../utils/helpers'
import ProgressBarAnimated from 'react-native-progress-bar-animated';


class QuizScreen extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }
  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }

  validateResponse = (response) => {
    const {deckId, question, deck} = this.props
    let {questionId, correct, incorrect} = this.props
    if (question.type === response) {
      correct++;
    } else {
      incorrect++
    }
    if (questionId === 0) {
      clearLocalNotification()
        .then(setLocalNotification)
    }
    if (deck.questions.length - 1 === questionId) {
      this.props.navigation.navigate(
        'Results',
        {deckId, correct, incorrect}
      )
    } else {
      questionId++
      this.props.navigation.navigate(
        'Quiz',
        {deckId, questionId, correct, incorrect}
      )
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    const {questionId, answer, question, deck} = this.props
    const startQuestion = questionId + 1
    const percent = ((startQuestion) * 100) / parseInt(deck.questions.length)

    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
            <Card>
              <CardItem>
                <Body>
                  <View style={styles.centeredView}>
                    <H2>Question</H2>
                    <Text>{question.question}</Text>
                  </View>
                </Body>
              </CardItem>
            </Card>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
            <Card>
              <CardItem>
                <Body>
                  <View style={styles.centeredView}>
                    <H2>Answer</H2>
                    <Text>{question.answer}</Text>
                  </View>
                </Body>
              </CardItem>
            </Card>
          </Animated.View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button style={styles.button} block primary onPress={() => this.flipCard()}>
            <Text>Flip the card!</Text>
          </Button>
          <Button style={styles.button} block success onPress={() => this.validateResponse(true)}>
            <Text>Correct</Text>
          </Button>
          <Button style={styles.button} block danger onPress={() => this.validateResponse(false)}>
            <Text>incorrect</Text>
          </Button>
        </View>
        <View>
        <Text>{startQuestion} of {deck.questions.length}</Text>
        <ProgressBarAnimated
          width={300}
          value={percent}
          backgroundColorOnComplete="#6CC644"
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    marginTop: 100
  },
  card: {
    width: 400,
  },
  centeredView: {
    padding: 10
  },
  flipCard: {
    width: 400,
    height: 'auto',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
  },
  buttonsContainer: {
    marginTop: 100,
    flex: 1,
    alignItems: 'stretch',
  },
  button: {
    width: 300,
    margin: 10,
  }
});

function mapStateToProps(decks, {navigation}) {
  const {deckId, questionId, correct, incorrect} = navigation.state.params
  const deck = decks[deckId]
  const question = deck.questions[questionId]
  return {
    deck,
    questionId,
    question,
    deckId,
    correct,
    incorrect
  }
}
export default connect(mapStateToProps)(QuizScreen)