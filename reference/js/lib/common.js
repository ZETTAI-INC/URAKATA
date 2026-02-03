// JavaScript Document

// Androidのユーザーエージェント判別（CSSハック用）
(function ($) {
	if (navigator.userAgent.indexOf('Android') > 0) { 
		let body = document.getElementsByTagName('body')[0]; 
		body.classList.add('android'); 
	}
})(jQuery);

// YouTubeの全画面表示対策
(function ($) {
	var remove = function () {
		$('#sidebar').removeClass('animate');
	};
	setTimeout(remove, 1700);
})(jQuery);


(function ($) {
	$('.js--hamburger-trigger').click(function () {
		// クラス追加でデザイン変更
		$(this).toggleClass('js--hamburger-active');
		$('html').toggleClass('js--hamburger-hidden');
		$('.o--hamburger-menu-container').toggleClass('js--hamburger-open');
	});
})(jQuery);

//ヘッダーのsearchform
(function ($) {
	$('#headerSearch').click(function () {
		$(this).toggleClass('js--btn-active');
		if ($(this).hasClass('js--btn-active')) {
			$(this).removeClass('js--btn-nonactive');
			$(this).find('#headerSearchIcon').removeClass('jin-ifont-searchthin').addClass('jin-ifont-batuthin');
			$(this).find('#headerSearchLabel').html('CLOSE');
		} else {
			$(this).addClass('js--btn-nonactive');
			$(this).find('#headerSearchIcon').removeClass('jin-ifont-batuthin').addClass('jin-ifont-searchthin');
			$(this).find('#headerSearchLabel').html('SEARCH');
		}
		$('#HeaderSearchForm').toggleClass('js--form-active');
		$('#searchFormText').focus();
	});
	$(document).on('click', function (e) {
		if ($('#headerSearch').hasClass('js--btn-active')) {
			if (!$(e.target).closest('#HeaderSearchForm').length && !$(e.target).closest('#headerSearch').length) {
				$('#headerSearch').toggleClass('js--btn-active');
				$('#headerSearch').addClass('js--btn-nonactive');
				$('#HeaderSearchForm').removeClass('js--form-active');
				$('#headerSearch').find('#headerSearchIcon').removeClass('jin-ifont-batuthin').addClass('jin-ifont-searchthin');
				$('#headerSearch').find('#headerSearchLabel').html('SEARCH');
			}
		}
	});
})(jQuery);


//　アコーディオンを動かす
(function ($) {
	$('.a--accordion-title').click(function () {
		if ($(this).prevAll('.a--accordion-toggle').hasClass('js-accordion-toggle')) {
			$(this).prevAll('.a--accordion-toggle').removeClass('js-accordion-toggle');
		} else {
			$(this).prevAll('.a--accordion-toggle').addClass('js-accordion-toggle');
		}
		$(this).next('.c--accordion-contents').slideToggle(270);
	});
})(jQuery);

//CVボタンの表示制御
(function ($) {
	$(window).on('load scroll', function () {
		if ($(this).scrollTop() > 600) {
			$('#cvButton').addClass('js--cvb-active');
		} else {
			$('#cvButton').removeClass('js--cvb-active');
		}
	});
	$(document).ready(function () {
		if ($('#cvButton').length) {
			$('#commonFooter').addClass('js--cvb-display');
		}
	});
})(jQuery);

//SNSシェアボタンにあるURLコピー
(function ($) {
	$('#jinrCopyUrl').click(function () {
		var url = $(this).data('url');
		navigator.clipboard.writeText(url);
		// フラッシュメッセージ表示
		$('#jinrCopySuccess,#jinrCopySuccessBg').fadeIn(450, function () {
			$(this).delay(600).fadeOut(450);
		});
	});
})(jQuery);

