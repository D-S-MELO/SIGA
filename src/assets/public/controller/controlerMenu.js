let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let busca = document.querySelector('.bx-search-alt-2');
let getOut = document.getElementById('log_out');

if (btn) {
  btn.onclick = function () {
    sidebar.classList.toggle('active');
  };
}
if (sidebar) {
  busca.onclick = function () {
    sidebar.classList.toggle('active');
  };
}
if (getOut) {
  getOut.onclick = function () {
    window.location.href = 'logout';
  };
}

$(document).ready(function () {
  $('#busca').keyup(function () {
    var val = $.trim($(this).val()).toLowerCase();
    $('.nav_list li').hide();
    $('.nav_list li').each(function () {
      var text = $(this).find('a span').text().toLowerCase();
      if (text.indexOf(val) != -1 || $(this).find('#busca').length > 0) {
        $(this).show();
      }
    });
  });
});
