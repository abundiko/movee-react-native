git add .

COMMIT_MESSAGE="added hero image, added fr localization, added localization for login and register screens"

git commit -m "$COMMIT_MESSAGE"

git push origin dev

eas update --branch preview --message "$COMMIT_MESSAGE"

