git add .

COMMIT_MESSAGE="added series differentiator"

git commit -m "$COMMIT_MESSAGE"

git push origin dev

eas update --branch dev --message "$COMMIT_MESSAGE"

