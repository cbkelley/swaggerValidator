clean:
	rm -rf node_modules/*

uninstall:
	npm uninstall swaggerValidator -g

install:
	npm install . -g

update:
	make uninstall install


.PHONY: test test-html