import { useReducer } from 'react';

import { initialState, reducer } from '@/pages/trade/register/data/model/dataRegisterReducer';
import { usePostTradeDataMutation } from '@/pages/trade/register/data/model/mutations';
import { toRawPrice } from '@/shared/lib/formatPrice';
import { InputField } from '@/shared/ui/InputField';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { TextAreaField } from '@/shared/ui/TextAreaField';

export function TradeDataRegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate } = usePostTradeDataMutation();

  const handleSubmit = () => {
    const { title, deadLine, capacity, price, comment } = state.form;
    if (!title || !deadLine || !capacity || !price) return;

    dispatch({ type: 'SET_SUBMITTING', value: true });
    mutate(
      {
        title,
        mobileCarrier: 'UPLUS',
        deadLine,
        capacity: Number(capacity),
        price: toRawPrice(price),
        comment,
      },
      {
        onSettled: () => dispatch({ type: 'SET_SUBMITTING', value: false }),
      },
    );
  };

  const isFormValid = !!(
    state.form.title &&
    state.form.deadLine &&
    state.form.capacity &&
    state.form.price
  );

  return (
    <form
      className="flex flex-col items-center gap-4 pt-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <InputField
        label="데이터 상품명"
        isRequired
        value={state.form.title}
        onChange={(e) => dispatch({ type: 'CHANGE_FIELD', field: 'title', value: e.target.value })}
        placeholder="데이터 상품명"
        errorMessage="상품명을 입력해주세요."
      />
      <InputField label="통신사" value="UPLUS" readOnly variant="ocr" />

      <InputField
        label="만료일"
        isRequired
        type="date"
        value={state.form.deadLine}
        onChange={(e) =>
          dispatch({ type: 'CHANGE_FIELD', field: 'deadLine', value: e.target.value })
        }
        placeholder="만료일"
        errorMessage="만료일을 입력해주세요."
      />
      <InputField
        label="데이터 용량"
        isRequired
        type="number"
        value={state.form.capacity}
        onChange={(e) =>
          dispatch({ type: 'CHANGE_FIELD', field: 'capacity', value: e.target.value })
        }
        placeholder="용량 (MB)"
        errorMessage="용량을 입력해주세요."
      />
      <InputField
        label="판매 가격"
        isRequired
        variant="price"
        value={state.form.price}
        onChange={(e) => dispatch({ type: 'CHANGE_FIELD', field: 'price', value: e.target.value })}
        placeholder="판매 가격"
        errorMessage="가격을 입력해주세요."
      />
      <TextAreaField
        value={state.form.comment}
        onChange={(e) =>
          dispatch({ type: 'CHANGE_FIELD', field: 'comment', value: e.target.value })
        }
        placeholder="설명 (선택)"
      />

      <RegisterButton type="submit" loading={state.isSubmitting} isFormValid={isFormValid}>
        등록하기
      </RegisterButton>
    </form>
  );
}
