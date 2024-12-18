# Trabalho Engenharia de Software (ECG SYSTEM)

## Objetivo e principais features
O objetivo deste projeto é desenvolver um software inovador para facilitar a comunicação entre médicos e pacientes em relação a eletrocardiogramas (ECGs). Em um contexto onde as doenças cardíacas continuam a ser uma das principais causas de morte em 2024, é crucial implementar métodos automáticos eficientes para a identificação de distúrbios cardiovasculares. O software incluirá um classificador automático de ECG, que permitirá aos médicos optar pela classificação automática de exames, utilizando o proposto no seguinte paper: https://cinc.org/2024/Program/accepted/477_Preprint.pdf, para classificar seis condições clínicas. Além disso, as principais funcionalidades do sistema incluirão a criação de perfis para médicos e pacientes, o armazenamento seguro de exames, o controle de acesso baseado em usuários e a possibilidade de anotações dos médicos. Isso garantirá que apenas os médicos responsáveis possam acessar os exames dos seus pacientes, promovendo uma abordagem colaborativa e organizada no cuidado à saúde. O software será projetado para ser flexível, permitindo a substituição do modelo de IA por outros métodos de classificação no futuro, conforme necessário.

## Time do Projeto
- **Desenvolvedores:** 
  - Diogo Tuler (Full-stack)
  - Rafael Martins (Full-stack)
  - João Marcos Campos (Full-stack)

## Tecnologias

### React
Para o front-end, faremos uso do framework React. O React é uma biblioteca de JavaScript amplamente utilizada no mercado, que se destaca por sua facilidade de uso e modularidade. Sua capacidade de integrar HTML e JavaScript, por meio do JSX, facilita o desenvolvimento de interfaces dinâmicas e interativas, perfeitas para exibir os resultados do classificador de exames em tempo real.

### Flask
O back-end será desenvolvido com Flask, um microframework minimalista em Python. Flask é ideal para construir APIs RESTful que conectam o front-end React ao classificador de machine learning. Além de sua leveza, Flask oferece grande flexibilidade para integrar bibliotecas de machine learning e realizar o processamento dos exames no servidor de forma eficiente.

### PostgreSQL
Para o banco de dados, utilizaremos o PostgreSQL, um sistema de gerenciamento de banco de dados relacional open-source. Ele será responsável por armazenar metadados sobre os exames e outras informações relevantes. Sua robustez e suporte a operações complexas o tornam ideal para garantir a integridade e consistência dos dados no projeto.

### Docker
Para facilitar o processo de desenvolvimento e deploy, Docker será utilizado para containerizar a aplicação, garantindo um ambiente controlado e replicável em qualquer infraestrutura. Com Docker, é possível empacotar o front-end, back-end, banco de dados, e o ambiente de machine learning em contêineres separados, mas interligados.

### PyTorch
O classificador de exames utilizado no projeto foi implementado em PyTorch, uma das bibliotecas mais populares para machine learning. PyTorch oferece uma interface intuitiva e flexível, permitindo o desenvolvimento ágil de redes neurais e modelos de deep learning. No projeto, o modelo já está pronto e será integrado ao back-end Flask para realizar a classificação dos exames enviados. Graças ao PyTorch, o modelo pode ser facilmente ajustado e otimizado conforme as necessidades do sistema, com suporte a processamento em GPU para acelerar a inferência dos exames.

Essas tecnologias juntas fornecerão a base para um sistema completo, modular e eficiente para o recebimento e classificação de eletrocardiogramas.

### Backlog do produto
1. *Cadastro e autenticação de usuários (médicos e pacientes)*  
   - Como médico/paciente, quero poder me cadastrar e autenticar no sistema, para garantir a segurança do acesso aos exames.

2. *Perfil do médico e paciente*  
   - Como médico, quero gerenciar meu perfil para poder atualizar minhas informações de contato e especialização.
   - Como paciente, quero gerenciar meu perfil, permitindo atualizações de informações pessoais.

3. *Envio e armazenamento seguro de ECGs*  
   - Como médico, quero poder enviar e armazenar exames de ECG de forma segura no sistema, garantindo a integridade dos dados.

4. *Classificação automática de ECGs*  
   - Como médico, quero que o sistema classifique automaticamente os ECGs com base no modelo proposto, facilitando a análise de possíveis distúrbios cardíacos.

