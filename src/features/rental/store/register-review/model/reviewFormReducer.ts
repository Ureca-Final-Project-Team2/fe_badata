import type { ReviewFormState } from '@/features/rental/store/register-review/lib/types';

type ReviewFormAction =
  | { type: 'SET_RATING'; payload: number }
  | { type: 'TOGGLE_QUICK_REPLY'; payload: number }
  | { type: 'SET_COMMENT'; payload: string }
  | { type: 'SET_IMAGE'; payload: File | undefined }
  | { type: 'RESET' };

export const initialState: ReviewFormState = {
  rating: 0,
  selectedQuickReplies: [],
  comment: '',
  image: undefined,
};

export const reviewFormReducer = (
  state: ReviewFormState,
  action: ReviewFormAction,
): ReviewFormState => {
  switch (action.type) {
    case 'SET_RATING':
      return {
        ...state,
        rating: action.payload,
      };
    case 'TOGGLE_QUICK_REPLY': {
      const quickReplyId = action.payload;
      const isSelected = state.selectedQuickReplies.includes(quickReplyId);
      return {
        ...state,
        selectedQuickReplies: isSelected
          ? state.selectedQuickReplies.filter((id) => id !== quickReplyId)
          : [...state.selectedQuickReplies, quickReplyId],
      };
    }
    case 'SET_COMMENT':
      return {
        ...state,
        comment: action.payload,
      };
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
