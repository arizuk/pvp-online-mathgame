SRC := tashizan
PROTO_SRC := proto/*.proto

.PHONY: proto

style:
	poetry run isort --recursive $(SRC)
	poetry run black $(SRC)
	poetry run flake8 $(SRC)

server:
	poetry run uvicorn tashizan.server:app --ws websockets --host 0.0.0.0

devserver:
	poetry run uvicorn tashizan.server:app --ws websockets \
		--reload --reload-dir $(SRC)

proto:
	rm -rf tashizan/pb/*pb.py
	protoc -I proto --python_out=tashizan/pb $(PROTO_SRC)

	protoc --js_out=binary:./static/js/pb $(PROTO_SRC)