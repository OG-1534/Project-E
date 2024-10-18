#!/bin/bash

# Configuration
BACKUP_DIR="/path/to/backups"  # Change this to your desired backup directory
DB_NAME="your_database_name"
DB_USER="your_db_user"
DB_HOST="localhost"
DB_PORT="5432"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/db_backup_$DATE.sql.gz"

# Ensure the backup directory exists
mkdir -p "$BACKUP_DIR"

# Dump and compress the PostgreSQL database
pg_dump -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" "$DB_NAME" | gzip > "$BACKUP_FILE"

# Optional: Copy the backup to a remote server (comment out if not needed)
# scp "$BACKUP_FILE" user@remote_host:/path/to/remote/backup

# Log the backup operation
echo "[$(date)] Database backup saved to $BACKUP_FILE" >> /path/to/backup_log.txt

# Exit
exit 0
