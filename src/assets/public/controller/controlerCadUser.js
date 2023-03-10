function limpa_formulario_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('logradouro').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}

function meu_callback(conteudo) {
  if (!('erro' in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('logradouro').value = conteudo.logradouro;
    document.getElementById('bairro').value = conteudo.bairro;
    document.getElementById('cidade').value = conteudo.localidade;
    document.getElementById('estado').value = conteudo.uf;
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulario_cep();
    alert('CEP não encontrado.');
    document.getElementById('cep').value = '';
  }
}

function pesquisacep() {
  let btn = document.querySelector('#cep');
  const valor = btn.value;
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep !== '') {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('logradouro').value = '...';
      document.getElementById('bairro').value = '...';
      document.getElementById('cidade').value = '...';
      document.getElementById('estado').value = '...';

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = '//viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);
    } //end if.
    else {
      //cep é inválido.
      limpa_formulario_cep();
      alert('Formato de CEP inválido.');
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulario_cep();
  }
}

$(document).ready(function () {
  $('#cep').mask('00000-000');
  $('#cpf').mask('000.000.000-00');
  $('#celular').mask('(00) 00000-0000');
  $('#fixo').mask('(00) 0000-0000');
});

$(document).ready(function () {
  // Adicione um manipulador de eventos 'click' para o botão de excluir
  $('.btn-excluir').on('click', function (event) {
    // Evite que o clique no botão cause a página a ser recarregada
    event.preventDefault();

    // Use o SweetAlert2 para exibir a mensagem de confirmação
    Swal.fire({
      title: 'Tem certeza?',
      text:
        'Você está prestes a excluir este usuário. Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6c757d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua-o!',
      width: '22em',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = $(this).data('id');
        $('#form-excluir-' + id).submit();
      }
    });
  });
});
