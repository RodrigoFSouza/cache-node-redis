# Cache com NodeJs e Redis

Projeto com o propósito de demostrar o uso de cache em uma api simples em Node.

## Redis - Docker
Para rodar uma instância do Redis em um container docker basta usar o seguinte comando:

```shell script
docker run --name redis-cache -p 6379:6379 -d redis
```

## Rodando a aplicação
```shell script
node server.js
```