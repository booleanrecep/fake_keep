import {createStore,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import axios from "axios"

export const getInitialData= ()=>{
    return async (dispatch)=>{
        try{
            const notes =  await axios.get("/notes")
            dispatch({
                type:"GET_DATA",
                notes:notes.data
            })
        }catch(err){
            console.log(err)
        }
    }
}

export const  rootReducer=(state={notes:[]},action)=>{
    switch (action.type) {
        case "GET_DATA":
          
            
             state= {...action.notes}
             return state
            
    
        case "ADD_DATA":
            return {
                ...state,
                notes:state.notes.concat(action.note)
            }
           
        case "DELETE_DATA":
             return {
                ...state,
                notes:state.notes.filter(obj =>obj._id !== action.id)
            }
             
        default:
            console.log("noooo")
            return state;
    }
}

export const store = createStore(rootReducer,applyMiddleware(thunk))
store.dispatch(getInitialData())
window.store=store