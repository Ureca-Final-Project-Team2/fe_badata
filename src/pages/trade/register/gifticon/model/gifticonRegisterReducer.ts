import type { GifticonCategory } from '@/pages/trade/register/gifticon/lib/types';

export interface State {
  form: {
    price: string;
    comment: string;
  };
  ocrResult: {
    title: string;
    partner: string;
    gifticonNumber: string;
    deadLine: string;
  };
  category: GifticonCategory | undefined;
  imageFile: File | null;
  imagePreview: string | null;
  isSubmitting: boolean;
}

export type Action =
  | { type: 'CHANGE_FIELD'; field: keyof State['form']; value: string }
  | { type: 'SET_OCR_RESULT'; payload: Partial<State['ocrResult']> }
  | { type: 'SET_CATEGORY'; payload: GifticonCategory | undefined }
  | { type: 'SET_IMAGE_FILE'; payload: { file: File | null; preview: string | null } }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'RESET' }
  | { type: 'RESET_IMAGE' };

export const initialState: State = {
  form: {
    price: '',
    comment: '',
  },
  ocrResult: {
    title: '',
    partner: '',
    gifticonNumber: '',
    deadLine: '',
  },
  category: undefined,
  imageFile: null,
  imagePreview: null,
  isSubmitting: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };
    case 'SET_OCR_RESULT':
      return {
        ...state,
        ocrResult: { ...state.ocrResult, ...action.payload },
      };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_IMAGE_FILE':
      return {
        ...state,
        imageFile: action.payload.file,
        imagePreview: action.payload.preview,
      };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.value };
    case 'RESET':
      return initialState;
    case 'RESET_IMAGE':
      return {
        ...state,
        imageFile: null,
        imagePreview: null,
        ocrResult: {
          title: '',
          partner: '',
          gifticonNumber: '',
          deadLine: '',
        },
        category: undefined,
      };
    default:
      return state;
  }
}
