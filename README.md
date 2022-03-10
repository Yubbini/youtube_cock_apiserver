# YoutubeCock

## Setup

### NodeJS Version
YoutubeCock은 NodeJS LTS 버전인 `16.14.0` 사용을 권장합니다.

[nvm](https://github.com/nvm-sh/nvm#installing-and-updating) 사용 시
```shell
$ nvm use 16
```

[asdf](https://github.com/asdf-vm/asdf) 사용 시
```shell
# Add nodejs plugin
$ asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Install nodejs 16.14.0
$ asdf install nodejs 16.14.0 
```

### Environment Variable
개발자 개인의 Local 환경에 의존적이지 않도록 하기 위해 환경변수를 따로 관리하는 것을 권장합니다.

YoutubeCock은 [dotenv](https://github.com/motdotla/dotenv) 를 통해 환경변수를 관리하고 있습니다.

PROJECT_ROOT에 `.env` 파일을 추가하고 환경변수를 추가하시길 바랍니다.

`.env` 파일은 `.gitignore` 에 의해 Except 처리가 되어있습니다.

개인이 직접 설정해주시길 권장드립니다.

### Install dependencies
YoutubeCock을 실행하기 전 의존성을 설치가 필요합니다.
```shell
# At project root
$ npm install
```

## How to start

### Start
```shell
$ npm run start
```

### Start dev mode
Hot loading을 지원하기 위해 [nodemon](https://github.com/remy/nodemon) 을 사용하고 있습니다.
```shell
$ npm run start-dev
```

### Test
Test framework로 [Jest](https://jestjs.io/) 를 사용하고 있습니다.
```shell
$ npm run test
```

### Swagger
API documentation을 위해 [Swagger](https://swagger.io/) 를 사용하고 있습니다.

환경변수 `SWAGGER_ON` 를 `true` 로 설정 시 `http://localhost:8080/swagger_docs` 을 통해 확인할 수 있습니다.

## License

[MIT](https://github.com/nishanths/license/blob/master/LICENSE)