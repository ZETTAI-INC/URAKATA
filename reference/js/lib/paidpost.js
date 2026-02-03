(function ($) {
	// Stripe側からのリダイレクトのみlocalstorageの値を削除する
	const stripeRef = document.referrer;
	if (stripeRef.includes('stripe.com')) {
		let productID = localStorage.getItem("productID");
		let productURL = localStorage.getItem("productURL");
		let productTitle = localStorage.getItem("productTitle");
		let data = {
			action: 'paidpost',
			productid: productID,
			producturl: productURL,
			producttitle: productTitle,
			striperef: stripeRef,
		};
		$.ajax({
			url: jinr_paidpost.ajaxurl,
			data: data,
			type: 'POST',
		}).done(function (data, textStatus, jqXHR) {
			const paidpostTitle = document.getElementById('paidpostTitle');
			const paidpostLink = document.getElementById('paidpostLink');
			if (productTitle) {
				paidpostTitle.textContent = productTitle;
			} else {
				paidpostTitle.textContent = '';
			}
			if (productURL) {
				paidpostLink.setAttribute("href", productURL);
			} else {
				paidpostLink.setAttribute("href", '#');
			}
			localStorage.removeItem("productID");
			localStorage.removeItem("productURL");
			localStorage.removeItem("productTitle");
		}).fail(function (jqXHR, textStatus, errorThrown) {
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		});
	}
	document.addEventListener("DOMContentLoaded", function () {
		// 閉じるボタンを押した時の挙動
		function closePopup() {
			const body = document.getElementsByTagName('body')[0];
			body.classList.remove('jinr-no-scroll');
			window.scrollTo(0, scrollTop);
		
			const lostPassWrapper = document.getElementById('JinrPaidPopUpLostpasswordWrapper');
			const registerWrapper = document.getElementById('JinrPaidPopUpRegisterWrapper');
			const loginWrapper = document.getElementById('JinrPaidPopUpLoginWrapper');
			const JinrPaidpostCancelWrapper = document.getElementById('JinrPaidpostCancelWrapper');
			const jinrPopupBg = document.getElementById('JinrPopupBg');
		
			if (lostPassWrapper) {
				lostPassWrapper.classList.remove(...lostPassWrapper.classList);
			}
			if (jinrPopupBg) {
				jinrPopupBg.classList.remove(...jinrPopupBg.classList);
			}
			if (registerWrapper) {
				registerWrapper.classList.remove(...registerWrapper.classList);
			}
			if (JinrPaidpostCancelWrapper) {
				JinrPaidpostCancelWrapper.classList.remove(...JinrPaidpostCancelWrapper.classList);
			}
			if (loginWrapper) {
				loginWrapper.classList.remove(...loginWrapper.classList);
			}
		}
		const JinrPaidPopupRegisterClose = document.getElementById('JinrPaidPopupRegisterClose');
		const JinrPaidPopupLoginClose = document.getElementById('JinrPaidPopupLoginClose');
		const JinrPaidPopupLostClose = document.getElementById('JinrPaidPopupLostClose');
		const JinrPaidPopupCancelClose = document.getElementById('JinrPaidPopupCancelClose');
		if (JinrPaidPopupRegisterClose) {
			JinrPaidPopupRegisterClose.addEventListener('click', closePopup);
		}
		if (JinrPaidPopupLoginClose) {
			JinrPaidPopupLoginClose.addEventListener('click', closePopup);
		}
		if (JinrPaidPopupLostClose) {
			JinrPaidPopupLostClose.addEventListener('click', closePopup);
		}
		if (JinrPaidPopupCancelClose) {
			JinrPaidPopupCancelClose.addEventListener('click', closePopup);
		}

		// すでに会員登録済みのユーザーはこちらをクリックした時の挙動
		const JinrAlreadyRegisterUser = document.getElementById('JinrAlreadyRegisterUser');
		if (JinrAlreadyRegisterUser) {
			JinrAlreadyRegisterUser.addEventListener('click', function (e) {
				e.preventDefault();
				const body = document.getElementsByTagName('body')[0];
				scrollTop = window.scrollY;
				body.style.top = (scrollTop * -1) + 'px';
				body.classList.add('jinr-no-scroll');
				const loginWrapper = document.getElementById('JinrPaidPopUpLoginWrapper');
				const jinrPopupBg = document.getElementById('JinrPopupBg');
				if (loginWrapper) {
					loginWrapper.classList.add('a--paidpost-popup');
				}
				if (jinrPopupBg) {
					jinrPopupBg.classList.add('a--paidpost-popup');
				}

			});
		}
		
		// ログインユーザーが「続きを読む」
		const paidpostButton = document.querySelector('#JinrPaidContents a');
		if (paidpostButton) {
			paidpostButton.addEventListener('click', (event) => {
				event.preventDefault();
				const productElements = document.getElementsByName('paidpost_product_id')[0];
				const titleElements = document.getElementById('jinrPostTitle');
	
				const redirectValue = location.href;
				const productValue = productElements.value;
				let titleValue;
				
				if (!titleElements) {
					titleValue = "";
				} else {
					titleValue = titleElements.textContent;
				}

				localStorage.setItem('productID', productValue);
				localStorage.setItem('productURL', redirectValue);
				localStorage.setItem('productTitle', titleValue);
	
				let data = {
					action: 'jinr_user_mail_action',
				};
				$.ajax({
					type: "POST",
					url: jinr_paidpost.ajaxurl,
					data: data,
					datatype: "JSON",
				}).done(function (data, textStatus, jqXHR) {
					let JinrPaidpostURL = document.getElementById('JinrPaidpostURL').value;
					const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
					if(regex.test(data)) {
						JinrPaidpostURL = JinrPaidpostURL + '?prefilled_email=' + encodeURIComponent(data);
						location.href = JinrPaidpostURL;
					}
				}).fail(function (XMLHttpRequest, status, e) {
					console.log("ajax失敗: " + status + XMLHttpRequest);
				});
				return false;
			});
		}

		// 非ログインユーザーが「続きを見る」ボタンをクリックした時の挙動
		const continueBtn = document.querySelector('#JinrPaidContents a');
		const modalCancelBtn = document.getElementById('JinrPopupBg');
		if (continueBtn) {
			if (continueBtn.getAttribute('href') == '#') { 
				continueBtn.addEventListener('click', function (e) {
					e.preventDefault();
					const body = document.getElementsByTagName('body')[0];
					scrollTop = window.scrollY;
					body.style.top = (scrollTop * -1) + 'px';
					body.classList.add('jinr-no-scroll');
	
					const jinrPopupBg = document.getElementById('JinrPopupBg');
					const registerWrapper = document.getElementById('JinrPaidPopUpRegisterWrapper');
					
					registerWrapper.classList.add('a--paidpost-popup');
					jinrPopupBg.classList.add('a--paidpost-popup');
				})
				const loginPopupContent = document.getElementById('JinrLoginDisplay');
				loginPopupContent.addEventListener('click', function (e) {
					e.preventDefault();
					const loginWrapper = document.getElementById('JinrPaidPopUpLoginWrapper');
					const registerWrapper = document.getElementById('JinrPaidPopUpRegisterWrapper');
					registerWrapper.classList.remove('a--paidpost-popup');
					loginWrapper.classList.add('a--paidpost-open');
					registerWrapper.classList.add('a--paidpost-close');
	
					if (registerWrapper.classList.contains('a--paidpost-open')) {
						registerWrapper.classList.remove('a--paidpost-open');
						loginWrapper.classList.add('a--paidpost-open');
						loginWrapper.classList.remove('a--paidpost-close');
					}
				})
				const registerPopupContent = document.getElementById('JinrRegisterDisplay');
				registerPopupContent.addEventListener('click', function (e) {
					e.preventDefault();
					const registerWrapper = document.getElementById('JinrPaidPopUpRegisterWrapper');
					const loginWrapper = document.getElementById('JinrPaidPopUpLoginWrapper');
					loginWrapper.classList.remove('a--paidpost-open');
					loginWrapper.classList.add('a--paidpost-close');
					registerWrapper.classList.add('a--paidpost-open');
					registerWrapper.classList.remove('a--paidpost-close');
				})
			}
		}
		// 要素外をクリックするとポップアップを削除する
		if (modalCancelBtn) {
			modalCancelBtn.addEventListener('click', function (e) {
				const lostPassWrapper = document.getElementById('JinrPaidPopUpLostpasswordWrapper');
				const registerWrapper = document.getElementById('JinrPaidPopUpRegisterWrapper');
				const loginWrapper = document.getElementById('JinrPaidPopUpLoginWrapper');
				const JinrPaidpostCancelWrapper = document.getElementById('JinrPaidpostCancelWrapper');
				const jinrPopupBg = document.getElementById('JinrPopupBg');

				const body = document.getElementsByTagName('body')[0];
				body.style.top = '';
				body.classList.remove('jinr-no-scroll');
				window.scrollTo(0, scrollTop);
				this.classList.remove(...this.classList);
				if (lostPassWrapper) {
					lostPassWrapper.classList.remove(...lostPassWrapper.classList);
				}
				if (jinrPopupBg) {
					jinrPopupBg.classList.remove(...jinrPopupBg.classList);
				}
				if (registerWrapper) {
					registerWrapper.classList.remove(...registerWrapper.classList);
				}
				if (JinrPaidpostCancelWrapper) {
					JinrPaidpostCancelWrapper.classList.remove(...JinrPaidpostCancelWrapper.classList);
				}
				if (loginWrapper) {
					loginWrapper.classList.remove(...loginWrapper.classList);
				}
			})
		}

		// パスワードを忘れた方はこちらをクリックした時の挙動
		const lostPasswordBtn = document.getElementById('JinrLostPassword');
		if (lostPasswordBtn) {
			lostPasswordBtn.addEventListener('click', function (e) {
				e.preventDefault();
				const lostPassWrapper = document.getElementById('JinrPaidPopUpLostpasswordWrapper');
				const loginWrapper = document.getElementById('JinrPaidPopUpLoginWrapper');
				lostPassWrapper.classList.remove('a--paidpost-close');
				lostPassWrapper.classList.add('a--paidpost-open');
				loginWrapper.classList.remove('a--paidpost-open');
				loginWrapper.classList.add('a--paidpost-close');
			})
		}
		// キャンセル時
		const lostPasswordCancel = document.getElementById('JinrLostpasswordCancel');
		if (lostPasswordCancel) {
			lostPasswordCancel.addEventListener('click', function () {
				const lostPassWrapper = document.getElementById('JinrPaidPopUpLostpasswordWrapper');
				const loginWrapper = document.getElementById('JinrPaidPopUpLoginWrapper');
				loginWrapper.classList.remove('a--paidpost-close');
				loginWrapper.classList.add('a--paidpost-open');
				lostPassWrapper.classList.remove('a--paidpost-open');
				lostPassWrapper.classList.add('a--paidpost-close');
			})
		}

		// 会員登録時のajaxを実装
		const JinrRegisterButton = document.getElementById('JinrRegisterButton');
		if (JinrRegisterButton) {
			JinrRegisterButton.addEventListener('click', function (e) {
				JinrRegisterButton.innerText = '';
				JinrRegisterButton.insertAdjacentHTML('beforeend','<span class="a--paidpost-loading">処理中...</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 44 44" stroke="#fff"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle></g></svg>');
				
				const JinrRegisterName = document.getElementById('JinrRegisterName');
				const JinrRegisterNameValue = JinrRegisterName.value;
				const JinrRegisterMail = document.getElementById('JinrRegisterMail');
				const JinrRegisterMailValue = JinrRegisterMail.value;
				const JinrRegisterPass = document.getElementById('JinrRegisterPass');
				const JinrRegisterPassValue = JinrRegisterPass.value;
				const JinrRegisterNonce = document.getElementById('jinr_nonce_register_check');
				const JinrRegisterNonceValue = JinrRegisterNonce.value;
				  
				JinrRegisterMail.addEventListener("input", (e) => {
					const nextLackContent = JinrRegisterMail.nextElementSibling;
					if (nextLackContent.classList.contains('jinr-lack-content')) {
						nextLackContent.remove();
						JinrRegisterMail.classList.remove('jinr-lack-input');
					}
				});
				JinrRegisterPass.addEventListener("input", (e) => {
					const nextLackContent = JinrRegisterPass.nextElementSibling;
					if (nextLackContent !== null) {
						if (nextLackContent.classList.contains('jinr-lack-content')) {
							nextLackContent.remove();
							JinrRegisterPass.classList.remove('jinr-lack-input');
						}
					}
				});
	
				let data = {
					action: 'jinr_user_action',
					name: JinrRegisterNameValue,
					mail: JinrRegisterMailValue,
					pass: JinrRegisterPassValue,
					nonce: JinrRegisterNonceValue,
				};
				$.ajax({
					type: "POST",
					url: jinr_paidpost.ajaxurl,
					data: data,
					datatype: "JSON",
				}).done(function (data, textStatus, jqXHR) {
					if ( data['user_pass'] === 'empty' && data['user_email'] === 'empty') {
						Object.keys(data).forEach((key) => {
							const JinrLackElement = document.createElement('span');
							JinrLackElement.className = 'jinr-lack-content';
							 if (key == 'user_pass') {
								JinrLackElement.textContent = 'パスワードが不足しています';
								JinrRegisterPass.className = 'jinr-lack-input';
								JinrRegisterPass.after(JinrLackElement);
							} else if (key == 'user_email') {
								JinrLackElement.textContent = 'メールアドレスが不足しています';
								JinrRegisterMail.className = 'jinr-lack-input';
								JinrRegisterMail.after(JinrLackElement);
							}
						});
						JinrRegisterButton.innerText = 'この情報で会員登録｜購入に進む';
					} else if (data === 'user_pass_lack') {
						const JinrLackElement = document.createElement('span');
						JinrLackElement.className = 'jinr-lack-content';
						JinrLackElement.textContent = 'パスワードが不足しています';
						JinrRegisterPass.className = 'jinr-lack-input';
						JinrRegisterPass.after(JinrLackElement);
						JinrRegisterButton.innerText = 'この情報で会員登録｜購入に進む';
					} else if (data === 'user_mail_lack') {
						const JinrLackElement = document.createElement('span');
						JinrLackElement.className = 'jinr-lack-content';
						JinrLackElement.textContent = 'メールアドレスが不足しています';
						JinrRegisterMail.className = 'jinr-lack-input';
						JinrRegisterMail.after(JinrLackElement);
						JinrRegisterButton.innerText = 'この情報で会員登録｜購入に進む';
					}
	
					if (data === 'user_mail_exist') {
						const JinrLackElement = document.createElement('span');
						JinrLackElement.className = 'jinr-lack-content';
						JinrLackElement.textContent = 'すでにこのメールアドレスは登録されています';
						JinrRegisterMail.className = 'jinr-lack-input';
						JinrRegisterMail.after(JinrLackElement);
						JinrRegisterButton.innerText = 'この情報で会員登録｜購入に進む';
					}
					if (data === 'user_mail_invalid') {
						const JinrLackElement = document.createElement('span');
						JinrLackElement.className = 'jinr-lack-content';
						JinrLackElement.textContent = '不正なメールアドレスです';
						JinrRegisterMail.className = 'jinr-lack-input';
						JinrRegisterMail.after(JinrLackElement);
						JinrRegisterButton.innerText = 'この情報で会員登録｜購入に進む';
					}
					if (data === 'user_pass_invalid') {
						const JinrLackElement = document.createElement('span');
						JinrLackElement.className = 'jinr-lack-content';
						JinrLackElement.textContent = '不正なパスワードです';
						JinrRegisterPass.className = 'jinr-lack-input';
						JinrRegisterPass.after(JinrLackElement);
						JinrRegisterButton.innerText = 'この情報で会員登録｜購入に進む';
					}
					// 成功した時の処理
					if (!isNaN(data) || isNaN(data) == '') {
						let JinrPaidpostURL = document.getElementById('JinrPaidpostURL').value;
						JinrPaidpostURL = JinrPaidpostURL + '?prefilled_email=' + encodeURIComponent(JinrRegisterMailValue);
						setTimeout(function () {
							JinrRegisterButton.innerText = '登録完了｜決済ページに遷移します';
							JinrRegisterButton.classList.add('a--register-complete');
	
							const productElements = document.getElementsByName('paidpost_product_id')[0];
							const titleElements = document.getElementById('jinrPostTitle');
							const redirectValue = location.href;
							const productValue = productElements.value;
							let titleValue;
							if (!titleElements) {
								titleValue = "";
							} else {
								titleValue = titleElements.textContent;
							}
							localStorage.setItem('productID', productValue);
							localStorage.setItem('productURL', redirectValue);
							localStorage.setItem('productTitle', titleValue);
	
							setTimeout(() => {
								location.href = JinrPaidpostURL;
							}, 1000);
						}, 2200);
					}
				}).fail(function (XMLHttpRequest, status, e) {
					console.log("ajax失敗: " + status + XMLHttpRequest);
				});
				return false;
			})
		}

		// 入力時にその値が問題なく登録できるかどうかを検証し、svgアイコンを表示させる
		function JinrRegisterCheckInputValue() {
			const JinrRegisterName = document.getElementById('JinrRegisterName');
			const JinrRegisterMail = document.getElementById('JinrRegisterMail');
			const JinrRegisterPass = document.getElementById('JinrRegisterPass');
			if (JinrRegisterMail) {
				JinrRegisterMail.addEventListener("input", () => {
					function generateRandomAlphanumeric(length) {
						const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
						let result = '';
						for (let i = 0; i < length; i++) {
						  result += chars.charAt(Math.floor(Math.random() * chars.length));
						}
						return result;
					}
					JinrRegisterMail.addEventListener("input", (e) => {
						const nextLackContent = JinrRegisterMail.nextElementSibling;
						if (nextLackContent.classList.contains('jinr-lack-content')) {
							nextLackContent.remove();
							JinrRegisterMail.classList.remove('jinr-lack-input');
						}
					});
					const randomValue = generateRandomAlphanumeric(8);
					JinrRegisterName.value = randomValue;
					const JinrRegisterMailValue = JinrRegisterMail.value;
					let data = {
						action: 'jinr_check_mail_action',
						mail: JinrRegisterMailValue,
					};
					$.ajax({
						type: "POST",
						url: jinr_paidpost.ajaxurl,
						data: data,
						datatype: "JSON",
					}).done(function (data, textStatus, jqXHR) {
						const inputSVGElement = document.getElementById('JinrRegisternMailSVG');
						const nextLackContent = JinrRegisterMail.nextElementSibling;
							if (nextLackContent !== null) {
								if (nextLackContent.classList.contains('jinr-lack-content')) {
									nextLackContent.remove();
									JinrRegisterMail.classList.remove('jinr-lack-input');
								}
							}
						if (data === 'user_mail_approve') {
							JinrRegisterMail.classList.add('jinr-approval-input');
							inputSVGElement.classList.add('jinr-approval-svg');
						} else {
							if (JinrRegisterMail.classList.contains('jinr-approval-input')) {
								JinrRegisterMail.classList.remove('jinr-approval-input');
							}
							if (inputSVGElement.classList.contains('jinr-approval-svg')) {
								inputSVGElement.classList.remove('jinr-approval-svg');
							}
							const JinrLackElement = document.createElement('span');
							JinrLackElement.className = 'jinr-lack-content';
							if (data === 'user_mail_lack') {
								JinrLackElement.textContent = 'メールアドレスが不足しています';
								JinrRegisterMail.className = 'jinr-lack-input';
								JinrRegisterMail.after(JinrLackElement);
							} else if (data === 'user_mail_exist') {
								JinrLackElement.textContent = 'すでにこのメールアドレスは登録されています';
								JinrRegisterMail.className = 'jinr-lack-input';
								JinrRegisterMail.after(JinrLackElement);
							} else if (data === 'user_mail_invalid') {
								JinrLackElement.textContent = '不正なメールアドレスです';
								JinrRegisterMail.className = 'jinr-lack-input';
								JinrRegisterMail.after(JinrLackElement);
							}
						}
					}).fail(function (XMLHttpRequest, status, e) {
						const JinrLackElement = document.createElement('span');
						JinrLackElement.className = 'jinr-lack-content';
						JinrLackElement.textContent = '何かがうまくいかなかったようです。サイト運営者に問い合わせてください';
						JinrRegisterMail.className = 'jinr-lack-input';
						JinrRegisterMail.after(JinrLackElement);
					});
					return false;
				});
			}
			if (JinrRegisterPass) {
				JinrRegisterPass.addEventListener("input", () => {
					const JinrRegisterPassValue = JinrRegisterPass.value;
					let data = {
						action: 'jinr_check_pass_action',
						pass: JinrRegisterPassValue,
					};
					$.ajax({
						type: "POST",
						url: jinr_paidpost.ajaxurl,
						data: data,
						datatype: "JSON",
					}).done(function (data, textStatus, jqXHR) {
						const inputSVGElement = document.getElementById('JinrRegisternPassSVG');
						const nextLackContent = JinrRegisterPass.nextElementSibling;
							if (nextLackContent !== null) {
								if (nextLackContent.classList.contains('jinr-lack-content')) {
									nextLackContent.remove();
									JinrRegisterPass.classList.remove('jinr-lack-input');
								}
							}
						if (data === 'user_pass_approve') {
							JinrRegisterPass.classList.add('jinr-approval-input');
							inputSVGElement.classList.add('jinr-approval-svg');
						} else {
							if (JinrRegisterPass.classList.contains('jinr-approval-input')) {
								JinrRegisterPass.classList.remove('jinr-approval-input');
							}
							if (inputSVGElement.classList.contains('jinr-approval-svg')) {
								inputSVGElement.classList.remove('jinr-approval-svg');
							}
							const JinrLackElement = document.createElement('span');
							JinrLackElement.className = 'jinr-lack-content';
							if (data === 'user_pass_lack') {
								JinrLackElement.textContent = '8文字以上のパスワードを設定してください';
								JinrRegisterPass.className = 'jinr-lack-input';
								JinrRegisterPass.after(JinrLackElement);
							} else if (data === 'user_pass_invalid') {
								JinrLackElement.textContent = 'パスワードが正しくありません';
								JinrRegisterPass.className = 'jinr-lack-input';
								JinrRegisterPass.after(JinrLackElement);
							}
							
						}
					}).fail(function (XMLHttpRequest, status, e) {
						const JinrLackElement = document.createElement('span');
						JinrLackElement.className = 'jinr-lack-content';
						JinrLackElement.textContent = '何かがうまくいかなかったようです。サイト運営者に問い合わせてください';
						JinrRegisterPass.className = 'jinr-lack-input';
						JinrRegisterPass.after(JinrLackElement);
					});
					return false;
				});
			}
		}
		JinrRegisterCheckInputValue();

		function JinrLoginCheckInputValue() {
			const JinrLoginMail = document.getElementById('JinrLoginMail');
			const JinrLoginPass = document.getElementById('JinrLoginPass');
			if (JinrLoginMail) {
				JinrLoginMail.addEventListener("input", () => {
					const JinrLoginMailValue = JinrLoginMail.value;
					let data = {
						action: 'jinr_login_check_mail_action',
						mail: JinrLoginMailValue,
					};
					$.ajax({
						type: "POST",
						url: jinr_paidpost.ajaxurl,
						data: data,
						datatype: "JSON",
					}).done(function (data, textStatus, jqXHR) {
						const inputSVGElement = document.getElementById('JinrLoginMailSVG');
						const nextLackContent = JinrLoginMail.nextElementSibling;
							if (nextLackContent !== null) {
								if (nextLackContent.classList.contains('jinr-lack-content')) {
									nextLackContent.remove();
									JinrLoginMail.classList.remove('jinr-lack-input');
								}
							}
						if (data === 'user_mail_approve') {
							JinrLoginMail.classList.add('jinr-approval-input');
							inputSVGElement.classList.add('jinr-approval-svg');
						} else {
							if (JinrLoginMail.classList.contains('jinr-approval-input')) {
								JinrLoginMail.classList.remove('jinr-approval-input');
							}
							if (inputSVGElement.classList.contains('jinr-approval-svg')) {
								inputSVGElement.classList.remove('jinr-approval-svg');
							}
							const JinrLackElement = document.createElement('span');
							JinrLackElement.className = 'jinr-lack-content';
							if (data === 'user_name_lack') {
								JinrLackElement.textContent = 'メールアドレスが不足しています';
								JinrLoginMail.className = 'jinr-lack-input';
								JinrLoginMail.after(JinrLackElement);
							} else if (data === 'user_mail_invalid') {
								JinrLackElement.textContent = '不正なメールアドレスです';
								JinrLoginMail.className = 'jinr-lack-input';
								JinrLoginMail.after(JinrLackElement);
							} else if (data === 'user_not_found') {
								JinrLackElement.textContent = 'このメールアドレスを持つユーザーが存在しません';
								JinrLoginMail.className = 'jinr-lack-input';
								JinrLoginMail.after(JinrLackElement);
							}
						}
					}).fail(function (XMLHttpRequest, status, e) {
						const JinrLackElement = document.createElement('span');
						JinrLackElement.className = 'jinr-lack-content';
						JinrLackElement.textContent = '何かがうまくいかなかったようです。サイト運営者に問い合わせてください';
						JinrLoginMail.className = 'jinr-lack-input';
						JinrLoginMail.after(JinrLackElement);
					});
					return false;
				});
			}

			if (JinrLoginPass) {
				JinrLoginPass.addEventListener("input", () => {
					const JinrLoginPassValue = JinrLoginPass.value;
					let data = {
						action: 'jinr_login_check_pass_action',
						pass: JinrLoginPassValue,
					};
					$.ajax({
						type: "POST",
						url: jinr_paidpost.ajaxurl,
						data: data,
						datatype: "JSON",
					}).done(function (data, textStatus, jqXHR) {
						const inputSVGElement = document.getElementById('JinrLoginPassSVG');
						const nextLackContent = JinrLoginPass.nextElementSibling;
							if (nextLackContent !== null) {
								if (nextLackContent.classList.contains('jinr-lack-content')) {
									nextLackContent.remove();
									JinrLoginPass.classList.remove('jinr-lack-input');
								}
							}
						if (data === 'user_pass_approve') {
							JinrLoginPass.classList.add('jinr-approval-input');
							inputSVGElement.classList.add('jinr-approval-svg');
						} else {
							if (JinrLoginPass.classList.contains('jinr-approval-input')) {
								JinrLoginPass.classList.remove('jinr-approval-input');
							}
							if (inputSVGElement.classList.contains('jinr-approval-svg')) {
								inputSVGElement.classList.remove('jinr-approval-svg');
							}
							const JinrLackElement = document.createElement('span');
							JinrLackElement.className = 'jinr-lack-content';
							if (data === 'user_pass_lack') {
								JinrLackElement.textContent = '8文字以上のパスワードを設定してください';
								JinrLoginPass.className = 'jinr-lack-input';
								JinrLoginPass.after(JinrLackElement);
							} else if (data === 'user_pass_invalid') {
								JinrLackElement.textContent = 'パスワードが正しくありません';
								JinrLoginPass.className = 'jinr-lack-input';
								JinrLoginPass.after(JinrLackElement);
							}
							
						}
					}).fail(function (XMLHttpRequest, status, e) {
						const JinrLackElement = document.createElement('span');
						JinrLackElement.className = 'jinr-lack-content';
						JinrLackElement.textContent = '何かがうまくいかなかったようです。サイト運営者に問い合わせてください';
						JinrLoginPass.className = 'jinr-lack-input';
						JinrLoginPass.after(JinrLackElement);
					});
					return false;
				});
			}
		}
		JinrLoginCheckInputValue();

		// ログイン時のajaxを実装する
		const JinrLoginButton = document.getElementById('JinrLoginButton');
		const reCAPTCHAAPI = document.getElementById('advanced-google-recaptcha-api-js');
		if (reCAPTCHAAPI) {
			if (jinr_paidpost.agrVersion == 'v3') {
				grecaptcha.ready(function () {
					grecaptcha.execute(agrRecaptcha.site_key, { action: 'login' }).then(function (token) {
						if (document.getElementById('g-recaptcha-response')) {
							document.getElementById('g-recaptcha-response').value = token;	
						}
					});
				});
			}
		}
		if (JinrLoginButton) {
			JinrLoginButton.addEventListener('click', function () {
				const reCAPTCHAValue = document.getElementById('g-recaptcha-response').getAttribute('value');
				JinrLoginButton.innerText = '';
				JinrLoginButton.insertAdjacentHTML('beforeend', '<span class="a--paidpost-loading">処理中...</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 44 44" stroke="#fff"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle></g></svg>');
				
				const JinrLoginMail = document.getElementById('JinrLoginMail');
				const JinrLoginMailValue = JinrLoginMail.value;
				const JinrLoginPass = document.getElementById('JinrLoginPass');
				const JinrLoginPassValue = JinrLoginPass.value;
				const JinrLoginNonce = document.getElementById('jinr_nonce_login_check');
				const JinrLoginNonceValue = JinrLoginNonce.value;
				const JinrPaidpostID = document.getElementById('JinrPaidpostID');
				const JinrPaidpostIDValue = JinrPaidpostID.value;
	
				const nextLackContent = JinrLoginButton.nextElementSibling;
				if (nextLackContent.classList.contains('jinr-lack-content')) {
					nextLackContent.remove();
				}
	
				JinrLoginMail.addEventListener("input", (e) => {
					const nextLackContent = JinrLoginMail.nextElementSibling;
					if (nextLackContent.classList.contains('jinr-lack-content')) {
						nextLackContent.remove();
					}
				});
				JinrLoginPass.addEventListener("input", (e) => {
					const nextLackContent = JinrLoginPass.nextElementSibling;
					if (nextLackContent.classList.contains('jinr-lack-content')) {
						nextLackContent.remove();
					}
				});
	
				let data = {
					action: 'jinr_login_action',
					mail: JinrLoginMailValue,
					pass: JinrLoginPassValue,
					nonce: JinrLoginNonceValue,
					productID: JinrPaidpostIDValue,
					'g-recaptcha-response': reCAPTCHAValue,
				};
				$.ajax({
					type: "POST",
					url: jinr_paidpost.ajaxurl,
					datatype: "JSON",
					data: data,
				}).done(function (data, textStatus, jqXHR) {
					const JinrLackElement = document.createElement('span');
					JinrLackElement.className = 'jinr-lack-content';
					if (data === 'inputUsermail') {
						JinrLackElement.textContent = 'メールアドレスを入力してください';
						JinrLoginMail.after(JinrLackElement);
						JinrLoginButton.innerText = 'ログイン';
					} else if (data === 'inputPassword') {
						JinrLackElement.textContent = 'パスワードを入力してください';
						JinrLoginPass.after(JinrLackElement);
						JinrLoginButton.innerText = 'ログイン';
					} else if (data === 'user_not_found') {
						JinrLackElement.textContent = 'このメールアドレスは登録されていません';
						JinrLoginMail.after(JinrLackElement);
						JinrLoginButton.innerText = 'ログイン';
					} else if (data === 'user_mail_invalid') {
						JinrLackElement.textContent = 'このメールアドレスは正しくありません';
						JinrLoginMail.after(JinrLackElement);
						JinrLoginButton.innerText = 'ログイン';
					} else if (data === 'incorrect_password') {
						JinrLackElement.textContent = 'このパスワードは間違っています';
						JinrLoginPass.after(JinrLackElement);
						JinrLoginButton.innerText = 'ログイン';
						JinrLoginPass.classList.remove('jinr-approval-input');
						JinrLoginPass.classList.add('jinr-lack-input');
						const inputSVGElement = document.getElementById('JinrLoginPassSVG');
						inputSVGElement.classList.remove('jinr-approval-svg');
					} else if (data === 'wp_invalid') {
						JinrLackElement.textContent = 'メールアドレスとパスワードのどちらかか両方が間違っています';
						JinrLoginButton.after(JinrLackElement);
						JinrLoginButton.innerText = 'ログイン';
					} else if (data === 'Purchased') {
						setTimeout(function () {
							const RedirectURL = location.href;
							JinrLoginButton.innerText = 'ログイン完了｜ページリロードします';
							JinrLoginButton.classList.add('a--register-complete');
							setTimeout(() => {
								location.href = RedirectURL;
							}, 1200);
						}, 2200);
					} else if (data === 'notPurchased') {
						setTimeout(function () {
							let JinrPaidpostURL = document.getElementById('JinrPaidpostURL').value;
							JinrPaidpostURL = JinrPaidpostURL + '?prefilled_email=' + encodeURIComponent(JinrLoginMailValue);
							JinrLoginButton.innerText = 'ログイン完了｜購入ページへ遷移します';
							JinrLoginButton.classList.add('a--register-complete');
							setTimeout(() => {
								location.href = JinrPaidpostURL;
							}, 1000);
						}, 2200);
					} 
				}).fail(function (XMLHttpRequest, status, e) {
					console.log("ajax失敗: " + status + XMLHttpRequest);
				});
				return false;
			})
		}
		// パスワードを忘れたときのajax
		const JinrLoatpasswordButton = document.getElementById('JinrLoatpasswordButton');
		if (JinrLoatpasswordButton) {
			JinrLoatpasswordButton.addEventListener('click', function (e) {	
				JinrLoatpasswordButton.innerText = '';
				JinrLoatpasswordButton.insertAdjacentHTML('beforeend', '<span class="a--paidpost-loading">処理中...</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 44 44" stroke="#fff"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle></g></svg>');
				
				const JinrMailForLostapassword = document.getElementById('JinrMailForLostapassword');
				const JinrMailForLostapasswordValue = JinrMailForLostapassword.value;
				const JinrLostapasswordNonce = document.getElementById('jinr_nonce_lostpassword_check').value;
	
				JinrMailForLostapassword.addEventListener("input", (e) => {
					const nextLackContent = JinrMailForLostapassword.nextElementSibling;
					if (nextLackContent.classList.contains('jinr-lack-content')) {
						nextLackContent.remove();
					}
				});
				let data = {
					action: 'jinr_lostpassword_action',
					mail: JinrMailForLostapasswordValue,
					nonce: JinrLostapasswordNonce,
				};
				$.ajax({
					type: "POST",
					url: jinr_paidpost.ajaxurl,
					data: data,
				}).done(function (data, textStatus, jqXHR) {
					if (data === 'send') {
						JinrLoatpasswordButton.innerText = '再設定｜メールを送信';
						
						const sendTextContents = document.createElement('p');
						const sendtroubleContents = document.createElement('p');
						sendTextContents.className = 'a--paidpost-sendtext';
						sendtroubleContents.className = 'a--paidpost-troubletext';
	
						sendTextContents.innerHTML = 'メールを送信しました。届いたメールからパスワードを再設定して<a href="#">ログイン</a>してください';
						sendtroubleContents.innerHTML = '<span class="a--paidpost-innertext">メールが届かない場合</span>迷惑メールフォルダをご確認ください。それでも見つからない時はサイト運営者までお問い合わせください。';
	
						JinrLoatpasswordButton.after(sendtroubleContents);
						JinrLoatpasswordButton.after(sendTextContents);
	
					} else if (data === 'unsend') {
						JinrLoatpasswordButton.innerText = '再設定｜メールを送信';
						const sendTextContents = document.createElement('p');
						sendTextContents.className = 'jinr-lack-content';
						sendTextContents.innerHTML = 'メールが正しく送信できませんでした。サイト運営者にお問合せください。';
						JinrMailForLostapassword.after(sendTextContents);
					} else if (data === 'invalid') {
						JinrLoatpasswordButton.innerText = '再設定｜メールを送信';
						const sendTextContents = document.createElement('p');
						sendTextContents.className = 'jinr-lack-content';
						sendTextContents.innerHTML = '不正なメールアドレスです。正しいメールアドレスを入力してください。';
						JinrMailForLostapassword.after(sendTextContents);
						
					} else if (data === 'notregistered') {
						JinrLoatpasswordButton.innerText = '再設定｜メールを送信';
						const sendTextContents = document.createElement('p');
						sendTextContents.className = 'jinr-lack-content';
						sendTextContents.innerHTML = 'このメールアドレスは登録されていません。';
						JinrMailForLostapassword.after(sendTextContents);
						
					} else {
						JinrLoatpasswordButton.innerText = '再設定｜メールを送信';
						const sendTextContents = document.createElement('p');
						sendTextContents.className = 'jinr-lack-content';
						sendTextContents.innerHTML = '何かがうまくいかなかったようです。ページをリロードして再度試してみてください。';
						JinrLoatpasswordButton.after(sendTextContents);
					}
				}).fail(function (XMLHttpRequest, status, e) {
					console.log("ajax失敗: " + status + XMLHttpRequest);
				});
				return false;
			})
		}

		// サブスクを解約する時の処理をajaxでかく
		const JinrUnsubscribePopup = document.getElementById('JinrUnsubscribePopup');
		if (JinrUnsubscribePopup) {
			JinrUnsubscribePopup.addEventListener('click', function (e) {
				e.preventDefault();
				const body = document.getElementsByTagName('body')[0];
				scrollTop = window.scrollY;
				body.style.top = (scrollTop * -1) + 'px';
				body.classList.add('jinr-no-scroll');
				const JinrPaidpostCancelWrapper = document.getElementById('JinrPaidpostCancelWrapper');
				const jinrPopupBg = document.getElementById('JinrPopupBg');
				if (JinrPaidpostCancelWrapper) {
					JinrPaidpostCancelWrapper.classList.add('a--paidpost-popup');
				}
				if (jinrPopupBg) {
					jinrPopupBg.classList.add('a--paidpost-popup');
				}
			});
		}
		const JinrUnsubscribeButton = document.getElementById('JinrUnsubscribeButton');
		if (!JinrUnsubscribeButton) return;
		JinrUnsubscribeButton.addEventListener('click', function (e) {
			const JinrSubscriptionID = document.getElementById('JinrSubscriptionID').value;
			const JinrPaymentLink = document.getElementById('JinrPaymentLink').value;
			JinrUnsubscribeButton.innerText = '';
			JinrUnsubscribeButton.insertAdjacentHTML('beforeend', '<span class="a--paidpost-loading">処理中...</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 44 44" stroke="#fff"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle></g></svg>');
			$.ajax({
				url: jinr_paidpost.ajaxurl,
				type: 'POST',
				data: {
					action: 'jinr_subscription_cancel_action',
					JinrSubscriptionID: JinrSubscriptionID,
					JinrPaymentLink: JinrPaymentLink,
				},
				dataType: 'text'
			}).done(function (data, textStatus, jqXHR) {
				if (data == 'cancel_success') {
					setTimeout(function () {
						const RedirectURL = location.href;
						JinrUnsubscribeButton.innerText = 'サブスク解約完了｜ページリロードします';
						JinrUnsubscribeButton.classList.add('a--register-complete');
						setTimeout(() => {
							location.href = RedirectURL;
						}, 1200);
					}, 2200);
				} else if (data == 'cancel_failed') {
					JinrUnsubscribeButton.innerText = 'サブスクを解約する';
				}
			}).fail(function (XMLHttpRequest, status, e) {
				console.log("ajax失敗: " + status + XMLHttpRequest);
			});
			return false;
		})
	});
})(jQuery)
