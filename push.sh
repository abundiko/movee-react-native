git add .

COMMIT_MESSAGE="FEATURE: continue playback from last stop. v.1.0.007"

git commit -m "$COMMIT_MESSAGE"

git push origin master

eas update --branch preview --message "$COMMIT_MESSAGE"

