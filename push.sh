git add .

COMMIT_MESSAGE="added backend url more public"

git commit -m "$COMMIT_MESSAGE"

git push origin dev

eas update --branch preview --message "$COMMIT_MESSAGE"

