document.addEventListener('DOMContentLoaded', function () {
	// 複数のタブブロックを取得
	const tabContainers = document.querySelectorAll('.wp-block-jinr-blocks-tab');

	tabContainers.forEach(function (tabContainer) {
		const tabContents = tabContainer.querySelectorAll('.c--tab-contents');
		const tabTitles = tabContainer.querySelectorAll('.c--tab-title');
		let activeIndex = 0;

		const classList = tabContainer.className.split(' ');
		const tabNumberClass = classList.find(function (cls) {
			return cls.indexOf('d--tab-number') === 0;
		});

		if (tabNumberClass) {
			const tabNumber = parseInt(tabNumberClass.replace('d--tab-number', ''), 10);
			if (!isNaN(tabNumber) && tabNumber > 0 && tabNumber <= tabContents.length) {
				activeIndex = tabNumber - 1;
			}
		} else {
			tabTitles.forEach(function (title, index) {
				if (title.classList.contains('active')) {
					activeIndex = index;
				}
			});
		}

		// 全てのタブコンテンツを非表示にし、タイトルの 'active' クラスを削除
		tabContents.forEach(function (content) {
			content.style.display = 'none';
		});
		tabTitles.forEach(function (title) {
			title.classList.remove('active');
		});

		// 初期表示
		tabContents[activeIndex].style.display = 'block';
		tabTitles[activeIndex].classList.add('active');

		// タブクリックイベント設定
		tabTitles.forEach(function (title, index) {
			title.addEventListener('click', function () {
				// 全てのタブコンテンツを非表示にする
				tabContents.forEach(function (content) {
					content.style.display = 'none';
				});
				// 全てのタイトルから 'active' クラスを削除
				tabTitles.forEach(function (t) {
					t.classList.remove('active');
				});
				// クリックされたタイトルに 'active' クラスを追加し、該当コンテンツ表示
				this.classList.add('active');
				tabContents[index].style.display = 'block';
			});
		});
	});
});
