/*
	Christmas lights + snowflakes from:
	https://github.com/raimonvibe/Christmas-website-ethereal-NL
*/

(function() {
	var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function createHoverSnowflake(host) {
		var snowflake = document.createElement('div');
		snowflake.className = 'snowflake';
		snowflake.setAttribute('aria-hidden', 'true');
		snowflake.textContent = '❄';
		snowflake.style.position = 'absolute';
		snowflake.style.left = (Math.random() * host.offsetWidth) + 'px';
		snowflake.style.top = '-20px';
		snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
		snowflake.style.opacity = String(Math.random() * 0.5 + 0.5);
		snowflake.style.transition = 'top 2s ease-in, left 2s ease-in-out';
		host.appendChild(snowflake);

		setTimeout(function() {
			snowflake.style.top = (host.offsetHeight + 20) + 'px';
			snowflake.style.left = (Math.random() * host.offsetWidth) + 'px';
		}, 50);

		setTimeout(function() {
			if (snowflake.parentNode) {
				snowflake.parentNode.removeChild(snowflake);
			}
		}, 2000);
	}

	function createMultipleSnowflakes(host) {
		for (var i = 0; i < 5; i++) {
			(function(index) {
				setTimeout(function() {
					createHoverSnowflake(host);
				}, index * 200);
			})(i);
		}
	}

	function ensureRelative(el) {
		var position = window.getComputedStyle(el).position;
		if (position === 'static') {
			el.style.position = 'relative';
		}
	}

	function bindHoverSnow(el, host) {
		ensureRelative(host);
		el.addEventListener('mouseenter', function() {
			createMultipleSnowflakes(host);
		});
	}

	function initHoverSnow() {
		var buttons = document.querySelectorAll('.button');
		for (var i = 0; i < buttons.length; i++) {
			bindHoverSnow(buttons[i], buttons[i]);
		}

		var submits = document.querySelectorAll('input[type="submit"]');
		for (var j = 0; j < submits.length; j++) {
			var parent = submits[j].parentNode;
			if (parent) {
				bindHoverSnow(submits[j], parent);
			}
		}

		var icons = document.querySelectorAll('.contact-icons li');
		for (var k = 0; k < icons.length; k++) {
			bindHoverSnow(icons[k], icons[k]);
		}
	}

	function spawnFallingSnowflake(container) {
		var flake = document.createElement('div');
		flake.className = 'snowflake snowflake--fall';
		flake.setAttribute('aria-hidden', 'true');
		flake.textContent = '❄';
		flake.style.left = (Math.random() * 100) + '%';
		flake.style.fontSize = (Math.random() * 12 + 10) + 'px';
		flake.style.opacity = String(Math.random() * 0.45 + 0.45);
		flake.style.animationDuration = (Math.random() * 8 + 8) + 's';
		container.appendChild(flake);

		flake.addEventListener('animationend', function() {
			if (flake.parentNode) {
				flake.parentNode.removeChild(flake);
			}
		});
	}

	function initFallingSnow() {
		if (prefersReducedMotion) {
			return;
		}

		var container = document.createElement('div');
		container.className = 'snowflake-container';
		container.setAttribute('aria-hidden', 'true');
		document.body.appendChild(container);

		var count = window.innerWidth < 736 ? 18 : 32;
		for (var i = 0; i < count; i++) {
			(function(index) {
				setTimeout(function() {
					spawnFallingSnowflake(container);
				}, index * 180);
			})(i);
		}

		setInterval(function() {
			if (container.childElementCount < 48) {
				spawnFallingSnowflake(container);
			}
		}, 700);
	}

	function startFallingSnow() {
		window.setTimeout(initFallingSnow, 150);
	}

	function init() {
		initHoverSnow();
		if (document.readyState === 'complete') {
			startFallingSnow();
		} else {
			window.addEventListener('load', startFallingSnow);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
