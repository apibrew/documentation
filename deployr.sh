3git add . -A
git commit -m '+fixes'
git push
ssh root@tisserv.net "cd documentation; git pull; sh build.sh"
