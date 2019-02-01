import {AsyncStorage} from 'react-native'
import {setDummyData, DATABASE_STORAGE_KEY} from './helpers'


export function fetchDecksResults() {
  return AsyncStorage.getItem(DATABASE_STORAGE_KEY)
    .then((results) => {
      // return setDummyData()
      return results === null
        ? setDummyData()
        : JSON.parse(results)
    })
}

export function submitDeck({deck, key}) {
  return AsyncStorage.mergeItem(DATABASE_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function getAllKeys() {
  return AsyncStorage.getAllKeys().then((results) => {
    return JSON.parse(results)
  })
}