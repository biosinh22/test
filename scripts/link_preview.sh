#!/usr/bin/env bash
# 사용자가 서버(/data/ksh3/ov)에서 돌린 바로가기 미리보기 명령 백업 (2026-10-07).
# 링크는 만들지 않고, 만들 링크 목록만 /tmp/link_preview.txt 에 적는다.
#   work/bam/<새 이름>    <-  ov_cellline/.../BAM_files/<원본>
#   work/fastq/<새 이름>  <-  ov_cellline/.../RawFASTQ|RawData/<원본>
# 새 이름 = 원본 파일명에서 sample_id(마크로젠 ID)를 sample_name 으로 바꾼 것. 대응표는 samples.csv.

cd /data/ksh3/ov && tail -n +2 samples.csv | while IFS=, read -r id name rest; do find ov_cellline \( -path '*/BAM_files/*' -o -path '*/RawFASTQ/*' -o -path '*/RawData/*' \) -type f -name "${id}*" | while IFS= read -r f; do case "$f" in */BAM_files/*) sub=bam;; *) sub=fastq;; esac; b=$(basename "$f"); echo "work/$sub/${b/$id/$name}  <-  $f"; done; done > /tmp/link_preview.txt; head -12 /tmp/link_preview.txt; echo "---"; wc -l < /tmp/link_preview.txt; cut -d/ -f2 /tmp/link_preview.txt | sort | uniq -c
