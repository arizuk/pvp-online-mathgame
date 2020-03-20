server:
	poetry run uvicorn tashizan.server:app --ws websockets --host 0.0.0.0

devserver:
	poetry run uvicorn tashizan.server:app --ws websockets \
		--reload --reload-dir tashizan