5. *Visualização dos resultados dos exames*  
   - Como médico/paciente, quero visualizar os resultados dos exames de ECG em tempo real, permitindo uma análise rápida e informativa.

6. *Anotações dos médicos nos exames*  
   - Como médico, quero adicionar anotações aos exames de ECG para registrar observações clínicas sobre os resultados.

7. *Controle de acesso baseado em perfis de usuário*  
   - Como administrador do sistema, quero garantir que apenas médicos responsáveis possam acessar os exames dos seus pacientes, para assegurar a privacidade e segurança dos dados.

8. *Histórico de exames de pacientes*  
   - Como paciente, quero acessar um histórico de exames de ECG que fiz, permitindo a consulta e o acompanhamento da minha saúde ao longo do tempo.

9. *Substituição flexível do classificador*  
   - Como desenvolvedor, quero garantir que o sistema permita a substituição do modelo de classificação de ECGs por outros no futuro, de maneira simples e modular.

10. *Integração com PyTorch para processamento em GPU*  
    - Como desenvolvedor, quero integrar o classificador ao PyTorch com suporte para processamento em GPU, permitindo a rápida inferência dos resultados dos exames.
      
11. *Perfil do adiministrador*
    - Como administrador, quero poder criar, atualizar, deletar e obter pacientes e médicos dentro do sistema.
    - Como administrador, quero poder gerenciar os acessos dos pacientes e médicos.

---
### Backlog da Sprint

1. *CRUD de perfis - Paciente*  
   - Implementar as funcionalidades de criação, leitura, atualização e exclusão dos perfis de pacientes.

2. *Autenticação e controle de acesso*  
   - Implementar a autenticação dos usuários, garantindo que apenas médicos responsáveis possam acessar os exames dos seus pacientes.

3. *Integração do classificador automático de ECGs*
   - Integrar o modelo de classificação de ECG baseado em PyTorch ao backend Flask, permitindo a classificação automática dos exames.

4. *CRUD de perfis - Médico*  
   - Implementar as funcionalidades de criação, leitura, atualização e exclusão dos perfis de médicos.

# Execução do Projeto

## Pré-requisitos
- Docker e Docker Compose instalados
- Python 3.12 ou superior
- Virtualenv para gerenciamento de ambiente virtual
- VSCode (opcional, para depuração com debugger)

## Passo a Passo para Primeira Execução

### 1. Inicialize o Banco de Dados com Docker
No diretório raiz do projeto, execute o seguinte comando para compilar a imagem e iniciar o banco de dados:

```bash
sudo apt update
sudo apt install postgresql-client
docker-compose up --build -d db
```

### 2. Configure o Ambiente Virtual para o Backend
No diretório server, crie e ative um ambiente virtual:

```bash
cd server
python3 -m venv venv
source venv/bin/activate  # No Windows, use venv\Scripts\activate
```

### 3. Instale as Dependências do Backend
Ainda no diretório server, instale as dependências:

```bash
pip install -r requirements.txt
```

### 4. Execute o Backend
Execute a aplicação no modo de depuração (se preferir, também pode usar o debugger do VSCode):

```bash
flask run
```

## Execuções Posteriores

### Reiniciar o Banco de Dados
Para iniciar o banco de dados sem recompilar a imagem, apenas execute:

```bash
docker-compose up -d db
```

### Reiniciar o Backend
Sempre que iniciar uma nova sessão de desenvolvimento:

Ative o ambiente virtual:

```bash
cd server
source venv/bin/activate  # No Windows, use venv\Scripts\activate
```

Execute o backend com:

```bash
flask run
```

## Instruções para o Frontend

### 1. Instale as Dependências do Frontend
No diretório `client`, instale as dependências do projeto com:

```bash
cd client
npm install
```

### 2. Execute o Frontend
Para rodar o frontend em ambiente de desenvolvimento, execute:

```bash
npm run dev
```

Isso iniciará o frontend, geralmente acessível em [http://localhost:3000](http://localhost:3000).

## Estrutura de Rede
- Backend: [http://localhost:4000](http://localhost:4000)
- Banco de Dados (Docker): `localhost:5432`
- Frontend: [http://localhost:3000](http://localhost:3000)

## Solução de Problemas
- Caso o backend não consiga conectar ao banco de dados, verifique se o banco está rodando com `docker ps`.
- Se houver mudanças nas dependências, lembre-se de atualizar o ambiente com `pip install -r requirements.txt` no backend ou `npm install` no frontend.
