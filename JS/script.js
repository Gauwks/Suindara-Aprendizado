function adicionarRedeSocial() {
    const container = document.getElementById('redesSociaisContainer');

    const novaRedeSocial = document.createElement('div');
    novaRedeSocial.className = 'redeSocialItem';

    const novoInput = document.createElement('input');
    novoInput.type = 'url';


    novaRedeSocial.appendChild(novoInput);
    container.appendChild(novaRedeSocial);
  }  