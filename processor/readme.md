docker run -p 9092:9092 apache/kafka:3.9.0

docker exec -it 38d4c032f38babccf73c8e7634aabac206e055b1a84f4ea0ba0c98f39476f704 /bin/bash

// we have to move inside the kafka container so that we can run sh file or sell script file

cd opt/kafka/bin/

./kafka-topics.sh --describe --topic zaps-events --bootstrap-server localhost:9092