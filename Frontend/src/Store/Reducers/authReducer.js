const initialState = { authToken: '' }


function handleAuth(state = initialState, action) {
  let nextState
  switch (action.type) {

    case 'ADD_TOKEN':
        nextState = {
            authToken: action.value,
        }
        return nextState

    case 'REMOVE_TOKEN':
        nextState = {
            authToken: '',
        }
        return nextState
        
  default:
    return state
  }
}

export default handleAuth