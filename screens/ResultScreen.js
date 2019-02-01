import React from 'react';
import {connect} from 'react-redux'
import {
  StyleSheet,
  View,
} from 'react-native';
import {Card, CardItem, Body, Button, Text, H3, H2} from 'native-base';
import ProgressCircle from 'react-native-progress-circle'
import {globalStyles} from '../utils/helpers'

class ResultScreen extends React.Component {
  render() {
    const {correct, incorrect, deckId} = this.props.navigation.state.params
    const totalQuestions = parseInt(correct + incorrect)
    const correctQuestionsPercent = (correct * 100) / totalQuestions
    return (
      <View style={globalStyles.container}>
        <Card style={styles.card}>
          <CardItem>
            <Body>
              <View style={styles.progressContainer}>
                <ProgressCircle
                  percent={correctQuestionsPercent}
                  radius={120}
                  borderWidth={8}
                  color="#3399FF"
                  shadowColor="#999"
                  bgColor="#fff">
                  <Text style={{fontSize: 18}}>{`${correctQuestionsPercent}%`}</Text>
                </ProgressCircle>
                <H3 style={styles.title}>Correct questions: {correct} of {totalQuestions}</H3>
              </View>
              <View style={styles.buttonsContainer}>
                <Button block primary
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate(
                    'Quiz',
                    {questionId: 0, deckId, correct: 0, incorrect: 0}
                  )} ><Text>Restart the quiz</Text></Button>
                <Button block primary
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate(
                    'Deck',
                    {deckId}
                  )}><Text>Go back to the Deck View</Text></Button>
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
  title: {
    marginTop: 10,
    marginBottom: 10,
  },
  progressContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  buttonsContainer: {
    marginTop: 50,
    marginBottom: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    flexDirection: 'column'
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
  }
});

ResultScreen.navigationOptions = {
  title: 'Results of Quiz',
};

export default connect()(ResultScreen)

