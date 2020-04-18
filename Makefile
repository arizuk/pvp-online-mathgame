SRC := tashizan
PROTO_SRC := proto/*.proto
PLUGIN_TS := ./frontend/node_modules/.bin/protoc-gen-ts

PYTHON_OUT = tashizan/pb
JS_OUT := frontend/src/pb

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
	# python
	rm -rf $(PYTHON_OUT)/*pb.py
	protoc -I proto --python_out=$(PYTHON_OUT) $(PROTO_SRC)

	# js/ts
	rm -rf $(JS_OUT)/*
	protoc \
	-I proto \
	--plugin=protoc-gen-ts="$(PLUGIN_TS)" \
	--js_out=import_style=commonjs,binary:$(JS_OUT) \
	--ts_out=import_style=commonjs,binary:$(JS_OUT) \
	$(PROTO_SRC)

	for f in $(JS_OUT)/*.js; do echo '/* eslint-disable */' | cat - "$${f}" > temp && mv temp "$${f}"; done
