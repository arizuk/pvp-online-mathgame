SRC := tashizan
PROTO_SRC := proto/*.proto

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
	rm -rf tashizan/pb/*pb.py
	protoc -I proto --python_out=tashizan/pb $(PROTO_SRC)

	protoc --js_out=binary:./static/js/pb $(PROTO_SRC)