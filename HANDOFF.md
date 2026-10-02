# OV Organoid 3D vs 2D 프로젝트 — 인계 문서

다른 계정이나 새 대화의 Claude가 이 프로젝트를 바로 이어받기 위한 요약이다. 마지막 정리: 2026-10-02.
맨 아래 **"새 대화 시작 프롬프트"**를 그대로 붙여 넣으면 된다.

---

## 1. 프로젝트 한 줄

난소암 세포주를 2D와 3D(오가노이드)로 키워 RNA-seq을 비교하고, (1) 3D가 2D보다 생물학적·임상적으로 타당하다는 근거와 (2) 세포주별 CCLE(DepMap) 변이와 연결되는 치료 타겟(gene/pathway)을 찾는다.

- 사용자: shinhee (Sa Lab). 답변은 **한국어**.
- 원자료 ppt: `OV_3D_Data_ver2.pptx` (분석결과 2). Cohort, PCA, DEG(3D up 157 / 2D up 39), pathway enrichment(glycolysis, hypoxia, ECM 상위), 세포주별 PCA·dendrogram·heatmap. 사용자 로컬에만 있음.

## 2. 어디에 무엇이 있나

| 곳 | 주소 / 경로 | 비고 |
| --- | --- | --- |
| 프로젝트 문서 (기준) | Claude Docs `https://claude.ai/code/artifact/fe866b38-7b85-4c83-b3e8-2fc0f85712e4` | 메인 탭 `bbcfd581-1e84`(본문 `5228e874-88cf`), 배경 공부 탭 `0e3c9de5-f8c4`(본문 `e9e6531e-90cb`) |
| Notion 사본 | 메인 `https://app.notion.com/p/3e9431862b5681c6ba76eddeece5f9c9` (Research › Sa Lab), 배경 공부 하위 페이지 `https://app.notion.com/p/3e9431862b56810ea791e7c2e07aee1f` | 사용자는 주로 Notion에서 고친다 |
| GitHub | `biosinh22/test`, 브랜치 `claude/charming-brown-6kr33c` | 아래 파일들 |
| 서버 | `ksh3@10.7.2.42` (salabserver2), 도커 `ksh3_con2` (`docker exec -it --user ksh3 ksh3_con2 /bin/bash`) | 서버 본체 `/data` = 컨테이너 `/data`. 데이터 위치 `/data/ksh3/ov/` |

**다른 계정에서 쓸 때:** Claude Docs 문서는 기본 비공개라 원래 계정에서 공유해야 보인다. Notion은 워크스페이스 권한, GitHub은 저장소 권한이 필요하다. 접근이 안 되면 이 문서와 저장소 파일만으로도 내용은 이어갈 수 있다.

### 저장소 파일

| 파일 | 내용 |
| --- | --- |
| `CLAUDE.md` | 프로젝트 규칙 (세션 시작 시 자동으로 읽힘) |
| `sync/SYNC.md` | Docs ↔ Notion 양방향 동기화 절차와 로그 |
| `sync/ROUTINE_PROMPT.md` | 매일 10:00 KST 정기 동기화 루틴 설정·프롬프트 |
| `sync/last_synced*.md` | 동기화 기준본 (마지막으로 맞춘 Docs export) |
| `sync/*.svg` | Docs 위젯의 Notion용 SVG 사본 |
| `figures/` | 슬라이드용 그림 SVG·PNG (난소 종양 분류, 세포주 8종, 파이프라인) |
| `scripts/filter_mutations.py` | DepMap mutation CSV에서 driver·hotspot·LoF만 추리기 |
| `scripts/make_overview_figures.py` | 그림 위젯 코드 + SVG 생성. **사용자가 문서에서 그림 글자를 고쳤으면 다시 생성하지 말 것** (덮어씀). 이름을 골라 실행 가능 |
| `scripts/upload_raw_data.sh` | 외장하드 원자료 → 서버 rsync 업로드 |
| `data/depmap/` | SKOV3, RMG-I DepMap mutation CSV |
| `results/mutations_filtered.csv` | 위 두 세포주 필터 결과 |

