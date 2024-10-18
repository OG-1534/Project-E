#!/bin/bash

# Configuration
LOG_DIR="/path/to/logs"
BACKUP_DIR="/path/to/backups"
DB_NAME="your_database_name"
DB_USER="your_db_user"
DB_HOST="localhost"
DB_PORT="5432"

# Clean up old logs (older than 30 days)
find "$LOG_DIR" -type f -mtime +30 -exec rm -f {} \;

# Clean up old backups (older than 30 days)
find "$BACKUP_DIR" -type f -mtime +30 -exec rm -f {} \;

# Run PostgreSQL maintenance (vacuum and reindex)
psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -c "VACUUM FULL;"
psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -c "REINDEX DATABASE \"$DB_NAME\";"

# Log the maintenance operation
echo "[$(date)] Maintenance completed: old logs and backups removed, database vacuumed and reindexed." >> /path/to/maintenance_log.txt

# Exit
exit 0
