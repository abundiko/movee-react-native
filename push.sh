git add .

COMMIT_MESSAGE="made some optimizations v1.0.002"

git commit -m "$COMMIT_MESSAGE"

git push origin dev

eas update --branch preview --message "$COMMIT_MESSAGE"

