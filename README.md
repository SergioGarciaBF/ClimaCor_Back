# ClimaCor_Back

Este projeto fornece uma API para controlar dispositivos Tuya e obter informações de status através de endpoints HTTP com uma camada de adicional de segurança por meio da blockchain Ethereum.

## Endpoints da API

### 1. Obter Status do Dispositivo

**Método:** GET  
**URL:** `http://localhost:5000/tuya/status/{deviceId}`  

Substitua `{deviceId}` pelo ID do dispositivo Tuya que você quer consultar.

**Exemplo:**  
`http://localhost:5000/tuya/status/your_device_id`

### 2. Ligar/Desligar Luz

**Método:** POST  
**URL:** `http://localhost:5000/tuya/switch/{deviceId}/{value}`  

Substitua `{deviceId}` e `{value}`:

- `{deviceId}`: ID do dispositivo Tuya.
- `{value}`: `true` para ligar, `false` para desligar.

**Exemplo:**  
`http://localhost:5000/tuya/switch/your_device_id/true`

### 3. Mudar Cor da Lâmpada

**Método:** POST  
**URL:** `http://localhost:5000/tuya/change_color/{deviceId}/{value}`  

Substitua `{deviceId}` e `{value}`:

- `{deviceId}`: ID do dispositivo Tuya.
- `{value}`: Um objeto JSON representando a cor, por exemplo, `{"h":100,"s":50,"v":50}`. Deve ser passado como string no URL.

**Exemplo:**  
`http://localhost:5000/tuya/change_color/your_device_id/%7B%22h%22%3A100%2C%22s%22%3A50%2C%22v%22%3A50%7D`

## Como Usar

Para usar a API, substitua os placeholders nos URLs de exemplo acima pelos valores reais do seu dispositivo Tuya. Certifique-se de que o servidor esteja em execução antes de fazer as requisições.

## Requisitos

- Node.js
- Conexão com API da Tuya
- Configuração correta no arquivo `.env` com as variáveis necessárias, como `SERVER_PORT` e `WEB3_PROVIDER_URL`.

## Instalação

1. Clone este repositório.
2. Execute `npm install` para instalar as dependências.
3. Configure seu arquivo `.env` na raiz do projeto.
4. Inicie o servidor com `node ./src/app.js`.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
