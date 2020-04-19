SRC := mathgame
PROTO_CNAME := mathgame-gen-proto

.PHONY: proto

style:
	poetry run isort --recursive $(SRC)
	poetry run black $(SRC)
	poetry run flake8 $(SRC)

test:
	poetry run pytest tests

#FIXME:
dev/web_server:
	poetry run uvicorn mathgame.web_server:app --ws websockets \
		--reload --reload-dir $(SRC)

dualboot:
	poetry run python -m mathgame.dualboot

proto:
	rm -rf mathgame/protobuf || true
	rm -rf frontend/src/mathgame || true

	docker rm $(PROTO_CNAME) || true
	docker build -t $(PROTO_CNAME) -f proto/Dockerfile .
	docker run -it --name $(PROTO_CNAME) $(PROTO_CNAME)
	docker cp $(PROTO_CNAME):/app/python/mathgame/protobuf mathgame/protobuf
	docker cp $(PROTO_CNAME):/app/js/mathgame frontend/src/mathgame
	docker rm $(PROTO_CNAME)