#!/usr/bin/env bash
# 외장하드의 원자료 폴더를 연구실 서버로 올린다. Mac 터미널에서 실행.
#
# 서버: ksh3@10.7.2.42 (salabserver2)
# 서버 본체 /data 가 도커 컨테이너 ksh3_con2 의 /data 와 같은 폴더라서,
# /data/ksh3/ov 로 올리면 컨테이너 안에서도 같은 경로로 보인다.
#
# 처음 한 번:  brew install rsync tmux   (Mac 기본 rsync는 --iconv 없음)
#
# 백그라운드로 돌리려면:
#   tmux new -s upload          → 이 스크립트 실행 → 비밀번호 입력 → Ctrl+b 누른 뒤 d
#   다시 보기: tmux attach -t upload   /   기록: tail -5 ~/rsync_ov.log
# 전원 연결 · 덮개 열어 두기 · 외장하드 연결 유지. 끊기면 같은 명령을 다시 실행하면 이어서 올라간다.
#
# 사용법:  bash scripts/upload_raw_data.sh          실제 전송
#          bash scripts/upload_raw_data.sh -n       시험 실행 (무엇이 올라갈지만 표시)

SRC="/Volumes/SAMSUNG/2.난소암(세포주)"     # 끝에 / 없음 → 서버에 폴더째로 들어감
DEST="ksh3@10.7.2.42:/data/ksh3/ov/"

caffeinate -is rsync -rtvhP "$@" \
  --iconv=utf-8-mac,utf-8 \
  --exclude='._*' --exclude='.DS_Store' \
  --log-file="$HOME/rsync_ov.log" \
  "$SRC" "$DEST"

# 다 올라갔는지 확인
#   Mac:   du -sh "/Volumes/SAMSUNG/2.난소암(세포주)"
#   서버:  du -sh "/data/ksh3/ov/2.난소암(세포주)"
#   같은 명령을 한 번 더 돌려서 전송할 파일 없이 끝나면 완료.
#
# 컨테이너 안에서 권한 문제가 생기면 (서버 본체 ksh3 는 uid 1121)
#   docker exec --user ksh3 ksh3_con2 id        → uid 가 1121 이 아니면 아래 실행
#   docker exec -u root ksh3_con2 chown -R ksh3:ksh3 /data/ksh3/ov
