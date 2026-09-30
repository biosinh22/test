# Claude Docs ↔ Notion 동기화 절차

정기 동기화(매일 10:00 KST)와 수동 "동기화해줘" 모두 이 절차를 따른다. 아래 표의 **모든 짝**을 각각 같은 방식으로 동기화한다.

## 대상 (짝별)

Claude Docs 문서: https://claude.ai/code/artifact/fe866b38-7b85-4c83-b3e8-2fc0f85712e4 (doc `fe866b38-7b85-4c83-b3e8-2fc0f85712e4`)

| 짝 | Claude Docs 탭 | Notion 페이지 | 기준본 | 다이어그램 (Docs 위젯 → Notion SVG) |
| --- | --- | --- | --- | --- |
| 메인 | tab `bbcfd581-1e84` (body `5228e874-88cf`) | `3e943186-2b56-81c6-ba76-eddeece5f9c9` (Research › Sa Lab › OV Organoid 3D vs 2D Project) | `last_synced.md` | widget `37cd2776-3a93` → `ov_project_flow.svg` |
| 배경 공부 | tab `0e3c9de5-f8c4` (body `e9e6531e-90cb`) | `3e943186-2b56-810e-a791-e7c2e07aee1f` (메인 페이지의 하위 페이지) | `last_synced_background.md` | widget `3ca2ae68-6c75` → `ov_origin_subtypes.svg`, widget `84bf7350-4d6e` → `ov_tumor_types.svg`, widget `eb485d49-c114` → `ov_cell_lines.svg` (두 그림은 `scripts/make_overview_figures.py`로 위젯 코드와 SVG를 함께 생성) |

## 절차 (짝마다 반복)

1. 해당 짝의 기준본을 읽는다.
2. Claude Docs 탭을 `notion` 형식으로 export한다 (blob 생성 → Artifact `read`의 `path`로 내려받기). Notion 페이지를 fetch한다.
3. 비교 전에 무시할 차이:
   - 맨 위 "다른 쪽 사본" 링크 줄 (Docs의 `Notion: …` 인용, Notion의 `Claude Docs 원본: …` 콜아웃)
   - 다이어그램 자리 (Docs의 `[embedded content: …]`, Notion의 이미지)
   - 다른 탭/페이지로 가는 링크의 표기 차이 (Docs의 탭 mention, Notion의 page mention)
   - 표 속성(`header-column` 등), 빈 줄, 이스케이프(`\~`, `\>`), 따옴표 모양 같은 형식 차이
4. `##` 섹션 단위, 그 안의 블록 단위로 기준본과 비교한다.
   - **Docs만 바뀜** → 같은 수정을 Notion에 반영 (`update_content`로 바뀐 부분만 교체).
   - **Notion만 바뀜** → 같은 수정을 Docs에 반영 (`find` 교체 또는 해당 블록만 markdown으로 교체).
   - **양쪽이 똑같이 바뀜** → 할 일 없음.
   - **양쪽이 다르게 바뀜 (충돌)** → 어느 쪽도 덮어쓰지 않는다. 양쪽 해당 위치에 댓글을 달아 두 버전을 보여주고 어느 쪽으로 맞출지 묻는다. 아래 로그에도 적는다.
   - 삭제와 추가도 같은 규칙.
5. 다이어그램: Docs 위젯의 글자·구성이 짝의 SVG와 다르면 SVG를 위젯과 같게 다시 만들고, `notion-create-attachment`(content)로 올린 직후(업로드는 곧 만료됨) 새 이미지를 넣은 뒤 SVG 파일도 갱신한다. 기존 Notion 이미지는 서명 URL 때문에 `update_content`로 통째로 지울 수 없으니, 캡션을 "이전 버전 · 삭제해 주세요"로 바꿔 두고 로그에 적는다. Notion 쪽 이미지를 사용자가 바꾼 경우는 건드리지 않고 로그에 적는다.
6. 새 탭이나 새 하위 페이지가 한쪽에만 생겼으면 자동으로 만들지 말고 로그에 적어 사용자에게 알린다.
7. 동기화 외의 수정은 하지 않는다 (오타·문장 다듬기 금지). 문서의 "작업 로그" 표에도 쓰지 않는다.
8. 쓰기 직전에 대상 블록을 다시 읽는다. 사용자가 편집 중이라 내용이 바뀌었으면 그 블록은 이번 회차에 건너뛴다.
9. 변경을 적용한 짝은 Docs 탭을 다시 export해 기준본을 갱신하고, 아래 로그에 한 줄 추가한 뒤 커밋·푸시한다 (`sync: <요약>`). 바뀐 게 없으면 아무것도 커밋하지 않는다.

## 로그

최신이 위. 날짜 시각(KST) · 방향 · 내용.

| 시각 | 방향 | 내용 |
| --- | --- | --- |
| 2026-09-30 14:xx | Docs → Notion | 난소 종양 분류 위젯(사용자 수정 + 댓글 요청: 가운데 맞춤, Mucinous에 MCAS·RMUG-S, 프로젝트 세포주 굵게)을 SVG로 다시 만들어 Notion 이미지 추가. 이전 이미지(같은 캡션, 두 번째 것)는 캡션 변경이 안 돼 사용자 삭제 필요 |
| 2026-09-30 14:xx | 양쪽 동시 수정 | 배경 공부 탭에 그림 2개(난소 종양 분류, 세포주 8종 문헌 vs DepMap 아형) 추가, Notion에는 SVG 이미지로 같은 위치에 삽입. 메인 작업 로그 한 줄 추가. 기준본 갱신 |
| 2026-09-30 13:xx | 양방향 | Notion→Docs: "할 일" 제목을 "9/28-1002"로 바꾸고 굵은 안내 문단 삭제, Background Study 첫 문장, CCLE 사용법 A·B 제목, A-2의 "→ HEYA8: ACH-000542", 배경 공부 "공부 자료". Docs→Notion: 0단계 아형 항목 체크. 양쪽 동시: OVCAR-3 아형 HGSOC 확정. 충돌 없음. Notion 표의 OVCAR-3·RMG2 굵게는 서식 차이라 반영 안 함 |
| 2026-09-30 13:xx | 양쪽 동시 수정 | 사용자 요청으로 세포주 아형을 DepMap 기준으로 수정(메인·배경 공부 탭 모두). Docs와 Notion에 같은 수정을 넣고 기준본 2개에도 같은 수정만 반영. 출발 조직 다이어그램 SVG 교체(이전 Notion 이미지는 사용자 삭제 필요). 그 전에 쌓인 미동기화 차이는 그대로 남아 있음 → 다음 동기화 때 처리 |
| 2026-09-28 21:xx | 양방향 | Notion→Docs: 개요·1차 해석·빈 제목 정리·할 일 체크박스·"단계별 계획"·Background Study 수정. Docs→Notion: P0–P7 단계 표기를 "N단계"로 교체, 질문 체크·Organoid 답, 다이어그램 이미지 교체(이전 이미지는 사용자 삭제 필요) |
| 2026-09-28 17:xx | Docs → Notion | 배경 공부 탭을 Notion 하위 페이지로 복제, 메인 탭 수정(체크리스트 번호, 로그 문구, 탭 링크) 반영, 기준본 2개 갱신 |
| 2026-09-28 16:xx | Docs → Notion | 초기 복제, "세포주 8종 프로필" 제목 변경 반영, 기준본 생성 |
