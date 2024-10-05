git add .

COMMIT_MESSAGE="added series differentiator"

git commit -m "$COMMIT_MESSAGE"

git push origin dev

eas update --channel dev --message "$COMMIT_MESSAGE"

