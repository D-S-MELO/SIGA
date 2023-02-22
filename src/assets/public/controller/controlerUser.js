//Função do campo de busca
$(document).ready(function () {
  $('#buscauser').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#tabela tbody tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