//関連記事のスクロール
(function ($) {
	// 関連記事がある記事のみ
	const relatedPostInner = document.getElementById('jinrRelatedPostInner');
	if (!relatedPostInner) return;

	const scrollTarget = document.getElementsByClassName('o--postlist-inner')[0];
	const clientWidth = scrollTarget.clientWidth;
	const scrollWidth = scrollTarget.scrollWidth;

	// 必要な要素が取得されなかった場合は早期returnする
	if (!scrollTarget) return;
	if (!clientWidth) return;
	if (!scrollWidth) return;

	const postCount = relatedPostInner.querySelectorAll('.o--postlist-item').length;

	if (postCount >= 5) {
		relatedPostInner.querySelector('.o--postlist-inner').insertAdjacentHTML('beforebegin', '<span class="a--scroll-btn a--scroll-prev"></span>');
		relatedPostInner.querySelector('.o--postlist-inner').insertAdjacentHTML('afterend', '<span class="a--scroll-btn a--scroll-next js--scroll-active"></span>');
	} else {
		return;
	}
	const scrollPrev = document.querySelector('.a--scroll-prev');
	const scrollNext = document.querySelector('.a--scroll-next');

	let timeoutId;
	scrollTarget.addEventListener(
		'scroll',
		function () {
			clearTimeout(timeoutId);
			scrollPrev.classList.add('js--scroll-active');
			scrollNext.classList.add('js--scroll-active');
			if (scrollWidth - (clientWidth + scrollTarget.scrollLeft) == 0) {
				scrollNext.classList.remove('js--scroll-active');
				scrollPrev.classList.add('js--scroll-active');
			}
			if (scrollTarget.scrollLeft == 0) {
				scrollPrev.classList.remove('js--scroll-active');
			}
		},
		true
	);

	relatedPostInner.addEventListener('click', (e) => {
		if (e.target.classList.contains('a--scroll-next')) {
			$('#jinrRelatedPostInner .d--postlist-slider').animate(
				{
					scrollLeft: scrollTarget.scrollLeft + 1092,
				},
				300
			);
			if (!scrollTarget.scrollLeft == 0) {
				e.target.classList.add('js--scroll-active');
			}
			scrollTarget.onscroll = function () {
				if (scrollWidth - (clientWidth + scrollTarget.scrollLeft) == 0) {
					e.target.classList.remove('js--scroll-active');
				}
			};
			scrollTarget.addEventListener(
				'scroll',
				function () {
					scrollTarget.onscroll = function () {
						if (scrollWidth - (clientWidth + scrollTarget.scrollLeft) == 0) {
							e.target.classList.remove('js--scroll-active');
						}
					};
				},
				true
			);
		}
	});
	relatedPostInner.addEventListener('click', (e) => {
		if (e.target.classList.contains('a--scroll-prev')) {
			$('#jinrRelatedPostInner .d--postlist-slider').animate(
				{
					scrollLeft: scrollTarget.scrollLeft - 1092,
				},
				300
			);
			scrollTarget.addEventListener(
				'scroll',
				function () {
					scrollTarget.onscroll = function () {
						if (scrollTarget.scrollLeft == 0) {
							e.target.classList.remove('js--scroll-active');
						}
					};
				},
				true
			);
			scrollTarget.scrollLeft -= 100;
			if (!scrollTarget.scrollLeft == 0) {
				e.target.classList.add('js--scroll-active');
				e.target.classList.add('js--scroll-active');
			}
		}
	});
})(jQuery);

