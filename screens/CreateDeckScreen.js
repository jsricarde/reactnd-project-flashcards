import React from 'react';
import {TextInput, View} from 'react-native';
import {Button, Text} from 'native-base';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import {addDeck} from '../actions'
import {submitDeck} from '../utils/api'
import {setDataDeck, globalStyles} from '../utils/helpers'

export const CreateDeckScreen = props => {
  return (
    <View>
      <Formik
        initialValues={{deck: ''}}
        onSubmit={(values, actions) => {
          const {dispatch} = props
          let {deck} = values
          const key = deck.replace(/\s/gi, '').toLowerCase();
          deck = setDataDeck(deck)
          dispatch(addDeck({
            [key]: deck
          }))
          submitDeck({deck, key});
          actions.resetForm()
          props.navigation.navigate('Deck', {
            deckId: key
          })

        }}
      >
        {props => (
          <View style={globalStyles.form}>
            <TextInput
              onChangeText={props.handleChange('deck')}
              value={props.values.deck || ''}
              placeholder={'Deck name'}
              style={globalStyles.inputIOS}
              name='deck' />
            <Button block onPress={props.handleSubmit} >
              <Text>Create</Text>
            </Button>
          </View>
        )}
      </Formik >
    </View>
  )
}

CreateDeckScreen.navigationOptions = {
  title: 'Create a New Deck',
};

export default connect()(CreateDeckScreen);