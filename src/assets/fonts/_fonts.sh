#!/bin/sh

#
# Download and convert .ttf files to .woff2 files, using an OCI runtime with
# python3 and fonttools installed.
#

# Exit if script is not run from the source directory.
test "$(basename "$(pwd)")" = "fonts" || exit 1

# Exit if no OCI runtime is found.
test "$(command -v nerdctl && nerdctl -v | grep nerdctl)" && oci=nerdctl
test "$(command -v podman  && podman  -v | grep podman)"  && oci=podman
test "$(command -v docker  && docker  -v | grep docker)"  && oci=docker
test -z "$oci" && printf %s\\n "No OCI runtime found." && exit 1

# Remove existing font files.
rm -f ./*.ttf ./*.woff2

# Kill and remove the container (to reset) if it's running.
sleep 1 && "$oci" container list -a | grep fonttools && "$oci" rm -f fonttools

dir="/home/nonroot"
url="https://github.com/google/fonts/raw/main/"

# Run the container in the background.
"$oci" run --rm -d            \
--security-opt label=disable  \
--entrypoint=/usr/bin/top     \
--name=fonttools              \
-v "$(pwd)/":"$dir":rw        \
cgr.dev/chainguard/python:latest-dev

# Install fonttools[woff] for python3.
"$oci" exec -u root fonttools /bin/sh -c 'pip install fonttools[woff]'

# Download .ttf files.
printf "/apache/syncopate/Syncopate-Bold.ttf
/apache/syncopate/Syncopate-Regular.ttf
" | while read -r line; do
"$oci" exec -u root -w "$dir" fonttools /bin/sh -c "wget \"${url}${line}\""
done

# Create a Python script to convert .ttf files to .woff2 files.
tee ./woff2.py <<EOF
import glob
import os
from fontTools.ttLib import TTFont
for path in glob.iglob('./*.ttf'):
    f = TTFont(path)
    f.flavor = 'woff2'
    f.save(os.path.splitext(path)[0] + '.woff2')
quit()
EOF

# Copy the Python script to the container.
"$oci" cp "$(find "$(pwd)" -name "woff2.py" -type f -exec realpath {} \;)" fonttools:/home/nonroot

# Generate .woff2 files.
"$oci" exec -u root -w "$dir" fonttools python3 woff2.py

# Set read and write permissions for all users.
"$oci" exec -u root -w "$dir" fonttools chmod 644 ./*.woff2

# Remove build files.
rm -f ./woff2.py
rm -f ./*.ttf

unset oci dir url