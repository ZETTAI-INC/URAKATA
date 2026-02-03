document.addEventListener('DOMContentLoaded', function () {
	/**
	 * 追尾ウィジェット
	 * - ヘッダーが追尾しているかどうかで付与する値を変更する
	 */
	const trackingElement = document.getElementById('sideBarTracking');
	const headerElement = document.getElementById('commonHeader');
	let attrTopvalue = '';
	if (!headerElement) return;
	if(trackingElement){
		if(headerElement.classList.contains('d--header-tracking-on') && headerElement.classList.contains('d--header-layout1')){
			const headerHeight = headerElement.clientHeight;
			attrTopvalue = headerHeight + 15;
			trackingElement.style.top = attrTopvalue + 'px';
		} else {
			trackingElement.style.top = 15 + 'px';
		}
	}
	/**
	 * ヘッダー追従
	 * スクロールでふわっと表示させる
	 */

	let ticking = false;
	const scrollElement = document.querySelector('#commonHeader');
	const scrollElementParts = document.querySelector('.a--header-style-parts');
	
	if (!ticking) {
		if(!scrollElement) return;
		if(scrollElement.classList.contains('d--header-tracking-on') && scrollElement.classList.contains('d--header-layout1')){
			function JinrHeaderScrollAnimation() {
				requestAnimationFrame(function () {
					ticking = false;
					if (window.pageYOffset > 1050) {
						scrollElement.classList.remove("js--follow-header-display-off");
						scrollElement.classList.add("js--follow-header-display");
					} else if (scrollElement.classList.contains("js--follow-header-display")) {
						scrollElement.classList.remove("js--follow-header-display");
						scrollElement.classList.add("js--follow-header-display-off");
					} else if (window.pageYOffset < 300) {
						scrollElement.classList.remove("js--follow-header-display-off");
					}
				});
				ticking = true;
			}
			document.addEventListener('scroll', JinrHeaderScrollAnimation, { passive: true });
		}
		if(!scrollElementParts) return;
		if(scrollElementParts.classList.contains('d--header-tracking-on') && scrollElement.classList.contains('d--header-layout1')){
			
			function JinrHeaderScrollAnimation() {
				requestAnimationFrame(function () {
					ticking = false;
					if (window.pageYOffset > 1050) {
						scrollElementParts.classList.remove("js--follow-header-display-off");
						scrollElementParts.classList.add("js--follow-header-display");
					} else if (scrollElementParts.classList.contains("js--follow-header-display")) {
						scrollElementParts.classList.remove("js--follow-header-display");
						scrollElementParts.classList.add("js--follow-header-display-off");
					} else if (window.pageYOffset < 300) {
						scrollElementParts.classList.remove("js--follow-header-display-off");
					}
				});
				ticking = true;
			}
			document.addEventListener('scroll', JinrHeaderScrollAnimation, { passive: true });
		}
	}
});