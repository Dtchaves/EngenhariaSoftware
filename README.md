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
