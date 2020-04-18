SRC := tashizan


PROTO_CNAME := tashizan-taisen-gen-proto

.PHONY: proto

style:
	poetry run isort --recursive $(SRC)
	poetry run black $(SRC)
	poetry run flake8 $(SRC)

#FIXME:
dev/web_server:
	poetry run uvicorn tashizan.web_server:app --ws websockets \
		--reload --reload-dir $(SRC)

dualboot:
	poetry run python -m tashizan.dualboot

proto:
	docker rm $(PROTO_CNAME) || true
	docker build -t $(PROTO_CNAME) -f proto/Dockerfile .
	docker run -it --name $(PROTO_CNAME) $(PROTO_CNAME)
	docker cp $(PROTO_CNAME):/app/python proto
	docker cp $(PROTO_CNAME):/app/js proto
	docker rm $(PROTO_CNAME)