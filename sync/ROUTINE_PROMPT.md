# 정기 동기화 루틴 설정값

claude.ai 루틴 화면에서 만들 때 아래 값을 그대로 쓴다.

- 이름: OV 프로젝트 Docs↔Notion 동기화
- 일정: 매일 10:00 (KST) — UTC cron `0 1 * * *`
- 실행 방식: 실행마다 새 세션
- 커넥터: Notion, Claude Docs (루틴 ID `trig_01L6fKs2Lm3d2UbRCGvTgtJj`, claude.ai에서 사용자가 생성)
- 저장소: biosinh22/test (브랜치 `claude/charming-brown-6kr33c`)
- 알림: 푸시

## 프롬프트

```
OV Organoid 3D vs 2D 프로젝트의 Claude Docs 문서와 Notion 페이지를 양방향 동기화하는 정기 작업이다. 사용자는 이 세션을 보고 있지 않으니 질문하지 말고 끝까지 진행한다. 답변·로그는 한국어.

1. GitHub 저장소 biosinh22/test의 브랜치 claude/charming-brown-6kr33c를 가져온다 (세션에 없으면 add_repo로 추가 후 clone). sync/SYNC.md가 전체 절차다. 그대로 따른다.
2. 대상
   - Claude Docs: https://claude.ai/code/artifact/fe866b38-7b85-4c83-b3e8-2fc0f85712e4 (tab bbcfd581-1e84, body 5228e874-88cf, 다이어그램 widget 37cd2776-3a93). docs 도구를 쓰기 전에 docs 스킬/guide를 먼저 읽는다.
   - Notion: page 3e943186-2b56-81c6-ba76-eddeece5f9c9 (Research › Sa Lab)
   - 기준본: sync/last_synced.md (마지막 동기화 때 Docs를 notion 형식으로 export한 것)
3. 핵심 규칙 (SYNC.md를 못 읽는 경우에도 지킨다)
   - 기준본 대비 한쪽만 바뀐 부분은 다른 쪽에 같은 내용으로 반영한다. 바뀐 부분만 최소로 고친다.
   - 양쪽이 서로 다르게 바뀐 부분은 덮어쓰지 않는다. 양쪽 해당 위치에 댓글로 두 버전을 보여주고 어느 쪽으로 맞출지 묻는다.
   - 맨 위 "다른 쪽 사본" 링크 줄, 다이어그램 자리(Docs 위젯 vs Notion 이미지), 표 속성·빈 줄·이스케이프 같은 형식 차이는 무시한다.
   - Docs 다이어그램 위젯의 내용이 sync/ov_project_flow.svg와 다르면 SVG를 다시 만들어 Notion 이미지를 교체하고 파일도 갱신한다.
   - 동기화 외의 수정(오타 수정, 문장 다듬기, 작업 로그 추가)은 하지 않는다.
   - 쓰기 직전에 대상 블록을 다시 읽고, 사용자가 편집 중이라 바뀌었으면 그 블록은 건너뛴다.
4. 변경을 적용했으면 Docs를 다시 export해 sync/last_synced.md를 갱신하고 SYNC.md 로그 표 맨 위에 한 줄(시각 KST · 방향 · 내용) 추가 후 커밋·푸시한다. 바뀐 게 없으면 커밋하지 않고 "변경 없음"으로 끝낸다.
5. 마지막 응답은 한두 줄 요약: 반영한 변경(방향별), 충돌 여부. 충돌이 있으면 첫 줄에 "충돌 있음"이라고 쓴다.
```
