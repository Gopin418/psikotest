import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [
      { name: '', user_number: '' }
    ],
    timer: 0,
    current: 1,
    testNumber: 1,
    questionLength: 1,
    instructionLength: 1,
    instruction: [],
    instructionAnswer: [],
    instructionStatus: true,
    rememberStatus: false,
    rememberData: [],
    instructionData: [],
    currentTest: 'selection',
    questions: [],
    numAnswers: [],
    numbers: []
  },
  mutations: {
    setTime (state, time) {
      state.timer = time
    },
    resetCurrent (state) {
      state.current = 1
    },
    resetPage (state) {
      state.current = 1
      state.instructionStatus = true
    },
    testReset (state) {
      state.testNumber = 1
      state.instructionStatus = true
    },
    saveUser (state, userData) {
      state.user.push(userData)
      state.user.shift()
      router.push('/first-test')
    },
    questionsDataReset (state) {
      state.questions = []
    },
    questionsDataUpdate (state, data) {
      state.questions = []
      state.questions = data.map(a => {
        return {
          timer: a.timer,
          questions: a.questions.map(x => {
            return {
              number: x.number,
              question: x.question,
              question_marks: x.question_marks
            }
          })
        }
      })
      state.numbers = [
        state.questions[0].questions[0].number,
        state.questions[0].questions[state.questions[0].questions.length - 1].number
      ]
      state.questionLength = state.questions.length
    },
    startRemember (state) {
      state.currentTest = 'remember'
    },
    rememberEnable (state) {
      state.rememberStatus = true
    },
    rememberDisable (state) {
      state.rememberStatus = false
    },
    rememberDataUpdate (state, data) {
      state.rememberData = data.map(a => {
        return {
          time: a.time,
          instruction: a.instruction,
          remembers: a.remembers
        }
      })
    },
    instructionDataReset (state) {
      state.instructionData = []
    },
    instructionDataUpdate (state, data) {
      state.instructionData = []
      state.instructionData = data.map(a => {
        return {
          timer: a.timer,
          type: a.type,
          instruction: a.instruction,
          questions: a.questions
        }
      })
      state.currentTest = state.instructionData[0].type
      state.instructionLength = state.instructionData[0].questions.length
    },
    instructionAnswer (state, data) {
      state.instructionAnswer.push(data)
    },
    instructionUpdate (state, instructionData) {
      state.instruction = instructionData.map(a => {
        return a.map(x => {
          return x
        })
      })
    },
    instructionLocalUpdate (state) {
      state.instructionStatus = false
    },
    instructionReset (state, instructionData) {
      state.instruction = instructionData.map((a, index) => {
        return a.map(x => {
          return x
        })
      })
    },
    numAnswersUpdate (state, data) {
      state.numAnswers = data.map(a => {
        return a.questions.map(x => {
          return x.answers.answer
        })
      })
    },
    next (state) {
      state.current += 1
    },
    back (state) {
      state.current -= 1
    },
    move (state, move) {
      state.current = move
    },
    moveTest (state) {
      state.current = 1
      state.testNumber += 1
      state.instructionStatus = true
    }
  },
  actions: {
  },
  modules: {
  }
})
