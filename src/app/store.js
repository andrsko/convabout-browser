import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/posts/postsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  // https://github.com/rt2zz/redux-persist/issues/988
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST"],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
