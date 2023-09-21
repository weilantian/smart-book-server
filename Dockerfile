FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn
COPY . .

#RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["node","dist/main.js"]