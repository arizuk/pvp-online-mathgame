import { createGlobalState } from "react-hooks-global-state"

// TODO: impl
interface SessionState {}

const initialState: SessionState = {}
const { useGlobalState, setGlobalState } = createGlobalState(initialState)
