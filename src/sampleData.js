export const CATEGORIES = [
  { id: 'study',    name: '공부',    color: '#FF5252', lightBg: '#FFF0F0' },
  { id: 'work',     name: '업무',    color: '#5B8FF9', lightBg: '#EBF0FF' },
  { id: 'meeting',  name: '미팅',    color: '#F6A831', lightBg: '#FFF8EC' },
  { id: 'personal', name: '개인',    color: '#A78BFA', lightBg: '#F3EEFF' },
  { id: 'exercise', name: '운동',    color: '#34D399', lightBg: '#ECFDF5' },
  { id: 'hospital', name: '병원',    color: '#F472B6', lightBg: '#FDF2F8' },
  { id: 'school',   name: '학교',    color: '#38BDF8', lightBg: '#F0F9FF' },
  { id: 'lab',      name: '랩실',    color: '#818CF8', lightBg: '#EEF2FF' },
];

export const sampleEvents = [
  // Recurring study banner (entire month)
  { id: 'e-study-apr', title: '영어 공부 30분', startDate: '2026-04-01', endDate: '2026-04-30', isAllDay: true, categoryId: 'study', startTime: null, endTime: null },

  // Week 1 (Apr 1 – 4)
  { id: 'e01', title: '업계 뉴스 읽기', startDate: '2026-04-01', endDate: '2026-04-02', isAllDay: true, categoryId: 'work', startTime: null, endTime: null },
  { id: 'e02', title: '출장', startDate: '2026-04-02', endDate: '2026-04-03', isAllDay: true, categoryId: 'work', startTime: null, endTime: null },
  { id: 'e03', title: '상반기 목표 점검', startDate: '2026-04-02', endDate: '2026-04-02', isAllDay: false, categoryId: 'meeting', startTime: '10:00', endTime: '11:30' },
  { id: 'e04', title: '프로젝트 마감일', startDate: '2026-04-03', endDate: '2026-04-03', isAllDay: true, categoryId: 'work', startTime: null, endTime: null },
  { id: 'e05', title: '클라이언트 미팅', startDate: '2026-04-03', endDate: '2026-04-03', isAllDay: false, categoryId: 'meeting', startTime: '14:00', endTime: '15:30' },
  { id: 'e06', title: '주간 업무 보고', startDate: '2026-04-03', endDate: '2026-04-04', isAllDay: true, categoryId: 'work', startTime: null, endTime: null },
  { id: 'e07', title: '출근 준비', startDate: '2026-04-04', endDate: '2026-04-04', isAllDay: true, categoryId: 'personal', startTime: null, endTime: null },
  { id: 'e08', title: '워크숍', startDate: '2026-04-04', endDate: '2026-04-04', isAllDay: false, categoryId: 'work', startTime: '09:00', endTime: '17:00' },

  // Week 2 (Apr 5 – 11)
  { id: 'e09', title: '점심 약속', startDate: '2026-04-06', endDate: '2026-04-06', isAllDay: false, categoryId: 'personal', startTime: '12:00', endTime: '13:30' },
  { id: 'e10', title: '사내 교육 수강', startDate: '2026-04-07', endDate: '2026-04-07', isAllDay: false, categoryId: 'school', startTime: '10:00', endTime: '12:00' },
  { id: 'e11', title: '회의실 예약', startDate: '2026-04-07', endDate: '2026-04-07', isAllDay: false, categoryId: 'meeting', startTime: '14:00', endTime: '15:00' },
  { id: 'e12', title: '오래된 프로젝트 정리', startDate: '2026-04-06', endDate: '2026-04-07', isAllDay: true, categoryId: 'work', startTime: null, endTime: null },
  { id: 'e13', title: '연차 신청', startDate: '2026-04-07', endDate: '2026-04-07', isAllDay: true, categoryId: 'personal', startTime: null, endTime: null },
  { id: 'e14', title: '거래처 견적서', startDate: '2026-04-08', endDate: '2026-04-08', isAllDay: false, categoryId: 'work', startTime: '15:00', endTime: '16:30' },
  { id: 'e15', title: '분기 KPI 정리', startDate: '2026-04-09', endDate: '2026-04-09', isAllDay: false, categoryId: 'work', startTime: '14:00', endTime: '15:30' },
  { id: 'e16', title: '출장 경비 정산', startDate: '2026-04-10', endDate: '2026-04-10', isAllDay: false, categoryId: 'work', startTime: '10:00', endTime: '11:00' },
  { id: 'e17', title: '신입 온보딩', startDate: '2026-04-10', endDate: '2026-04-11', isAllDay: true, categoryId: 'work', startTime: null, endTime: null },

  // Week 3 (Apr 12 – 18)
  { id: 'e18', title: '인사평가 작성', startDate: '2026-04-13', endDate: '2026-04-13', isAllDay: false, categoryId: 'work', startTime: '09:00', endTime: '11:00' },
  { id: 'e19', title: '팀 회의록 작성', startDate: '2026-04-13', endDate: '2026-04-13', isAllDay: false, categoryId: 'meeting', startTime: '14:00', endTime: '15:00' },
  { id: 'e20', title: '월간 실적 분석', startDate: '2026-04-15', endDate: '2026-04-15', isAllDay: false, categoryId: 'work', startTime: '10:00', endTime: '12:00' },
  { id: 'e21', title: '상반기 목표 점검', startDate: '2026-04-15', endDate: '2026-04-15', isAllDay: true, categoryId: 'meeting', startTime: null, endTime: null },
  { id: 'e22', title: '고객 피드백 정리', startDate: '2026-04-16', endDate: '2026-04-16', isAllDay: false, categoryId: 'work', startTime: '14:00', endTime: '15:30' },
  { id: 'e23', title: '협업 도구 정리', startDate: '2026-04-16', endDate: '2026-04-16', isAllDay: true, categoryId: 'work', startTime: null, endTime: null },
  { id: 'e24', title: '자격증 시험', startDate: '2026-04-18', endDate: '2026-04-18', isAllDay: false, categoryId: 'study', startTime: '09:00', endTime: '12:00' },

  // Week 4 (Apr 19 – 25)
  { id: 'e25', title: '헬스장 운동', startDate: '2026-04-19', endDate: '2026-04-19', isAllDay: false, categoryId: 'exercise', startTime: '07:00', endTime: '08:30' },
  { id: 'e26', title: '업무 메일 회신', startDate: '2026-04-20', endDate: '2026-04-20', isAllDay: false, categoryId: 'work', startTime: '09:00', endTime: '10:00' },
  { id: 'e27', title: '팀 워크숍 기획', startDate: '2026-04-21', endDate: '2026-04-21', isAllDay: false, categoryId: 'work', startTime: '14:00', endTime: '16:00' },
  { id: 'e28', title: '고객 피드백 분석', startDate: '2026-04-19', endDate: '2026-04-20', isAllDay: true, categoryId: 'work', startTime: null, endTime: null },
  { id: 'e29', title: '사내 교육 수강', startDate: '2026-04-23', endDate: '2026-04-23', isAllDay: false, categoryId: 'school', startTime: '10:00', endTime: '12:00' },
  { id: 'e30', title: '분기 KPI 정리', startDate: '2026-04-24', endDate: '2026-04-24', isAllDay: false, categoryId: 'work', startTime: '14:00', endTime: '15:30' },
  { id: 'e31', title: '프로젝트 일정 업데이트', startDate: '2026-04-23', endDate: '2026-04-23', isAllDay: true, categoryId: 'work', startTime: null, endTime: null },

  // Week 5 (Apr 26 – 30)
  { id: 'e32', title: '프레젠테이션 준비', startDate: '2026-04-27', endDate: '2026-04-27', isAllDay: false, categoryId: 'work', startTime: '09:00', endTime: '11:00' },
  { id: 'e33', title: '주간 업무 보고서', startDate: '2026-04-27', endDate: '2026-04-27', isAllDay: false, categoryId: 'work', startTime: '14:00', endTime: '15:00' },
  { id: 'e34', title: '1:1 미팅', startDate: '2026-04-29', endDate: '2026-04-29', isAllDay: false, categoryId: 'meeting', startTime: '11:00', endTime: '12:00' },
  { id: 'e35', title: '팀 회의록 작성', startDate: '2026-04-29', endDate: '2026-04-29', isAllDay: true, categoryId: 'meeting', startTime: null, endTime: null },
  { id: 'e36', title: '회의실 예약', startDate: '2026-04-30', endDate: '2026-04-30', isAllDay: false, categoryId: 'meeting', startTime: '14:00', endTime: '15:00' },

  // Some March events for context
  { id: 'e37', title: '이력서 업데이트', startDate: '2026-03-29', endDate: '2026-03-29', isAllDay: false, categoryId: 'personal', startTime: '10:00', endTime: '12:00' },
  { id: 'e38', title: '팀 스탠드업', startDate: '2026-03-30', endDate: '2026-03-30', isAllDay: false, categoryId: 'meeting', startTime: '09:30', endTime: '10:00' },
];

export const sampleTodos = [
  { id: 't01', title: '프로젝트 마감일', categoryId: 'work',     completed: false, dueDate: '2026-04-03' },
  { id: 't02', title: '사내 교육 수강',   categoryId: 'school',   completed: false, dueDate: '2026-04-07' },
  { id: 't03', title: '프로젝트 일정 업데이트', categoryId: 'work', completed: false, dueDate: null },
  { id: 't04', title: '팀 회의록 작성',   categoryId: 'meeting',  completed: false, dueDate: null },
  { id: 't05', title: '프레젠테이션 준비', categoryId: 'work',     completed: false, dueDate: '2026-04-27' },
  { id: 't06', title: '사내 교육 수강',   categoryId: 'school',   completed: true,  dueDate: null },
  { id: 't07', title: '업계 뉴스 읽기',   categoryId: 'study',    completed: false, dueDate: null },
  { id: 't08', title: '팀 회의록 작성',   categoryId: 'meeting',  completed: false, dueDate: null },
  { id: 't09', title: '회의실 예약',      categoryId: 'meeting',  completed: false, dueDate: '2026-04-07' },
  { id: 't10', title: '월간 실적 분석',   categoryId: 'work',     completed: false, dueDate: '2026-04-15' },
  { id: 't11', title: '분기 KPI 정리',    categoryId: 'work',     completed: true,  dueDate: null },
  { id: 't12', title: '1:1 미팅',         categoryId: 'meeting',  completed: false, dueDate: '2026-04-29' },
  { id: 't13', title: '팀 워크숍 기획',   categoryId: 'work',     completed: false, dueDate: null },
  { id: 't14', title: '주간 업무 보고서', categoryId: 'work',     completed: false, dueDate: null },
  { id: 't15', title: '고객 피드백 분석', categoryId: 'work',     completed: false, dueDate: null },
  { id: 't16', title: '거래처 견적서 발송', categoryId: 'work',   completed: false, dueDate: null },
  { id: 't17', title: '인사평가 작성',    categoryId: 'work',     completed: false, dueDate: '2026-04-13' },
  { id: 't18', title: '헬스장 등록',      categoryId: 'exercise', completed: true,  dueDate: null },
];
