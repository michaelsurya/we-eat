import { RESET_ERRORS } from "./type";

export const resetError = () => dispatch => {
    dispatch({
        type: RESET_ERRORS,
        payload: {}
    })
}