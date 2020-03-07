**# FastFeet**

**##Ferramentas**
Aplicação criada utilizando Express, Sucrase, Nodemon e Sequelize (PostgreSQL);

**##Funcionalidades**
##1. Autenticação
Permite que um usuário se autentique na aplicação utilizando e-mail e uma senha.
A autenticação é feita utilizando JWT.
Validação dos dados de entrada utilizando Yup;

##2. Gestão de destinatários
Destinatários são mantidos (cadastrados/atualizados) na aplicação, esses contendo o nome do destinatário e campos de endereço: rua, número, complemento, estado, cidade e CEP.
O cadastro de destinatários só pode ser feito por administradores autenticados na aplicação.
O destinatário não pode se autenticar no sistema, ou seja, não possui senha.
