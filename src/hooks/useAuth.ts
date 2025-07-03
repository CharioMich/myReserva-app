
import {AuthContext} from "../context/AuthContext.ts";
import {useContext} from "react";

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within useAuth");
  return ctx;
}