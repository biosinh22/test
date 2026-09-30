# Background Study

<mention-date start="2026-09-28"/> · @shinhee

난소암의 기본과 프로젝트에서 다루는 세포주 8종의 배경을 정리한 공부 자료.<br>변이 정보는 문헌 기반이라 CCLE(DepMap)에서 최종 확인한다.

아형은 [DepMap](https://depmap.org/portal/) 세포주 페이지의 Oncotree Subtype 표기를 따른다 (2026-09-30 확인). 문헌 분류와 다른 세포주(HeyA8, SKOV-3)는 4·5절에 적었다.

## 1. 난소암 (Ovarian Cancer, OV)

발생은 적지만 사망률이 가장 높은 부인암으로, 환자 대부분이 암이 이미 복강 안에 퍼진 뒤에 발견된다.

<table header-row="true" header-column="false">
	<tr>
		<td>지표</td>
		<td>수치</td>
		<td>기준</td>
	</tr>
	<tr>
		<td>전 세계 신규 환자</td>
		<td>약 32만 5천 명 (여성암 8위)</td>
		<td>GLOBOCAN 2022</td>
	</tr>
	<tr>
		<td>전 세계 사망</td>
		<td>약 20만 7천 명 (여성 암 사망 8위)</td>
		<td>GLOBOCAN 2022</td>
	</tr>
	<tr>
		<td>한국 신규 환자</td>
		<td>3,263명 (여성암의 2.4%)</td>
		<td>2022 국가암등록통계</td>
	</tr>
	<tr>
		<td>진단 때 이미 멀리 퍼진 비율</td>
		<td>58%</td>
		<td>미국 SEER, 2010–2016 진단</td>
	</tr>
	<tr>
		<td>5년 상대생존율</td>
		<td>국한 92.6% · 국소 전이 74.8% · 원격 전이 30.2%</td>
		<td>미국 SEER, 2010–2016 진단</td>
	</tr>
</table>

**왜 늦게 발견되는가**

**→ 증상이 막연함.** 복부 팽만, 더부룩함, 골반 통증, 빈뇨처럼 흔한 증상이라 암을 의심하기 어렵다.

**→ 선별검사가 효과가 없음.** 영국 대규모 시험 UKCTOCS에서 CA-125 혈액검사와 질초음파로 일반 여성을 선별해도 사망률이 줄지 않았다.

**→ 가장 흔한 아형(HGSOC)이 빠르게 퍼짐.** 난관에서 시작해 일찍 복막으로 퍼지는 경우가 많다.

5년 상대생존율: 66.8%. (2026년 발표된 중앙암등록본부 자료, 2019년\~2023년)

## 2. 발생 기원과 Type I/II

**난소암은 출발 조직이 다른 여러 암의 묶음이다.** 난소암의 약 90%는 상피성이고, 그중 상당수는 난소가 아닌 난관이나 자궁내막 조직에서 시작한다.

\[embedded content: 출발 조직 → 아형 → 세포주 · DepMap 아형 기준\]

출발 조직이 같은 아형끼리 변이가 비슷함. 자궁내막증에서 오는 endometrioid와 clear cell은 둘 다 ARID1A·PIK3CA가 흔하다.

**Type I / Type II (Kurman·Shih 이원 모델)**

<table header-row="true" header-column="false">
	<tr>
		<td></td>
		<td>Type I</td>
		<td>Type II</td>
	</tr>
	<tr>
		<td>subtype</td>
		<td>LGSOC, endometrioid, clear cell, mucinous</td>
		<td>HGSOC (대부분), carcinosarcoma, undifferentiated</td>
	</tr>
	<tr>
		<td>진행</td>
		<td>느리고, 전구병변에서 단계적으로 진행</td>
		<td>빠르고, 발견 때 대부분 진행암</td>
	</tr>
	<tr>
		<td>유전체</td>
		<td>비교적 안정. 특정 경로 변이(KRAS, BRAF, PIK3CA, ARID1A, PTEN)</td>
		<td>매우 불안정. TP53 변이 거의 전부, copy number 변화 많음</td>
	</tr>
	<tr>
		<td>백금 항암제</td>
		<td>상대적으로 잘 안 들음 (특히 clear cell, LGSOC)</td>
		<td>처음에는 잘 들음, 재발하며 내성</td>
	</tr>
</table>

- **HGSOC:** 대부분 난관 끝(난관채, fimbria)의 STIC(serous tubal intraepithelial carcinoma)에서 시작한다. TP53 변이가 가장 먼저 생긴다.
- **LGSOC:** 경계성 장액성 종양에서 천천히 진행한다. RAS/MAPK 경로 변이가 핵심이다.
- **Endometrioid · Clear cell:** 자궁내막증에서 시작한다. ARID1A 소실이 초기에 일어난다.
- **Mucinous:** 기원이 분명하지 않고 이 프로젝트 범위 밖이다.
- Type I이 모두 순하다는 뜻은 아니다. 고등급 endometrioid나 clear cell처럼 공격적인 경우도 있어, 최근에는 이 이분법이 지나치게 단순하다는 비판도 있다.

## 3. 치료

기본은 수술 + 백금 항암제고, 그 뒤 유지요법과 재발 치료에서 분자 특성(BRCA·HRD, FRα, KRAS)에 따라 약이 달라짐.

<table header-row="true" header-column="false">
	<tr>
		<td>단계</td>
		<td>치료</td>
		<td>대상</td>
		<td>근거</td>
	</tr>
	<tr>
		<td>1차</td>
		<td>종양감축수술 + carboplatin·paclitaxel (필요시 bevacizumab 병용)</td>
		<td>대부분</td>
		<td>표준 치료</td>
	</tr>
	<tr>
		<td>1차 유지</td>
		<td>olaparib (PARP 억제제)</td>
		<td>BRCA1/2 변이</td>
		<td>SOLO-1: 진행·사망 위험 70% 감소</td>
	</tr>
	<tr>
		<td>1차 유지</td>
		<td>olaparib + bevacizumab</td>
		<td>HRD 양성</td>
		<td>PAOLA-1</td>
	</tr>
	<tr>
		<td>1차 유지</td>
		<td>niraparib (PARP 억제제)</td>
		<td>바이오마커 무관, 백금에 반응한 환자</td>
		<td>PRIMA</td>
	</tr>
	<tr>
		<td>재발 · 백금 내성</td>
		<td>mirvetuximab soravtansine (FRα 표적 항체-약물 접합체)</td>
		<td>FRα 고발현</td>
		<td>MIRASOL: 전체생존 16.5 vs 12.7개월. FDA 2024년 정식 승인</td>
	</tr>
	<tr>
		<td>재발 LGSOC</td>
		<td>avutometinib + defactinib (RAF/MEK + FAK 억제)</td>
		<td>KRAS 변이</td>
		<td>RAMP-201: 반응률 44%. FDA 2025년 5월 가속 승인</td>
	</tr>
</table>

**백금 민감 vs 내성**

- 마지막 백금 치료 후 6개월이 지나 재발하면 "백금 민감", 6개월 안에 재발하면 "백금 내성"으로 부른다.
- HGSOC는 처음에는 백금에 잘 반응하지만, 대부분 재발하면서 내성이 생긴다.
- Clear cell과 LGSOC는 처음부터 백금 반응이 약한 편이다. 이 아형들은 표적치료 후보가 더 절실하다.
- MMR 결핍 endometrioid는 면역항암제 반응이 기대되는 쪽이다.

→ **3D 모델은 보통 2D보다 약물에 덜 반응한다고 알려져 있다. 슬라이드 heatmap의 "resistance" 카테고리와 백금 내성 관련 유전자가 3D에서 어떻게 변하는지 볼 가치가 있을 것 같음**

## 4. 세포주 8종 비교

**백금에 잘 듣는 건 A2780 하나이고, 나머지는 대부분 내성이거나 백금 치료를 받은 환자에게서 왔다.**<br>변이는 문헌 검색 기준, "확인 필요"는 따로 검색 필요

<table header-row="true" header-column="false">
	<tr>
		<td>세포주</td>
		<td>아형 (DepMap)</td>
		<td>DepMap ID</td>
		<td>유래</td>
		<td>주요 변이</td>
		<td>백금 반응</td>
		<td>ppt</td>
	</tr>
	<tr>
		<td>OVCAR-3</td>
		<td>HGSOC</td>
		<td>ACH-000001 (NIHOVCAR3)</td>
		<td>1982, 복수. 항암치료(cyclophosphamide·doxorubicin·cisplatin) 후 진행한 환자</td>
		<td>TP53, CCNE1 증폭 (확인 필요)</td>
		<td>내성</td>
		<td>–</td>
	</tr>
	<tr>
		<td>OVSAHO</td>
		<td>HGSOC</td>
		<td>ACH-000409</td>
		<td>56세 일본인, 복막 전이 (FIGO III)</td>
		<td>TP53, RB1 이상</td>
		<td>확인 필요</td>
		<td>–</td>
	</tr>
	<tr>
		<td>HeyA8</td>
		<td>HGSOC (문헌상 LGSOC 특징)</td>
		<td>ACH-000542</td>
		<td>HEY 세포를 누드 마우스 복강에서 키운 파생주</td>
		<td>KRAS G12D, BRAF G464E(HEY), TP53 wild-type</td>
		<td>확인 필요</td>
		<td>○</td>
	</tr>
	<tr>
		<td>SKOV-3</td>
		<td>SOC (장액성, 등급 미표기)</td>
		<td>ACH-000811</td>
		<td>1973, 64세 백인, 복수</td>
		<td>PIK3CA H1047R, ARID1A Q586\*, TP53 S90Pfs\*33 (DepMap 확인), ERBB2 증폭 (CN 확인 필요)</td>
		<td>내성</td>
		<td>○</td>
	</tr>
	<tr>
		<td>A2780</td>
		<td>Endometrioid</td>
		<td>ACH-000657</td>
		<td>치료 전 환자 종양</td>
		<td>ARID1A, PIK3CA, PTEN, MMR 결핍, TP53 wild-type</td>
		<td>**민감** (내성 파생주 A2780cis 있음)</td>
		<td>○</td>
	</tr>
	<tr>
		<td>OVTOKO</td>
		<td>Clear cell</td>
		<td>ACH-000663</td>
		<td>항암치료(CAP 5–6회) 후 전이 병변</td>
		<td>ARID1A</td>
		<td>확인 필요 (치료 후 유래)</td>
		<td>○</td>
	</tr>
	<tr>
		<td>RMG-I</td>
		<td>Clear cell</td>
		<td>ACH-000719</td>
		<td>일본, Nozawa 등 수립</td>
		<td>ARID1A wild-type, TERT promoter, FANCL W57\* (DepMap 확인)</td>
		<td>확인 필요</td>
		<td>–</td>
	</tr>
	<tr>
		<td>RMG-II</td>
		<td>Clear cell (문헌 기준)</td>
		<td>DepMap 미등록</td>
		<td>일본</td>
		<td>MLH1 변이</td>
		<td>확인 필요</td>
		<td>–</td>
	</tr>
</table>

- **형태 차이:** OVTOKO는 간엽(mesenchymal) 성질, RMG-II는 상피(epithelial) 성질로 분류된 보고가 있다. 같은 clear cell이어도 EMT 점수가 다를 수 있다.
- **아형 표기 주의:** DepMap 표기와 문헌 분류가 다른 세포주가 있다. HeyA8은 DepMap에서 HGSOC지만 TP53 wild-type에 KRAS·BRAF 변이가 있어 LGSOC 특징을 보이고, SKOV-3는 SOC(장액성, 등급 미표기)지만 PIK3CA·ARID1A 변이로 endometrioid/clear cell에 가깝다는 보고가 있다. 그래서 SKOV-3·A2780 결과를 전형적인 HGSOC로 일반화하지 않는다.

## 5. 세포주별 상세

각 세포주를 정체 · 핵심 생물학 · 연구에서 주의할 점 · 이 프로젝트에서 볼 것 순서로 정리했다.

### OVCAR-3 (HGSOC)

- **정체:** 1982년 미국 NIH에서 수립. cyclophosphamide·doxorubicin·cisplatin 치료 후에도 진행한 환자의 복수에서 얻었다.
- **핵심 생물학:** 여러 항암제에 내성이고, 염색체 수가 비정상(3배체 근처)이다. TP53 변이와 CCNE1 증폭이 알려져 있다 (CCLE 확인 필요).
- **주의:** HGSOC 모델로 가장 널리 쓰이지만, CCNE1 증폭형이라 BRCA 결핍형 HGSOC와는 약물 반응이 다를 수 있다.
- **이 프로젝트:** 데이터가 오면 HGSOC 대표로 백금 내성·DNA 복구 경로가 3D에서 어떻게 변하는지 본다.

### OVSAHO (HGSOC)

- **정체:** 56세 일본인 환자의 복막 전이 병변(FIGO III 고등급 장액성 선암)에서 얻었다.
- **핵심 생물학:** TP53 변이와 RB1 경로 이상이 있다. 유전체 특징이 실제 HGSOC 종양과 가장 비슷한 세포주로 평가됐다 (Domcke 2013 순위 최상위권).
- **주의:** 자라는 속도가 느리고 마우스 피하 이식이 잘 안 된다.
- **이 프로젝트:** "실제 환자 종양에 가까운가"를 따질 때 가장 좋은 기준점이 될 수 있다. 느린 성장이 3D 형성에 영향을 줄 수 있다.

### HeyA8 (HGSOC · DepMap)

- **정체:** HEY 세포주(1985, 복막 종양의 이종이식에서 유래)를 누드 마우스 복강에 넣어 다시 얻은 파생주다.
- **핵심 생물학:** KRAS G12D와 BRAF G464E(HEY에서 보고)로 RAS/MAPK 경로가 켜져 있다. TP53은 wild-type.
- **주의:** DepMap은 HGSOC로 표기한다. 하지만 TP53 wild-type에 KRAS·BRAF 변이가 있어 LGSOC 특징에 가깝고, 문헌에서는 LGSOC로 분류하기도 한다. 마우스에서 잘 자라고 전이도 잘해 복막 전이 연구에 많이 쓴다.
- **이 프로젝트:** MAPK 경로가 3D에서 더 강해지면 MEK 억제제(또는 avutometinib + defactinib) 스토리로 이어질 수 있다.

### SKOV-3 (SOC · DepMap)

- **정체:** 1973년 64세 백인 환자의 복수에서 얻었다.
- **핵심 생물학:** PIK3CA·ARID1A 변이, TP53 단백 없음, CDKN2A 결손, ERBB2(HER2) 증폭이 알려져 있다. cisplatin·doxorubicin에 내성이다.
- **주의:** DepMap은 SOC(장액성, 등급 미표기)로 표기한다. 다만 변이 양상(PIK3CA H1047R, ARID1A 절단형)은 endometrioid/clear cell에 가깝다는 보고가 있다. TP53은 문헌마다 표기가 달랐는데, DepMap에서 S90Pfs\*33 frameshift(단백 없음)로 확인됐다.
- **이 프로젝트:** ppt에서 2D/3D가 가장 깔끔하게 갈린 세포주다. PI3K/AKT 경로와 HER2 신호가 3D에서 달라지는지 본다.

### A2780 (Endometrioid)

- **정체:** 치료 전 환자의 종양에서 얻었다. cisplatin 내성 파생주 A2780cis의 부모 세포주다.
- **핵심 생물학:** ARID1A·PIK3CA·PTEN 변이가 있고, MMR 단백 여러 개가 소실돼 변이 수가 매우 많다. TP53은 wild-type.
- **주의:** 백금 민감 세포주라 내성 연구에 많이 쓰이지만 HGSOC 모델은 아니다.
- **이 프로젝트:** ppt에서 2D/3D가 거의 갈리지 않았다. 3D 형성 상태와 변이가 많은 배경(샘플 간 차이가 커질 수 있음)을 함께 본다.

### OVTOKO (Clear cell)

- **정체:** CAP 항암치료를 5–6회 받은 환자의 전이 병변에서 얻었다 (Gorai 등).
- **핵심 생물학:** ARID1A 변이. 모양이 다양하고(입방형·방추형·거대세포) cytokeratin과 vimentin을 함께 발현해 간엽 성질이 있다. BRD2 의존성이 보고됐다.
- **주의:** 치료 후 유래라 백금 내성이 있을 가능성이 높다 (확인 필요).
- **이 프로젝트:** hypoxia·glycolysis·EMT 신호가 3D에서 강해지는지, BET 억제제 같은 ARID1A 표적 전략과 연결되는지 본다.

### RMG-I (Clear cell)

- **정체:** 일본에서 Nozawa 등이 수립했다.
- **핵심 생물학:** clear cell이지만 ARID1A wild-type로 보고됐다.
- **이 프로젝트:** ARID1A 변이형(OVTOKO)과 비교할 수 있는 대조군이 된다.

### RMG-II (Clear cell)

- **정체:** 일본에서 수립된 clear cell 세포주. CA602 항원 연구에 쓰였다.
- **핵심 생물학:** MLH1 변이, 상피(epithelial) 성질이고 EMT 점수가 낮다는 보고가 있다.
- **주의:** 공개 자료가 가장 적고 DepMap(CCLE)에 등록돼 있지 않다. 변이는 문헌이나 자체 시퀀싱으로 확인해야 한다.
- **이 프로젝트:** 같은 clear cell인 OVTOKO(간엽)와 대비해 EMT 관련 3D 변화를 볼 수 있다.

## 6. 이 프로젝트에서 볼 점

**DepMap 기준으로 지금 분석하는 4종 중 HGSOC는 HeyA8 하나이고, 그마저 TP53 wild-type이라 전형적인 HGSOC가 아니다.** 따라서 현재 결론은 "전형적 HGSOC가 아닌 난소암 세포주에서 3D의 의미"로 한정해 말하고, OVCAR-3·OVSAHO 데이터가 오면 일반화할 수 있다.

1. **4종 공통 신호는 강한 근거다.** 출발 조직·변이가 다 다른데도 공통으로 변하는 pathway는 "아형과 무관한 3D 효과"로 말할 수 있다.
2. **세포주 특이 신호는 driver와 연결해 본다.** HeyA8 → MAPK, SKOV-3·A2780 → PI3K/AKT, OVTOKO → ARID1A·hypoxia. 이 짝이 4단계(교차 분석)의 출발점이다.
3. **백금 반응 기준선이 다르다.** A2780만 민감이고 나머지는 내성 쪽이다. heatmap의 "resistance" 카테고리는 세포주마다 출발점이 다르다는 걸 전제로 본다.
4. **MMR 결핍 세포주(A2780, RMG-II)는 계대 중 변화가 클 수 있다.** A2780 샘플이 PCA에서 흩어진 이유의 후보 중 하나다 (가설).
5. **EMT는 세포주 기본값이 다르다.** OVTOKO는 간엽, RMG-II는 상피 성질이라 EMT 점수는 같은 세포주 안에서 2D 대비 변화로만 비교한다.
6. **CCLE로 확인할 목록:** OVCAR-3(DepMap 이름 NIHOVCAR3)의 TP53·CCNE1, SKOV-3의 copy number(ERBB2·CDKN2A), 각 세포주의 백금 반응(GDSC/PRISM), RMG-I 변이 정리. RMG-II는 DepMap 미등록.

## 7. 출처

이 환경에서는 논문 페이지를 직접 열 수 없어 검색 결과 요약을 근거로 썼다. 중요한 수치는 원문에서 다시 확인할 것.

- 통계: [Global epidemiology of ovarian cancer (Cancer Biol Med 2026)](https://pmc.ncbi.nlm.nih.gov/articles/PMC13449713/) · [2022년 국가암등록통계 (정책브리핑)](https://www.korea.kr/news/policyNewsView.do?newsId=148938135) · [ACS 난소암 생존율](https://www.cancer.org/cancer/types/ovarian-cancer/detection-diagnosis-staging/survival-rates.html) · [UKCTOCS (Lancet 2021)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8192829/)
- 기원·분류: [Kurman & Shih, Am J Pathol 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC5808151/)
- 치료: [FDA mirvetuximab 승인](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-mirvetuximab-soravtansine-gynx-fra-positive-platinum-resistant-epithelial-ovarian) · [MIRASOL (NEJM 2023)](https://www.nejm.org/doi/full/10.1056/NEJMoa2309169) · [avutometinib + defactinib 승인 (MSK)](https://www.mskcc.org/news/fda-approves-avutometinib-defactinib-combination-for-treating-recurrent-low-grade-serous-ovarian-cancer-with-kras-mutation) · [1차 PARP 억제제 (ESMO Open)](https://pmc.ncbi.nlm.nih.gov/articles/PMC7783599/) · [PAOLA-1 (NEJM 2019)](https://www.nejm.org/doi/full/10.1056/NEJMoa1911361)
- 세포주: [ATCC OVCAR-3](https://www.atcc.org/products/htb-161) · [ATCC SK-OV-3](https://www.atcc.org/products/htb-77) · [OVSAHO 데이터시트 (Sigma)](https://www.sigmaaldrich.com/US/en/product/mm/scc294) · [OVSAHO 이종이식 (Sci Rep 2020)](https://www.nature.com/articles/s41598-020-67533-1) · [Domcke et al., Nat Commun 2013](https://www.nature.com/articles/ncomms3126) · [세포주 아형 분류 (Frontiers 2023)](https://www.frontiersin.org/journals/cell-and-developmental-biology/articles/10.3389/fcell.2023.1104514/full) · [BRAF/MEK 변이 15개 세포주 (PLOS One 2008)](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0001279) · [A2780 (CancerTools)](https://cancertools.org/cell-lines/a2780-152706/) · [OVTOKO 수립 (Gynecol Oncol)](https://www.sciencedirect.com/science/article/abs/pii/S0090825885710979) · [OCCC 세포주 패널 (Ann Oncol)](https://www.annalsofoncology.org/article/S0923-7534%2819%2956258-5/fulltext) · [ARID1A·BET (Oncogene 2018)](https://www.nature.com/articles/s41388-018-0300-6) · [RMG-I ARID1A 상태 (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11215429/)
