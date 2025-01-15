docker run -p 9092:9092 apache/kafka:3.9.0

docker exec -it 5394d3868b8ee3a132673ad75efaa2ccb53e3e488842d341aa71cf822fb1032f /bin/bash

// we have to move inside the kafka container so that we can run sh file or sell script file

cd opt/kafka/bin/

./kafka-topics.sh --describe --topic zaps-events --bootstrap-server localhost:9092