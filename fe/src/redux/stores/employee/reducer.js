import { INIT_STATE_USER_RESIDENT } from './states';
import produce from 'immer';

import { SAVE_LOADING, SAVE_ALL_USER } from './constants';

export default function userResidentReducers(
  state = INIT_STATE_USER_RESIDENT,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_USER:
        draft.dataUser = action.payload;
        break;
      default:
        return state;
    }
  });
}
