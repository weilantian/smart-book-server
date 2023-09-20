FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

ENV DATABASE_URL=postgres://$RDS_USER:$RDS_PASS@$RDS_HOST:5432/$RDS_DB?sslcert=ap-southeast-2-bundle.pem
ENV JWT_SECRET=$JWT_SECRET

RUN npm install
COPY . .

#RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["node","dist/main.js"]