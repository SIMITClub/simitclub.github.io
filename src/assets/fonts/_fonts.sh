#!/bin/sh

#
# Download and convert .ttf files to .woff and .woff2 files,
# using an OCI runtime with python3 and fonttools installed.
#

# Exit if script is not run from the source directory.
test "$(basename "$(pwd)")" = "fonts" || exit 1

# Exit if no OCI runtime is found.
test "$(command -v nerdctl && nerdctl -v | grep nerdctl)" && oci=nerdctl
test "$(command -v podman  && podman  -v | grep podman)"  && oci=podman
test "$(command -v docker  && docker  -v | grep docker)"  && oci=docker
test -z "$oci" && printf %s\\n "No OCI runtime found." && exit 1

# Set variables.
container_name="fonttools"
dir="/home/nonroot"
url="https://github.com/google/fonts/raw/main"
exec_arg="-u root -w $dir $container_name"

# Remove existing font files.
rm -f ./*.ttf ./*.woff ./*.woff2

# Reset container.
if "$oci" ps -a --format "{{.Names}}" | grep "$container_name"; then
"$oci" kill "$container_name"
"$oci" rm -f "$container_name"
fi

# Run container.
"$oci" run --rm                                 \
           --detach                             \
           --security-opt label=disable         \
           --entrypoint "/usr/bin/top"          \
           --name "$container_name"             \
           --volume "$(pwd)/":"$dir":rw         \
           cgr.dev/chainguard/python:latest-dev

# Install fonttools[woff] for python3.
"$oci" exec -u root fonttools pip install "fonttools[woff]"

# Download and convert .ttf files.
printf "apache/syncopate/Syncopate-Bold.ttf
apache/syncopate/Syncopate-Regular.ttf
" | while read -r line; do
filename="$(basename "$line")"
"$oci" exec $exec_arg wget "${url}/${line}"
"$oci" exec $exec_arg fonttools ttLib.woff2 compress -o "${filename%.*}.woff2" "${filename}"
done

# Set read and write permissions for all users.
"$oci" exec $exec_arg chmod 644 ./*.woff2

# Remove build files.
rm -f ./*.ttf

unset oci dir url exec_arg container_name
