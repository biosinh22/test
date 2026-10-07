#!/usr/bin/env bash
# 마크로젠 샘플명으로 된 원본 파일은 그대로 두고, 우리 샘플명으로 된 바로가기(심볼릭 링크)를 만든다.
# 원본 이름을 바꾸면 md5sum.txt 검증(md5sum -c)이 파일을 못 찾기 때문.
#
# 사용법 (서버 또는 도커 컨테이너 안에서):
#   bash scripts/make_sample_links.sh <원본 폴더> <링크 만들 폴더> <대응표.csv>
#   예) bash scripts/make_sample_links.sh "/data/ksh3/ov/2.난소암(세포주)" /data/ksh3/ov/fastq sample_map.csv
#
# 대응표.csv 형식 (첫 줄은 머리글):
#   macrogen_id,sample
#   BUM1001,SKOV3_2D_P0
#   BUM1002,SKOV3_2D_P1
#   ...
#   → 원본 파일명이 macrogen_id 로 시작하면 그 부분만 sample 로 바꾼 이름으로 링크를 만든다.
#     예) BUM1001_1.fastq.gz → SKOV3_2D_P0_1.fastq.gz
#
# 먼저 원본 폴더에서 전송이 온전한지 확인:
#   cd "<원본 폴더 중 md5sum.txt 가 있는 곳>" && md5sum -c md5sum.txt
#
# 링크는 절대 경로로 만든다. 서버 본체 /data 와 컨테이너 /data 가 같은 경로라서 양쪽에서 모두 열린다.

set -euo pipefail

SRC=${1:?원본 폴더}
DEST=${2:?링크 만들 폴더}
MAP=${3:?대응표 csv}

SRC=$(cd "$SRC" && pwd)
mkdir -p "$DEST"

made=0
missing=()
while IFS=, read -r id name; do
  id=${id//$'\r'/}; name=${name//$'\r'/}
  [[ -z "$id" || "$id" == "macrogen_id" ]] && continue
  found=0
  # 하위 폴더까지 찾는다. md5sum.txt 같은 부속 파일은 건너뛴다.
  while IFS= read -r -d '' f; do
    base=$(basename "$f")
    new="${name}${base#"$id"}"
    ln -sfn "$f" "$DEST/$new"
    echo "$base  →  $new"
    found=1; made=$((made + 1))
  done < <(find "$SRC" -type f -name "${id}[_.-]*" ! -name 'md5*' -print0)
  [[ $found -eq 0 ]] && missing+=("$id")
done < "$MAP"

echo
echo "링크 ${made}개 생성: $DEST"
if ((${#missing[@]})); then
  echo "원본에서 못 찾은 ID: ${missing[*]}"
fi
