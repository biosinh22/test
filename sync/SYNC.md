# Claude Docs ↔ Notion 동기화 절차

정기 동기화(매일 10:00 KST)와 수동 "동기화해줘" 모두 이 절차를 따른다.

## 대상

| 이름 | 위치 |
| --- | --- |
| Claude Docs | https://claude.ai/code/artifact/fe866b38-7b85-4c83-b3e8-2fc0f85712e4 (doc `fe866b38-7b85-4c83-b3e8-2fc0f85712e4`, tab `bbcfd581-1e84`, body `5228e874-88cf`, 흐름 다이어그램 widget `37cd2776-3a93`) |
| Notion | https://app.notion.com/p/3e9431862b5681c6ba76eddeece5f9c9 (page `3e943186-2b56-81c6-ba76-eddeece5f9c9`, Research › Sa Lab) |
| 기준본 (마지막 동기화 상태) | 이 폴더의 `last_synced.md` (Claude Docs를 `notion` 형식으로 export한 것) |
| Notion 다이어그램 원본 | 이 폴더의 `ov_project_flow.svg` |

## 절차

1. `last_synced.md`(기준본)를 읽는다.
2. Claude Docs 탭을 `notion` 형식으로 export한다 (blob 생성 → Artifact `read`의 `path`로 내려받기). Notion 페이지를 fetch한다.
3. 비교 전에 무시할 차이:
   - 맨 위 "다른 쪽 사본" 링크 줄 (Docs의 `Notion 사본: …` 인용, Notion의 `Claude Docs 원본: …` 콜아웃)
   - 흐름 다이어그램 자리 (Docs의 `[embedded content: …]`, Notion의 이미지)
   - 표 속성(`header-column` 등), 빈 줄, 이스케이프(`\~`, `\>`), 따옴표 모양 같은 형식 차이
4. `##` 섹션 단위, 그 안의 블록 단위로 기준본과 비교한다.
   - **Docs만 바뀜** → 같은 수정을 Notion에 반영 (`update_content`로 바뀐 부분만 교체).
   - **Notion만 바뀜** → 같은 수정을 Docs에 반영 (`find` 교체 또는 해당 블록만 markdown으로 교체).
   - **양쪽이 똑같이 바뀜** → 할 일 없음.
   - **양쪽이 다르게 바뀜 (충돌)** → 어느 쪽도 덮어쓰지 않는다. 양쪽 해당 위치에 댓글을 달아 두 버전을 보여주고 어느 쪽으로 맞출지 묻는다. 아래 로그에도 적는다.
   - 삭제와 추가도 같은 규칙.
5. 다이어그램: Docs 위젯(`37cd2776-3a93`)의 글자·구성이 `ov_project_flow.svg`와 다르면 SVG를 위젯과 같게 다시 만들고, `notion-create-attachment`(content)로 올려 Notion 이미지를 교체한 뒤 `ov_project_flow.svg`도 갱신한다. Notion 쪽 이미지를 사용자가 바꾼 경우는 건드리지 않고 로그에 적는다.
6. 동기화 외의 수정은 하지 않는다 (오타·문장 다듬기 금지). 문서의 "작업 로그" 표에도 쓰지 않는다.
7. 쓰기 직전에 대상 블록을 다시 읽는다. 사용자가 편집 중이라 내용이 바뀌었으면 그 블록은 이번 회차에 건너뛴다.
8. 변경을 적용했으면 Docs를 다시 export해 `last_synced.md`를 갱신하고, 아래 로그에 한 줄 추가한 뒤 커밋·푸시한다 (`sync: <요약>`). 바뀐 게 없으면 아무것도 커밋하지 않는다.

## 로그

최신이 위. 날짜 시각(KST) · 방향 · 내용.

| 시각 | 방향 | 내용 |
| --- | --- | --- |
| 2026-09-28 16:xx | Docs → Notion | 초기 복제, "세포주 8종 프로필" 제목 변경 반영, 기준본 생성 |
