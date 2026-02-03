jQuery(function ($) {
	function loadmore() {
		let button = $(this);
		let page = button.data('page');
		let client_id = button.data('client-id');
		let dataDict = '';
		if (client_id !== undefined) {
			dataDict = $(`#${client_id}`).data();
		} else {
			return;
		}
		let timeSet = '';
		let catSet = '';
		if( dataDict.timedisp === 'on' ){
			timeSet = 'on';
		}else if(dataDict.timedisp === 'off' || dataDict.timedisp === ''){
			timeSet = 'off';
		}else{
			timeSet = 'off';
		}
		if( dataDict.catdisp === 'on' ){
			catSet = 'on';
		}else if(dataDict.catdisp === 'off' || dataDict.catdisp === ''){
			catSet = 'off';
		}else{
			catSet = 'off';
		}

		let arrayID = [];
		$(`#${client_id} article`).each(function (index, element) {
			arrayID.push($(element).data('id'));
		});

		let data = {
			action: 'postlist-loadmore',
			displayArticles: dataDict.ar,
			page: page,
			postNum: dataDict.postnum,
			category: dataDict.cat,
			buttonText: dataDict.btn,
			clientId: client_id,
			articleID: arrayID,
			timeDisp: timeSet,
			catDisp: catSet,
			column: dataDict.column,
			columnSp: dataDict.columnsp,
			listDesign: dataDict.listdesign,
			listDesignSp: dataDict.listdesignsp,
		};
		arrayID = [];
		$.ajax({
			url: postlist_loadmore.ajaxurl,
			data: data,
			type: 'POST',
			beforeSend: function (xhr) {
				button.html('<span>Loading...</span>');
			},
			success: function (data) {
				if (data) {
					$('#' + client_id).append(data);
					button.remove();
					$('div .' + client_id).click(loadmore);
				} else {
					button.remove();
				}
			},
		});
	}

	var loading = false;
	function loadmoreSlider() {
		var elLeft = $(this).children('article').last().offset().left;
		var scrollProps = $(this).scrollLeft();
		let postNum = $(this).data('postnum');
		let condition = (elLeft + elLeft / 3) * 0.9;
		let isMore = scrollProps > condition;

		if (isMore && !loading) {
			loading = true;
			let section = $(this);
			let client_id = section.data('clientid');
			let page = section.data('page');
			if (page === undefined) {
				page = 1;
			}
			let dataDict = $(`#${client_id}`).data();

			let timeSet = '';
			let catSet = '';
			if( dataDict.timedisp === 'on' ){
				timeSet = 'on';
			}else if(dataDict.timedisp === 'off' || dataDict.timedisp === ''){
				timeSet = 'off';
			}else{
				timeSet = 'off';
			}
			if( dataDict.catdisp === 'on' ){
				catSet = 'on';
			}else if(dataDict.catdisp === 'off' || dataDict.catdisp === ''){
				catSet = 'off';
			}else{
				catSet = 'off';
			}
			let arrayID = [];
			$(`#${client_id} article`).each(function (index, element) {
				arrayID.push($(element).data('id'));
			});

			let data = {
				action: 'postlist-loadmore',
				displayArticles: dataDict.ar,
				page: page,
				postNum: dataDict.postnum,
				category: dataDict.cat,
				articleID: arrayID,
				buttonText: dataDict.btn,
				clientId: client_id,
				articleID: arrayID,
				timeDisp: timeSet,
				catDisp: catSet,
				column: dataDict.column,
				columnSp: dataDict.columnsp,
				listDesign: dataDict.listdesign,
				listDesignSp: dataDict.listdesignsp,
			};

			$.ajax({
				url: postlist_loadmore.ajaxurl,
				data: data,
				type: 'POST',
			})
				.done((data) => {
					section.data('page', page + 1);
					if (data) {
						$('#' + client_id).append(data);
						$('div .' + client_id).remove();
					}
				})
				.always(() => {
					loading = false;
				});
		}
	}
	$('div .a--postlist-more').click(loadmore);
	$('section .d--postlist-slider-loader').scroll(loadmoreSlider);
});
