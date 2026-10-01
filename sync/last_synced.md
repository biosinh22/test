# OV Organoid 3D vs 2D Project

<mention-date start="2026-09-28"/> · @shinhee

> Notion: [OV Organoid 3D vs 2D Project](https://app.notion.com/p/3e9431862b5681c6ba76eddeece5f9c9) — 같은 내용이며 Claude가 양쪽을 동기화함.

## 프로젝트 개요

*세포주의 3D 배양 타당성 및 임상적 가치 규명*

난소암(Ovarian cancer, OV) 세포주 4종을 2D와 3D(organoid)로 배양해 RNA-seq을 비교하고, **3D가 2D보다 생물학적·임상적으로 더 타당하다는 근거**와 그 위에서 **치료로 이어질 수 있는 target (gene/pathway)** 을 찾는 것을 목표로 한다.

**대상 세포주: 8종 (아형은 DepMap 기준).** HGSOC(OVCAR-3, OVSAHO, HeyA8), SOC·장액성 등급 미표기(SKOV-3), Endometrioid(A2780), Clear cell(OVTOKO, RMG1, RMG2). 현재 이 중 4종(SKOV3, A2780, HeyA8, OVTOKO)만 분석한 상태. 나머지 4종은 데이터 도착 시점 아직 미정, 공부 해 두고 분석은 이 4종으로 파이프라인을 확립한 뒤 그대로 적용 예정.

## ppt 내용 (이미 분석 된 것)

<table header-row="true" header-column="false">
	<tr>
		<td>슬라이드</td>
		<td>내용</td>
		<td>핵심</td>
	</tr>
	<tr>
		<td>2</td>
		<td>Cohort</td>
		<td>세포주 × 2D/3D 샘플 구성</td>
	</tr>
	<tr>
		<td>3</td>
		<td>PCA</td>
		<td>2D vs 3D 분리 정도</td>
	</tr>
	<tr>
		<td>4</td>
		<td>DEG</td>
		<td>3D에서 up 157개, 2D에서 up 39개</td>
	</tr>
	<tr>
		<td>5</td>
		<td>Functional pathway (-log10 P)</td>
		<td>glycolytic process 4.87, cell surface 4.31, transmembrane 3.24, extracellular matrix 3.09, pluripotency signaling 2.26, cellular response to hypoxia 1.95 등</td>
	</tr>
	<tr>
		<td>6–9</td>
		<td>세포주별 분석</td>
		<td>SKOV3, A2780, HeyA8, OVTOKO 각 3개 그림</td>
	</tr>
</table>

**1차 해석:** 3D에서 glycolysis, hypoxia, ECM/세포표면 관련 term이 상위. 3D 구조 내부의 산소 구배와 세포-기질 상호작용이 실제 종양과 비슷하다는 방향의 시그널로 보임.<br>→ 이 1차 분석을 (1) cell line 별로 쪼개 해석하고, (2) CCLE mutation과 연결하고, (3) target 후보와 치료 가능성까지 스토리를 만들어야 함

## 세포주별 결과 (ppt 6–9)

**2D와 3D가 확실히 갈리는 건 SKOV3이고, A2780은 거의 갈리지 않는다.**<br>공통적으로 3D 샘플끼리는 가깝게 모이고, 2D는 passage에 따라 이동하는 경향이 보인다.

**각 슬라이드의 Fig 3개 (PCA, dendrogram, heatmap)**

- **왼쪽 위 PCA:** 전체 발현으로 본 샘플 간 거리. 노랑 = 2D, 보라 = 3D.
- **왼쪽 아래 dendrogram:** 계층적 군집, 가까운 샘플끼리 먼저 묶임.
- **오른쪽 heatmap:** 미리 고른 gene set을 6개 카테고리(stem cell, proliferation, EMT, hypoxia, ECM, resistance)로 묶어 샘플별 점수를 표시(−1\~1, 행 기준 정규화로 보임). "3D는 줄기세포성·저산소·ECM·약물내성이 높아 실제 종양에 가깝다"는 가설을 보려는 그림이다.

<table header-row="true" header-column="false">
	<tr>
		<td>세포주</td>
		<td>2D vs 3D 분리</td>
		<td>3D끼리</td>
		<td>2D passage 흐름</td>
		<td>튀는 샘플</td>
		<td>한 줄 해석</td>
	</tr>
	<tr>
		<td>SKOV3</td>
		<td>뚜렷 (PCA·dendrogram 모두 두 그룹)</td>
		<td>P1·P3·P5 촘촘히 모임</td>
		<td>P0 → P5로 계속 이동, P5가 멀리 떨어짐</td>
		<td>2D P5</td>
		<td>가장 깔끔. 3D는 안정, 2D는 passage에 따라 변함</td>
	</tr>
	<tr>
		<td>A2780</td>
		<td>거의 없음</td>
		<td>흩어짐. 3D P3는 2D P1과, 3D P5는 2D P0와 묶임</td>
		<td>P0·P1 vs P3·P5로 나뉜</td>
		<td>3D P1 (혼자 떨어짐)</td>
		<td>3D 효과보다 passage·샘플 차이가 큼. QC와 3D 형성 여부 확인 필요</td>
	</tr>
	<tr>
		<td>HeyA8</td>
		<td>대체로 분리</td>
		<td>P1·P5·P10 모임, P3 약간 떨어짐</td>
		<td>P0·P1·P3 vs P5·P10</td>
		<td>3D P3 (약하게)</td>
		<td>3D 안정. 단 dendrogram에서 2D 후기(P5·P10)가 3D 쪽에 붙음</td>
	</tr>
	<tr>
		<td>OVTOKO</td>
		<td>부분적</td>
		<td>P1·P3·P10 모임</td>
		<td>P0·P1 → P3 → P5·P10으로 이동</td>
		<td>3D P5 (혼자 떨어짐)</td>
		<td>3D P5를 빼면 3D 안정. 2D 후기 passage가 따로 묶임</td>
	</tr>
</table>

heatmap은 이미지 해상도로는 gene set 이름과 방향을 읽을 수 없다. 원본 점수 표가 있어야 해석 가능.

**여기서 나오는 이야기 (가설)**

1. **"3D는 passage가 지나도 발현이 안정적이고, 2D는 passage에 따라 흘러간다(drift)."** SKOV3, HeyA8, OVTOKO에서 보인다. "3D가 더 낫다"는 주장의 좋은 근거 후보지만, 숫자로 확인해야 한다.
2. **A2780은 예외다.** 원인을 모르면 "4종 중 3종"으로 말해야 한다.
3. **튀는 3D 샘플**(A2780 3D P1, OVTOKO 3D P5)이 기술 문제인지 생물학인지 먼저 가려야 통합 분석 결과가 흔들리지 않는다.

## Samples

**총 32개 샘플, 세포주마다 passage별 1개씩.** 생물학적 replicate는 없고, passage가 그 역할을 대신함.

<table header-row="true" header-column="false">
	<tr>
		<td>차수</td>
		<td>세포주</td>
		<td>샘플 ID</td>
		<td>2D passage</td>
		<td>3D passage</td>
		<td>샘플 수</td>
	</tr>
	<tr>
		<td>1차</td>
		<td>SKOV3</td>
		<td>BUM1001–1007</td>
		<td>P0, P1, P3, P5</td>
		<td>P1, P3, P5</td>
		<td>7</td>
	</tr>
	<tr>
		<td>1차</td>
		<td>A2780</td>
		<td>BUM1008–1014</td>
		<td>P0, P1, P3, P5</td>
		<td>P1, P3, P5</td>
		<td>7</td>
	</tr>
	<tr>
		<td>2차 (251112)</td>
		<td>HeyA8</td>
		<td>ARPA1001–1009</td>
		<td>P0, P1, P3, P5, P10</td>
		<td>P1, P3, P5, P10</td>
		<td>9</td>
	</tr>
	<tr>
		<td>2차 (251112)</td>
		<td>OVTOKO</td>
		<td>ARPA1010–1018</td>
		<td>P0, P1, P3, P5, P10</td>
		<td>P1, P3, P5, P10</td>
		<td>9</td>
	</tr>
</table>

**분석에 영향을 주는 설계 특징**

- **passage 시계열**<br>같은 passage끼리 2D와 3D를 짝지어(P1↔P1, P3↔P3 …) 비교할 수 있다.
- **P0는 2D에만 있음**<br>3D로 넘어가기 전 baseline으로 보이며, 2D vs 3D 비교보다는 기준점으로 사용.
- **batch가 cell line과 겹침** (1차 = SKOV3·A2780, 2차 = HeyA8·OVTOKO)<br>batch effect와 cell line 차이를 분리할 수 없음. 비교를 항상 cell lien 안에서 하면 문제 없을 듯.
- **2차 sample (251112)에만 P10** 있음<br>통합 분석에서는 공통 passage(P1, P3, P5)만 쓰거나 별도로 보거나.
- **passage는 진짜 replicate이 아님**<br>같은 배양 시간을 시간에 따라 잰 것이라 p-value가 실제보다 낙관적으로 나올 수 있다. (알아두고 결과 발표 때 한계로 명시 필요)
- [ ] 원본 받기: heatmap 점수 표, 카테고리별 gene set 목록, 점수 계산법(GSVA? ssGSEA? z-score?), PCA 입력(전체 유전자인지 상위 변동 유전자인지, 정규화 방법)
- [ ] 튀는 샘플 QC: A2780 3D P1, OVTOKO 3D P5, HeyA8 3D P3 — 라이브러리 크기, 매핑률, 검출 유전자 수, 미토콘드리아 비율, 실험 노트
- [ ] "3D 안정 / 2D drift" 수치화: 2D끼리 vs 3D끼리 샘플 간 상관, passage별 P0와의 거리
- [ ] heatmap을 통계로: 카테고리 점수를 같은 passage끼리 3D − 2D로 계산 → 세포주별 "3D에서 높음/낮음" 요약표
- [ ] A2780 3D 배양 상태 확인 (오가노이드가 제대로 만들어졌는지, 사진)
- [ ] (추가 아이디어) 환자 종양 발현 데이터와 비교해 3D가 2D보다 실제 종양에 가까운지 확인. "임상적 타당성"의 가장 직접적인 근거다. 단 TCGA-OV는 HGSOC 위주라 이 4종 아형에는 다른 데이터셋이 필요

프로젝트 받을 때 적은 노트

- OV Organoid / RNA data / 3D vs. 2D gene, pathway compare.
- cell line별로 2D/3D analy. 실제 target으로 선정할 수 있는 게 있을지. gene이나 특히 pathway.
- 전체적인 pathway. topdown. 3D에서 증가 or 2D에서 감소. → cell line 별로?
- 3D에서 2D보다 더 좋다는 결과를 원하고 어떤 target이 있을지. 그리고 그게 treatment 까지 이어질 수 있을지.
- CCLE \> mutation data. cell line 별로 어떤 key mutation이 있는지, gene이랑 pathway로 이어지는지 확인.
- 먼저 histology, cell line 별로 공부하고 CCLE에서 mutation 찾아서 공부하기

## 9/28-1002

- [ ] 세포주 8종 프로필 공부 (아형, driver mutation, 배양 특성)
- [ ] cBioPortal/DepMap으로 8종 mutation 표 → mutation-pathway 매핑 표 (1단계)
- [ ] 2D vs 3D(오가노이드) 리뷰 논문 정리: 3D에서 흔히 보고되는 변화(hypoxia, ECM, stemness, 약물내성)
- [ ] heatmap 6개 카테고리에 쓸 gene set 후보 정리 (MSigDB Hallmark 등). 원본을 받기 전에 우리 기준을 준비
- [ ] 파이프라인 코드를 가상 데이터로 미리 작성·검증 (count matrix 오면 바로 실행)
- [ ] 환자 종양 비교용 공개 데이터셋 조사 (HGSOC, clear cell, endometrioid 포함)

## 단계별 계획

\[embedded content: 진행 흐름 · 8단계, 4단계에서 합류\]

mutation 쪽과 RNA 쪽은 동시에 진행할 가능, 둘이 4에서 만나야 타겟 후보 선정 할 수 있음.

**0. 배경 공부**

- [x] 난소암 아형(프로젝트 세포주의 아형, DepMap 기준) 개념과 대표 mutation 정리
- [ ] 세포주 8종 프로필 카드 (배경 공부 탭)
- [ ] 2D vs 3D(오가노이드/스페로이드) 배양 차이 리뷰 논문 1–2편

**1. CCLE mutation**

- [ ] DepMap portal에서 8개 세포주 mutation 다운로드 (등록 확인 완료: RMG2만 미등록, OVCAR3는 NIHOVCAR3)
- [ ] driver 유전자 기준으로 필터 (hotspot missense, truncating)
- [ ] copy number(예: ERBB2 증폭)와 발현량도 함께 확인
- [ ] mutation → pathway 매핑 표

**2. RNA 재점검**

- [ ] 32개 샘플 count matrix 확보 (ppt DEG 157/39의 분석 조건: 툴, cutoff, pooled 여부 포함)
- [ ] 샘플 메타데이터 표 작성 (sample, cell_line, batch, dimension, passage)
- [ ] QC: 전체·세포주별 PCA, passage 흐름, 배치 확인

**3. 세포주별 pathway**

- [ ] 세포주별 2D vs 3D DEG (같은 passage끼리 짝지어 비교)
- [ ] 3D passage 경향 분석 (유지형 vs 증가형 vs 일시형)
- [ ] 세포주별 GSEA → 세포주 × pathway NES heatmap
- [ ] 4종 공통 pathway vs 세포주(아형) 특이 pathway 분리
- [ ] 파이프라인 코드 정리 (메타데이터만 바꾸면 나머지 4종에 재사용)

**4. 교차 분석**

- [ ] 세포주별 mutation-pathway와 3D에서 변한 pathway가 겹치는 조합 찾기

**5.. 타겟 선정**

- [ ] 후보별 druggability (DGIdb, 승인·임상 약물)
- [ ] DepMap CRISPR dependency, PRISM/GDSC 약물 반응 확인
- [ ] 난소암 임상 근거 문헌 확인

**6. 스토리 정리**

- [ ] "3D 타당성" 파트 + "타겟" 파트 슬라이드 초안

**7. 검증 제안 (선택)**

- [ ] 2D vs 3D 약물 반응 실험, qPCR/western 검증안

## Analysis Pipeline

비교는 cell line 안에서, **같은 passage끼리**.<br>-\> 이렇게 하면 batch-cell line 겹침과 passage 차이를 함께 피할 수 있음. 도구는 R(DESeq2) 기준.

\[embedded content: RNA-seq 분석 파이프라인 · 7단계\]

<table header-row="true" header-column="false">
	<tr>
		<td>단계</td>
		<td>할 일</td>
		<td>방법</td>
		<td>산출물</td>
	</tr>
	<tr>
		<td>1. 입력 정리</td>
		<td>count matrix + meta data</td>
		<td>sample ID 매칭, 저발현 유전자 제거</td>
		<td>`counts.csv`, `samples.csv`</td>
	</tr>
	<tr>
		<td>2. QC</td>
		<td>라이브러리 크기, 샘플 상관, PCA (전체·세포주별)</td>
		<td>`vst` 변환 → PCA, 색 = dimension, 모양 = passage</td>
		<td>PCA 그림, 이상 샘플 목록</td>
	</tr>
	<tr>
		<td>3. 세포주별 DEG</td>
		<td>2D vs 3D (P0 제외)</td>
		<td>`design = ~ passage + dimension`</td>
		<td>세포주별 DEG 표 (log2FC, padj)</td>
	</tr>
	<tr>
		<td>4. 통합 DEG</td>
		<td>4종 공통 3D 변화</td>
		<td>`design = ~ cell_line + dimension`, 공통 passage(P1·P3·P5)만</td>
		<td>공통 DEG 표 → ppt의 157/39와 비교</td>
	</tr>
	<tr>
		<td>5. passage 경향</td>
		<td>3D 변화가 계속 커지는지, 초기에 자리 잡고 유지되는지</td>
		<td>passage별 3D vs 2D log2FC 추세 (보조: `~ passage * dimension` LRT)</td>
		<td>유전자를 유지형 / 증가형 / 일시형으로 분류</td>
	</tr>
	<tr>
		<td>6. pathway</td>
		<td>세포주별 GSEA</td>
		<td>fgsea 또는 clusterProfiler + msigdbr (Hallmark, KEGG, Reactome, GO BP), log2FC 순위</td>
		<td>세포주 × pathway NES heatmap</td>
	</tr>
	<tr>
		<td>7. 공통/특이 분리</td>
		<td>4종 공통 vs 세포주(아형) 특이</td>
		<td>NES 방향과 유의성 기준</td>
		<td>후보 pathway 목록 → 4단계(교차 분석)</td>
	</tr>
</table>

- **타겟 후보로 강한 것:** 5단계에서 "유지형"이면서 여러 세포주에서 같은 방향인 유전자·pathway. 3D가 되자마자 생기고 passage가 지나도 안정적이면 "3D 특이적"이라고 말하기 쉽다.
- **P0 활용:** 3D P1 vs 2D P0로 "3D 전환 직후 변화"를 볼 수 있다 (보조 분석).
- **한계:** passage당 1개라 5단계의 통계 검정력은 약하다. 추세는 기술적으로 보고, 결론은 3·4단계에 기대는 게 안전하다.
- **재사용 규칙:** 세포주 이름·passage를 코드에 박지 않는다. 나머지 4종이 오면 `samples.csv`에 행만 추가하고 같은 스크립트를 돌린다.

## Background Study

4개 세포주가 서로 다른 난소암 subtype이다<br>-\> subtype이 다르면 driver mutation과 pathway가 다르고, 3D에서 변하는 pathway도 달라짐.<br>그래서 세포주별 분석(3단계)과 mutation 연결(4단계)의 해석 기준이 여기서 정해진다.

난소암 개요와 세포주 8종 상세 프로필은 별도 탭: 배경 공부: 난소암·세포주

### - 난소암 아형: 주요 5종, 본 프로젝트 세포주는 3종 (DepMap 기준)

상피성 난소암의 주요 조직형은 WHO 분류 기준 **5종**이다. DepMap 표기로 보면 이 프로젝트 세포주는 그중 **HGSOC·Endometrioid·Clear cell 3종**에 속하고, LGSOC로 등록된 세포주는 없다. mucinous는 뺐다. mucinous는 약 3%로 드물고, 위장관암 전이와 구분이 어려워 세포주 패널에서 자주 빠진다.

<table header-row="true" header-column="false">
	<tr>
		<td>아형</td>
		<td>비율(대략)</td>
		<td>대표 mutation</td>
		<td>핵심 pathway</td>
		<td>치료 연결 예</td>
		<td>이 프로젝트 (DepMap 기준)</td>
	</tr>
	<tr>
		<td>High-grade serous (HGSOC)</td>
		<td>\~70%</td>
		<td>TP53 (거의 전부), BRCA1/2</td>
		<td>DNA 손상 복구(HR) 결핍, copy number 불안정</td>
		<td>PARP inhibitor</td>
		<td>포함 (OVCAR-3, OVSAHO, HeyA8)</td>
	</tr>
	<tr>
		<td>Endometrioid</td>
		<td>\~10%</td>
		<td>CTNNB1, PIK3CA, ARID1A, PTEN, MMR 결핍</td>
		<td>Wnt/β-catenin, PI3K/AKT</td>
		<td>PI3K 계열, 면역항암제(MMR 결핍)</td>
		<td>포함 (A2780)</td>
	</tr>
	<tr>
		<td>Clear cell (OCCC)</td>
		<td>\~10% (일본·동아시아는 더 높음)</td>
		<td>ARID1A, PIK3CA</td>
		<td>SWI/SNF, PI3K/AKT, 저산소·대사 특징</td>
		<td>PI3K/AKT, BET inhibitor 연구</td>
		<td>포함 (OVTOKO, RMG-I, RMG-II)</td>
	</tr>
	<tr>
		<td>Low-grade serous (LGSOC)</td>
		<td>\<5%</td>
		<td>KRAS, BRAF, NRAS</td>
		<td>RAS/MAPK</td>
		<td>MEK inhibitor</td>
		<td>DepMap 등록 세포주 없음 (HeyA8이 문헌상 LGSOC 특징)</td>
	</tr>
	<tr>
		<td>Mucinous</td>
		<td>\~3%</td>
		<td>KRAS, ERBB2 증폭</td>
		<td>RAS/MAPK, HER2</td>
		<td>HER2 표적</td>
		<td>제외</td>
	</tr>
</table>

SKOV-3는 DepMap에서 SOC(Serous Ovarian Cancer)로 등록돼 있다. 장액성이지만 고등급/저등급이 표기되지 않아 위 표의 어느 줄에도 딱 들어가지 않는다.

그 외 드문 유형(carcinosarcoma, mixed, undifferentiated, mesonephric-like 등)과 비상피성 종양(germ cell, sex cord-stromal)은 범위 밖이다. 비율은 교과서 기준 대략치라 리뷰 논문으로 확인할 것.

### - 세포주 8종 (문헌 기반 1차 정리, CCLE로 검증 필요)

아형은 [DepMap](https://depmap.org/portal/) 세포주 페이지의 Oncotree Subtype 표기 기준이다 (2026-09-30 확인). 문헌 분류와 다른 세포주(HeyA8, SKOV-3)는 메모에 적었다. "ppt"는 이번 분석결과 2에 들어간 세포주.

<table header-row="true" header-column="false">
	<tr>
		<td>아형 (DepMap)</td>
		<td>세포주</td>
		<td>DepMap ID</td>
		<td>ppt</td>
		<td>알려진 주요 변이</td>
		<td>메모</td>
	</tr>
	<tr>
		<td>HGSOC</td>
		<td>OVCAR-3</td>
		<td>ACH-000001 (NIHOVCAR3)</td>
		<td>–</td>
		<td>TP53 missense, CCNE1 증폭 (확인 필요)</td>
		<td>가장 널리 쓰이는 HGSOC 모델. DepMap 이름은 NIHOVCAR3</td>
	</tr>
	<tr>
		<td>HGSOC</td>
		<td>OVSAHO</td>
		<td>ACH-000409</td>
		<td>–</td>
		<td>TP53 이상, RB1 결손 (확인 필요)</td>
		<td>HGSOC 유사도가 높은 세포주로 평가됨</td>
	</tr>
	<tr>
		<td>HGSOC</td>
		<td>HeyA8</td>
		<td>ACH-000542</td>
		<td>○</td>
		<td>KRAS, BRAF (확인 필요)</td>
		<td>HEY를 마우스 복강에서 계대한 파생주. TP53 wild-type·MAPK 변이라 문헌에서는 LGSOC로 보기도 함 (이전 분류)</td>
	</tr>
	<tr>
		<td>SOC (장액성, 등급 미표기)</td>
		<td>SKOV-3</td>
		<td>ACH-000811</td>
		<td>○</td>
		<td>PIK3CA H1047R, ARID1A Q586\*, TP53 S90Pfs\*33 (DepMap 확인) · CDKN2A 결손, ERBB2 증폭 (CN 확인 필요)</td>
		<td>변이 양상이 endometrioid/clear cell에 가깝다는 보고가 있어 이전에는 Endometrioid로 분류</td>
	</tr>
	<tr>
		<td>Endometrioid (EOV)</td>
		<td>A2780</td>
		<td>ACH-000657</td>
		<td>○</td>
		<td>MMR 결핍, TP53 wild-type (확인 필요)</td>
		<td>PTEN/ARID1A/PIK3CA는 CCLE에서 확인</td>
	</tr>
	<tr>
		<td>Clear cell (CCOV)</td>
		<td>OVTOKO</td>
		<td>ACH-000663</td>
		<td>○</td>
		<td>ARID1A (확인 필요)</td>
		<td>BRD2 의존성, BET inhibitor 민감 보고</td>
	</tr>
	<tr>
		<td>Clear cell (CCOV)</td>
		<td>RMG1 (RMG-I)</td>
		<td>ACH-000719</td>
		<td>–</td>
		<td>TERT promoter, FANCL W57\*, ARID1A·PIK3CA wild-type (DepMap 확인)</td>
		<td>일본에서 수립된 clear cell 주</td>
	</tr>
	<tr>
		<td>Clear cell (문헌 기준)</td>
		<td>RMG2 (RMG-II)</td>
		<td>DepMap 미등록</td>
		<td>–</td>
		<td>문헌 확인 필요</td>
		<td>CCLE 데이터 없음</td>
	</tr>
</table>

DepMap 아형으로 나누면 HGSOC = TP53/HR(OVCAR-3, OVSAHO), Endometrioid = PI3K·MMR(A2780), Clear cell = ARID1A·PI3K(OVTOKO, RMG-I). 다만 HeyA8은 HGSOC 표기인데 MAPK 변이형이고, SKOV-3는 serous 표기인데 PIK3CA·ARID1A 변이형이다. 그래서 해석은 아형 이름보다 각 세포주의 실제 driver 변이를 기준으로 한다.

**체크포인트:** SKOV3의 TP53은 문헌마다 "wild-type" 또는 "null"로 표기가 갈린다. DepMap 확인 결과 TP53 S90Pfs\*33 (frameshift, allele fraction 0.97)이라 단백이 만들어지지 않는 null이다.

**가설 하나:** ppt의 상위 pathway(glycolysis, hypoxia)는 clear cell의 특징과 겹친다. clear cell 세포주(OVTOKO, 추후 RMG1·RMG2)가 이 신호를 주도하는지, 아니면 아형과 무관하게 공통인지가 첫 번째 볼 질문이다.

### Step 3. CCLE 사용법

**CCLE(Cancer Cell Line Encyclopedia)** 는 Broad Institute가 1,000개 이상의 암 세포주에 대해 mutation, copy number, 발현량 등을 정리한 데이터다. 지금은 **DepMap** 프로젝트에 합쳐져 [DepMap portal](https://depmap.org/portal/) 에서 제공되고, 같은 곳에서 CRISPR 의존성·약물 반응 데이터도 볼 수 있다. 세포주마다 `ACH-000xxx` 형식의 ID(ModelID)가 붙는다.

방법은 3가지. 처음엔 A로 감을 잡고, B로 8개를 한눈에 보고, 최종 표는 C로 만드는 걸 추천한다.

**A. DepMap portal 웹 (세포주 하나씩)**_기록할 것: ModelID(`ACH-…`), DepMap이 붙인 subtype

1. [depmap.org/portal](https://depmap.org/portal/) 상단 검색창에 세포주 이름 입력 (예: SKOV3). 하이픈 없이 입력하면 잘 걸린다. OVCAR-3는 NIHOVCAR3로 등록돼 있다.
2. 세포주 페이지에서 아형부터 확인. Oncotree Lineage(장기) \> Primary Disease(큰 질환군) \> Subtype(조직학적 아형) 순으로 좁아지고, 아형은 Oncotree Subtype 칸이다.<br>→ HEYA8: ACH-000542
3. Characterization(특성) 영역의 **Mutations** 표에서 유전자, 단백질 변화(예: p.H1047R), 변이 종류, hotspot 여부를 본다. Copy number와 Expression도 같은 곳에 있다.
4. 반대로 유전자 이름(예: ARID1A)을 검색하면, 그 유전자에 변이가 있는 세포주 목록과 의존성 점수를 볼 수 있다.
5. 탭 이름은 portal 업데이트에 따라 조금 다를 수 있다.

**B. cBioPortal (8 cell line merge)**

1. [cBioPortal](https://www.cbioportal.org/) 에서 "Cancer Cell Line Encyclopedia (Broad, 2019)" study 선택.
2. Query By Gene → 샘플 선택에서 사용자 지정 목록으로 8개 세포주 입력 (CCLE 이름 형식: `NIHOVCAR3_OVARY`, `SKOV3_OVARY` 등).
3. 유전자 목록 입력: `TP53 KRAS BRAF NRAS PIK3CA PTEN ARID1A CTNNB1 BRCA1 BRCA2 ERBB2 CCNE1 CDKN2A RB1`
4. **OncoPrint** 탭에서 세포주 × 유전자 격자로 mutation과 증폭/결손을 한눈에 본다. 발표용 그림으로도 쓸 수 있다.
5. 2019 버전이라 최신 DepMap보다 오래됐다. 빠른 개관용.

**C. 파일 다운로드 + Python (최종 표용)**

1. DepMap portal → Data → Downloads → 최신 "DepMap Public" release.
2. 받을 파일: `Model.csv` (세포주 이름 ↔ ModelID, 아형), `OmicsSomaticMutations.csv` (mutation), 필요하면 copy number·발현량 파일. 파일명과 컬럼명은 release마다 바뀔 수 있으니 헤더를 먼저 확인한다.
3. 아래 코드로 8개 세포주의 driver mutation만 뽑는다.

```python
import pandas as pd

model = pd.read_csv("Model.csv")
mut = pd.read_csv("OmicsSomaticMutations.csv", low_memory=False)

names = ["NIHOVCAR3", "OVSAHO", "HEYA8", "SKOV3", "A2780", "OVTOKO", "RMGI", "RMGII"]
m = model[model["StrippedCellLineName"].isin(names)][
    ["ModelID", "CellLineName", "StrippedCellLineName", "OncotreeSubtype"]]
print(m)
print("못 찾음:", set(names) - set(m["StrippedCellLineName"]))

drivers = ["TP53", "KRAS", "BRAF", "NRAS", "PIK3CA", "PTEN", "ARID1A", "CTNNB1",
           "BRCA1", "BRCA2", "ERBB2", "CDKN2A", "RB1", "NF1"]
sub = mut[mut["ModelID"].isin(m["ModelID"]) & mut["HugoSymbol"].isin(drivers)]
sub = sub.merge(m, on="ModelID")
cols = ["StrippedCellLineName", "HugoSymbol", "ProteinChange", "VariantInfo", "Hotspot", "LikelyLoF"]
sub[cols].sort_values(cols[:2]).to_csv("ov8_driver_mutations.csv", index=False)
```

"못 찾음"에 나온 세포주는 이름 표기가 다른 것이다. `model[model["CellLineName"].str.contains("RMG", case=False)]` 처럼 검색해 맞춘다. RMG-II는 DepMap에 등록돼 있지 않다.

**결과 읽는 법**

- **Hotspot = True:** 암에서 반복적으로 나오는 자리의 변이. 기능적 의미가 거의 확실하다 (예: PIK3CA H1047R, KRAS G12).
- **LikelyLoF = True:** nonsense, frameshift 등 기능 상실형. 종양억제유전자(TP53, ARID1A, PTEN)에서 중요하다.
- 둘 다 아닌 missense는 의미가 불확실한 경우가 많다. 표에 넣되 표시해 둔다.
- A2780처럼 MMR 결핍 세포주는 변이 수가 매우 많다. driver 유전자 + hotspot/LoF 기준으로 걸러야 한다.

### Step 4. 산출물 (0–1단계 끝났을 때 있어야 할 것)

세포주별 mutation → pathway 매핑 표. 아래 형식으로 채운다 (첫 줄은 예시, CCLE로 확인 후 수정).

<table header-row="true" header-column="false">
	<tr>
		<td>세포주</td>
		<td>유전자</td>
		<td>변이</td>
		<td>종류</td>
		<td>연결 pathway</td>
		<td>관련 약물</td>
		<td>3D 데이터와 연결</td>
	</tr>
	<tr>
		<td>SKOV3</td>
		<td>PIK3CA</td>
		<td>(CCLE 확인)</td>
		<td>missense hotspot</td>
		<td>PI3K/AKT/mTOR</td>
		<td>alpelisib 등 PI3Kα 억제제</td>
		<td>(3단계 이후 기입)</td>
	</tr>
</table>

**출처 (검색 결과 요약 기준, 본문 직접 확인 필요):** [Barnes et al., Genome Medicine 2021](https://genomemedicine.biomedcentral.com/articles/10.1186/s13073-021-00952-5) · [Anglesio et al., PLOS One 2013](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0072162) · [Berns et al., Oncogene 2018 (ARID1A/BET)](https://www.nature.com/articles/s41388-018-0300-6) · [Drapkin lab, Elias et al.](https://www.med.upenn.edu/drapkinlab/assets/user-content/documents/EliasGynOncol.pdf)

## 확인해야 할 질문

- [x] 나머지 4종(OVCAR-3, OVSAHO, RMG1, RMG2)의 2D/3D RNA 데이터는 있는가, 언제 나오는가? → 답: 아직 없고 시점 미정. 공부만 먼저, 분석은 4종으로.
- [ ] DEG(157/39)와 pathway 결과는 4개 세포주 통합인가, 개별인가?
- [ ] 세포주마다 2D/3D replicate는 몇 개이고, 같은 세포주 내 paired 비교인가? → 답: 생물학적 replicate 없음, passage별 1개씩 (위 "샘플 구성").
- [ ] 3D P1은 2D P0에서 바로 만든 것인가? 같은 passage의 2D·3D는 같은 시점에 수확했나? (passage끼리 짝지어 비교하는 전제)
- [ ] 1차와 2차의 라이브러리·시퀀싱 조건(키트, 기기, read 길이)이 같은가?
- [ ] SKOV3·A2780도 P10 샘플이 추가될 예정인가?
- [ ] "타겟"의 범위: 치료 타겟(약물)인가, biomarker인가, 메커니즘 유전자인가?
- [ ] pathway 분석 도구와 DB (DAVID? GO/KEGG?), DEG cutoff는?
- [ ] 원본 count matrix와 DEG 표를 받을 수 있는가?
- [ ] 3D는 실제 오가노이드인가, 스페로이드인가? (배양 조건, 기간) -\> Organoid.
- [x] 슬라이드 6–9의 세포주별 그림 3장은 각각 무엇인가? → 답: PCA, dendrogram, gene set heatmap ("세포주별 결과" 섹션)

---

## 작업 로그

최신 기준 내림차순

<table header-row="true" header-column="false">
	<tr>
		<td>날짜</td>
		<td>한 일</td>
		<td>다음</td>
	</tr>
	<tr>
		<td>2026-10-01</td>
		<td>원자료 서버 업로드 준비(rsync 시험 실행 성공, 339 GB → /data/ksh3/ov), 인계 문서 HANDOFF.md 작성</td>
		<td>원자료 실제 전송, 폴더 내용 확인 후 Data 정리 시작</td>
	</tr>
	<tr>
		<td>2026-09-30</td>
		<td>Analysis Pipeline 모식도 추가 (7단계 흐름, 산출물)</td>
		<td>PI께 파이프라인 확인, 답에 따라 계획 수정</td>
	</tr>
	<tr>
		<td>2026-09-30</td>
		<td>배경 공부 탭에 한눈에 보기 그림 2개 추가 (난소 종양 분류, 세포주 8종 문헌 vs DepMap 아형), OVCAR-3 아형 HGSOC 확정, Docs↔Notion 동기화</td>
		<td>발표 슬라이드에 그림 넣기, 나머지 세포주 mutation CSV로 8종 표 채우기</td>
	</tr>
	<tr>
		<td>2026-09-30</td>
		<td>세포주 아형을 DepMap(Oncotree Subtype) 기준으로 전면 수정: HeyA8 → HGSOC, SKOV-3 → SOC(등급 미표기), DepMap ID 추가, OVCAR-3 = NIHOVCAR3(ACH-000001), RMG-II 미등록</td>
		<td>나머지 세포주 mutation CSV로 8종 표 채우기</td>
	</tr>
	<tr>
		<td>2026-09-28</td>
		<td>배경 공부 탭 작성: 난소암 개요(통계·기원·치료), 세포주 8종 비교·상세</td>
		<td>CCLE로 변이·백금 반응 확인, 배경 공부 탭 검토</td>
	</tr>
	<tr>
		<td>2026-09-28</td>
		<td>Notion 페이지 생성(Claude Docs와 동일 내용), 할 일을 샘플 없이 할 수 있는 것 위주로 재정리</td>
		<td>세포주 프로필·CCLE mutation 표, 가상 데이터로 파이프라인 작성</td>
	</tr>
	<tr>
		<td>2026-09-28</td>
		<td>ppt 6–9(세포주별 PCA·dendrogram·heatmap) 해석, 슬라이드 이미지 문서에 첨부</td>
		<td>원본 점수 표·방법 받기, 튀는 샘플 QC</td>
	</tr>
	<tr>
		<td>2026-09-28</td>
		<td>샘플 리스트(32개) 반영, 분석 범위를 4종으로 확정, 파이프라인 설계</td>
		<td>count matrix 받기, 메타데이터 표, QC</td>
	</tr>
	<tr>
		<td>2026-09-28</td>
		<td>세포주 8종·아형 4종으로 범위 확정, CCLE 사용법 추가</td>
		<td>cBioPortal OncoPrint로 8개 개관 → DepMap 파일로 표 작성</td>
	</tr>
	<tr>
		<td>2026-09-28</td>
		<td>프로젝트 문서 생성, ppt 내용 정리, 0단계(배경 공부) 가이드 작성</td>
		<td>아형 공부, DepMap mutation 추출</td>
	</tr>
	<tr>
		<td>2026-09-23</td>
		<td>프로젝트 인계, ppt(분석결과 2) 검토</td>
		<td>문서화</td>
	</tr>
</table>
