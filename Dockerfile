FROM node:16.13-alpine as builder

ENV CI=true
ADD . /source
WORKDIR /source
RUN npm install && npm test && npm run build

FROM node:16.13-alpine

RUN npm install -g serve
COPY --from=builder /source/build /build
EXPOSE 3000
CMD ["serve", "-s", "/build", "-l", "3000"]