## 3. 세포주와 샘플

### 세포주 8종 (아형은 DepMap Oncotree Subtype 기준)

| 세포주 | 학계 분류 | DepMap 아형 | DepMap 이름 · ID | 주요 변이 | 분석 |
| --- | --- | --- | --- | --- | --- |
| OVCAR-3 | HGSOC | HGSOC | **NIHOVCAR3** · ACH-000001 | TP53 R248Q, CCNE1 증폭 (확인 필요) | 데이터 대기 |
| OVSAHO | HGSOC | HGSOC | OVSAHO · ACH-000409 | TP53, RB1 결손 | 데이터 대기 |
| HeyA8 | **LGSOC 유사** | **HGSOC** | HEYA8 · ACH-000542 | KRAS G12D, BRAF G464E, TP53 wild-type | 분석 중 |
| SKOV-3 | **CCOC/ENOC 유사** | **SOC** (장액성, 등급 미표기) | SKOV3 · ACH-000811 | PIK3CA H1047R, ARID1A Q586\*, TP53 S90Pfs\*33 (null) — DepMap 확인. ERBB2 증폭·CDKN2A 결손은 CN 확인 필요 | 분석 중 |
| A2780 | Endometrioid | EOV | A2780 · ACH-000657 | ARID1A, PIK3CA, PTEN, MMR 결핍, TP53 wild-type (확인 필요) | 분석 중 |
| OVTOKO | Clear cell | CCOV | OVTOKO · ACH-000663 | ARID1A | 분석 중 |
| RMG-I | Clear cell | CCOV | RMGI · ACH-000719 | TERT promoter, FANCL W57\*, ARID1A·PIK3CA wild-type — DepMap 확인 | 데이터 대기 |
| RMG-II | Clear cell | **DepMap 미등록** | — | MLH1 | 데이터 대기 |

- **DepMap 아형과 학계 분류가 다른 이유:** DepMap 표기는 세포주 수립 당시의 병리 진단을 현재 분류 체계로 옮긴 것이다. HeyA8은 TP53 wild-type에 KRAS·BRAF 변이가 있어 LGSOC 유사로 본다. 단, KRAS·BRAF가 함께 있는 건 전형적인 LGSOC가 아니다. SKOV-3는 ARID1A·PIK3CA 동시 변이가 있어 CCOC/ENOC 유사로 본다. 둘 다 학계에 확정된 합의는 없다.
- **해석 원칙:** 아형 이름보다 각 세포주의 실제 driver 변이를 기준으로 해석한다.
- **용어 결정 대기:** 표의 "문헌 아형"을 "학계 분류"로, "DepMap 아형"을 "DepMap 등록 분류"로 바꾸는 안을 제안해 두었다. 사용자가 확정하지 않았다.

### 샘플 설계 (32개, 생물학적 replicate 없음)

| 차수 | 세포주 | 샘플 ID | 2D passage | 3D passage |
| --- | --- | --- | --- | --- |
| 1차 | SKOV3 | BUM1001–1007 | P0, P1, P3, P5 | P1, P3, P5 |
| 1차 | A2780 | BUM1008–1014 | P0, P1, P3, P5 | P1, P3, P5 |
| 2차 (251112) | HeyA8 | ARPA1001–1009 | P0, P1, P3, P5, P10 | P1, P3, P5, P10 |
| 2차 (251112) | OVTOKO | ARPA1010–1018 | P0, P1, P3, P5, P10 | P1, P3, P5, P10 |

