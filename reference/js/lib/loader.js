jQuery(function ($) {
	$('.jinr-loadmore').click(function () {
		let button = $(this);
		let cat_id = button.parent().attr('id');
		let params = jinr_loadmore_params1;
		
		let nowY = button.parent().data('year');
		let nowM = button.parent().data('month');
		let nowD = button.parent().data('day');
		let tag_name = button.parent().data('tag');

		let arrayID = [];
		button.parent().children('article').each(function (index, element) {
			arrayID.push($(element).data('id'));
		});

		/**
		 * 取得した値がカテゴリーID（数値型）かどうかを検証して
		 * ajaxで返す内容を変更する
		 */

		let data = {
			action: 'loadmore',
			query: params.posts,
			cat: cat_id,
			tag: tag_name,
			nowY: nowY,
			nowM: nowM,
			nowD: nowD,
			articleID: arrayID,
		};
		arrayID = [];

		$.ajax({
			url: params.ajaxurl,
			data: data,
			type: 'POST',
			beforeSend: function (xhr) {
				button.html('<span>Loading...</span>');
			},
			success: function (data) {
				if (data) {
					if (button !== null) {
						button.before(data);
					} else {
						$('#' + cat_id).append(data);
					}
					params.current_page++;
					button.html('<span>もっと見る</span>');
					if (params.current_page == params.max_page) {
						button.remove();
					}
				} else {
					button.remove();
				}
			},
		});
	});
});
