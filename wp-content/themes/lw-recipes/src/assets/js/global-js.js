const mobileMenuBtn = document.querySelector("#toggle-mobile-menu");
const menu = document.querySelector(".nav");
const submenu = document.querySelectorAll(".open-toggle");
const firstLink = document.querySelector("#primary-nav li:first-child a");

const mobileSearchBtn = document.querySelector("#search-btn-mobile");
const desktopSearchBtn = document.querySelector("#search-btn-desktop");
const searchBtn = document.querySelectorAll(".search-btn");
const search = document.querySelector("#search-form");
const searchSubmit = document.querySelector("#search-submit");
const searchInput = document.querySelector("#search-input");
const isMobile = window.innerWidth < 769;

if (mobileMenuBtn && menu) {
	mobileMenuBtn.addEventListener("click", () => {
		const ariaExpanded = mobileMenuBtn.getAttribute("aria-expanded");


		if (ariaExpanded == "true") {
			menu.classList.add("hidden");
			mobileMenuBtn.setAttribute("aria-expanded", false);

			if (mobileSearchBtn) {
				mobileSearchBtn.removeAttribute("disabled");
			}
		}
		else {
			menu.classList.remove("hidden");
			mobileMenuBtn.setAttribute("aria-expanded", true);

			if (firstLink) {
				firstLink.focus();
			}

			if (mobileSearchBtn) {
				mobileSearchBtn.setAttribute("disabled", "");
			}

		}
	});
}

if (submenu) {
	submenu.forEach((menu) => {
		const thisSubmenu = menu.nextElementSibling;
		const thisParentMenu = menu.closest("li");
		const button = thisParentMenu.querySelector("button");

		if (thisSubmenu && thisParentMenu && button) {
			menu.addEventListener("click", () => {

				if (thisParentMenu.classList.contains("active")) {
					thisParentMenu.classList.remove("active");
					menu.setAttribute("aria-expanded", false);
				}
				else {
					thisParentMenu.classList.add("active");
					menu.setAttribute("aria-expanded", true);
				}

				const allFocusableElements = thisParentMenu.querySelectorAll('a, button, input, [tabindex="0"]');
				allFocusableElements[allFocusableElements.length - 1]?.addEventListener("keydown", (event) => {
					if (event.key === 'Tab' && !event.shiftKey) {
						event.preventDefault();
						button.focus();

					}
				});

			});
		}
	});
}



if (searchBtn && search) {
	searchBtn.forEach((btn) => {
		btn.addEventListener("click", () => {
		const ariaExpanded = btn.getAttribute("aria-expanded");

		if (ariaExpanded == 'true') {
			btn.setAttribute("aria-expanded", false);
			search.classList.add('hidden');

			if (window.innerWidth < 769 && mobileMenuBtn) {
				mobileMenuBtn.removeAttribute("disabled");
			}
		}	
		else {
			btn.setAttribute("aria-expanded", true);
			search.classList.remove('hidden');
			searchInput.focus();

			if (window.innerWidth < 769 && mobileMenuBtn) {
				mobileMenuBtn.setAttribute("disabled", "");
			}
		}
	});
	});

	if (searchSubmit) {
		searchSubmit.addEventListener("keydown", (event) => {
			if (event.key === 'Tab' && !event.shiftKey) {
				event.preventDefault();

				if (isMobile && mobileSearchBtn) {
					mobileSearchBtn.focus();
				}
				else {
					if (desktopSearchBtn) {
						desktopSearchBtn.focus();
					}
				}
			}
		});
	}
}

window.addEventListener("resize", () => {
	
	if (!mobileSearchBtn || !desktopSearchBtn) return;

	if (window.innerWidth < 769) {
		if (desktopSearchBtn.getAttribute("aria-expanded") == 'true') {
			desktopSearchBtn.setAttribute("aria-expanded", false);
			mobileSearchBtn.setAttribute("aria-expanded", true);
		}
	}
	else {

		if (mobileSearchBtn.getAttribute("aria-expanded") == 'true') {
			mobileSearchBtn.setAttribute("aria-expanded", false);
			desktopSearchBtn.setAttribute("aria-expanded", true);
		}
	}

});


