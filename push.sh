git add .

COMMIT_MESSAGE="FIXED: more movies not loading when bottom reached. v.1.0.008"

git commit -m "$COMMIT_MESSAGE"

git push origin master

eas update --branch preview --message "$COMMIT_MESSAGE"

