import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// access needed:
// Client
// Authorization Context
// Routes Protection

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
