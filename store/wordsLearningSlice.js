import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_FORGETTING_SPAN } from "../constants";

const initialState = {
  words: [],
};

const wordsLearningSlice = createSlice({
  name: 'wordsLearning',
  initialState,
  reducers: {
    addWord: (state, action) => {
      const { word, phonetics, audio, meaning, partOfSpeech } = action.payload;
      const existingWordIndex = state.words.findIndex(w => w.word === word);
      
      if (existingWordIndex === -1) {
        const now = new Date().getTime();
        const newWord = {
          word,
          phonetics,
          audio,
          meaning,
          partOfSpeech,
          dateForgets: now - INITIAL_FORGETTING_SPAN,
          dateTotallyForgets: now,
          forgettingSpan: INITIAL_FORGETTING_SPAN,
          status: 0
        };
        state.words.push(newWord);
      }
    },
    updateWord: (state, action) => {
      const { word, phonetics, audio, meaning, partOfSpeech } = action.payload;
      const existingWordIndex = state.words.findIndex(w => w.word === word);
      
      if (existingWordIndex !== -1) {
        state.words[existingWordIndex] = {
          ...state.words[existingWordIndex],
          phonetics,
          audio,
          meaning,
          partOfSpeech,
        };
      }
    },
    removeWord: (state, action) => {
      state.words = state.words.filter(word => word.word !== action.payload);
    },
    updateWordLearnInfo: (state, action) => {
      const word = action.payload;
      const wordIndex = state.words.findIndex(w => w.word === word);
      
      if (wordIndex !== -1) {
        const now = new Date().getTime();
        const newForgettingSpan = state.words[wordIndex].forgettingSpan * 2;

        state.words[wordIndex] = {
          ...state.words[wordIndex],
          dateForgets: now + state.words[wordIndex].forgettingSpan,
          dateTotallyForgets: now + newForgettingSpan,
          forgettingSpan: newForgettingSpan,
          status: 2
        };
      }
    },
    updateStatuses: (state) => {
      const now = new Date().getTime();
      
      state.words = state.words.map(word => {
        if (now > word.dateTotallyForgets) {
          return { ...word, status: 0 }; 
        } else if (now > word.dateForgets) {
          return { ...word, status: 1 }; 
        } else {
          return { ...word, status: 2 }; 
        }
      });
    }
  },
});

export const wordsLearningActions = wordsLearningSlice.actions;
export default wordsLearningSlice;