import { Route } from "react-router";
import UserProfile from "./UserProfile";

export const userProfileRoutes = (
    <Route path="/profile" element={<UserProfile />} />
);
