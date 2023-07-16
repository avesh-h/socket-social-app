import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { AuthProvider } from "./Context/Auth";
import { SignUpProvider } from "./Context/SignUp";
import { NavigationProvider } from "./Context/Navigation";
import { store } from "./features/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SignUpProvider>
        <AuthProvider>
          <CookiesProvider>
            <NavigationProvider>
              <App />
            </NavigationProvider>
          </CookiesProvider>
        </AuthProvider>
      </SignUpProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
