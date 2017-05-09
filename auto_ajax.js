$.fn.ajax_submit = function() {

		var botao = $(this).find('button[type=submit]');
		botao.data('texto',botao.html()).html(botao.data('loading-text')).css('pointer-events','none').attr('disabled',true);

		var callback = $(this).attr('data-callback');
		var url = $(this).attr('action') || $(this).attr('href');
		var update_target = $(this).attr('data-update');
		var append_target = $(this).attr('data-appendTo') || $(this).attr('data-append');
		var prepend_target = $(this).attr('data-prependTo') || $(this).attr('data-prepend');
		console.log($(this).serialize());

		var metodo = "POST";
		if (typeof $(this).attr('method') !== 'undefined'){
			metodo = $(this).attr('method');
		}

		$.ajax( url,
		{
			data: $(this).serialize(),
			type: metodo,
			dataType: "html",
			context: this,
			success: function(data) {
				console.log('sucesso!');

				if (callback) { callback(); }
				if (update_target) { $(update_target).html(data); }
				if (append_target) { $(append_target).append(data); }
				if (prepend_target) { $(prepend_target).prepend(data); }
			},
			error: function(data) {
				console.log(data);
			},
			always:function(data){
			}
		}).always(function(){
			botao.html(botao.data('texto')).css('pointer-events','').removeAttr('disabled');
		});
	};

	$.fn.autoAjax = function() {
		console.log('auto ajax!');
		$(this).ajax_submit();
		return false;
	};

	$(document).ready(function(){
		$('form[data-remote="auto-ajax"]').on('submit', function(e){
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			return $(this).autoAjax();
		});

		$('a[data-remote="auto-ajax"], button[data-remote="auto-ajax"]').on('click', function(e){
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			return $(this).autoAjax();
		});

		$('select[data-remote="auto-ajax"]').on('change', function(){
			return $(this).autoAjax();
		});

	});
