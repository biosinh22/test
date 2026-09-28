# OV Organoid 3D vs 2D 프로젝트

난소암 세포주 8종(4개 아형: HGSOC OVCAR-3·OVSAHO / LGSOC HeyA8 / Endometrioid SKOV-3·A2780 / Clear cell OVTOKO·RMG1·RMG2)의 2D vs 3D(오가노이드) RNA-seq 비교 분석. 1차 ppt는 SKOV3, A2780, HeyA8, OVTOKO 4종만 포함. 목표: 3D의 생물학적·임상적 타당성 근거 + 세포주별 CCLE mutation과 연결된 치료 타겟(gene/pathway) 발굴.

## 프로젝트 문서 (진행 상황의 기준)

https://claude.ai/code/artifact/fe866b38-7b85-4c83-b3e8-2fc0f85712e4

- 새 세션을 시작하면 이 문서를 먼저 읽고(Claude Docs 도구로 read), "현재 상태와 지금 할 일" 섹션부터 이어서 진행한다.
- 작업을 마치면 문서의 체크리스트를 체크하고, "작업 로그" 표 맨 위에 날짜 · 한 일 · 다음 을 한 줄 추가한다.
- 답변은 한국어로.

## Notion 사본과 동기화

Notion: https://app.notion.com/p/3e9431862b5681c6ba76eddeece5f9c9 (Claude Docs와 같은 내용)

- 세션 시작 시 두 문서를 모두 읽고, 한쪽에만 있는 사용자 수정을 다른 쪽에 반영한 뒤 작업을 시작한다.
- 작업 중 한쪽을 고치면 같은 턴에 다른 쪽도 같은 내용으로 고친다.
- 같은 부분이 양쪽에서 다르게 고쳐져 있으면 임의로 고르지 말고 사용자에게 묻는다.
- 흐름 다이어그램은 Claude Docs에서는 위젯, Notion에서는 SVG 이미지다. 다이어그램이 바뀌면 SVG를 다시 만들어 Notion 이미지를 교체한다.

## 분석 범위와 샘플 설계

- 분석은 SKOV3, A2780(1차, BUM1001–1014), HeyA8, OVTOKO(2차 251112, ARPA1001–1018) 32개 샘플로 먼저 한다. 나머지 4종은 데이터 도착 미정이라 공부만 해 둔다.
- 샘플은 passage 시계열: 2D P0·P1·P3·P5(2차는 +P10), 3D P1·P3·P5(2차는 +P10). 생물학적 replicate 없음.
- 배치(1차/2차)가 세포주와 겹치므로 비교는 항상 세포주 안에서, 같은 passage끼리 짝지어 한다.
- 파이프라인은 세포주·passage를 하드코딩하지 않고 `samples.csv`만 바꾸면 나머지 4종에 재사용되게 만든다.

## 원자료

- `OV_3D_Data_ver2.pptx` (분석결과 2): Cohort, PCA, DEG(3D up 157 / 2D up 39), pathway enrichment, 세포주별 결과. 파일은 사용자 로컬에 있음.
