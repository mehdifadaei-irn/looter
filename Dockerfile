# Build Stage
FROM node:16-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

ARG MORALIS_API_KEY="McDEmVq9B72ws5fHMbZogGimAMC5hUZxDsnNmoFgJQMfb5wfL3aN5XVusMNQKhnf"
ENV NEXT_PUBLIC_MORALIS_API_KEY=$MORALIS_API_KEY
ARG WALLET_PROJECT_ID="8b613e9540de4d92d09f5ed1611877c9"
ENV NEXT_PUBLIC_SITE_URL=$WALLET_PROJECT_ID
ARG ALCHEMY_KEY="8b613e9540de4d92d09f5ed1611877c9"
ENV NEXT_PUBLIC_ALCHEMY_KEY=$ALCHEMY_KEY


# Production Stage
FROM node:16-alpine AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]