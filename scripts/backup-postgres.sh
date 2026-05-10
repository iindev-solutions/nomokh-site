#!/bin/sh
set -e
BACKUP_DIR=${BACKUP_DIR:-./backups}
POSTGRES_CONTAINER=${POSTGRES_CONTAINER:-nomokh-db-1}
POSTGRES_DB=${POSTGRES_DB:-nomokh}
POSTGRES_USER=${POSTGRES_USER:-nomokh}
STAMP=$(date +%Y%m%d-%H%M%S)
mkdir -p "$BACKUP_DIR"
docker exec "$POSTGRES_CONTAINER" pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > "$BACKUP_DIR/nomokh-$STAMP.sql.gz"
find "$BACKUP_DIR" -type f -name 'nomokh-*.sql.gz' -mtime +30 -delete
echo "Backup written to $BACKUP_DIR/nomokh-$STAMP.sql.gz"
