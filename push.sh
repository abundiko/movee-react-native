git add .

COMMIT_MESSAGE="fixed stream screen not showing 1.0.005"

git commit -m "$COMMIT_MESSAGE"

git push origin master

eas update --branch preview --message "$COMMIT_MESSAGE"

