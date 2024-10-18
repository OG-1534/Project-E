#!/bin/bash

# Configuration
BACKUP_FILE="/path/to/backups/db_backup_to_restore.sql.gz"  # Specify the backup file to restore
DB_NAME="your_database_name"
DB_USER="your_db_user"
DB_HOST="localhost"
DB_PORT="5432"

# Confirm restore action
read -p "Are you sure you want to restore the database from $BACKUP_FILE? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "Database restore cancelled."
    exit 0
fi

# Drop the existing database (use with caution)
dropdb -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" "$DB_NAME"

# Recreate the database
createdb -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" "$DB_NAME"

# Restore the database from the backup file
gunzip -c "$BACKUP_FILE" | psql -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" "$DB_NAME"

# Log the restore operation
echo "[$(date)] Database restored from $BACKUP_FILE" >> /path/to/recovery_log.txt

# Exit
exit 0
