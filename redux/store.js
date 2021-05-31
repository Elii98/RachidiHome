import { createStore } from "redux"
import reducer from "./reducer"
const redStore = createStore(reducer)
export default redStore
