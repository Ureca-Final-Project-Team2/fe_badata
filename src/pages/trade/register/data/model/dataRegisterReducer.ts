export interface State {
  form: {
    title: string;
    deadLine: string;
    capacity: string;
    price: string;
    comment: string;
  };
  isSubmitting: boolean;
}

export type Action =
  | { type: 'CHANGE_FIELD'; field: keyof State['form']; value: string }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'RESET' };

export const initialState: State = {
  form: {
    title: '',
    deadLine: '',
    capacity: '',
    price: '',
    comment: '',
  },
  isSubmitting: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
