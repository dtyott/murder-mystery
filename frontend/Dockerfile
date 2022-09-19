FROM node:14

WORKDIR /code 

COPY ./package.json /code/package.json
COPY ./package-lock.json /code/package-lock.json

RUN npm install 

COPY . /code

RUN npm config set proxy http://server:8000 

CMD ["npm", "start"]
