git add .

COMMIT_MESSAGE="made home filter tabs dynamic, made optimisations to movie screen. TESTING: video playback continue from last stop 1.0.006"

git commit -m "$COMMIT_MESSAGE"

git push origin master

eas update --branch preview --message "$COMMIT_MESSAGE"