(function ($) {
	function jinrArrowButtonWidget(id) {
		const widgetWrapper = document.getElementById(id);
		if (!widgetWrapper) return;
		const widgetPostSlider = widgetWrapper.getElementsByClassName('d--postlist-slider');
		if (!widgetPostSlider.length) return;
		for(let i = 0; i < widgetPostSlider.length; i++){
			const postCount = widgetPostSlider[i].getElementsByClassName('o--postlist-item').length;
			if (postCount >= 5) {
				const clientWidth = widgetPostSlider[i].clientWidth;
				const scrollWidth = widgetPostSlider[i].scrollWidth;
				widgetPostSlider[i].insertAdjacentHTML('beforebegin', `<span class="a--scroll-btn a--scroll-prev" data-slider-index="${i}"></span>`);
				widgetPostSlider[i].insertAdjacentHTML('afterend', `<span class="a--scroll-btn a--scroll-next js--scroll-active" data-slider-index="${i}"></span>`);

				const widgetScrollPrev = widgetWrapper.querySelectorAll('.a--scroll-prev')[i];
				const widgetScrollNext = widgetWrapper.querySelectorAll('.a--scroll-next')[i];

				let timeoutId;
				widgetPostSlider[i].addEventListener(
					'scroll',
					function () {
						clearTimeout(timeoutId);
						if (scrollWidth - (clientWidth + widgetPostSlider[i].scrollLeft) == 0) {
							widgetScrollNext.classList.remove('js--scroll-active');
							widgetScrollPrev.classList.add('js--scroll-active');
						} else {
							widgetScrollPrev.classList.add('js--scroll-active');
						}
						if (widgetPostSlider[i].scrollLeft == 0) {
							widgetScrollPrev.classList.remove('js--scroll-active');
							widgetScrollNext.classList.add('js--scroll-active');
						}
					},
					true
				);

				widgetScrollNext.addEventListener('click', (e) => {
					const nextsliderIndex = e.target.getAttribute('data-slider-index');
					const nextslider = widgetPostSlider[nextsliderIndex];
					$(nextslider).animate(
						{
							scrollLeft: nextslider.scrollLeft + 1092,
						},
						300
					);
					if (!nextslider.scrollLeft == 0) {
						e.target.classList.add('js--scroll-active');
					}
					nextslider.onscroll = function () {
						if (scrollWidth - (clientWidth + nextslider.scrollLeft) == 0) {
							e.target.classList.remove('js--scroll-active');
						}
					};
					widgetPostSlider[nextsliderIndex].addEventListener(
						'scroll',
						function () {
							widgetPostSlider[nextsliderIndex].onscroll = function () {
								if (scrollWidth - (clientWidth + widgetPostSlider[nextsliderIndex].scrollLeft) == 0) {
									e.target.classList.remove('js--scroll-active');
								}
							};
						},
						true
					);
				});
				widgetScrollPrev.addEventListener('click', (e) => {
					const prevSliderIndex = e.target.getAttribute('data-slider-index');
					const prevSlider = widgetPostSlider[prevSliderIndex];
					$(prevSlider).animate(
						{
							scrollLeft: widgetPostSlider[i].scrollLeft - 1092,
						},
						300
					);
					widgetPostSlider[prevSliderIndex].addEventListener(
						'scroll',
						function () {
							widgetPostSlider[prevSliderIndex].onscroll = function () {
								if (widgetPostSlider[prevSliderIndex].scrollLeft == 0) {
									e.target.classList.remove('js--scroll-active');
								}
							};
						},
						true
					);
					prevSlider.scrollLeft -= 100;
					if (!prevSlider.scrollLeft == 0) {
						e.target.classList.add('js--scroll-active');
						e.target.classList.add('js--scroll-active');
					}
				});
			} else {
				return;
			}
		}
	}
	jinrArrowButtonWidget('footer-widget');
	jinrArrowButtonWidget('jinr-posttop-widget-area');
	jinrArrowButtonWidget('jinr-postbottom-widget-area');
	jinrArrowButtonWidget('jinr-relatedpost-bottom-widget-area');
})(jQuery);


//表示アニメーション
(function ($) {
	var $target = $('.js--scr-animation');
	var offset = 100;

	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();
		var h = $(window).height();

		$target.each(function() {
			var pos = $(this).offset().top;
			if (scroll > pos - h + offset) {
				if($(this).hasClass("b--jinr-button")){
					$(this).children(".o--button-inner").addClass('is-animated');
				}else{
					$(this).addClass('is-animated');
				}
			}
		})

	}).trigger('scroll');
})(jQuery);

// スムーススクロールをRTOCに干渉しないように追加する
(function ($) {
	const anchors = document.querySelectorAll('a[href^="#"]'); 
	const header = document.querySelector('header');
	let headerOffset = 0;
	if (header) {
		if (headerTracking.tracking_info === 'd--header-tracking-on') {
			headerOffset = header.offsetHeight;
		}else{
			headerOffset = 15;
		}
	} else {
		headerOffset = 15;
	}
	for ( let i = 0; i < anchors.length; i++ ) {
		anchors[i].addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target.closest('#rtoc-mokuji-wrapper')) {
				return;
			} else {
				const href= anchors[i].getAttribute("href");
				const target = document.getElementById(href.replace('#', ''));
				if (target) {
					const position = window.pageYOffset + target.getBoundingClientRect().top - headerOffset - 30;
					window.scroll({
						top: position,      
						behavior: 'smooth'
					});
				}
			}
		});
	}
})(jQuery);

(function ($) {
	$.ajax({
        type: "POST",
        url: jinr_ajax_common.ajax_url,
        data: {
            action: jinr_ajax_common.action,
            post_id: jinr_ajax_common.post_id
        }
    });
})(jQuery);