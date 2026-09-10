FROM node:20-alpine

WORKDIR /app

# The lockfile has to travel with the manifest: without it yarn resolves
# fresh versions and pulls a Next release the pinned Node cannot run.
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"] 