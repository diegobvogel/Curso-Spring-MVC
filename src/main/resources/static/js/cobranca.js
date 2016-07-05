$('#confirmacaoExclusaoModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  
  var codigoTitulo = button.data('codigo');
  var descricaoTitulo = button.data('descricao');
  
  var modal = $(this);
  var form = modal.find('form');
  var action = form.data('url-base');
  if (!action.endsWith('/')) {
	  action += '/';
  }
  form.attr('action', action + codigoTitulo);
  
  modal.find('.modal-body span').html('Tem certeza que deseja apagar o título <strong>' + descricaoTitulo + '</strong>?');
});

$(function () {
	$('[rel=tooltip]').tooltip();
	$('.js-currency').maskMoney({decimal: ',', thousands: '.', allowZero: true});
	
	$('.js-atualizar-status').on('click', function (event) {
		event.preventDefault();
		
		var botaoReceber = $(event.currentTarget);
		var urlReceber = botaoReceber.attr('href');

		var response = $.ajax({
			url: urlReceber,
			type: 'PUT'
		});
		
		response.done(function(e) {
			var codigoTitulo = botaoReceber.data('codigo');
			botaoReceber.hide();
			$('[data-role=' + codigoTitulo + ']').html('<span class="label label-success">' + e + '</span>');
		});
		
		response.fail(function(e) {
			Console.log(e);
			alert('Erro recebendo cobrança.');
		});
		
	});
});