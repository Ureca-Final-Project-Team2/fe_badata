// import { END_POINTS } from '@constants/api';
// import { axiosInstance } from '@lib/axios/axiosInstance';
// import { SosHistory } from '../model/sosHistory';


// export const getSosHistory = async (): Promise<SosHistory[]> => {
  //   const response = await axiosInstance.get<{ sosHistory: { createdAt: string }[] }>(
    //     END_POINTS.MYPAGE.SOS_HISTORY,
    //   );
    
    // createdAt만 받고, 나머지는 mock 처리
    // 2차 스프린트 후 다시 API 연동할 예정
    //   return response.data.sosHistory.map((item, index) => ({
      //     createdAt: item.createdAt,
      //     merchantName: '제휴사',
      //     menuName: '쇼콜라 바닐라 프레첸토',
      //     price: 10000,
      //     imageUrl: 'https://via.placeholder.com/80x80.png?text=Image',
      //   }));
      // };
      
      
import { END_POINTS } from "@/shared/constants/api";
import { axiosInstance } from "@/shared/lib/axios/axiosInstance";
import { SosHistory } from "../model/sosHistory";
      
export const getSosHistory = async (): Promise<SosHistory[]> => {
  try {
    const response = await axiosInstance.get<{ sosHistory: { createdAt: string }[] }>(
      END_POINTS.MYPAGE.SOS_HISTORY,
    );

    return response.data.sosHistory.map((item) => ({
      createdAt: item.createdAt,
      merchantName: '제휴사',
      menuName: '쇼콜라 바닐라 프레첸토',
      price: 10000,
      imageUrl: 'https://via.placeholder.com/80x80.png?text=Image',
    }));
  } catch (error) {
    console.error('[🚨 getSosHistory Error]', error);
    throw error;
  }
};

