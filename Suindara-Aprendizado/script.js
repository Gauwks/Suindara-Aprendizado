function adicionarRedeSocial() {
    const container = document.getElementById('redesSociaisContainer');

    const novaRedeSocial = document.createElement('div');
    novaRedeSocial.className = 'redeSocialItem';

    const novoInput = document.createElement('input');
    novoInput.type = 'url';


    novaRedeSocial.appendChild(novoInput);
    container.appendChild(novaRedeSocial);
  }  

  function ConcluirCastro(event){
     event.preventDefault();
     const nome = document.getElementById("nome").value;
     const idade = document.getElementById("idade").value;
     const email = document.getElementById("email").value;
     const biografia = document.getElementById("biografia").value;
     const nomeArtistico = document.getElementById("nomeArtistico").value;
     const fotoPerfil = document.getElementById("foto").value;
     const senha = document.getElementById("senha").value;
     const confirmarsenha = document.getElementById("confirmarsenha").value;
   
     if (senha !== confirmarsenha) {
       alert("As senhas não coincidem!");
       return;
     }
   
     const redesSociaisInputs = document.querySelectorAll("#redesSociaisContainer input");
     const redesSociais = Array.from(redesSociaisInputs).map(input => input.value).filter(url => url !== "");
   
     const autor = {
       nome,
       idade,
       email,
       biografia,
       nomeArtistico,
       fotoPerfil,
       senha,
       redesSociais
     };
   
     const transaction = db.transaction(["autores"], "readwrite");
     const objectStore = transaction.objectStore("autores");
     const request = objectStore.add(autor);
   
     request.onsuccess = function () {
       alert("Cadastro salvo com sucesso!");
     };
   
     request.onerror = function () {
       alert("Erro ao salvar o cadastro. Verifique se o email já está cadastrado.");
     };
   }
  

   function ConcluirCasdastroLeitor(event){
     event.preventDefault();

     const nome = doccument.getElementById("nome").value;
     const username = document.getElementById("username");
     const email = document.getElementById("email").value;
     const senha = document.getElementById("senha").value;
     const confirmarsenha = document.getElementById("confirmarsenha").value;

     if (senha != confirmarsenha) {
       alert("As senhas não coincidem!")
     }

     const leitor = {
       nome, 
       username,
       fotoPerfil,
       email,
       senha
     };

     const transaction = db.transaction(["leitores"], "readwrite");
     const objectStore = transaction.objectStore("leitores");
     const request = objectStore.add(leitor);
   
     request.onsuccess = function () {
       alert("Cadastro feito com sucesso!");
     };
   
     request.onerror = function () {
       alert("Erro ao fazer o cadastro. Verifique se o email já está cadastrado.");
     };


   }

   let db;

   const request = indexedDB.open("CadastroAutoresDB", 1);
   
   request.onerror = function (event) {
     console.error("Erro ao abrir o banco de dados:", event.target.errorCode);
   };
   
   request.onsuccess = function (event) {
     db = event.target.result;
     console.log("Banco de dados aberto com sucesso");
   };
   
   request.onupgradeneeded = function (event) {
    db = event.target.result;
  
    const autoresStore = db.createObjectStore("autores", { keyPath: "id", autoIncrement: true });
    autoresStore.createIndex("email", "email", { unique: true });
  
    const leitoresStore = db.createObjectStore("leitores", { keyPath: "id", autoIncrement: true });
    leitoresStore.createIndex("email", "email", { unique: true });
  };
  
   
