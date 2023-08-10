import Login from "./pages/Login";
import Register from "./pages/Register";
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";

// access needed:
// accessToken(30s) & refreshToken(1h)
// Authorization
// Routes Protection

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ReduxProvider>
    </ApolloProvider>
  );
};

export default App;
