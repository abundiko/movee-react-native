git add .

COMMIT_MESSAGE="working on fixing video player"

git commit -m "$COMMIT_MESSAGE"

git push origin dev

eas update --branch preview --message "$COMMIT_MESSAGE"

