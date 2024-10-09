git add .

COMMIT_MESSAGE="fixed notification import error, added movie|series filter, ui improvements"

git commit -m "$COMMIT_MESSAGE"

git push origin master

eas update --branch preview --message "$COMMIT_MESSAGE"

