PROTO_SRC := src/*.proto
PLUGIN_TS := $(shell which protoc-gen-ts)
PYTHON_OUT = python
JS_OUT := js

PROTOC = protoc -I src -I /opt/include

gen:
	# python
	mkdir -p python
	$(PROTOC) --python_out=$(PYTHON_OUT) $(PROTO_SRC)

	# js/ts
	mkdir -p js
	$(PROTOC) \
	--plugin=protoc-gen-ts="$(PLUGIN_TS)" \
	--js_out=import_style=commonjs,binary:$(JS_OUT) \
	--ts_out=import_style=commonjs,binary:$(JS_OUT) \
	$(PROTO_SRC)

	for f in $(JS_OUT)/*.js; do echo '/* eslint-disable */' | cat - "$${f}" > temp && mv temp "$${f}"; done