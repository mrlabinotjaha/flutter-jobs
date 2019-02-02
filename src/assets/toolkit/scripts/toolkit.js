/**
 * Toolkit JavaScript
 */

'use strict';

var $ = require('jquery');
// var Modernizr = require('modernizr');

// Third-party modules
// require('../../vendor/example/plugin.js');
require('../../../../node_modules/chosen-js/chosen.jquery.js');

// Foundation JS
require('./foundation.js');

// Utilities
// require('./utils/reinit-components.js');

// Compatibility
// require('./compatibility/modernizr-tests.js');

// Components
// require('./components/owl-carousel.js');

$(function(){
	// $('input, textarea').placeholder();
	$(document).foundation();
	$(".chosen-select").chosen();
	setTimeout(function(){
		$(".fouc").css('opacity',1);
	},200);
});