const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
try {
	if (!YoutubeInfo) {
		throw new Error('終了します');
	}
	const YoutubepostID = YoutubeInfo.id;
	var onYouTubeIframeAPIReady = function () {
		jinrPlayer = new YT.Player('jinrYoutubeVideo', {
			width: '100' + '%',
			height: 400,
			videoId: YoutubepostID,
			// events: {
			// 	onReady: jinrOnPlayerReady,
			// },
			playerVars: {
				rel: 0,
				playsinline: 1,
				modestbranding: 1,
				origin: location.protocol + '//' + location.hostname + '/', //Failed to execute 'postMessage' on 'DOMWindow'への対応
			},
		});
	};

	// YoutubeのPIP機能を独自に作成
	(function ($) {
		/*
		サムネイルの画像がある高さの位置座標を取得（レスポンシブに対応、viewportに対応するためにgetBoundingClientRectを使用）
		*/
		$(window).on('load', function () {
			const YoutubeThumb = document.getElementById('jinrPostThumb');
			if (!YoutubeThumb) return;
			const YoutubeThumbChild = YoutubeThumb.firstElementChild;
			if (!YoutubeThumbChild) return;
			const YoutubeConfirm = YoutubeThumbChild.tagName;

			// Youtube動画がサムネイルの時のみCSSを適用させるため
			const YoutubePIP = document.getElementsByClassName('a--youtube-pip')[0];
			if (!YoutubePIP) return;
			// サムネイルの位置座標を取得
			const PositionTop = YoutubeThumb.getBoundingClientRect().top;
			const ScrollOffset = window.pageYOffset || document.documentElement.scrollTop;
			const YoutubeTop = parseInt(PositionTop) + parseInt(ScrollOffset);

			// 画像の高さ取得
			const ThumbnailHeight = YoutubeThumb.clientHeight;
			const YoutubeDisplayPosition = parseInt(YoutubeTop) + parseInt(ThumbnailHeight) + 100;

			// PIPを消す処理を追加するためにフラグを用意
			let PIPFlag = true;
			$(window).scroll(function () {
				if (PIPFlag !== true) return;
				const scrollTop = $(window).scrollTop();
				// Youtubeの動画にのみクラスを付与
				if (YoutubeConfirm == 'IFRAME') {
					if (scrollTop > YoutubeDisplayPosition) {
						YoutubeThumb.classList.remove('is-out');
						YoutubeThumb.classList.add('is-in');
						YoutubePIP.classList.add('js--pip-stop');
					} else {
						YoutubeThumb.classList.remove('is-in');
						YoutubeThumb.classList.add('is-out');
						YoutubePIP.classList.remove('js--pip-stop');
					}
				}
			});

			// PIPをやめるボタンをクリックした時の挙動を追加
			YoutubePIP.addEventListener('click', () => {
				YoutubeThumb.classList.remove('is-in');
				YoutubeThumb.classList.add('is-out');
				YoutubePIP.classList.remove('js--pip-stop');
				PIPFlag = false;
			});
		});
	})(jQuery);
} catch (e) {
	// console.log(e);
}
