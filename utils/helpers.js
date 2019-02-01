import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import {
  StyleSheet,
} from 'react-native';

export const DATABASE_STORAGE_KEY = 'flashcards:data'
export const NOTIFICATION_KEY = 'flashcards:notifications'


export function getInitialMetaInfo () {
   return {
      react: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces',
            type: true
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event',
            type: false
          }
        ]
      },
      javascript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.',
            type: true
          }
        ]
      }
    }
}

export function setDummyData () {
  const initialData = getInitialMetaInfo()
  AsyncStorage.setItem(DATABASE_STORAGE_KEY, JSON.stringify(initialData))
  return initialData
}

export function capitalizeString(resource){
  return resource.toLowerCase().split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

export function setDataDeck(deck) {
  return {
    title: deck,
    questions: []
  }
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Test a quiz right now',
    body: "👋 don't forget to make at least one quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredText: {
    alignSelf: 'center',
  },
  form: {
    padding: 40,
    marginTop: 17,
    marginBottom: 17,
    justifyContent: 'center',
  },
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
});