- 배치(1차/2차)가 세포주와 겹친다. 그래서 **비교는 항상 세포주 안에서, 같은 passage끼리** 한다.
- P0은 2D에만 있어 baseline으로 쓴다. P10은 2차에만 있다.
- ppt 관찰: SKOV3는 2D/3D가 뚜렷하게 갈린다. A2780은 거의 안 갈리고 3D P1이 튄다. HeyA8·OVTOKO는 3D가 안정적이고 2D는 passage에 따라 흘러간다(OVTOKO 3D P5가 튐).

## 4. 분석 계획

### 단계 (문서 "단계별 계획")
0. 배경 공부
1. CCLE mutation
2. RNA 재점검
3. 세포주별 pathway
4. 교차 분석 (mutation × 3D 변화)
5. 타겟 선정
6. 스토리 정리
7. 검증 제안 (선택)

1단계(mutation)와 2·3단계(RNA)는 동시에 진행하고, 4단계에서 만난다.
**"P0–P7 Phase" 같은 표기는 쓰지 않는다.** passage(P0, P1…)와 헷갈려서 사용자가 금지했다.

### RNA-seq 파이프라인 (R / DESeq2, 문서 Analysis Pipeline + 모식도)
1. Data 정리: count matrix + samples.csv
2. QC: vst → PCA
3. 세포주별 DEG: `~ passage + dimension`, P0 제외
4. 통합 DEG: `~ cell_line + dimension`, P1·P3·P5만. ppt 157/39와 비교
5. passage 경향: 3D−2D log2FC 추세, 보조로 LRT `~ passage × dimension` → 유지형 / 증가형 / 일시형
6. GSEA: fgsea·clusterProfiler + msigdbr (Hallmark·KEGG·Reactome·GO BP)
7. 공통 / 특이 분리 → 교차 분석

**재사용 규칙:** 세포주·passage를 코드에 박지 않는다. 나머지 4종은 `samples.csv`에 행만 추가하면 같은 스크립트가 돌아가야 한다.

## 5. 지금 상태와 다음 할 일

**끝난 것**
- 프로젝트 문서와 Notion 사본 구성, 양방향 동기화 체계
- 배경 공부(난소암 개요, 세포주 8종 상세)
- DepMap 기준 아형 정리
- SKOV3·RMG-I 변이 필터
- 그림 3개(난소 종양 분류, 세포주 8종 비교, 파이프라인 모식도)
- 원자료 업로드 스크립트

**다음**
1. **원자료 업로드:** 외장하드 `/Volumes/SAMSUNG/2.난소암(세포주)` (339 GB) → 서버 `/data/ksh3/ov/`. 시험 실행(dry run)까지 성공했다. 실제 전송은 Mac 터미널에서 tmux 안에 아래 명령을 실행하면 된다.
   ```
   caffeinate -is /opt/homebrew/bin/rsync -rtvhP --iconv=utf-8-mac,utf-8 --exclude='._*' --exclude='.DS_Store' --log-file="$HOME/rsync_ov.log" "/Volumes/SAMSUNG/2.난소암(세포주)" ksh3@10.7.2.42:/data/ksh3/ov/
   ```
   - Mac 기본 `/usr/bin/rsync`는 `--iconv`를 몰라서 brew rsync를 전체 경로로 부른다.
   - zsh에 붙여 넣을 때 `#` 주석 줄은 빼야 한다.
   - 서버 `/data` 여유 공간은 7.6 TB(사용률 92%)다.
