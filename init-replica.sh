#!/bin/bash
# init-replica.sh
# แก้จาก localhost เป็นชื่อ services
echo "Waiting for MongoDB to start..."
sleep 10

echo "Initializing replica set..."
docker exec mongodb_replica mongosh -u admin -p password --authenticationDatabase admin --eval '
  rs.initiate({
    _id: "rs0",
    members: [
      {
        _id: 0,
        host: "mongodb:27017", 
        priority: 1
      }
    ]
  })
'

echo "Verifying replica set status..."
docker exec mongodb_replica mongosh -u admin -p password --authenticationDatabase admin --eval 'rs.status()'

echo "Replica set initialization completed"