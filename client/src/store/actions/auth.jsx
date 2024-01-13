import { setAlert } from './alert';
import api from '../../utils/api';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Register User
export const register = (formData) => async (dispatch) => {
    // console.log(formData);
    try {
        const res = await api.post('/auth/register', formData);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        // dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }   

        dispatch({
            type: REGISTER_FAIL
        });
    }
};