import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { competitionsroutes } from "./pages/Competitions/routes";
import { nationalTeamroutes } from "./pages/NationalTeams/routes";
import { clubroutes } from "./pages/Clubs/routes";
import { matchRoutes } from "./pages/Matchs/routes";
import { cityRoutes } from "./pages/City/routes";
import { countryRoutes } from "./pages/Country/routes";
import { studiumRoutes } from "./pages/Studium/routes";
import { userProfileRoutes } from "./pages/UserProfiles/routes";
import { UserProvider } from "./context/UserContext";
import { DataProvider } from "./context/DataContext";

export default function App() {
  return (
    <UserProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              {competitionsroutes}
              {nationalTeamroutes}
              {clubroutes}
              {matchRoutes}
              {cityRoutes}
              {countryRoutes}
              {studiumRoutes}
              {userProfileRoutes}
            </Route>

            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

          </Routes>
        </Router>
      </DataProvider>
    </UserProvider>
  );
}
