FROM node
WORKDIR /usr/share/react

RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs

COPY package.json package-lock.json ./

EXPOSE 3000

RUN npm install

COPY . .

RUN npm run build
