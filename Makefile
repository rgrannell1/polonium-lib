
ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config config/eslint.json

eslint:
	$(ESLINT) $(ESLINT_FLAGS) src

FORCE:
