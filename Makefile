.PHONY: docker-image
docker-image:
	docker build -t nptytn/claystack-bot .

.PHONY: docker-run
docker-run:
	docker rm --force claystack-bot || true
	docker run -dit --name claystack-bot --mount type=bind,src=${PWD}/credentials,dst=/claystack/credentials nptytn/claystack-bot

.PHONY: docker-push
docker-push:
	docker image push nptytn/claystack-bot

.PHONY: log
log:
	docker exec -it claystack-bot pm2 logs

.PHONY: claim
claim:
	docker exec -it claystack-bot pm2 start /claystack/claystack-pm2.config.js --only "claim"

.PHONY: faucet
faucet:
	docker exec -it claystack-bot pm2 start /claystack/claystack-pm2.config.js --only "faucet"

.PHONY: stake
stake:
	docker exec -it claystack-bot pm2 start /claystack/claystack-pm2.config.js --only "stake"

.PHONY: docker-stake-service
docker-stake-service:
	docker service create \
		--name claystack-bot \
	 	--mount type=bind,src=${PWD}/credentials,dst=/claystack/credentials \
		-e TASK_SLOT={{.Task.Slot}} \
	 	-e SLOTS=${REPLICA} \
		--replicas=${REPLICA} \
		--restart-condition none \
		--entrypoint="/usr/local/bin/node /claystack/src/staking.js" \
	 	nptytn/claystack-bot:latest

.PHONY: docker-claim-service
docker-claim-service:
	docker service create \
		--name claystack-bot \
	 	--mount type=bind,src=${PWD}/credentials,dst=/claystack/credentials \
		-e TASK_SLOT={{.Task.Slot}} \
	 	-e SLOTS=${REPLICA} \
		--replicas=${REPLICA} \
		--restart-condition none \
		--entrypoint="/usr/local/bin/node /claystack/src/claimer.js" \
	 	nptytn/claystack-bot:latest

.PHONY: docker-faucet-service
docker-faucet-service:
	docker service create \
		--name claystack-bot \
	 	--mount type=bind,src=${PWD}/credentials,dst=/claystack/credentials \
		-e TASK_SLOT={{.Task.Slot}} \
	 	-e SLOTS=${REPLICA} \
		--replicas=${REPLICA} \
		--restart-condition none \
		--entrypoint="/usr/local/bin/node /claystack/src/faucet.js" \
	 	nptytn/claystack-bot:latest

.PHONY: docker-service-log
docker-service-log:
	docker service logs claystack-bot --follow

docker-service-down:
	docker service rm claystack-bot
	docker container rm claystack-bot
