#!/bin/bash
#
# Perform to get Birgitta database dump from remote machine to local machine.

set +H

# Set password of Birgitta database on remote from a password file
PASSWD=$(<birgitta_database_pass.txt)

# Birgitta remote machine
BIRGITTA_REMOTE="centos@158.39.75.92"

# Set home path on Birgitta remote machine
HOME_PATH="/home/centos/"

# Set Birgitta database dump file name
BIRGITTA_MYSQLDUMP_FILE="birgitta.mysqldump-$(date +%Y-%m-%d_%H-%M-%S).sql"

# Create the database dump command
dump_cmd="\"/usr/bin/mysqldump --compatible=ansi -u root -p${PASSWD} birgitta\" > ${BIRGITTA_MYSQLDUMP_FILE}"

# Dump Birgitta database
echo "Dumping Birgitta database on remote machine..."
ssh -t ${BIRGITTA_REMOTE} "sudo su - mariadbcron -c ${dump_cmd}"
# error check
if (( $? != 0 )); then
    echo "Unable to dump Birgitta database on ${BIRGITTA_REMOTE}" >&2
    exit 1
fi

# Copy Birgitta dump file from remote to local machine
echo "Copying Birgitta dump file from remote to local machine..."
scp ${BIRGITTA_REMOTE}:${HOME_PATH}${BIRGITTA_MYSQLDUMP_FILE} .
# error check
if (( $? != 0 )); then
    echo "Unable to copy Birgitta database dump file from ${BIRGITTA_REMOTE} to local" >&2
    exit 1
fi

# Remove dumped Birgitta database file on remote machine
echo "Removing dumped Birgitta database file on remote machine..."
ssh ${BIRGITTA_REMOTE} rm -rf ${HOME_PATH}${BIRGITTA_MYSQLDUMP_FILE}
# error check
if (( $? != 0 )); then
    echo "Unable to remote Birgitta database dump file on ${BIRGITTA_REMOTE}" >&2
    exit 1
fi

# Get docker database container ID
echo "Getting docker database container ID..."
database_container_ID=`docker container ls | grep 'mariadb' | awk '{print $1}'`
# error check
if (( PIPESTATUS[0] != 0 || PIPESTATUS[1] != 0 || PIPESTATUS[2] !=0 )); then
    echo "Unable to get docker database container ID" >&2
    exit 1
fi
echo "database container ID: ${database_container_ID}"

# Load database dump file to docker database container
echo "Loading database dump file to docker database container"
docker exec -i ${database_container_ID} mysql -uomeka -pomeka omeka < ${BIRGITTA_MYSQLDUMP_FILE}
# error check
if (( $? != 0 )); then
    echo "Unable to load Birgitta database dump file to docker database container" >&2
    exit 1
fi
