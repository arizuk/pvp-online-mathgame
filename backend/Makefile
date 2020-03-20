SRC := tashizan

style:
	poetry run isort --recursive $(SRC)
	poetry run black $(SRC)
	poetry run flake8 $(SRC)

server:
	poetry run uvicorn tashizan.server:app --ws websockets --host 0.0.0.0

devserver:
	poetry run uvicorn tashizan.server:app --ws websockets \
		--reload --reload-dir $(SRC)
