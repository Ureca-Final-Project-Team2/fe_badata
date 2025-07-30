// 'use client';

// import { useState } from 'react';

// import { toast } from 'sonner';

// import { showSosToast } from '@/widgets/sos/ui/SosTestPage';

// export function SosTestPage() {
//   const [testCount, setTestCount] = useState(0);

//   // 단일 토스트 테스트
//   const testSingleToast = () => {
//     const mockNotification = {
//       type: 'SOS_REQUEST' as const,
//       sosId: Math.floor(Math.random() * 1000) + 1,
//       requesterName: '김철수',
//       requesterId: 888,
//       timestamp: new Date().toISOString(),
//     };
    
//     showSosToast(mockNotification);
//     setTestCount(prev => prev + 1);
//   };

//   // 여러 토스트 동시 테스트
//   const testMultipleToasts = () => {
//     const users = ['김철수', '박영희', '이민수', '최지영', '정현우'];
    
//     users.forEach((user, index) => {
//       setTimeout(() => {
//         const mockNotification = {
//           type: 'SOS_REQUEST' as const,
//           sosId: Math.floor(Math.random() * 1000) + 1,
//           requesterName: user,
//           requesterId: 800 + index,
//           timestamp: new Date().toISOString(),
//         };
        
//         showSosToast(mockNotification);
//       }, index * 1000); // 1초씩 간격으로 토스트 표시
//     });
//   };

//   // 데이터 기부 토스트 테스트
//   const testDonationToast = () => {
//     const mockDonationNotification = {
//       type: 'DATA_DONATION' as const,
//       sosId: Math.floor(Math.random() * 1000) + 1,
//       donorName: '박영희',
//       donorId: 777,
//       donatedAmount: 100,
//       message: '100MB 데이터를 기부했습니다.',
//       timestamp: new Date().toISOString(),
//     };
    
//     toast.success(`${mockDonationNotification.donorName}님이 100MB 데이터를 기부했습니다!`, {
//       duration: 5000,
//       position: 'top-center',
//     });
//   };

//   // 일반 토스트 테스트
//   const testRegularToast = () => {
//     toast.info('일반 토스트 알림 테스트입니다!', {
//       duration: 3000,
//       position: 'top-center',
//     });
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto space-y-6">
//       <div className="text-center">
//         <h1 className="text-2xl font-bold text-black mb-2">SOS 토스트 테스트</h1>
//         <p className="text-gray-600">실시간 토스트 알림을 테스트해보세요</p>
//         <p className="text-sm text-gray-500 mt-2">
//           테스트 횟수: {testCount}회
//         </p>
//       </div>

//       <div className="space-y-3">
//         <button
//           onClick={testSingleToast}
//           className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-body-medium"
//         >
//           🧪 단일 SOS 토스트 테스트
//         </button>
        
//         <button
//           onClick={testMultipleToasts}
//           className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-body-medium"
//         >
//           🧪 여러 SOS 토스트 동시 테스트 (5초 간격)
//         </button>
        
//         <button
//           onClick={testDonationToast}
//           className="w-full py-3 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-body-medium"
//         >
//           🧪 데이터 기부 토스트 테스트
//         </button>
        
//         <button
//           onClick={testRegularToast}
//           className="w-full py-3 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-body-medium"
//         >
//           🧪 일반 토스트 테스트
//         </button>
//       </div>

//       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//         <h3 className="font-semibold text-yellow-800 mb-2">테스트 방법</h3>
//         <ul className="text-sm text-yellow-700 space-y-1">
//           <li>• 이 페이지를 여러 브라우저 탭에서 열어보세요</li>
//           <li>• 각 탭에서 버튼을 클릭하여 토스트가 나타나는지 확인</li>
//           <li>• 실제 WebSocket 서버가 있으면 모든 탭에 동시에 알림이 갑니다</li>
//           <li>• 개발 환경에서는 시뮬레이션으로만 테스트 가능합니다</li>
//         </ul>
//       </div>
//     </div>
//   );
// } 