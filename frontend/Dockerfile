FROM node
RUN mkdir /app
WORKDIR /app
COPY . ./
RUN npm i -f
CMD ["npm", "run", "dev"]