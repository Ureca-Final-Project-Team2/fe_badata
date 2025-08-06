import { useReducer } from 'react';

import { useRouter } from 'next/navigation';

import { initialState, reducer } from '@/features/trade/register/data/model/dataRegisterReducer';
import { usePostTradeDataMutation } from '@/features/trade/register/data/model/mutations';
import { MobileCarrierSelect } from '@/features/trade/register/data/ui/MobileCarrierSelect';
import { PATH } from '@/shared/config/path';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';
import { convertToMBInteger } from '@/shared/lib/convertToMBInteger';
import { toRawPrice } from '@/shared/lib/formatPrice';
import { makeToast } from '@/shared/lib/makeToast';
import { InputField } from '@/shared/ui/InputField';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { TextAreaField } from '@/shared/ui/TextAreaField';

export function TradeDataRegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate } = usePostTradeDataMutation();
  const { executeWithAuth } = useAuthRequiredRequest();
  const router = useRouter();

  const handleSubmit = async () => {
    const { title, deadLine, capacity, capacityUnit, price, comment } = state.form;
    if (!title || !deadLine || !capacity || !price) return;

    const capacityInMB = convertToMBInteger(capacity, capacityUnit);

    dispatch({ type: 'SET_SUBMITTING', value: true });

    const requestFn = () =>
      new Promise((resolve, reject) => {
        mutate(
          {
            title,
            mobileCarrier: state.form.mobileCarrier,
            deadLine,
            capacity: Number(capacity),
            price: toRawPrice(price),
            comment,
          },
          {
            onSuccess: (data) => {
              makeToast('게시물이 성공적으로 등록되었습니다!', 'success');
              router.push(`${PATH.TRADE.MAIN}`);
              resolve(data);
            },
            onError: (error) => {
              makeToast('게시물 등록에 실패했습니다.', 'warning');
              reject(error);
            },
            onSettled: () => dispatch({ type: 'SET_SUBMITTING', value: false }),
          },
        );
      });

    try {
      await executeWithAuth(
        requestFn,
        '/api/v1/trades/posts/data',
        {
          type: 'TRADE_POST',
          method: 'POST',
          data: {
            title,
            mobileCarrier: state.form.mobileCarrier,
            deadLine,
            capacity: capacityInMB,
            price: toRawPrice(price),
            comment,
          },
        },
        () => {
          // AuthModal이 닫힐 때 isSubmitting 상태 초기화
          dispatch({ type: 'SET_SUBMITTING', value: false });
        },
      );
    } catch (error) {
      // 에러는 이미 위에서 처리됨
      console.error('Data registration failed:', error);
    }
  };

  const isFormValid = !!(
    state.form.title &&
    state.form.deadLine &&
    state.form.capacity &&
    state.form.price
  );

  return (
    <form
      className="flex flex-col items-center gap-5 pt-6"
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
      />
      <MobileCarrierSelect
        value={state.form.mobileCarrier}
        onChange={(val) => dispatch({ type: 'CHANGE_FIELD', field: 'mobileCarrier', value: val })}
        required
      />
      <InputField
        label="만료일"
        isRequired
        type="date"
        value={state.form.deadLine}
        onChange={(e) =>
          dispatch({ type: 'CHANGE_FIELD', field: 'deadLine', value: e.target.value })
        }
        placeholder="만료일"
      />
      <div className="flex w-[380px] gap-1 overflow-hidden">
        <div className="w-2/3 overflow-hidden">
          <InputField
            label="데이터 용량"
            isRequired
            type="number"
            value={state.form.capacity}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_FIELD', field: 'capacity', value: e.target.value })
            }
            placeholder="용량"
            className="w-full"
          />
        </div>
        <div className="w-1/3 flex flex-col justify-end">
          <select
            className="w-full h-[45px] rounded-lg border border-[var(--gray-light)] px-3 py-2 font-caption-regular text-[var(--black)] bg-[var(--white)] focus:outline-none cursor-pointer"
            value={state.form.capacityUnit}
            onChange={(e) =>
              dispatch({ type: 'CHANGE_FIELD', field: 'capacityUnit', value: e.target.value })
            }
          >
            <option value="MB">MB</option>
            <option value="GB">GB</option>
          </select>
        </div>
      </div>
      <InputField
        label="판매 가격"
        isRequired
        variant="price"
        value={state.form.price}
        onChange={(e) => dispatch({ type: 'CHANGE_FIELD', field: 'price', value: e.target.value })}
        placeholder="판매 가격"
      />
      <TextAreaField
        value={state.form.comment}
        onChange={(e) =>
          dispatch({ type: 'CHANGE_FIELD', field: 'comment', value: e.target.value })
        }
        placeholder="설명 (선택)"
      />

      <RegisterButton
        type="submit"
        size="lg_thin"
        loading={state.isSubmitting}
        isFormValid={isFormValid}
        className="mb-6"
      >
        등록하기
      </RegisterButton>
    </form>
  );
}
