
import reducer from './reducer';
import * as actionTypes from './actionTypes';

describe('Auth reducer', () => {
    it('return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
          }, {})
    })

    it('should store token after login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
          }, {
              type: actionTypes.AUTH_SUCCESS,
              token: 'some-token',
              userId: 'some-user-id'
          })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
          })
    })
})