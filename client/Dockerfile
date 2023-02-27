# Build target development #
###########################
FROM node:14-alpine AS development

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

# Install development dependencies
RUN npm install

COPY . ./

EXPOSE 3000
CMD ["npm", "start"]