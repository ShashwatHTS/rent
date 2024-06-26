import { atom, useRecoilState } from "recoil";

const AuthState = atom({
  key: "AuthState",
  default: { loggedIn: false, token: "" }
})

export const useAuthState = () => useRecoilState(AuthState)

const TodoState = atom({
  key: "TodoState",
  default: []
})

export const useTodoState = () => useRecoilState(TodoState)