2. 업로드 후 폴더 내용을 확인한다(FASTQ인지 count matrix인지). 파이프라인 입력에 맞춰 1단계 Data 정리를 시작한다.
3. PI께 파이프라인 확인을 받는다. 확인할 거리: P0 처리, P10 처리, replicate 없음, GSEA DB와 cutoff. 단, **이 질문들은 그림에는 넣지 않는다** (사용자 요청).
4. 나머지 세포주 DepMap mutation CSV를 받아 8종 표를 채운다. OVCAR-3 TP53 R248Q와 A2780 변이 목록을 DepMap으로 확인한다. SKOV-3 CN(ERBB2, CDKN2A)도 확인한다.
5. 정기 동기화는 2026-10-02부터 루틴 `trig_01Rq8d6FGFBWZZuyBxFQJGPX`(매주 금요일 09:52 KST)가 Claude Code 대화창 `session_01A7ib3VZK7j2jp9Pem35jhT`로 요청을 보내는 방식이다. Claude Docs 도구는 사용자 커넥터 목록에 없고 Claude Code 대화창에만 붙어서, 예전 새 세션 방식 루틴(`trig_01L6fKs2Lm3d2UbRCGvTgtJj`)으로는 동기화가 안 됐다. 이전 루틴은 사용자가 끈다. 새 대화창으로 옮기면 그 대화창에서 같은 방식(대화창 지정 루틴)으로 다시 만든다. 자세한 내용은 `sync/ROUTINE_PROMPT.md`.

## 6. 작업 규칙 (사용자 선호)

- **답변은 한국어.** 결론부터 짧게, 표를 적극적으로.
- **문서가 기준이다.** 작업을 마치면 문서 체크리스트를 체크하고 "작업 로그" 표 맨 위에 `날짜 | 한 일 | 다음` 한 줄을 추가한다. Notion에도 같은 내용을 넣는다.
- **Docs와 Notion은 늘 같게.** 한쪽을 고치면 같은 턴에 다른 쪽도 고친다. 양쪽이 다르게 고쳐져 있으면 임의로 고르지 말고 묻는다. 절차는 `sync/SYNC.md`를 따른다. 기준본을 Docs export로 통째로 갱신하면 미동기화된 사용자 수정이 묻히니, 내 수정만 기준본에 같은 방식으로 반영한다.
- **그림:** Docs에서는 위젯(글자를 문서에서 바로 고칠 수 있음), Notion에서는 SVG 이미지다.
  - 위젯이 바뀌면 SVG를 다시 만들어 Notion 이미지를 새로 넣는다. 업로드 직후 바로 넣어야 한다(곧 만료됨).
  - Notion의 이전 이미지는 API로 지우기 어려워 사용자가 지운다.
  - 슬라이드용 SVG는 PowerPoint에서 "도형으로 변환"하면 편집할 수 있다.
- **사용자가 직접 고친 글자는 그대로 둔다.** 오타도 마음대로 고치지 않는다(예: "5.. 타겟 선정", "pipelien").
- 문서 댓글로 요청이 오면 그 스레드에 답하고, 대화창에는 한 줄만 쓴다.
- 커밋 전에 검증하고, 지정 브랜치에 푸시한다.

---

## 새 대화 시작 프롬프트

아래를 새 대화에 붙여 넣는다. 저장소를 연결할 수 있으면 함께 연결한다.

```
난소암 세포주 2D vs 3D(오가노이드) RNA-seq 프로젝트를 이어서 하려고 해. 답변은 한국어로 해줘.

1. GitHub 저장소 biosinh22/test 의 브랜치 claude/charming-brown-6kr33c 에 있는 HANDOFF.md, CLAUDE.md, sync/SYNC.md 를 먼저 읽어줘. 이 세 파일이 프로젝트 요약, 규칙, Docs↔Notion 동기화 절차야.
2. 접근할 수 있으면 프로젝트 문서(Claude Docs: https://claude.ai/code/artifact/fe866b38-7b85-4c83-b3e8-2fc0f85712e4)와 Notion 사본(https://app.notion.com/p/3e9431862b5681c6ba76eddeece5f9c9)을 읽고, HANDOFF.md 이후 바뀐 게 있는지 확인해줘. 접근이 안 되면 HANDOFF.md 만으로 진행해도 돼.
3. HANDOFF.md 의 "5. 지금 상태와 다음 할 일"에서 이어서 하자. 지금 할 일은: [여기에 오늘 할 일]
```

저장소도 연결할 수 없으면 이 HANDOFF.md 파일을 통째로 첨부하고 위 프롬프트의 3번만 쓰면 된다.
