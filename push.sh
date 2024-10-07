git add .

COMMIT_MESSAGE="fixed notification import error, added movie|series filter, ui improvements"

git commit -m "$COMMIT_MESSAGE"

git push origin dev

# eas update --channel preview --message "$COMMIT_MESSAGE"

