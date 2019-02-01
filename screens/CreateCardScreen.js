import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {Button, Text} from 'native-base';
import {connect} from 'react-redux'
import RNPickerSelect from 'react-native-picker-select';
import {Formik} from 'formik';
import {handleAddQuestionToDeck} from '../actions';
import {globalStyles} from '../utils/helpers'

export const CreateCardScreen = props => {
  const {keyDeck} = props.navigation.state.params
  const inputRefs = {};
  const items = [
    {
      label: 'Correct',
      value: true,
    },
    {
      label: 'Incorrect',
      value: false,
    }
  ]
  return (
    <View>
      <Formik
        initialValues={{question: '', answer: '', response: true}}
        onSubmit={values => {
          const {dispatch} = props
          let {question, answer, response} = values
          const questionItem = {question, answer, type: response}
          dispatch(handleAddQuestionToDeck(questionItem, keyDeck));
          props.navigation.navigate('Home')
        }}>
        {props => (
          <View style={globalStyles.form}>
            <TextInput
              onChangeText={props.handleChange('question')}
              value={props.values.question}
              placeholder={'Type a question'}
              style={globalStyles.inputIOS}
              name='question' />
            <TextInput
              onChangeText={props.handleChange('answer')}
              value={props.values.answer}
              placeholder={'Type an answer'}
              style={globalStyles.inputIOS}
              name='answer' />
            <RNPickerSelect
              placeholder={{
                label: 'Select a type of response...',
                value: null,
                color: '#9EA0A4',
              }}
              items={items}
              onValueChange={(value) => {
                props.values.response = value
              }}
              onUpArrow={() => {
                inputRefs.name.focus();
              }}
              onDownArrow={() => {
                inputRefs.picker2.togglePicker();
              }}
              style={{...pickerSelectStyles}}
              value={props.response}
              ref={(el) => {
                inputRefs.picker = el;
              }}
            />
            <Button block onPress={props.handleSubmit} >
              <Text>Create</Text>
            </Button>
          </View>
        )}
      </Formik>
    </View>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    marginBottom: 20
  },
});

CreateCardScreen.navigationOptions = {
  title: 'Create a Card',
};

export default connect()(CreateCardScreen);