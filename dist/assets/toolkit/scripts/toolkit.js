/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Toolkit JavaScript
	 */

	'use strict';

	var $ = __webpack_require__(2);
	// var Modernizr = require('modernizr');

	// Third-party modules
	// require('../../vendor/example/plugin.js');
	__webpack_require__(3);

	// Foundation JS
	__webpack_require__(4);

	// Utilities
	// require('./utils/reinit-components.js');

	// Compatibility
	// require('./compatibility/modernizr-tests.js');

	// Components
	// require('./components/owl-carousel.js');

	$(function () {
	  $(window).scroll(function () {
	    if ($(this).scrollTop() > 20) {
	      $('.header').addClass('header__content-change');
	    } else if ($(this).scrollTop() < 20) {
	      $('.header').removeClass('header__content-change');
	    }
	  });
	});

	$(".dashboard-header__login").click(function () {
	  $('.dashboard-header__dropdown').toggleClass('opened');
	});

	$(function () {
	  // $('input, textarea').placeholder();
	  $(document).foundation();
	  $(".chosen-select").chosen();
	  setTimeout(function () {
	    $(".fouc").css('opacity', 1);
	  }, 200);

	  $(".menu").click(function () {
	    $('.menu').toggleClass("open");
	    $('.header__nav-mobie').toggleClass("open");
	  });

	  // Create a Stripe client.
	  var stripe = Stripe('pk_test_5xEaWrlDOsegN7c3S2LzPy4N');

	  // Create an instance of Elements.
	  var elements = stripe.elements();

	  // Custom styling can be passed to options when creating an Element.
	  // (Note that this demo uses a wider set of styles than the guide below.)
	  var style = {
	    base: {
	      color: '#32325d',
	      lineHeight: '18px',
	      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
	      fontSmoothing: 'antialiased',
	      fontSize: '16px',
	      '::placeholder': {
	        color: '#aab7c4'
	      }
	    },
	    invalid: {
	      color: '#fa755a',
	      iconColor: '#fa755a'
	    }
	  };

	  // Create an instance of the card Element.
	  var card = elements.create('card', { style: style });

	  // Add an instance of the card Element into the `card-element` <div>.
	  card.mount('#card-element');

	  // Handle real-time validation errors from the card Element.
	  card.addEventListener('change', function (event) {
	    var displayError = document.getElementById('card-errors');
	    if (event.error) {
	      displayError.textContent = event.error.message;
	    } else {
	      displayError.textContent = '';
	    }
	  });

	  // Handle form submission.
	  var form = document.getElementById('payment-form');
	  form.addEventListener('submit', function (event) {
	    event.preventDefault();

	    stripe.createToken(card).then(function (result) {
	      if (result.error) {
	        // Inform the user if there was an error.
	        var errorElement = document.getElementById('card-errors');
	        errorElement.textContent = result.error.message;
	      } else {
	        // Send the token to your server.
	        stripeTokenHandler(result.token);
	      }
	    });
	  });

	  // Submit the form with the token ID.
	  function stripeTokenHandler(token) {
	    // Insert the token ID into the form so it gets submitted to the server
	    var form = document.getElementById('payment-form');
	    var hiddenInput = document.createElement('input');
	    hiddenInput.setAttribute('type', 'hidden');
	    hiddenInput.setAttribute('name', 'stripeToken');
	    hiddenInput.setAttribute('value', token.id);
	    form.appendChild(hiddenInput);

	    // Submit the form
	    form.submit();
	  }
	});

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	(function() {
	  var $, AbstractChosen, Chosen, SelectParser,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  SelectParser = (function() {
	    function SelectParser() {
	      this.options_index = 0;
	      this.parsed = [];
	    }

	    SelectParser.prototype.add_node = function(child) {
	      if (child.nodeName.toUpperCase() === "OPTGROUP") {
	        return this.add_group(child);
	      } else {
	        return this.add_option(child);
	      }
	    };

	    SelectParser.prototype.add_group = function(group) {
	      var group_position, i, len, option, ref, results1;
	      group_position = this.parsed.length;
	      this.parsed.push({
	        array_index: group_position,
	        group: true,
	        label: group.label,
	        title: group.title ? group.title : void 0,
	        children: 0,
	        disabled: group.disabled,
	        classes: group.className
	      });
	      ref = group.childNodes;
	      results1 = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        option = ref[i];
	        results1.push(this.add_option(option, group_position, group.disabled));
	      }
	      return results1;
	    };

	    SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
	      if (option.nodeName.toUpperCase() === "OPTION") {
	        if (option.text !== "") {
	          if (group_position != null) {
	            this.parsed[group_position].children += 1;
	          }
	          this.parsed.push({
	            array_index: this.parsed.length,
	            options_index: this.options_index,
	            value: option.value,
	            text: option.text,
	            html: option.innerHTML,
	            title: option.title ? option.title : void 0,
	            selected: option.selected,
	            disabled: group_disabled === true ? group_disabled : option.disabled,
	            group_array_index: group_position,
	            group_label: group_position != null ? this.parsed[group_position].label : null,
	            classes: option.className,
	            style: option.style.cssText
	          });
	        } else {
	          this.parsed.push({
	            array_index: this.parsed.length,
	            options_index: this.options_index,
	            empty: true
	          });
	        }
	        return this.options_index += 1;
	      }
	    };

	    return SelectParser;

	  })();

	  SelectParser.select_to_array = function(select) {
	    var child, i, len, parser, ref;
	    parser = new SelectParser();
	    ref = select.childNodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      child = ref[i];
	      parser.add_node(child);
	    }
	    return parser.parsed;
	  };

	  AbstractChosen = (function() {
	    function AbstractChosen(form_field, options1) {
	      this.form_field = form_field;
	      this.options = options1 != null ? options1 : {};
	      this.label_click_handler = bind(this.label_click_handler, this);
	      if (!AbstractChosen.browser_is_supported()) {
	        return;
	      }
	      this.is_multiple = this.form_field.multiple;
	      this.set_default_text();
	      this.set_default_values();
	      this.setup();
	      this.set_up_html();
	      this.register_observers();
	      this.on_ready();
	    }

	    AbstractChosen.prototype.set_default_values = function() {
	      this.click_test_action = (function(_this) {
	        return function(evt) {
	          return _this.test_active_click(evt);
	        };
	      })(this);
	      this.activate_action = (function(_this) {
	        return function(evt) {
	          return _this.activate_field(evt);
	        };
	      })(this);
	      this.active_field = false;
	      this.mouse_on_container = false;
	      this.results_showing = false;
	      this.result_highlighted = null;
	      this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className);
	      this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
	      this.disable_search_threshold = this.options.disable_search_threshold || 0;
	      this.disable_search = this.options.disable_search || false;
	      this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;
	      this.group_search = this.options.group_search != null ? this.options.group_search : true;
	      this.search_contains = this.options.search_contains || false;
	      this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;
	      this.max_selected_options = this.options.max_selected_options || Infinity;
	      this.inherit_select_classes = this.options.inherit_select_classes || false;
	      this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;
	      this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;
	      this.include_group_label_in_selected = this.options.include_group_label_in_selected || false;
	      this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY;
	      this.case_sensitive_search = this.options.case_sensitive_search || false;
	      return this.hide_results_on_select = this.options.hide_results_on_select != null ? this.options.hide_results_on_select : true;
	    };

	    AbstractChosen.prototype.set_default_text = function() {
	      if (this.form_field.getAttribute("data-placeholder")) {
	        this.default_text = this.form_field.getAttribute("data-placeholder");
	      } else if (this.is_multiple) {
	        this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;
	      } else {
	        this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;
	      }
	      this.default_text = this.escape_html(this.default_text);
	      return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text;
	    };

	    AbstractChosen.prototype.choice_label = function(item) {
	      if (this.include_group_label_in_selected && (item.group_label != null)) {
	        return "<b class='group-name'>" + (this.escape_html(item.group_label)) + "</b>" + item.html;
	      } else {
	        return item.html;
	      }
	    };

	    AbstractChosen.prototype.mouse_enter = function() {
	      return this.mouse_on_container = true;
	    };

	    AbstractChosen.prototype.mouse_leave = function() {
	      return this.mouse_on_container = false;
	    };

	    AbstractChosen.prototype.input_focus = function(evt) {
	      if (this.is_multiple) {
	        if (!this.active_field) {
	          return setTimeout(((function(_this) {
	            return function() {
	              return _this.container_mousedown();
	            };
	          })(this)), 50);
	        }
	      } else {
	        if (!this.active_field) {
	          return this.activate_field();
	        }
	      }
	    };

	    AbstractChosen.prototype.input_blur = function(evt) {
	      if (!this.mouse_on_container) {
	        this.active_field = false;
	        return setTimeout(((function(_this) {
	          return function() {
	            return _this.blur_test();
	          };
	        })(this)), 100);
	      }
	    };

	    AbstractChosen.prototype.label_click_handler = function(evt) {
	      if (this.is_multiple) {
	        return this.container_mousedown(evt);
	      } else {
	        return this.activate_field();
	      }
	    };

	    AbstractChosen.prototype.results_option_build = function(options) {
	      var content, data, data_content, i, len, ref, shown_results;
	      content = '';
	      shown_results = 0;
	      ref = this.results_data;
	      for (i = 0, len = ref.length; i < len; i++) {
	        data = ref[i];
	        data_content = '';
	        if (data.group) {
	          data_content = this.result_add_group(data);
	        } else {
	          data_content = this.result_add_option(data);
	        }
	        if (data_content !== '') {
	          shown_results++;
	          content += data_content;
	        }
	        if (options != null ? options.first : void 0) {
	          if (data.selected && this.is_multiple) {
	            this.choice_build(data);
	          } else if (data.selected && !this.is_multiple) {
	            this.single_set_selected_text(this.choice_label(data));
	          }
	        }
	        if (shown_results >= this.max_shown_results) {
	          break;
	        }
	      }
	      return content;
	    };

	    AbstractChosen.prototype.result_add_option = function(option) {
	      var classes, option_el;
	      if (!option.search_match) {
	        return '';
	      }
	      if (!this.include_option_in_results(option)) {
	        return '';
	      }
	      classes = [];
	      if (!option.disabled && !(option.selected && this.is_multiple)) {
	        classes.push("active-result");
	      }
	      if (option.disabled && !(option.selected && this.is_multiple)) {
	        classes.push("disabled-result");
	      }
	      if (option.selected) {
	        classes.push("result-selected");
	      }
	      if (option.group_array_index != null) {
	        classes.push("group-option");
	      }
	      if (option.classes !== "") {
	        classes.push(option.classes);
	      }
	      option_el = document.createElement("li");
	      option_el.className = classes.join(" ");
	      if (option.style) {
	        option_el.style.cssText = option.style;
	      }
	      option_el.setAttribute("data-option-array-index", option.array_index);
	      option_el.innerHTML = option.highlighted_html || option.html;
	      if (option.title) {
	        option_el.title = option.title;
	      }
	      return this.outerHTML(option_el);
	    };

	    AbstractChosen.prototype.result_add_group = function(group) {
	      var classes, group_el;
	      if (!(group.search_match || group.group_match)) {
	        return '';
	      }
	      if (!(group.active_options > 0)) {
	        return '';
	      }
	      classes = [];
	      classes.push("group-result");
	      if (group.classes) {
	        classes.push(group.classes);
	      }
	      group_el = document.createElement("li");
	      group_el.className = classes.join(" ");
	      group_el.innerHTML = group.highlighted_html || this.escape_html(group.label);
	      if (group.title) {
	        group_el.title = group.title;
	      }
	      return this.outerHTML(group_el);
	    };

	    AbstractChosen.prototype.results_update_field = function() {
	      this.set_default_text();
	      if (!this.is_multiple) {
	        this.results_reset_cleanup();
	      }
	      this.result_clear_highlight();
	      this.results_build();
	      if (this.results_showing) {
	        return this.winnow_results();
	      }
	    };

	    AbstractChosen.prototype.reset_single_select_options = function() {
	      var i, len, ref, result, results1;
	      ref = this.results_data;
	      results1 = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        result = ref[i];
	        if (result.selected) {
	          results1.push(result.selected = false);
	        } else {
	          results1.push(void 0);
	        }
	      }
	      return results1;
	    };

	    AbstractChosen.prototype.results_toggle = function() {
	      if (this.results_showing) {
	        return this.results_hide();
	      } else {
	        return this.results_show();
	      }
	    };

	    AbstractChosen.prototype.results_search = function(evt) {
	      if (this.results_showing) {
	        return this.winnow_results();
	      } else {
	        return this.results_show();
	      }
	    };

	    AbstractChosen.prototype.winnow_results = function(options) {
	      var escapedQuery, fix, i, len, option, prefix, query, ref, regex, results, results_group, search_match, startpos, suffix, text;
	      this.no_results_clear();
	      results = 0;
	      query = this.get_search_text();
	      escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	      regex = this.get_search_regex(escapedQuery);
	      ref = this.results_data;
	      for (i = 0, len = ref.length; i < len; i++) {
	        option = ref[i];
	        option.search_match = false;
	        results_group = null;
	        search_match = null;
	        option.highlighted_html = '';
	        if (this.include_option_in_results(option)) {
	          if (option.group) {
	            option.group_match = false;
	            option.active_options = 0;
	          }
	          if ((option.group_array_index != null) && this.results_data[option.group_array_index]) {
	            results_group = this.results_data[option.group_array_index];
	            if (results_group.active_options === 0 && results_group.search_match) {
	              results += 1;
	            }
	            results_group.active_options += 1;
	          }
	          text = option.group ? option.label : option.text;
	          if (!(option.group && !this.group_search)) {
	            search_match = this.search_string_match(text, regex);
	            option.search_match = search_match != null;
	            if (option.search_match && !option.group) {
	              results += 1;
	            }
	            if (option.search_match) {
	              if (query.length) {
	                startpos = search_match.index;
	                prefix = text.slice(0, startpos);
	                fix = text.slice(startpos, startpos + query.length);
	                suffix = text.slice(startpos + query.length);
	                option.highlighted_html = (this.escape_html(prefix)) + "<em>" + (this.escape_html(fix)) + "</em>" + (this.escape_html(suffix));
	              }
	              if (results_group != null) {
	                results_group.group_match = true;
	              }
	            } else if ((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {
	              option.search_match = true;
	            }
	          }
	        }
	      }
	      this.result_clear_highlight();
	      if (results < 1 && query.length) {
	        this.update_results_content("");
	        return this.no_results(query);
	      } else {
	        this.update_results_content(this.results_option_build());
	        if (!(options != null ? options.skip_highlight : void 0)) {
	          return this.winnow_results_set_highlight();
	        }
	      }
	    };

	    AbstractChosen.prototype.get_search_regex = function(escaped_search_string) {
	      var regex_flag, regex_string;
	      regex_string = this.search_contains ? escaped_search_string : "(^|\\s|\\b)" + escaped_search_string + "[^\\s]*";
	      if (!(this.enable_split_word_search || this.search_contains)) {
	        regex_string = "^" + regex_string;
	      }
	      regex_flag = this.case_sensitive_search ? "" : "i";
	      return new RegExp(regex_string, regex_flag);
	    };

	    AbstractChosen.prototype.search_string_match = function(search_string, regex) {
	      var match;
	      match = regex.exec(search_string);
	      if (!this.search_contains && (match != null ? match[1] : void 0)) {
	        match.index += 1;
	      }
	      return match;
	    };

	    AbstractChosen.prototype.choices_count = function() {
	      var i, len, option, ref;
	      if (this.selected_option_count != null) {
	        return this.selected_option_count;
	      }
	      this.selected_option_count = 0;
	      ref = this.form_field.options;
	      for (i = 0, len = ref.length; i < len; i++) {
	        option = ref[i];
	        if (option.selected) {
	          this.selected_option_count += 1;
	        }
	      }
	      return this.selected_option_count;
	    };

	    AbstractChosen.prototype.choices_click = function(evt) {
	      evt.preventDefault();
	      this.activate_field();
	      if (!(this.results_showing || this.is_disabled)) {
	        return this.results_show();
	      }
	    };

	    AbstractChosen.prototype.keydown_checker = function(evt) {
	      var ref, stroke;
	      stroke = (ref = evt.which) != null ? ref : evt.keyCode;
	      this.search_field_scale();
	      if (stroke !== 8 && this.pending_backstroke) {
	        this.clear_backstroke();
	      }
	      switch (stroke) {
	        case 8:
	          this.backstroke_length = this.get_search_field_value().length;
	          break;
	        case 9:
	          if (this.results_showing && !this.is_multiple) {
	            this.result_select(evt);
	          }
	          this.mouse_on_container = false;
	          break;
	        case 13:
	          if (this.results_showing) {
	            evt.preventDefault();
	          }
	          break;
	        case 27:
	          if (this.results_showing) {
	            evt.preventDefault();
	          }
	          break;
	        case 32:
	          if (this.disable_search) {
	            evt.preventDefault();
	          }
	          break;
	        case 38:
	          evt.preventDefault();
	          this.keyup_arrow();
	          break;
	        case 40:
	          evt.preventDefault();
	          this.keydown_arrow();
	          break;
	      }
	    };

	    AbstractChosen.prototype.keyup_checker = function(evt) {
	      var ref, stroke;
	      stroke = (ref = evt.which) != null ? ref : evt.keyCode;
	      this.search_field_scale();
	      switch (stroke) {
	        case 8:
	          if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
	            this.keydown_backstroke();
	          } else if (!this.pending_backstroke) {
	            this.result_clear_highlight();
	            this.results_search();
	          }
	          break;
	        case 13:
	          evt.preventDefault();
	          if (this.results_showing) {
	            this.result_select(evt);
	          }
	          break;
	        case 27:
	          if (this.results_showing) {
	            this.results_hide();
	          }
	          break;
	        case 9:
	        case 16:
	        case 17:
	        case 18:
	        case 38:
	        case 40:
	        case 91:
	          break;
	        default:
	          this.results_search();
	          break;
	      }
	    };

	    AbstractChosen.prototype.clipboard_event_checker = function(evt) {
	      if (this.is_disabled) {
	        return;
	      }
	      return setTimeout(((function(_this) {
	        return function() {
	          return _this.results_search();
	        };
	      })(this)), 50);
	    };

	    AbstractChosen.prototype.container_width = function() {
	      if (this.options.width != null) {
	        return this.options.width;
	      } else {
	        return this.form_field.offsetWidth + "px";
	      }
	    };

	    AbstractChosen.prototype.include_option_in_results = function(option) {
	      if (this.is_multiple && (!this.display_selected_options && option.selected)) {
	        return false;
	      }
	      if (!this.display_disabled_options && option.disabled) {
	        return false;
	      }
	      if (option.empty) {
	        return false;
	      }
	      return true;
	    };

	    AbstractChosen.prototype.search_results_touchstart = function(evt) {
	      this.touch_started = true;
	      return this.search_results_mouseover(evt);
	    };

	    AbstractChosen.prototype.search_results_touchmove = function(evt) {
	      this.touch_started = false;
	      return this.search_results_mouseout(evt);
	    };

	    AbstractChosen.prototype.search_results_touchend = function(evt) {
	      if (this.touch_started) {
	        return this.search_results_mouseup(evt);
	      }
	    };

	    AbstractChosen.prototype.outerHTML = function(element) {
	      var tmp;
	      if (element.outerHTML) {
	        return element.outerHTML;
	      }
	      tmp = document.createElement("div");
	      tmp.appendChild(element);
	      return tmp.innerHTML;
	    };

	    AbstractChosen.prototype.get_single_html = function() {
	      return "<a class=\"chosen-single chosen-default\">\n  <span>" + this.default_text + "</span>\n  <div><b></b></div>\n</a>\n<div class=\"chosen-drop\">\n  <div class=\"chosen-search\">\n    <input class=\"chosen-search-input\" type=\"text\" autocomplete=\"off\" />\n  </div>\n  <ul class=\"chosen-results\"></ul>\n</div>";
	    };

	    AbstractChosen.prototype.get_multi_html = function() {
	      return "<ul class=\"chosen-choices\">\n  <li class=\"search-field\">\n    <input class=\"chosen-search-input\" type=\"text\" autocomplete=\"off\" value=\"" + this.default_text + "\" />\n  </li>\n</ul>\n<div class=\"chosen-drop\">\n  <ul class=\"chosen-results\"></ul>\n</div>";
	    };

	    AbstractChosen.prototype.get_no_results_html = function(terms) {
	      return "<li class=\"no-results\">\n  " + this.results_none_found + " <span>" + (this.escape_html(terms)) + "</span>\n</li>";
	    };

	    AbstractChosen.browser_is_supported = function() {
	      if ("Microsoft Internet Explorer" === window.navigator.appName) {
	        return document.documentMode >= 8;
	      }
	      if (/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent)) {
	        return false;
	      }
	      return true;
	    };

	    AbstractChosen.default_multiple_text = "Select Some Options";

	    AbstractChosen.default_single_text = "Select an Option";

	    AbstractChosen.default_no_result_text = "No results match";

	    return AbstractChosen;

	  })();

	  $ = jQuery;

	  $.fn.extend({
	    chosen: function(options) {
	      if (!AbstractChosen.browser_is_supported()) {
	        return this;
	      }
	      return this.each(function(input_field) {
	        var $this, chosen;
	        $this = $(this);
	        chosen = $this.data('chosen');
	        if (options === 'destroy') {
	          if (chosen instanceof Chosen) {
	            chosen.destroy();
	          }
	          return;
	        }
	        if (!(chosen instanceof Chosen)) {
	          $this.data('chosen', new Chosen(this, options));
	        }
	      });
	    }
	  });

	  Chosen = (function(superClass) {
	    extend(Chosen, superClass);

	    function Chosen() {
	      return Chosen.__super__.constructor.apply(this, arguments);
	    }

	    Chosen.prototype.setup = function() {
	      this.form_field_jq = $(this.form_field);
	      return this.current_selectedIndex = this.form_field.selectedIndex;
	    };

	    Chosen.prototype.set_up_html = function() {
	      var container_classes, container_props;
	      container_classes = ["chosen-container"];
	      container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));
	      if (this.inherit_select_classes && this.form_field.className) {
	        container_classes.push(this.form_field.className);
	      }
	      if (this.is_rtl) {
	        container_classes.push("chosen-rtl");
	      }
	      container_props = {
	        'class': container_classes.join(' '),
	        'title': this.form_field.title
	      };
	      if (this.form_field.id.length) {
	        container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";
	      }
	      this.container = $("<div />", container_props);
	      this.container.width(this.container_width());
	      if (this.is_multiple) {
	        this.container.html(this.get_multi_html());
	      } else {
	        this.container.html(this.get_single_html());
	      }
	      this.form_field_jq.hide().after(this.container);
	      this.dropdown = this.container.find('div.chosen-drop').first();
	      this.search_field = this.container.find('input').first();
	      this.search_results = this.container.find('ul.chosen-results').first();
	      this.search_field_scale();
	      this.search_no_results = this.container.find('li.no-results').first();
	      if (this.is_multiple) {
	        this.search_choices = this.container.find('ul.chosen-choices').first();
	        this.search_container = this.container.find('li.search-field').first();
	      } else {
	        this.search_container = this.container.find('div.chosen-search').first();
	        this.selected_item = this.container.find('.chosen-single').first();
	      }
	      this.results_build();
	      this.set_tab_index();
	      return this.set_label_behavior();
	    };

	    Chosen.prototype.on_ready = function() {
	      return this.form_field_jq.trigger("chosen:ready", {
	        chosen: this
	      });
	    };

	    Chosen.prototype.register_observers = function() {
	      this.container.on('touchstart.chosen', (function(_this) {
	        return function(evt) {
	          _this.container_mousedown(evt);
	        };
	      })(this));
	      this.container.on('touchend.chosen', (function(_this) {
	        return function(evt) {
	          _this.container_mouseup(evt);
	        };
	      })(this));
	      this.container.on('mousedown.chosen', (function(_this) {
	        return function(evt) {
	          _this.container_mousedown(evt);
	        };
	      })(this));
	      this.container.on('mouseup.chosen', (function(_this) {
	        return function(evt) {
	          _this.container_mouseup(evt);
	        };
	      })(this));
	      this.container.on('mouseenter.chosen', (function(_this) {
	        return function(evt) {
	          _this.mouse_enter(evt);
	        };
	      })(this));
	      this.container.on('mouseleave.chosen', (function(_this) {
	        return function(evt) {
	          _this.mouse_leave(evt);
	        };
	      })(this));
	      this.search_results.on('mouseup.chosen', (function(_this) {
	        return function(evt) {
	          _this.search_results_mouseup(evt);
	        };
	      })(this));
	      this.search_results.on('mouseover.chosen', (function(_this) {
	        return function(evt) {
	          _this.search_results_mouseover(evt);
	        };
	      })(this));
	      this.search_results.on('mouseout.chosen', (function(_this) {
	        return function(evt) {
	          _this.search_results_mouseout(evt);
	        };
	      })(this));
	      this.search_results.on('mousewheel.chosen DOMMouseScroll.chosen', (function(_this) {
	        return function(evt) {
	          _this.search_results_mousewheel(evt);
	        };
	      })(this));
	      this.search_results.on('touchstart.chosen', (function(_this) {
	        return function(evt) {
	          _this.search_results_touchstart(evt);
	        };
	      })(this));
	      this.search_results.on('touchmove.chosen', (function(_this) {
	        return function(evt) {
	          _this.search_results_touchmove(evt);
	        };
	      })(this));
	      this.search_results.on('touchend.chosen', (function(_this) {
	        return function(evt) {
	          _this.search_results_touchend(evt);
	        };
	      })(this));
	      this.form_field_jq.on("chosen:updated.chosen", (function(_this) {
	        return function(evt) {
	          _this.results_update_field(evt);
	        };
	      })(this));
	      this.form_field_jq.on("chosen:activate.chosen", (function(_this) {
	        return function(evt) {
	          _this.activate_field(evt);
	        };
	      })(this));
	      this.form_field_jq.on("chosen:open.chosen", (function(_this) {
	        return function(evt) {
	          _this.container_mousedown(evt);
	        };
	      })(this));
	      this.form_field_jq.on("chosen:close.chosen", (function(_this) {
	        return function(evt) {
	          _this.close_field(evt);
	        };
	      })(this));
	      this.search_field.on('blur.chosen', (function(_this) {
	        return function(evt) {
	          _this.input_blur(evt);
	        };
	      })(this));
	      this.search_field.on('keyup.chosen', (function(_this) {
	        return function(evt) {
	          _this.keyup_checker(evt);
	        };
	      })(this));
	      this.search_field.on('keydown.chosen', (function(_this) {
	        return function(evt) {
	          _this.keydown_checker(evt);
	        };
	      })(this));
	      this.search_field.on('focus.chosen', (function(_this) {
	        return function(evt) {
	          _this.input_focus(evt);
	        };
	      })(this));
	      this.search_field.on('cut.chosen', (function(_this) {
	        return function(evt) {
	          _this.clipboard_event_checker(evt);
	        };
	      })(this));
	      this.search_field.on('paste.chosen', (function(_this) {
	        return function(evt) {
	          _this.clipboard_event_checker(evt);
	        };
	      })(this));
	      if (this.is_multiple) {
	        return this.search_choices.on('click.chosen', (function(_this) {
	          return function(evt) {
	            _this.choices_click(evt);
	          };
	        })(this));
	      } else {
	        return this.container.on('click.chosen', function(evt) {
	          evt.preventDefault();
	        });
	      }
	    };

	    Chosen.prototype.destroy = function() {
	      $(this.container[0].ownerDocument).off('click.chosen', this.click_test_action);
	      if (this.form_field_label.length > 0) {
	        this.form_field_label.off('click.chosen');
	      }
	      if (this.search_field[0].tabIndex) {
	        this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;
	      }
	      this.container.remove();
	      this.form_field_jq.removeData('chosen');
	      return this.form_field_jq.show();
	    };

	    Chosen.prototype.search_field_disabled = function() {
	      this.is_disabled = this.form_field.disabled || this.form_field_jq.parents('fieldset').is(':disabled');
	      this.container.toggleClass('chosen-disabled', this.is_disabled);
	      this.search_field[0].disabled = this.is_disabled;
	      if (!this.is_multiple) {
	        this.selected_item.off('focus.chosen', this.activate_field);
	      }
	      if (this.is_disabled) {
	        return this.close_field();
	      } else if (!this.is_multiple) {
	        return this.selected_item.on('focus.chosen', this.activate_field);
	      }
	    };

	    Chosen.prototype.container_mousedown = function(evt) {
	      var ref;
	      if (this.is_disabled) {
	        return;
	      }
	      if (evt && ((ref = evt.type) === 'mousedown' || ref === 'touchstart') && !this.results_showing) {
	        evt.preventDefault();
	      }
	      if (!((evt != null) && ($(evt.target)).hasClass("search-choice-close"))) {
	        if (!this.active_field) {
	          if (this.is_multiple) {
	            this.search_field.val("");
	          }
	          $(this.container[0].ownerDocument).on('click.chosen', this.click_test_action);
	          this.results_show();
	        } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {
	          evt.preventDefault();
	          this.results_toggle();
	        }
	        return this.activate_field();
	      }
	    };

	    Chosen.prototype.container_mouseup = function(evt) {
	      if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
	        return this.results_reset(evt);
	      }
	    };

	    Chosen.prototype.search_results_mousewheel = function(evt) {
	      var delta;
	      if (evt.originalEvent) {
	        delta = evt.originalEvent.deltaY || -evt.originalEvent.wheelDelta || evt.originalEvent.detail;
	      }
	      if (delta != null) {
	        evt.preventDefault();
	        if (evt.type === 'DOMMouseScroll') {
	          delta = delta * 40;
	        }
	        return this.search_results.scrollTop(delta + this.search_results.scrollTop());
	      }
	    };

	    Chosen.prototype.blur_test = function(evt) {
	      if (!this.active_field && this.container.hasClass("chosen-container-active")) {
	        return this.close_field();
	      }
	    };

	    Chosen.prototype.close_field = function() {
	      $(this.container[0].ownerDocument).off("click.chosen", this.click_test_action);
	      this.active_field = false;
	      this.results_hide();
	      this.container.removeClass("chosen-container-active");
	      this.clear_backstroke();
	      this.show_search_field_default();
	      this.search_field_scale();
	      return this.search_field.blur();
	    };

	    Chosen.prototype.activate_field = function() {
	      if (this.is_disabled) {
	        return;
	      }
	      this.container.addClass("chosen-container-active");
	      this.active_field = true;
	      this.search_field.val(this.search_field.val());
	      return this.search_field.focus();
	    };

	    Chosen.prototype.test_active_click = function(evt) {
	      var active_container;
	      active_container = $(evt.target).closest('.chosen-container');
	      if (active_container.length && this.container[0] === active_container[0]) {
	        return this.active_field = true;
	      } else {
	        return this.close_field();
	      }
	    };

	    Chosen.prototype.results_build = function() {
	      this.parsing = true;
	      this.selected_option_count = null;
	      this.results_data = SelectParser.select_to_array(this.form_field);
	      if (this.is_multiple) {
	        this.search_choices.find("li.search-choice").remove();
	      } else {
	        this.single_set_selected_text();
	        if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
	          this.search_field[0].readOnly = true;
	          this.container.addClass("chosen-container-single-nosearch");
	        } else {
	          this.search_field[0].readOnly = false;
	          this.container.removeClass("chosen-container-single-nosearch");
	        }
	      }
	      this.update_results_content(this.results_option_build({
	        first: true
	      }));
	      this.search_field_disabled();
	      this.show_search_field_default();
	      this.search_field_scale();
	      return this.parsing = false;
	    };

	    Chosen.prototype.result_do_highlight = function(el) {
	      var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
	      if (el.length) {
	        this.result_clear_highlight();
	        this.result_highlight = el;
	        this.result_highlight.addClass("highlighted");
	        maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
	        visible_top = this.search_results.scrollTop();
	        visible_bottom = maxHeight + visible_top;
	        high_top = this.result_highlight.position().top + this.search_results.scrollTop();
	        high_bottom = high_top + this.result_highlight.outerHeight();
	        if (high_bottom >= visible_bottom) {
	          return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
	        } else if (high_top < visible_top) {
	          return this.search_results.scrollTop(high_top);
	        }
	      }
	    };

	    Chosen.prototype.result_clear_highlight = function() {
	      if (this.result_highlight) {
	        this.result_highlight.removeClass("highlighted");
	      }
	      return this.result_highlight = null;
	    };

	    Chosen.prototype.results_show = function() {
	      if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
	        this.form_field_jq.trigger("chosen:maxselected", {
	          chosen: this
	        });
	        return false;
	      }
	      this.container.addClass("chosen-with-drop");
	      this.results_showing = true;
	      this.search_field.focus();
	      this.search_field.val(this.get_search_field_value());
	      this.winnow_results();
	      return this.form_field_jq.trigger("chosen:showing_dropdown", {
	        chosen: this
	      });
	    };

	    Chosen.prototype.update_results_content = function(content) {
	      return this.search_results.html(content);
	    };

	    Chosen.prototype.results_hide = function() {
	      if (this.results_showing) {
	        this.result_clear_highlight();
	        this.container.removeClass("chosen-with-drop");
	        this.form_field_jq.trigger("chosen:hiding_dropdown", {
	          chosen: this
	        });
	      }
	      return this.results_showing = false;
	    };

	    Chosen.prototype.set_tab_index = function(el) {
	      var ti;
	      if (this.form_field.tabIndex) {
	        ti = this.form_field.tabIndex;
	        this.form_field.tabIndex = -1;
	        return this.search_field[0].tabIndex = ti;
	      }
	    };

	    Chosen.prototype.set_label_behavior = function() {
	      this.form_field_label = this.form_field_jq.parents("label");
	      if (!this.form_field_label.length && this.form_field.id.length) {
	        this.form_field_label = $("label[for='" + this.form_field.id + "']");
	      }
	      if (this.form_field_label.length > 0) {
	        return this.form_field_label.on('click.chosen', this.label_click_handler);
	      }
	    };

	    Chosen.prototype.show_search_field_default = function() {
	      if (this.is_multiple && this.choices_count() < 1 && !this.active_field) {
	        this.search_field.val(this.default_text);
	        return this.search_field.addClass("default");
	      } else {
	        this.search_field.val("");
	        return this.search_field.removeClass("default");
	      }
	    };

	    Chosen.prototype.search_results_mouseup = function(evt) {
	      var target;
	      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
	      if (target.length) {
	        this.result_highlight = target;
	        this.result_select(evt);
	        return this.search_field.focus();
	      }
	    };

	    Chosen.prototype.search_results_mouseover = function(evt) {
	      var target;
	      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
	      if (target) {
	        return this.result_do_highlight(target);
	      }
	    };

	    Chosen.prototype.search_results_mouseout = function(evt) {
	      if ($(evt.target).hasClass("active-result") || $(evt.target).parents('.active-result').first()) {
	        return this.result_clear_highlight();
	      }
	    };

	    Chosen.prototype.choice_build = function(item) {
	      var choice, close_link;
	      choice = $('<li />', {
	        "class": "search-choice"
	      }).html("<span>" + (this.choice_label(item)) + "</span>");
	      if (item.disabled) {
	        choice.addClass('search-choice-disabled');
	      } else {
	        close_link = $('<a />', {
	          "class": 'search-choice-close',
	          'data-option-array-index': item.array_index
	        });
	        close_link.on('click.chosen', (function(_this) {
	          return function(evt) {
	            return _this.choice_destroy_link_click(evt);
	          };
	        })(this));
	        choice.append(close_link);
	      }
	      return this.search_container.before(choice);
	    };

	    Chosen.prototype.choice_destroy_link_click = function(evt) {
	      evt.preventDefault();
	      evt.stopPropagation();
	      if (!this.is_disabled) {
	        return this.choice_destroy($(evt.target));
	      }
	    };

	    Chosen.prototype.choice_destroy = function(link) {
	      if (this.result_deselect(link[0].getAttribute("data-option-array-index"))) {
	        if (this.active_field) {
	          this.search_field.focus();
	        } else {
	          this.show_search_field_default();
	        }
	        if (this.is_multiple && this.choices_count() > 0 && this.get_search_field_value().length < 1) {
	          this.results_hide();
	        }
	        link.parents('li').first().remove();
	        return this.search_field_scale();
	      }
	    };

	    Chosen.prototype.results_reset = function() {
	      this.reset_single_select_options();
	      this.form_field.options[0].selected = true;
	      this.single_set_selected_text();
	      this.show_search_field_default();
	      this.results_reset_cleanup();
	      this.trigger_form_field_change();
	      if (this.active_field) {
	        return this.results_hide();
	      }
	    };

	    Chosen.prototype.results_reset_cleanup = function() {
	      this.current_selectedIndex = this.form_field.selectedIndex;
	      return this.selected_item.find("abbr").remove();
	    };

	    Chosen.prototype.result_select = function(evt) {
	      var high, item;
	      if (this.result_highlight) {
	        high = this.result_highlight;
	        this.result_clear_highlight();
	        if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
	          this.form_field_jq.trigger("chosen:maxselected", {
	            chosen: this
	          });
	          return false;
	        }
	        if (this.is_multiple) {
	          high.removeClass("active-result");
	        } else {
	          this.reset_single_select_options();
	        }
	        high.addClass("result-selected");
	        item = this.results_data[high[0].getAttribute("data-option-array-index")];
	        item.selected = true;
	        this.form_field.options[item.options_index].selected = true;
	        this.selected_option_count = null;
	        if (this.is_multiple) {
	          this.choice_build(item);
	        } else {
	          this.single_set_selected_text(this.choice_label(item));
	        }
	        if (this.is_multiple && (!this.hide_results_on_select || (evt.metaKey || evt.ctrlKey))) {
	          if (evt.metaKey || evt.ctrlKey) {
	            this.winnow_results({
	              skip_highlight: true
	            });
	          } else {
	            this.search_field.val("");
	            this.winnow_results();
	          }
	        } else {
	          this.results_hide();
	          this.show_search_field_default();
	        }
	        if (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {
	          this.trigger_form_field_change({
	            selected: this.form_field.options[item.options_index].value
	          });
	        }
	        this.current_selectedIndex = this.form_field.selectedIndex;
	        evt.preventDefault();
	        return this.search_field_scale();
	      }
	    };

	    Chosen.prototype.single_set_selected_text = function(text) {
	      if (text == null) {
	        text = this.default_text;
	      }
	      if (text === this.default_text) {
	        this.selected_item.addClass("chosen-default");
	      } else {
	        this.single_deselect_control_build();
	        this.selected_item.removeClass("chosen-default");
	      }
	      return this.selected_item.find("span").html(text);
	    };

	    Chosen.prototype.result_deselect = function(pos) {
	      var result_data;
	      result_data = this.results_data[pos];
	      if (!this.form_field.options[result_data.options_index].disabled) {
	        result_data.selected = false;
	        this.form_field.options[result_data.options_index].selected = false;
	        this.selected_option_count = null;
	        this.result_clear_highlight();
	        if (this.results_showing) {
	          this.winnow_results();
	        }
	        this.trigger_form_field_change({
	          deselected: this.form_field.options[result_data.options_index].value
	        });
	        this.search_field_scale();
	        return true;
	      } else {
	        return false;
	      }
	    };

	    Chosen.prototype.single_deselect_control_build = function() {
	      if (!this.allow_single_deselect) {
	        return;
	      }
	      if (!this.selected_item.find("abbr").length) {
	        this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
	      }
	      return this.selected_item.addClass("chosen-single-with-deselect");
	    };

	    Chosen.prototype.get_search_field_value = function() {
	      return this.search_field.val();
	    };

	    Chosen.prototype.get_search_text = function() {
	      return $.trim(this.get_search_field_value());
	    };

	    Chosen.prototype.escape_html = function(text) {
	      return $('<div/>').text(text).html();
	    };

	    Chosen.prototype.winnow_results_set_highlight = function() {
	      var do_high, selected_results;
	      selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
	      do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
	      if (do_high != null) {
	        return this.result_do_highlight(do_high);
	      }
	    };

	    Chosen.prototype.no_results = function(terms) {
	      var no_results_html;
	      no_results_html = this.get_no_results_html(terms);
	      this.search_results.append(no_results_html);
	      return this.form_field_jq.trigger("chosen:no_results", {
	        chosen: this
	      });
	    };

	    Chosen.prototype.no_results_clear = function() {
	      return this.search_results.find(".no-results").remove();
	    };

	    Chosen.prototype.keydown_arrow = function() {
	      var next_sib;
	      if (this.results_showing && this.result_highlight) {
	        next_sib = this.result_highlight.nextAll("li.active-result").first();
	        if (next_sib) {
	          return this.result_do_highlight(next_sib);
	        }
	      } else {
	        return this.results_show();
	      }
	    };

	    Chosen.prototype.keyup_arrow = function() {
	      var prev_sibs;
	      if (!this.results_showing && !this.is_multiple) {
	        return this.results_show();
	      } else if (this.result_highlight) {
	        prev_sibs = this.result_highlight.prevAll("li.active-result");
	        if (prev_sibs.length) {
	          return this.result_do_highlight(prev_sibs.first());
	        } else {
	          if (this.choices_count() > 0) {
	            this.results_hide();
	          }
	          return this.result_clear_highlight();
	        }
	      }
	    };

	    Chosen.prototype.keydown_backstroke = function() {
	      var next_available_destroy;
	      if (this.pending_backstroke) {
	        this.choice_destroy(this.pending_backstroke.find("a").first());
	        return this.clear_backstroke();
	      } else {
	        next_available_destroy = this.search_container.siblings("li.search-choice").last();
	        if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
	          this.pending_backstroke = next_available_destroy;
	          if (this.single_backstroke_delete) {
	            return this.keydown_backstroke();
	          } else {
	            return this.pending_backstroke.addClass("search-choice-focus");
	          }
	        }
	      }
	    };

	    Chosen.prototype.clear_backstroke = function() {
	      if (this.pending_backstroke) {
	        this.pending_backstroke.removeClass("search-choice-focus");
	      }
	      return this.pending_backstroke = null;
	    };

	    Chosen.prototype.search_field_scale = function() {
	      var div, i, len, style, style_block, styles, width;
	      if (!this.is_multiple) {
	        return;
	      }
	      style_block = {
	        position: 'absolute',
	        left: '-1000px',
	        top: '-1000px',
	        display: 'none',
	        whiteSpace: 'pre'
	      };
	      styles = ['fontSize', 'fontStyle', 'fontWeight', 'fontFamily', 'lineHeight', 'textTransform', 'letterSpacing'];
	      for (i = 0, len = styles.length; i < len; i++) {
	        style = styles[i];
	        style_block[style] = this.search_field.css(style);
	      }
	      div = $('<div />').css(style_block);
	      div.text(this.get_search_field_value());
	      $('body').append(div);
	      width = div.width() + 25;
	      div.remove();
	      if (this.container.is(':visible')) {
	        width = Math.min(this.container.outerWidth() - 10, width);
	      }
	      return this.search_field.width(width);
	    };

	    Chosen.prototype.trigger_form_field_change = function(extra) {
	      this.form_field_jq.trigger("input", extra);
	      return this.form_field_jq.trigger("change", extra);
	    };

	    return Chosen;

	  })(AbstractChosen);

	}).call(this);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundation = __webpack_require__(5);

	var _foundationUtil = __webpack_require__(6);

	var _foundationUtil2 = __webpack_require__(8);

	var _foundationUtil3 = __webpack_require__(9);

	var _foundationUtil4 = __webpack_require__(10);

	var _foundationUtil5 = __webpack_require__(7);

	var _foundationUtil6 = __webpack_require__(11);

	var _foundationUtil7 = __webpack_require__(12);

	var _foundationUtil8 = __webpack_require__(13);

	var _foundationUtil9 = __webpack_require__(14);

	var _foundationUtil10 = __webpack_require__(15);

	var _foundation2 = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_foundation.Foundation.addToJquery(_jquery2.default);

	// Add Foundation Utils to Foundation global namespace for backwards
	// compatibility.

	_foundation.Foundation.rtl = _foundationUtil.rtl;
	_foundation.Foundation.GetYoDigits = _foundationUtil.GetYoDigits;
	_foundation.Foundation.transitionend = _foundationUtil.transitionend;

	_foundation.Foundation.Box = _foundationUtil2.Box;
	_foundation.Foundation.onImagesLoaded = _foundationUtil3.onImagesLoaded;
	_foundation.Foundation.Keyboard = _foundationUtil4.Keyboard;
	_foundation.Foundation.MediaQuery = _foundationUtil5.MediaQuery;
	_foundation.Foundation.Motion = _foundationUtil6.Motion;
	_foundation.Foundation.Move = _foundationUtil6.Move;
	_foundation.Foundation.Nest = _foundationUtil7.Nest;
	_foundation.Foundation.Timer = _foundationUtil8.Timer;

	// Touch and Triggers previously were almost purely sede effect driven,
	// so no // need to add it to Foundation, just init them.

	_foundationUtil9.Touch.init(_jquery2.default);

	_foundationUtil10.Triggers.init(_jquery2.default, _foundation.Foundation);

	// import { Abide } from '../../vendor/foundation-sites/js/foundation.abide';
	// Foundation.plugin(Abide, 'Abide');

	// import { Accordion } from '../../vendor/foundation-sites/js/foundation.accordion';
	// Foundation.plugin(Accordion, 'Accordion');

	// import { AccordionMenu } from '../../vendor/foundation-sites/js/foundation.accordionMenu';
	// Foundation.plugin(AccordionMenu, 'AccordionMenu');

	// import { Drilldown } from '../../vendor/foundation-sites/js/foundation.drilldown';
	// Foundation.plugin(Drilldown, 'Drilldown');

	// import { Dropdown } from '../../vendor/foundation-sites/js/foundation.dropdown';
	// Foundation.plugin(Dropdown, 'Dropdown');

	// import { DropdownMenu } from '../../vendor/foundation-sites/js/foundation.dropdownMenu';
	// Foundation.plugin(DropdownMenu, 'DropdownMenu');

	// import { Equalizer } from '../../vendor/foundation-sites/js/foundation.equalizer';
	// Foundation.plugin(Equalizer, 'Equalizer');

	// import { Interchange } from '../../vendor/foundation-sites/js/foundation.interchange';
	// Foundation.plugin(Interchange, 'Interchange');

	// import { Magellan } from '../../vendor/foundation-sites/js/foundation.magellan';
	// Foundation.plugin(Magellan, 'Magellan');

	// import { OffCanvas } from '../../vendor/foundation-sites/js/foundation.offcanvas';
	// Foundation.plugin(OffCanvas, 'OffCanvas');

	// import { Orbit } from '../../vendor/foundation-sites/js/foundation.orbit';
	// Foundation.plugin(Orbit, 'Orbit');

	// import { ResponsiveMenu } from '../../vendor/foundation-sites/js/foundation.responsiveMenu';
	// Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');

	// import { ResponsiveToggle } from '../../vendor/foundation-sites/js/foundation.responsiveToggle';
	// Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');

	_foundation.Foundation.plugin(_foundation2.Reveal, 'Reveal');

	// import { Slider } from '../../vendor/foundation-sites/js/foundation.slider';
	// Foundation.plugin(Slider, 'Slider');

	// import { SmoothScroll } from '../../vendor/foundation-sites/js/foundation.smoothScroll';
	// Foundation.plugin(SmoothScroll, 'SmoothScroll');

	// import { Sticky } from '../../vendor/foundation-sites/js/foundation.sticky';
	// Foundation.plugin(Sticky, 'Sticky');

	// import { Tabs } from '../../vendor/foundation-sites/js/foundation.tabs';
	// Foundation.plugin(Tabs, 'Tabs');

	// import { Toggler } from '../../vendor/foundation-sites/js/foundation.toggler';
	// Foundation.plugin(Toggler, 'Toggler');

	// import { Tooltip } from '../../vendor/foundation-sites/js/foundation.tooltip';
	// Foundation.plugin(Tooltip, 'Tooltip');

	// import { ResponsiveAccordionTabs } from '../../vendor/foundation-sites/js/foundation.responsiveAccordionTabs';
	// Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Foundation = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundationUtil = __webpack_require__(6);

	var _foundationUtil2 = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FOUNDATION_VERSION = '6.4.1';

	// Global Foundation object
	// This is attached to the window, or used as a module for AMD/Browserify
	var Foundation = {
	  version: FOUNDATION_VERSION,

	  /**
	   * Stores initialized plugins.
	   */
	  _plugins: {},

	  /**
	   * Stores generated unique ids for plugin instances
	   */
	  _uuids: [],

	  /**
	   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
	   * @param {Object} plugin - The constructor of the plugin.
	   */
	  plugin: function plugin(_plugin, name) {
	    // Object key to use when adding to global Foundation object
	    // Examples: Foundation.Reveal, Foundation.OffCanvas
	    var className = name || functionName(_plugin);
	    // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
	    // Examples: data-reveal, data-off-canvas
	    var attrName = hyphenate(className);

	    // Add to the Foundation object and the plugins list (for reflowing)
	    this._plugins[attrName] = this[className] = _plugin;
	  },
	  /**
	   * @function
	   * Populates the _uuids array with pointers to each individual plugin instance.
	   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
	   * Also fires the initialization event for each plugin, consolidating repetitive code.
	   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
	   * @param {String} name - the name of the plugin, passed as a camelCased string.
	   * @fires Plugin#init
	   */
	  registerPlugin: function registerPlugin(plugin, name) {
	    var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
	    plugin.uuid = (0, _foundationUtil.GetYoDigits)(6, pluginName);

	    if (!plugin.$element.attr('data-' + pluginName)) {
	      plugin.$element.attr('data-' + pluginName, plugin.uuid);
	    }
	    if (!plugin.$element.data('zfPlugin')) {
	      plugin.$element.data('zfPlugin', plugin);
	    }
	    /**
	     * Fires when the plugin has initialized.
	     * @event Plugin#init
	     */
	    plugin.$element.trigger('init.zf.' + pluginName);

	    this._uuids.push(plugin.uuid);

	    return;
	  },
	  /**
	   * @function
	   * Removes the plugins uuid from the _uuids array.
	   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
	   * Also fires the destroyed event for the plugin, consolidating repetitive code.
	   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
	   * @fires Plugin#destroyed
	   */
	  unregisterPlugin: function unregisterPlugin(plugin) {
	    var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

	    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
	    plugin.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
	    /**
	     * Fires when the plugin has been destroyed.
	     * @event Plugin#destroyed
	     */
	    .trigger('destroyed.zf.' + pluginName);
	    for (var prop in plugin) {
	      plugin[prop] = null; //clean up script to prep for garbage collection.
	    }
	    return;
	  },

	  /**
	   * @function
	   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
	   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
	   * @default If no argument is passed, reflow all currently active plugins.
	   */
	  reInit: function reInit(plugins) {
	    var isJQ = plugins instanceof _jquery2.default;
	    try {
	      if (isJQ) {
	        plugins.each(function () {
	          (0, _jquery2.default)(this).data('zfPlugin')._init();
	        });
	      } else {
	        var type = typeof plugins === 'undefined' ? 'undefined' : _typeof(plugins),
	            _this = this,
	            fns = {
	          'object': function object(plgs) {
	            plgs.forEach(function (p) {
	              p = hyphenate(p);
	              (0, _jquery2.default)('[data-' + p + ']').foundation('_init');
	            });
	          },
	          'string': function string() {
	            plugins = hyphenate(plugins);
	            (0, _jquery2.default)('[data-' + plugins + ']').foundation('_init');
	          },
	          'undefined': function undefined() {
	            this['object'](Object.keys(_this._plugins));
	          }
	        };
	        fns[type](plugins);
	      }
	    } catch (err) {
	      console.error(err);
	    } finally {
	      return plugins;
	    }
	  },

	  /**
	   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
	   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
	   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
	   */
	  reflow: function reflow(elem, plugins) {

	    // If plugins is undefined, just grab everything
	    if (typeof plugins === 'undefined') {
	      plugins = Object.keys(this._plugins);
	    }
	    // If plugins is a string, convert it to an array with one item
	    else if (typeof plugins === 'string') {
	        plugins = [plugins];
	      }

	    var _this = this;

	    // Iterate through each plugin
	    _jquery2.default.each(plugins, function (i, name) {
	      // Get the current plugin
	      var plugin = _this._plugins[name];

	      // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
	      var $elem = (0, _jquery2.default)(elem).find('[data-' + name + ']').addBack('[data-' + name + ']');

	      // For each plugin found, initialize it
	      $elem.each(function () {
	        var $el = (0, _jquery2.default)(this),
	            opts = {};
	        // Don't double-dip on plugins
	        if ($el.data('zfPlugin')) {
	          console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
	          return;
	        }

	        if ($el.attr('data-options')) {
	          var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
	            var opt = e.split(':').map(function (el) {
	              return el.trim();
	            });
	            if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
	          });
	        }
	        try {
	          $el.data('zfPlugin', new plugin((0, _jquery2.default)(this), opts));
	        } catch (er) {
	          console.error(er);
	        } finally {
	          return;
	        }
	      });
	    });
	  },
	  getFnName: functionName,

	  addToJquery: function addToJquery($) {
	    // TODO: consider not making this a jQuery function
	    // TODO: need way to reflow vs. re-initialize
	    /**
	     * The Foundation jQuery method.
	     * @param {String|Array} method - An action to perform on the current jQuery object.
	     */
	    var foundation = function foundation(method) {
	      var type = typeof method === 'undefined' ? 'undefined' : _typeof(method),
	          $noJS = $('.no-js');

	      if ($noJS.length) {
	        $noJS.removeClass('no-js');
	      }

	      if (type === 'undefined') {
	        //needs to initialize the Foundation object, or an individual plugin.
	        _foundationUtil2.MediaQuery._init();
	        Foundation.reflow(this);
	      } else if (type === 'string') {
	        //an individual method to invoke on a plugin or group of plugins
	        var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary
	        var plugClass = this.data('zfPlugin'); //determine the class of plugin

	        if (plugClass !== undefined && plugClass[method] !== undefined) {
	          //make sure both the class and method exist
	          if (this.length === 1) {
	            //if there's only one, call it directly.
	            plugClass[method].apply(plugClass, args);
	          } else {
	            this.each(function (i, el) {
	              //otherwise loop through the jQuery collection and invoke the method on each
	              plugClass[method].apply($(el).data('zfPlugin'), args);
	            });
	          }
	        } else {
	          //error for no class or no method
	          throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
	        }
	      } else {
	        //error for invalid argument type
	        throw new TypeError('We\'re sorry, ' + type + ' is not a valid parameter. You must use a string representing the method you wish to invoke.');
	      }
	      return this;
	    };
	    $.fn.foundation = foundation;
	    return $;
	  }
	};

	Foundation.util = {
	  /**
	   * Function for applying a debounce effect to a function call.
	   * @function
	   * @param {Function} func - Function to be called at end of timeout.
	   * @param {Number} delay - Time in ms to delay the call of `func`.
	   * @returns function
	   */
	  throttle: function throttle(func, delay) {
	    var timer = null;

	    return function () {
	      var context = this,
	          args = arguments;

	      if (timer === null) {
	        timer = setTimeout(function () {
	          func.apply(context, args);
	          timer = null;
	        }, delay);
	      }
	    };
	  }
	};

	window.Foundation = Foundation;

	// Polyfill for requestAnimationFrame
	(function () {
	  if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
	    return new Date().getTime();
	  };

	  var vendors = ['webkit', 'moz'];
	  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
	    var vp = vendors[i];
	    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
	  }
	  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
	    var lastTime = 0;
	    window.requestAnimationFrame = function (callback) {
	      var now = Date.now();
	      var nextTime = Math.max(lastTime + 16, now);
	      return setTimeout(function () {
	        callback(lastTime = nextTime);
	      }, nextTime - now);
	    };
	    window.cancelAnimationFrame = clearTimeout;
	  }
	  /**
	   * Polyfill for performance.now, required by rAF
	   */
	  if (!window.performance || !window.performance.now) {
	    window.performance = {
	      start: Date.now(),
	      now: function now() {
	        return Date.now() - this.start;
	      }
	    };
	  }
	})();
	if (!Function.prototype.bind) {
	  Function.prototype.bind = function (oThis) {
	    if (typeof this !== 'function') {
	      // closest thing possible to the ECMAScript 5
	      // internal IsCallable function
	      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
	    }

	    var aArgs = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP = function fNOP() {},
	        fBound = function fBound() {
	      return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
	    };

	    if (this.prototype) {
	      // native functions don't have a prototype
	      fNOP.prototype = this.prototype;
	    }
	    fBound.prototype = new fNOP();

	    return fBound;
	  };
	}
	// Polyfill to get the name of a function in IE9
	function functionName(fn) {
	  if (Function.prototype.name === undefined) {
	    var funcNameRegex = /function\s([^(]{1,})\(/;
	    var results = funcNameRegex.exec(fn.toString());
	    return results && results.length > 1 ? results[1].trim() : "";
	  } else if (fn.prototype === undefined) {
	    return fn.constructor.name;
	  } else {
	    return fn.prototype.constructor.name;
	  }
	}
	function parseValue(str) {
	  if ('true' === str) return true;else if ('false' === str) return false;else if (!isNaN(str * 1)) return parseFloat(str);
	  return str;
	}
	// Convert PascalCase to kebab-case
	// Thank you: http://stackoverflow.com/a/8955580
	function hyphenate(str) {
	  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	exports.Foundation = Foundation;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.transitionend = exports.GetYoDigits = exports.rtl = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Core Foundation Utilities, utilized in a number of places.

	/**
	 * Returns a boolean for RTL support
	 */
	function rtl() {
	  return (0, _jquery2.default)('html').attr('dir') === 'rtl';
	}

	/**
	 * returns a random base-36 uid with namespacing
	 * @function
	 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
	 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
	 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
	 * @returns {String} - unique id
	 */
	function GetYoDigits(length, namespace) {
	  length = length || 6;
	  return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
	}

	function transitionend($elem) {
	  var transitions = {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'transitionend',
	    'OTransition': 'otransitionend'
	  };
	  var elem = document.createElement('div'),
	      end;

	  for (var t in transitions) {
	    if (typeof elem.style[t] !== 'undefined') {
	      end = transitions[t];
	    }
	  }
	  if (end) {
	    return end;
	  } else {
	    end = setTimeout(function () {
	      $elem.triggerHandler('transitionend', [$elem]);
	    }, 1);
	    return 'transitionend';
	  }
	}

	exports.rtl = rtl;
	exports.GetYoDigits = GetYoDigits;
	exports.transitionend = transitionend;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MediaQuery = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Default set of media queries
	var defaultQueries = {
	  'default': 'only screen',
	  landscape: 'only screen and (orientation: landscape)',
	  portrait: 'only screen and (orientation: portrait)',
	  retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
	};

	// matchMedia() polyfill - Test a CSS media type/query in JS.
	// Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
	var matchMedia = window.matchMedia || function () {
	  'use strict';

	  // For browsers that support matchMedium api such as IE 9 and webkit

	  var styleMedia = window.styleMedia || window.media;

	  // For those that don't support matchMedium
	  if (!styleMedia) {
	    var style = document.createElement('style'),
	        script = document.getElementsByTagName('script')[0],
	        info = null;

	    style.type = 'text/css';
	    style.id = 'matchmediajs-test';

	    script && script.parentNode && script.parentNode.insertBefore(style, script);

	    // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
	    info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;

	    styleMedia = {
	      matchMedium: function matchMedium(media) {
	        var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

	        // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
	        if (style.styleSheet) {
	          style.styleSheet.cssText = text;
	        } else {
	          style.textContent = text;
	        }

	        // Test if media query is true or false
	        return info.width === '1px';
	      }
	    };
	  }

	  return function (media) {
	    return {
	      matches: styleMedia.matchMedium(media || 'all'),
	      media: media || 'all'
	    };
	  };
	}();

	var MediaQuery = {
	  queries: [],

	  current: '',

	  /**
	   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
	   * @function
	   * @private
	   */
	  _init: function _init() {
	    var self = this;
	    var $meta = (0, _jquery2.default)('meta.foundation-mq');
	    if (!$meta.length) {
	      (0, _jquery2.default)('<meta class="foundation-mq">').appendTo(document.head);
	    }

	    var extractedStyles = (0, _jquery2.default)('.foundation-mq').css('font-family');
	    var namedQueries;

	    namedQueries = parseStyleToObject(extractedStyles);

	    for (var key in namedQueries) {
	      if (namedQueries.hasOwnProperty(key)) {
	        self.queries.push({
	          name: key,
	          value: 'only screen and (min-width: ' + namedQueries[key] + ')'
	        });
	      }
	    }

	    this.current = this._getCurrentSize();

	    this._watcher();
	  },


	  /**
	   * Checks if the screen is at least as wide as a breakpoint.
	   * @function
	   * @param {String} size - Name of the breakpoint to check.
	   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
	   */
	  atLeast: function atLeast(size) {
	    var query = this.get(size);

	    if (query) {
	      return matchMedia(query).matches;
	    }

	    return false;
	  },


	  /**
	   * Checks if the screen matches to a breakpoint.
	   * @function
	   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
	   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
	   */
	  is: function is(size) {
	    size = size.trim().split(' ');
	    if (size.length > 1 && size[1] === 'only') {
	      if (size[0] === this._getCurrentSize()) return true;
	    } else {
	      return this.atLeast(size[0]);
	    }
	    return false;
	  },


	  /**
	   * Gets the media query of a breakpoint.
	   * @function
	   * @param {String} size - Name of the breakpoint to get.
	   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
	   */
	  get: function get(size) {
	    for (var i in this.queries) {
	      if (this.queries.hasOwnProperty(i)) {
	        var query = this.queries[i];
	        if (size === query.name) return query.value;
	      }
	    }

	    return null;
	  },


	  /**
	   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
	   * @function
	   * @private
	   * @returns {String} Name of the current breakpoint.
	   */
	  _getCurrentSize: function _getCurrentSize() {
	    var matched;

	    for (var i = 0; i < this.queries.length; i++) {
	      var query = this.queries[i];

	      if (matchMedia(query.value).matches) {
	        matched = query;
	      }
	    }

	    if ((typeof matched === 'undefined' ? 'undefined' : _typeof(matched)) === 'object') {
	      return matched.name;
	    } else {
	      return matched;
	    }
	  },


	  /**
	   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
	   * @function
	   * @private
	   */
	  _watcher: function _watcher() {
	    var _this = this;

	    (0, _jquery2.default)(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery', function () {
	      var newSize = _this._getCurrentSize(),
	          currentSize = _this.current;

	      if (newSize !== currentSize) {
	        // Change the current media query
	        _this.current = newSize;

	        // Broadcast the media query change on the window
	        (0, _jquery2.default)(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
	      }
	    });
	  }
	};

	// Thank you: https://github.com/sindresorhus/query-string
	function parseStyleToObject(str) {
	  var styleObject = {};

	  if (typeof str !== 'string') {
	    return styleObject;
	  }

	  str = str.trim().slice(1, -1); // browsers re-quote string style values

	  if (!str) {
	    return styleObject;
	  }

	  styleObject = str.split('&').reduce(function (ret, param) {
	    var parts = param.replace(/\+/g, ' ').split('=');
	    var key = parts[0];
	    var val = parts[1];
	    key = decodeURIComponent(key);

	    // missing `=` should be `null`:
	    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
	    val = val === undefined ? null : decodeURIComponent(val);

	    if (!ret.hasOwnProperty(key)) {
	      ret[key] = val;
	    } else if (Array.isArray(ret[key])) {
	      ret[key].push(val);
	    } else {
	      ret[key] = [ret[key], val];
	    }
	    return ret;
	  }, {});

	  return styleObject;
	}

	exports.MediaQuery = MediaQuery;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Box = undefined;

	var _foundationUtil = __webpack_require__(6);

	var Box = {
	  ImNotTouchingYou: ImNotTouchingYou,
	  OverlapArea: OverlapArea,
	  GetDimensions: GetDimensions,
	  GetOffsets: GetOffsets,
	  GetExplicitOffsets: GetExplicitOffsets

	  /**
	   * Compares the dimensions of an element to a container and determines collision events with container.
	   * @function
	   * @param {jQuery} element - jQuery object to test for collisions.
	   * @param {jQuery} parent - jQuery object to use as bounding container.
	   * @param {Boolean} lrOnly - set to true to check left and right values only.
	   * @param {Boolean} tbOnly - set to true to check top and bottom values only.
	   * @default if no parent object passed, detects collisions with `window`.
	   * @returns {Boolean} - true if collision free, false if a collision in any direction.
	   */
	};function ImNotTouchingYou(element, parent, lrOnly, tbOnly, ignoreBottom) {
	  return OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) === 0;
	};

	function OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) {
	  var eleDims = GetDimensions(element),
	      topOver,
	      bottomOver,
	      leftOver,
	      rightOver;
	  if (parent) {
	    var parDims = GetDimensions(parent);

	    bottomOver = parDims.height + parDims.offset.top - (eleDims.offset.top + eleDims.height);
	    topOver = eleDims.offset.top - parDims.offset.top;
	    leftOver = eleDims.offset.left - parDims.offset.left;
	    rightOver = parDims.width + parDims.offset.left - (eleDims.offset.left + eleDims.width);
	  } else {
	    bottomOver = eleDims.windowDims.height + eleDims.windowDims.offset.top - (eleDims.offset.top + eleDims.height);
	    topOver = eleDims.offset.top - eleDims.windowDims.offset.top;
	    leftOver = eleDims.offset.left - eleDims.windowDims.offset.left;
	    rightOver = eleDims.windowDims.width - (eleDims.offset.left + eleDims.width);
	  }

	  bottomOver = ignoreBottom ? 0 : Math.min(bottomOver, 0);
	  topOver = Math.min(topOver, 0);
	  leftOver = Math.min(leftOver, 0);
	  rightOver = Math.min(rightOver, 0);

	  if (lrOnly) {
	    return leftOver + rightOver;
	  }
	  if (tbOnly) {
	    return topOver + bottomOver;
	  }

	  // use sum of squares b/c we care about overlap area.
	  return Math.sqrt(topOver * topOver + bottomOver * bottomOver + leftOver * leftOver + rightOver * rightOver);
	}

	/**
	 * Uses native methods to return an object of dimension values.
	 * @function
	 * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
	 * @returns {Object} - nested object of integer pixel values
	 * TODO - if element is window, return only those values.
	 */
	function GetDimensions(elem, test) {
	  elem = elem.length ? elem[0] : elem;

	  if (elem === window || elem === document) {
	    throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
	  }

	  var rect = elem.getBoundingClientRect(),
	      parRect = elem.parentNode.getBoundingClientRect(),
	      winRect = document.body.getBoundingClientRect(),
	      winY = window.pageYOffset,
	      winX = window.pageXOffset;

	  return {
	    width: rect.width,
	    height: rect.height,
	    offset: {
	      top: rect.top + winY,
	      left: rect.left + winX
	    },
	    parentDims: {
	      width: parRect.width,
	      height: parRect.height,
	      offset: {
	        top: parRect.top + winY,
	        left: parRect.left + winX
	      }
	    },
	    windowDims: {
	      width: winRect.width,
	      height: winRect.height,
	      offset: {
	        top: winY,
	        left: winX
	      }
	    }
	  };
	}

	/**
	 * Returns an object of top and left integer pixel values for dynamically rendered elements,
	 * such as: Tooltip, Reveal, and Dropdown. Maintained for backwards compatibility, and where
	 * you don't know alignment, but generally from
	 * 6.4 forward you should use GetExplicitOffsets, as GetOffsets conflates position and alignment.
	 * @function
	 * @param {jQuery} element - jQuery object for the element being positioned.
	 * @param {jQuery} anchor - jQuery object for the element's anchor point.
	 * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
	 * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
	 * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
	 * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
	 * TODO alter/rewrite to work with `em` values as well/instead of pixels
	 */
	function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
	  console.log("NOTE: GetOffsets is deprecated in favor of GetExplicitOffsets and will be removed in 6.5");
	  switch (position) {
	    case 'top':
	      return (0, _foundationUtil.rtl)() ? GetExplicitOffsets(element, anchor, 'top', 'left', vOffset, hOffset, isOverflow) : GetExplicitOffsets(element, anchor, 'top', 'right', vOffset, hOffset, isOverflow);
	    case 'bottom':
	      return (0, _foundationUtil.rtl)() ? GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow) : GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
	    case 'center top':
	      return GetExplicitOffsets(element, anchor, 'top', 'center', vOffset, hOffset, isOverflow);
	    case 'center bottom':
	      return GetExplicitOffsets(element, anchor, 'bottom', 'center', vOffset, hOffset, isOverflow);
	    case 'center left':
	      return GetExplicitOffsets(element, anchor, 'left', 'center', vOffset, hOffset, isOverflow);
	    case 'center right':
	      return GetExplicitOffsets(element, anchor, 'right', 'center', vOffset, hOffset, isOverflow);
	    case 'left bottom':
	      return GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow);
	    case 'right bottom':
	      return GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
	    // Backwards compatibility... this along with the reveal and reveal full
	    // classes are the only ones that didn't reference anchor
	    case 'center':
	      return {
	        left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2 + hOffset,
	        top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - ($eleDims.height / 2 + vOffset)
	      };
	    case 'reveal':
	      return {
	        left: ($eleDims.windowDims.width - $eleDims.width) / 2 + hOffset,
	        top: $eleDims.windowDims.offset.top + vOffset
	      };
	    case 'reveal full':
	      return {
	        left: $eleDims.windowDims.offset.left,
	        top: $eleDims.windowDims.offset.top
	      };
	      break;
	    default:
	      return {
	        left: (0, _foundationUtil.rtl)() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset : $anchorDims.offset.left + hOffset,
	        top: $anchorDims.offset.top + $anchorDims.height + vOffset
	      };

	  }
	}

	function GetExplicitOffsets(element, anchor, position, alignment, vOffset, hOffset, isOverflow) {
	  var $eleDims = GetDimensions(element),
	      $anchorDims = anchor ? GetDimensions(anchor) : null;

	  var topVal, leftVal;

	  // set position related attribute

	  switch (position) {
	    case 'top':
	      topVal = $anchorDims.offset.top - ($eleDims.height + vOffset);
	      break;
	    case 'bottom':
	      topVal = $anchorDims.offset.top + $anchorDims.height + vOffset;
	      break;
	    case 'left':
	      leftVal = $anchorDims.offset.left - ($eleDims.width + hOffset);
	      break;
	    case 'right':
	      leftVal = $anchorDims.offset.left + $anchorDims.width + hOffset;
	      break;
	  }

	  // set alignment related attribute
	  switch (position) {
	    case 'top':
	    case 'bottom':
	      switch (alignment) {
	        case 'left':
	          leftVal = $anchorDims.offset.left + hOffset;
	          break;
	        case 'right':
	          leftVal = $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset;
	          break;
	        case 'center':
	          leftVal = isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2 + hOffset;
	          break;
	      }
	      break;
	    case 'right':
	    case 'left':
	      switch (alignment) {
	        case 'bottom':
	          topVal = $anchorDims.offset.top - vOffset + $anchorDims.height - $eleDims.height;
	          break;
	        case 'top':
	          topVal = $anchorDims.offset.top + vOffset;
	          break;
	        case 'center':
	          topVal = $anchorDims.offset.top + vOffset + $anchorDims.height / 2 - $eleDims.height / 2;
	          break;
	      }
	      break;
	  }
	  return { top: topVal, left: leftVal };
	}

	exports.Box = Box;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.onImagesLoaded = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Runs a callback function when images are fully loaded.
	 * @param {Object} images - Image(s) to check if loaded.
	 * @param {Func} callback - Function to execute when image is fully loaded.
	 */
	function onImagesLoaded(images, callback) {
	  var self = this,
	      unloaded = images.length;

	  if (unloaded === 0) {
	    callback();
	  }

	  images.each(function () {
	    // Check if image is loaded
	    if (this.complete && this.naturalWidth !== undefined) {
	      singleImageLoaded();
	    } else {
	      // If the above check failed, simulate loading on detached element.
	      var image = new Image();
	      // Still count image as loaded if it finalizes with an error.
	      var events = "load.zf.images error.zf.images";
	      (0, _jquery2.default)(image).one(events, function me(event) {
	        // Unbind the event listeners. We're using 'one' but only one of the two events will have fired.
	        (0, _jquery2.default)(this).off(events, me);
	        singleImageLoaded();
	      });
	      image.src = (0, _jquery2.default)(this).attr('src');
	    }
	  });

	  function singleImageLoaded() {
	    unloaded--;
	    if (unloaded === 0) {
	      callback();
	    }
	  }
	}

	exports.onImagesLoaded = onImagesLoaded;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/*******************************************
	 *                                         *
	 * This util was created by Marius Olbertz *
	 * Please thank Marius on GitHub /owlbertz *
	 * or the web http://www.mariusolbertz.de/ *
	 *                                         *
	 ******************************************/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Keyboard = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundationUtil = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var keyCodes = {
	  9: 'TAB',
	  13: 'ENTER',
	  27: 'ESCAPE',
	  32: 'SPACE',
	  35: 'END',
	  36: 'HOME',
	  37: 'ARROW_LEFT',
	  38: 'ARROW_UP',
	  39: 'ARROW_RIGHT',
	  40: 'ARROW_DOWN'
	};

	var commands = {};

	// Functions pulled out to be referenceable from internals
	function findFocusable($element) {
	  if (!$element) {
	    return false;
	  }
	  return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {
	    if (!(0, _jquery2.default)(this).is(':visible') || (0, _jquery2.default)(this).attr('tabindex') < 0) {
	      return false;
	    } //only have visible elements and those that have a tabindex greater or equal 0
	    return true;
	  });
	}

	function parseKey(event) {
	  var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();

	  // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events
	  key = key.replace(/\W+/, '');

	  if (event.shiftKey) key = 'SHIFT_' + key;
	  if (event.ctrlKey) key = 'CTRL_' + key;
	  if (event.altKey) key = 'ALT_' + key;

	  // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)
	  key = key.replace(/_$/, '');

	  return key;
	}

	var Keyboard = {
	  keys: getKeyCodes(keyCodes),

	  /**
	   * Parses the (keyboard) event and returns a String that represents its key
	   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
	   * @param {Event} event - the event generated by the event handler
	   * @return String key - String that represents the key pressed
	   */
	  parseKey: parseKey,

	  /**
	   * Handles the given (keyboard) event
	   * @param {Event} event - the event generated by the event handler
	   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
	   * @param {Objects} functions - collection of functions that are to be executed
	   */
	  handleKey: function handleKey(event, component, functions) {
	    var commandList = commands[component],
	        keyCode = this.parseKey(event),
	        cmds,
	        command,
	        fn;

	    if (!commandList) return console.warn('Component not defined!');

	    if (typeof commandList.ltr === 'undefined') {
	      // this component does not differentiate between ltr and rtl
	      cmds = commandList; // use plain list
	    } else {
	      // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
	      if ((0, _foundationUtil.rtl)()) cmds = _jquery2.default.extend({}, commandList.ltr, commandList.rtl);else cmds = _jquery2.default.extend({}, commandList.rtl, commandList.ltr);
	    }
	    command = cmds[keyCode];

	    fn = functions[command];
	    if (fn && typeof fn === 'function') {
	      // execute function  if exists
	      var returnValue = fn.apply();
	      if (functions.handled || typeof functions.handled === 'function') {
	        // execute function when event was handled
	        functions.handled(returnValue);
	      }
	    } else {
	      if (functions.unhandled || typeof functions.unhandled === 'function') {
	        // execute function when event was not handled
	        functions.unhandled();
	      }
	    }
	  },


	  /**
	   * Finds all focusable elements within the given `$element`
	   * @param {jQuery} $element - jQuery object to search within
	   * @return {jQuery} $focusable - all focusable elements within `$element`
	   */

	  findFocusable: findFocusable,

	  /**
	   * Returns the component name name
	   * @param {Object} component - Foundation component, e.g. Slider or Reveal
	   * @return String componentName
	   */

	  register: function register(componentName, cmds) {
	    commands[componentName] = cmds;
	  },


	  // TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
	  //
	  /**
	   * Traps the focus in the given element.
	   * @param  {jQuery} $element  jQuery object to trap the foucs into.
	   */
	  trapFocus: function trapFocus($element) {
	    var $focusable = findFocusable($element),
	        $firstFocusable = $focusable.eq(0),
	        $lastFocusable = $focusable.eq(-1);

	    $element.on('keydown.zf.trapfocus', function (event) {
	      if (event.target === $lastFocusable[0] && parseKey(event) === 'TAB') {
	        event.preventDefault();
	        $firstFocusable.focus();
	      } else if (event.target === $firstFocusable[0] && parseKey(event) === 'SHIFT_TAB') {
	        event.preventDefault();
	        $lastFocusable.focus();
	      }
	    });
	  },

	  /**
	   * Releases the trapped focus from the given element.
	   * @param  {jQuery} $element  jQuery object to release the focus for.
	   */
	  releaseFocus: function releaseFocus($element) {
	    $element.off('keydown.zf.trapfocus');
	  }
	};

	/*
	 * Constants for easier comparing.
	 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
	 */
	function getKeyCodes(kcs) {
	  var k = {};
	  for (var kc in kcs) {
	    k[kcs[kc]] = kcs[kc];
	  }return k;
	}

	exports.Keyboard = Keyboard;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Motion = exports.Move = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundationUtil = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Motion module.
	 * @module foundation.motion
	 */

	var initClasses = ['mui-enter', 'mui-leave'];
	var activeClasses = ['mui-enter-active', 'mui-leave-active'];

	var Motion = {
	  animateIn: function animateIn(element, animation, cb) {
	    animate(true, element, animation, cb);
	  },

	  animateOut: function animateOut(element, animation, cb) {
	    animate(false, element, animation, cb);
	  }
	};

	function Move(duration, elem, fn) {
	  var anim,
	      prog,
	      start = null;
	  // console.log('called');

	  if (duration === 0) {
	    fn.apply(elem);
	    elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
	    return;
	  }

	  function move(ts) {
	    if (!start) start = ts;
	    // console.log(start, ts);
	    prog = ts - start;
	    fn.apply(elem);

	    if (prog < duration) {
	      anim = window.requestAnimationFrame(move, elem);
	    } else {
	      window.cancelAnimationFrame(anim);
	      elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
	    }
	  }
	  anim = window.requestAnimationFrame(move);
	}

	/**
	 * Animates an element in or out using a CSS transition class.
	 * @function
	 * @private
	 * @param {Boolean} isIn - Defines if the animation is in or out.
	 * @param {Object} element - jQuery or HTML object to animate.
	 * @param {String} animation - CSS class to use.
	 * @param {Function} cb - Callback to run when animation is finished.
	 */
	function animate(isIn, element, animation, cb) {
	  element = (0, _jquery2.default)(element).eq(0);

	  if (!element.length) return;

	  var initClass = isIn ? initClasses[0] : initClasses[1];
	  var activeClass = isIn ? activeClasses[0] : activeClasses[1];

	  // Set up the animation
	  reset();

	  element.addClass(animation).css('transition', 'none');

	  requestAnimationFrame(function () {
	    element.addClass(initClass);
	    if (isIn) element.show();
	  });

	  // Start the animation
	  requestAnimationFrame(function () {
	    element[0].offsetWidth;
	    element.css('transition', '').addClass(activeClass);
	  });

	  // Clean up the animation when it finishes
	  element.one((0, _foundationUtil.transitionend)(element), finish);

	  // Hides the element (for out animations), resets the element, and runs a callback
	  function finish() {
	    if (!isIn) element.hide();
	    reset();
	    if (cb) cb.apply(element);
	  }

	  // Resets transitions and removes motion-specific classes
	  function reset() {
	    element[0].style.transitionDuration = 0;
	    element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
	  }
	}

	exports.Move = Move;
	exports.Motion = Motion;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Nest = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Nest = {
	  Feather: function Feather(menu) {
	    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zf';

	    menu.attr('role', 'menubar');

	    var items = menu.find('li').attr({ 'role': 'menuitem' }),
	        subMenuClass = 'is-' + type + '-submenu',
	        subItemClass = subMenuClass + '-item',
	        hasSubClass = 'is-' + type + '-submenu-parent',
	        applyAria = type !== 'accordion'; // Accordions handle their own ARIA attriutes.

	    items.each(function () {
	      var $item = (0, _jquery2.default)(this),
	          $sub = $item.children('ul');

	      if ($sub.length) {
	        $item.addClass(hasSubClass);
	        $sub.addClass('submenu ' + subMenuClass).attr({ 'data-submenu': '' });
	        if (applyAria) {
	          $item.attr({
	            'aria-haspopup': true,
	            'aria-label': $item.children('a:first').text()
	          });
	          // Note:  Drilldowns behave differently in how they hide, and so need
	          // additional attributes.  We should look if this possibly over-generalized
	          // utility (Nest) is appropriate when we rework menus in 6.4
	          if (type === 'drilldown') {
	            $item.attr({ 'aria-expanded': false });
	          }
	        }
	        $sub.addClass('submenu ' + subMenuClass).attr({
	          'data-submenu': '',
	          'role': 'menu'
	        });
	        if (type === 'drilldown') {
	          $sub.attr({ 'aria-hidden': true });
	        }
	      }

	      if ($item.parent('[data-submenu]').length) {
	        $item.addClass('is-submenu-item ' + subItemClass);
	      }
	    });

	    return;
	  },
	  Burn: function Burn(menu, type) {
	    var //items = menu.find('li'),
	    subMenuClass = 'is-' + type + '-submenu',
	        subItemClass = subMenuClass + '-item',
	        hasSubClass = 'is-' + type + '-submenu-parent';

	    menu.find('>li, .menu, .menu > li').removeClass(subMenuClass + ' ' + subItemClass + ' ' + hasSubClass + ' is-submenu-item submenu is-active').removeAttr('data-submenu').css('display', '');
	  }
	};

	exports.Nest = Nest;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Timer = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Timer(elem, options, cb) {
	  var _this = this,
	      duration = options.duration,
	      //options is an object for easily adding features later.
	  nameSpace = Object.keys(elem.data())[0] || 'timer',
	      remain = -1,
	      start,
	      timer;

	  this.isPaused = false;

	  this.restart = function () {
	    remain = -1;
	    clearTimeout(timer);
	    this.start();
	  };

	  this.start = function () {
	    this.isPaused = false;
	    // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
	    clearTimeout(timer);
	    remain = remain <= 0 ? duration : remain;
	    elem.data('paused', false);
	    start = Date.now();
	    timer = setTimeout(function () {
	      if (options.infinite) {
	        _this.restart(); //rerun the timer.
	      }
	      if (cb && typeof cb === 'function') {
	        cb();
	      }
	    }, remain);
	    elem.trigger('timerstart.zf.' + nameSpace);
	  };

	  this.pause = function () {
	    this.isPaused = true;
	    //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
	    clearTimeout(timer);
	    elem.data('paused', true);
	    var end = Date.now();
	    remain = remain - (end - start);
	    elem.trigger('timerpaused.zf.' + nameSpace);
	  };
	}

	exports.Timer = Timer;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Touch = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //**************************************************
	//**Work inspired by multiple jquery swipe plugins**
	//**Done by Yohai Ararat ***************************
	//**************************************************

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Touch = {};

	var startPosX,
	    startPosY,
	    startTime,
	    elapsedTime,
	    isMoving = false;

	function onTouchEnd() {
	  //  alert(this);
	  this.removeEventListener('touchmove', onTouchMove);
	  this.removeEventListener('touchend', onTouchEnd);
	  isMoving = false;
	}

	function onTouchMove(e) {
	  if (_jquery2.default.spotSwipe.preventDefault) {
	    e.preventDefault();
	  }
	  if (isMoving) {
	    var x = e.touches[0].pageX;
	    var y = e.touches[0].pageY;
	    var dx = startPosX - x;
	    var dy = startPosY - y;
	    var dir;
	    elapsedTime = new Date().getTime() - startTime;
	    if (Math.abs(dx) >= _jquery2.default.spotSwipe.moveThreshold && elapsedTime <= _jquery2.default.spotSwipe.timeThreshold) {
	      dir = dx > 0 ? 'left' : 'right';
	    }
	    // else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
	    //   dir = dy > 0 ? 'down' : 'up';
	    // }
	    if (dir) {
	      e.preventDefault();
	      onTouchEnd.call(this);
	      (0, _jquery2.default)(this).trigger('swipe', dir).trigger('swipe' + dir);
	    }
	  }
	}

	function onTouchStart(e) {
	  if (e.touches.length == 1) {
	    startPosX = e.touches[0].pageX;
	    startPosY = e.touches[0].pageY;
	    isMoving = true;
	    startTime = new Date().getTime();
	    this.addEventListener('touchmove', onTouchMove, false);
	    this.addEventListener('touchend', onTouchEnd, false);
	  }
	}

	function init() {
	  this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
	}

	function teardown() {
	  this.removeEventListener('touchstart', onTouchStart);
	}

	var SpotSwipe = function () {
	  function SpotSwipe($) {
	    _classCallCheck(this, SpotSwipe);

	    this.version = '1.0.0';
	    this.enabled = 'ontouchstart' in document.documentElement;
	    this.preventDefault = false;
	    this.moveThreshold = 75;
	    this.timeThreshold = 200;
	    this.$ = $;
	    this._init();
	  }

	  _createClass(SpotSwipe, [{
	    key: '_init',
	    value: function _init() {
	      var $ = this.$;
	      $.event.special.swipe = { setup: init };

	      $.each(['left', 'up', 'down', 'right'], function () {
	        $.event.special['swipe' + this] = { setup: function setup() {
	            $(this).on('swipe', $.noop);
	          } };
	      });
	    }
	  }]);

	  return SpotSwipe;
	}();

	/****************************************************
	 * As far as I can tell, both setupSpotSwipe and    *
	 * setupTouchHandler should be idempotent,          *
	 * because they directly replace functions &        *
	 * values, and do not add event handlers directly.  *
	 ****************************************************/

	Touch.setupSpotSwipe = function ($) {
	  $.spotSwipe = new SpotSwipe($);
	};

	/****************************************************
	 * Method for adding pseudo drag events to elements *
	 ***************************************************/
	Touch.setupTouchHandler = function ($) {
	  $.fn.addTouch = function () {
	    this.each(function (i, el) {
	      $(el).bind('touchstart touchmove touchend touchcancel', function () {
	        //we pass the original event object because the jQuery event
	        //object is normalized to w3c specs and does not provide the TouchList
	        handleTouch(event);
	      });
	    });

	    var handleTouch = function handleTouch(event) {
	      var touches = event.changedTouches,
	          first = touches[0],
	          eventTypes = {
	        touchstart: 'mousedown',
	        touchmove: 'mousemove',
	        touchend: 'mouseup'
	      },
	          type = eventTypes[event.type],
	          simulatedEvent;

	      if ('MouseEvent' in window && typeof window.MouseEvent === 'function') {
	        simulatedEvent = new window.MouseEvent(type, {
	          'bubbles': true,
	          'cancelable': true,
	          'screenX': first.screenX,
	          'screenY': first.screenY,
	          'clientX': first.clientX,
	          'clientY': first.clientY
	        });
	      } else {
	        simulatedEvent = document.createEvent('MouseEvent');
	        simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0 /*left*/, null);
	      }
	      first.target.dispatchEvent(simulatedEvent);
	    };
	  };
	};

	Touch.init = function ($) {
	  if (typeof $.spotSwipe === 'undefined') {
	    Touch.setupSpotSwipe($);
	    Touch.setupTouchHandler($);
	  }
	};

	exports.Touch = Touch;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Triggers = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundationUtil = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MutationObserver = function () {
	  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
	  for (var i = 0; i < prefixes.length; i++) {
	    if (prefixes[i] + 'MutationObserver' in window) {
	      return window[prefixes[i] + 'MutationObserver'];
	    }
	  }
	  return false;
	}();

	var triggers = function triggers(el, type) {
	  el.data(type).split(' ').forEach(function (id) {
	    (0, _jquery2.default)('#' + id)[type === 'close' ? 'trigger' : 'triggerHandler'](type + '.zf.trigger', [el]);
	  });
	};

	var Triggers = {
	  Listeners: {
	    Basic: {},
	    Global: {}
	  },
	  Initializers: {}
	};

	Triggers.Listeners.Basic = {
	  openListener: function openListener() {
	    triggers((0, _jquery2.default)(this), 'open');
	  },
	  closeListener: function closeListener() {
	    var id = (0, _jquery2.default)(this).data('close');
	    if (id) {
	      triggers((0, _jquery2.default)(this), 'close');
	    } else {
	      (0, _jquery2.default)(this).trigger('close.zf.trigger');
	    }
	  },
	  toggleListener: function toggleListener() {
	    var id = (0, _jquery2.default)(this).data('toggle');
	    if (id) {
	      triggers((0, _jquery2.default)(this), 'toggle');
	    } else {
	      (0, _jquery2.default)(this).trigger('toggle.zf.trigger');
	    }
	  },
	  closeableListener: function closeableListener(e) {
	    e.stopPropagation();
	    var animation = (0, _jquery2.default)(this).data('closable');

	    if (animation !== '') {
	      _foundationUtil.Motion.animateOut((0, _jquery2.default)(this), animation, function () {
	        (0, _jquery2.default)(this).trigger('closed.zf');
	      });
	    } else {
	      (0, _jquery2.default)(this).fadeOut().trigger('closed.zf');
	    }
	  },
	  toggleFocusListener: function toggleFocusListener() {
	    var id = (0, _jquery2.default)(this).data('toggle-focus');
	    (0, _jquery2.default)('#' + id).triggerHandler('toggle.zf.trigger', [(0, _jquery2.default)(this)]);
	  }
	};

	// Elements with [data-open] will reveal a plugin that supports it when clicked.
	Triggers.Initializers.addOpenListener = function ($elem) {
	  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.openListener);
	  $elem.on('click.zf.trigger', '[data-open]', Triggers.Listeners.Basic.openListener);
	};

	// Elements with [data-close] will close a plugin that supports it when clicked.
	// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
	Triggers.Initializers.addCloseListener = function ($elem) {
	  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.closeListener);
	  $elem.on('click.zf.trigger', '[data-close]', Triggers.Listeners.Basic.closeListener);
	};

	// Elements with [data-toggle] will toggle a plugin that supports it when clicked.
	Triggers.Initializers.addToggleListener = function ($elem) {
	  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.toggleListener);
	  $elem.on('click.zf.trigger', '[data-toggle]', Triggers.Listeners.Basic.toggleListener);
	};

	// Elements with [data-closable] will respond to close.zf.trigger events.
	Triggers.Initializers.addCloseableListener = function ($elem) {
	  $elem.off('close.zf.trigger', Triggers.Listeners.Basic.closeableListener);
	  $elem.on('close.zf.trigger', '[data-closeable], [data-closable]', Triggers.Listeners.Basic.closeableListener);
	};

	// Elements with [data-toggle-focus] will respond to coming in and out of focus
	Triggers.Initializers.addToggleFocusListener = function ($elem) {
	  $elem.off('focus.zf.trigger blur.zf.trigger', Triggers.Listeners.Basic.toggleFocusListener);
	  $elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.Listeners.Basic.toggleFocusListener);
	};

	// More Global/complex listeners and triggers
	Triggers.Listeners.Global = {
	  resizeListener: function resizeListener($nodes) {
	    if (!MutationObserver) {
	      //fallback for IE 9
	      $nodes.each(function () {
	        (0, _jquery2.default)(this).triggerHandler('resizeme.zf.trigger');
	      });
	    }
	    //trigger all listening elements and signal a resize event
	    $nodes.attr('data-events', "resize");
	  },
	  scrollListener: function scrollListener($nodes) {
	    if (!MutationObserver) {
	      //fallback for IE 9
	      $nodes.each(function () {
	        (0, _jquery2.default)(this).triggerHandler('scrollme.zf.trigger');
	      });
	    }
	    //trigger all listening elements and signal a scroll event
	    $nodes.attr('data-events', "scroll");
	  },
	  closeMeListener: function closeMeListener(e, pluginId) {
	    var plugin = e.namespace.split('.')[0];
	    var plugins = (0, _jquery2.default)('[data-' + plugin + ']').not('[data-yeti-box="' + pluginId + '"]');

	    plugins.each(function () {
	      var _this = (0, _jquery2.default)(this);
	      _this.triggerHandler('close.zf.trigger', [_this]);
	    });
	  }

	  // Global, parses whole document.
	};Triggers.Initializers.addClosemeListener = function (pluginName) {
	  var yetiBoxes = (0, _jquery2.default)('[data-yeti-box]'),
	      plugNames = ['dropdown', 'tooltip', 'reveal'];

	  if (pluginName) {
	    if (typeof pluginName === 'string') {
	      plugNames.push(pluginName);
	    } else if ((typeof pluginName === 'undefined' ? 'undefined' : _typeof(pluginName)) === 'object' && typeof pluginName[0] === 'string') {
	      plugNames.concat(pluginName);
	    } else {
	      console.error('Plugin names must be strings');
	    }
	  }
	  if (yetiBoxes.length) {
	    var listeners = plugNames.map(function (name) {
	      return 'closeme.zf.' + name;
	    }).join(' ');

	    (0, _jquery2.default)(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);
	  }
	};

	function debounceGlobalListener(debounce, trigger, listener) {
	  var timer = void 0,
	      args = Array.prototype.slice.call(arguments, 3);
	  (0, _jquery2.default)(window).off(trigger).on(trigger, function (e) {
	    if (timer) {
	      clearTimeout(timer);
	    }
	    timer = setTimeout(function () {
	      listener.apply(null, args);
	    }, debounce || 10); //default time to emit scroll event
	  });
	}

	Triggers.Initializers.addResizeListener = function (debounce) {
	  var $nodes = (0, _jquery2.default)('[data-resize]');
	  if ($nodes.length) {
	    debounceGlobalListener(debounce, 'resize.zf.trigger', Triggers.Listeners.Global.resizeListener, $nodes);
	  }
	};

	Triggers.Initializers.addScrollListener = function (debounce) {
	  var $nodes = (0, _jquery2.default)('[data-scroll]');
	  if ($nodes.length) {
	    debounceGlobalListener(debounce, 'scroll.zf.trigger', Triggers.Listeners.Global.scrollListener, $nodes);
	  }
	};

	Triggers.Initializers.addMutationEventsListener = function ($elem) {
	  if (!MutationObserver) {
	    return false;
	  }
	  var $nodes = $elem.find('[data-resize], [data-scroll], [data-mutate]');

	  //element callback
	  var listeningElementsMutation = function listeningElementsMutation(mutationRecordsList) {
	    var $target = (0, _jquery2.default)(mutationRecordsList[0].target);

	    //trigger the event handler for the element depending on type
	    switch (mutationRecordsList[0].type) {
	      case "attributes":
	        if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
	          $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
	        }
	        if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
	          $target.triggerHandler('resizeme.zf.trigger', [$target]);
	        }
	        if (mutationRecordsList[0].attributeName === "style") {
	          $target.closest("[data-mutate]").attr("data-events", "mutate");
	          $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
	        }
	        break;

	      case "childList":
	        $target.closest("[data-mutate]").attr("data-events", "mutate");
	        $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
	        break;

	      default:
	        return false;
	      //nothing
	    }
	  };

	  if ($nodes.length) {
	    //for each element that needs to listen for resizing, scrolling, or mutation add a single observer
	    for (var i = 0; i <= $nodes.length - 1; i++) {
	      var elementObserver = new MutationObserver(listeningElementsMutation);
	      elementObserver.observe($nodes[i], { attributes: true, childList: true, characterData: false, subtree: true, attributeFilter: ["data-events", "style"] });
	    }
	  }
	};

	Triggers.Initializers.addSimpleListeners = function () {
	  var $document = (0, _jquery2.default)(document);

	  Triggers.Initializers.addOpenListener($document);
	  Triggers.Initializers.addCloseListener($document);
	  Triggers.Initializers.addToggleListener($document);
	  Triggers.Initializers.addCloseableListener($document);
	  Triggers.Initializers.addToggleFocusListener($document);
	};

	Triggers.Initializers.addGlobalListeners = function () {
	  var $document = (0, _jquery2.default)(document);
	  Triggers.Initializers.addMutationEventsListener($document);
	  Triggers.Initializers.addResizeListener();
	  Triggers.Initializers.addScrollListener();
	  Triggers.Initializers.addClosemeListener();
	};

	Triggers.init = function ($, Foundation) {
	  if (typeof $.triggersInitialized === 'undefined') {
	    var $document = $(document);

	    if (document.readyState === "complete") {
	      Triggers.Initializers.addSimpleListeners();
	      Triggers.Initializers.addGlobalListeners();
	    } else {
	      $(window).on('load', function () {
	        Triggers.Initializers.addSimpleListeners();
	        Triggers.Initializers.addGlobalListeners();
	      });
	    }

	    $.triggersInitialized = true;
	  }

	  if (Foundation) {
	    Foundation.Triggers = Triggers;
	    // Legacy included to be backwards compatible for now.
	    Foundation.IHearYou = Triggers.Initializers.addGlobalListeners;
	  }
	};

	exports.Triggers = Triggers;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Reveal = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundationUtil = __webpack_require__(10);

	var _foundationUtil2 = __webpack_require__(7);

	var _foundationUtil3 = __webpack_require__(11);

	var _foundation = __webpack_require__(17);

	var _foundationUtil4 = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Reveal module.
	 * @module foundation.reveal
	 * @requires foundation.util.keyboard
	 * @requires foundation.util.triggers
	 * @requires foundation.util.mediaQuery
	 * @requires foundation.util.motion if using animations
	 */

	var Reveal = function (_Plugin) {
	  _inherits(Reveal, _Plugin);

	  function Reveal() {
	    _classCallCheck(this, Reveal);

	    return _possibleConstructorReturn(this, (Reveal.__proto__ || Object.getPrototypeOf(Reveal)).apply(this, arguments));
	  }

	  _createClass(Reveal, [{
	    key: '_setup',

	    /**
	     * Creates a new instance of Reveal.
	     * @class
	     * @name Reveal
	     * @param {jQuery} element - jQuery object to use for the modal.
	     * @param {Object} options - optional parameters.
	     */
	    value: function _setup(element, options) {
	      this.$element = element;
	      this.options = _jquery2.default.extend({}, Reveal.defaults, this.$element.data(), options);
	      this.className = 'Reveal'; // ie9 back compat
	      this._init();

	      // Triggers init is idempotent, just need to make sure it is initialized
	      _foundationUtil4.Triggers.init(_jquery2.default);

	      _foundationUtil.Keyboard.register('Reveal', {
	        'ESCAPE': 'close'
	      });
	    }

	    /**
	     * Initializes the modal by adding the overlay and close buttons, (if selected).
	     * @private
	     */

	  }, {
	    key: '_init',
	    value: function _init() {
	      _foundationUtil2.MediaQuery._init();
	      this.id = this.$element.attr('id');
	      this.isActive = false;
	      this.cached = { mq: _foundationUtil2.MediaQuery.current };
	      this.isMobile = mobileSniff();

	      this.$anchor = (0, _jquery2.default)('[data-open="' + this.id + '"]').length ? (0, _jquery2.default)('[data-open="' + this.id + '"]') : (0, _jquery2.default)('[data-toggle="' + this.id + '"]');
	      this.$anchor.attr({
	        'aria-controls': this.id,
	        'aria-haspopup': true,
	        'tabindex': 0
	      });

	      if (this.options.fullScreen || this.$element.hasClass('full')) {
	        this.options.fullScreen = true;
	        this.options.overlay = false;
	      }
	      if (this.options.overlay && !this.$overlay) {
	        this.$overlay = this._makeOverlay(this.id);
	      }

	      this.$element.attr({
	        'role': 'dialog',
	        'aria-hidden': true,
	        'data-yeti-box': this.id,
	        'data-resize': this.id
	      });

	      if (this.$overlay) {
	        this.$element.detach().appendTo(this.$overlay);
	      } else {
	        this.$element.detach().appendTo((0, _jquery2.default)(this.options.appendTo));
	        this.$element.addClass('without-overlay');
	      }
	      this._events();
	      if (this.options.deepLink && window.location.hash === '#' + this.id) {
	        (0, _jquery2.default)(window).one('load.zf.reveal', this.open.bind(this));
	      }
	    }

	    /**
	     * Creates an overlay div to display behind the modal.
	     * @private
	     */

	  }, {
	    key: '_makeOverlay',
	    value: function _makeOverlay() {
	      var additionalOverlayClasses = '';

	      if (this.options.additionalOverlayClasses) {
	        additionalOverlayClasses = ' ' + this.options.additionalOverlayClasses;
	      }

	      return (0, _jquery2.default)('<div></div>').addClass('reveal-overlay' + additionalOverlayClasses).appendTo(this.options.appendTo);
	    }

	    /**
	     * Updates position of modal
	     * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
	     * @private
	     */

	  }, {
	    key: '_updatePosition',
	    value: function _updatePosition() {
	      var width = this.$element.outerWidth();
	      var outerWidth = (0, _jquery2.default)(window).width();
	      var height = this.$element.outerHeight();
	      var outerHeight = (0, _jquery2.default)(window).height();
	      var left, top;
	      if (this.options.hOffset === 'auto') {
	        left = parseInt((outerWidth - width) / 2, 10);
	      } else {
	        left = parseInt(this.options.hOffset, 10);
	      }
	      if (this.options.vOffset === 'auto') {
	        if (height > outerHeight) {
	          top = parseInt(Math.min(100, outerHeight / 10), 10);
	        } else {
	          top = parseInt((outerHeight - height) / 4, 10);
	        }
	      } else {
	        top = parseInt(this.options.vOffset, 10);
	      }
	      this.$element.css({ top: top + 'px' });
	      // only worry about left if we don't have an overlay or we havea  horizontal offset,
	      // otherwise we're perfectly in the middle
	      if (!this.$overlay || this.options.hOffset !== 'auto') {
	        this.$element.css({ left: left + 'px' });
	        this.$element.css({ margin: '0px' });
	      }
	    }

	    /**
	     * Adds event handlers for the modal.
	     * @private
	     */

	  }, {
	    key: '_events',
	    value: function _events() {
	      var _this3 = this;

	      var _this = this;

	      this.$element.on({
	        'open.zf.trigger': this.open.bind(this),
	        'close.zf.trigger': function closeZfTrigger(event, $element) {
	          if (event.target === _this.$element[0] || (0, _jquery2.default)(event.target).parents('[data-closable]')[0] === $element) {
	            // only close reveal when it's explicitly called
	            return _this3.close.apply(_this3);
	          }
	        },
	        'toggle.zf.trigger': this.toggle.bind(this),
	        'resizeme.zf.trigger': function resizemeZfTrigger() {
	          _this._updatePosition();
	        }
	      });

	      if (this.options.closeOnClick && this.options.overlay) {
	        this.$overlay.off('.zf.reveal').on('click.zf.reveal', function (e) {
	          if (e.target === _this.$element[0] || _jquery2.default.contains(_this.$element[0], e.target) || !_jquery2.default.contains(document, e.target)) {
	            return;
	          }
	          _this.close();
	        });
	      }
	      if (this.options.deepLink) {
	        (0, _jquery2.default)(window).on('popstate.zf.reveal:' + this.id, this._handleState.bind(this));
	      }
	    }

	    /**
	     * Handles modal methods on back/forward button clicks or any other event that triggers popstate.
	     * @private
	     */

	  }, {
	    key: '_handleState',
	    value: function _handleState(e) {
	      if (window.location.hash === '#' + this.id && !this.isActive) {
	        this.open();
	      } else {
	        this.close();
	      }
	    }

	    /**
	     * Opens the modal controlled by `this.$anchor`, and closes all others by default.
	     * @function
	     * @fires Reveal#closeme
	     * @fires Reveal#open
	     */

	  }, {
	    key: 'open',
	    value: function open() {
	      var _this4 = this;

	      // either update or replace browser history
	      if (this.options.deepLink) {
	        var hash = '#' + this.id;

	        if (window.history.pushState) {
	          if (this.options.updateHistory) {
	            window.history.pushState({}, '', hash);
	          } else {
	            window.history.replaceState({}, '', hash);
	          }
	        } else {
	          window.location.hash = hash;
	        }
	      }

	      this.isActive = true;

	      // Make elements invisible, but remove display: none so we can get size and positioning
	      this.$element.css({ 'visibility': 'hidden' }).show().scrollTop(0);
	      if (this.options.overlay) {
	        this.$overlay.css({ 'visibility': 'hidden' }).show();
	      }

	      this._updatePosition();

	      this.$element.hide().css({ 'visibility': '' });

	      if (this.$overlay) {
	        this.$overlay.css({ 'visibility': '' }).hide();
	        if (this.$element.hasClass('fast')) {
	          this.$overlay.addClass('fast');
	        } else if (this.$element.hasClass('slow')) {
	          this.$overlay.addClass('slow');
	        }
	      }

	      if (!this.options.multipleOpened) {
	        /**
	         * Fires immediately before the modal opens.
	         * Closes any other modals that are currently open
	         * @event Reveal#closeme
	         */
	        this.$element.trigger('closeme.zf.reveal', this.id);
	      }

	      var _this = this;

	      function addRevealOpenClasses() {
	        if (_this.isMobile) {
	          if (!_this.originalScrollPos) {
	            _this.originalScrollPos = window.pageYOffset;
	          }
	          (0, _jquery2.default)('html, body').addClass('is-reveal-open');
	        } else {
	          (0, _jquery2.default)('body').addClass('is-reveal-open');
	        }
	      }
	      // Motion UI method of reveal
	      if (this.options.animationIn) {
	        var afterAnimation = function afterAnimation() {
	          _this.$element.attr({
	            'aria-hidden': false,
	            'tabindex': -1
	          }).focus();
	          addRevealOpenClasses();
	          _foundationUtil.Keyboard.trapFocus(_this.$element);
	        };

	        if (this.options.overlay) {
	          _foundationUtil3.Motion.animateIn(this.$overlay, 'fade-in');
	        }
	        _foundationUtil3.Motion.animateIn(this.$element, this.options.animationIn, function () {
	          if (_this4.$element) {
	            // protect against object having been removed
	            _this4.focusableElements = _foundationUtil.Keyboard.findFocusable(_this4.$element);
	            afterAnimation();
	          }
	        });
	      }
	      // jQuery method of reveal
	      else {
	          if (this.options.overlay) {
	            this.$overlay.show(0);
	          }
	          this.$element.show(this.options.showDelay);
	        }

	      // handle accessibility
	      this.$element.attr({
	        'aria-hidden': false,
	        'tabindex': -1
	      }).focus();
	      _foundationUtil.Keyboard.trapFocus(this.$element);

	      addRevealOpenClasses();

	      this._extraHandlers();

	      /**
	       * Fires when the modal has successfully opened.
	       * @event Reveal#open
	       */
	      this.$element.trigger('open.zf.reveal');
	    }

	    /**
	     * Adds extra event handlers for the body and window if necessary.
	     * @private
	     */

	  }, {
	    key: '_extraHandlers',
	    value: function _extraHandlers() {
	      var _this = this;
	      if (!this.$element) {
	        return;
	      } // If we're in the middle of cleanup, don't freak out
	      this.focusableElements = _foundationUtil.Keyboard.findFocusable(this.$element);

	      if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
	        (0, _jquery2.default)('body').on('click.zf.reveal', function (e) {
	          if (e.target === _this.$element[0] || _jquery2.default.contains(_this.$element[0], e.target) || !_jquery2.default.contains(document, e.target)) {
	            return;
	          }
	          _this.close();
	        });
	      }

	      if (this.options.closeOnEsc) {
	        (0, _jquery2.default)(window).on('keydown.zf.reveal', function (e) {
	          _foundationUtil.Keyboard.handleKey(e, 'Reveal', {
	            close: function close() {
	              if (_this.options.closeOnEsc) {
	                _this.close();
	              }
	            }
	          });
	        });
	      }
	    }

	    /**
	     * Closes the modal.
	     * @function
	     * @fires Reveal#closed
	     */

	  }, {
	    key: 'close',
	    value: function close() {
	      if (!this.isActive || !this.$element.is(':visible')) {
	        return false;
	      }
	      var _this = this;

	      // Motion UI method of hiding
	      if (this.options.animationOut) {
	        if (this.options.overlay) {
	          _foundationUtil3.Motion.animateOut(this.$overlay, 'fade-out');
	        }

	        _foundationUtil3.Motion.animateOut(this.$element, this.options.animationOut, finishUp);
	      }
	      // jQuery method of hiding
	      else {
	          this.$element.hide(this.options.hideDelay);

	          if (this.options.overlay) {
	            this.$overlay.hide(0, finishUp);
	          } else {
	            finishUp();
	          }
	        }

	      // Conditionals to remove extra event listeners added on open
	      if (this.options.closeOnEsc) {
	        (0, _jquery2.default)(window).off('keydown.zf.reveal');
	      }

	      if (!this.options.overlay && this.options.closeOnClick) {
	        (0, _jquery2.default)('body').off('click.zf.reveal');
	      }

	      this.$element.off('keydown.zf.reveal');

	      function finishUp() {
	        if (_this.isMobile) {
	          if ((0, _jquery2.default)('.reveal:visible').length === 0) {
	            (0, _jquery2.default)('html, body').removeClass('is-reveal-open');
	          }
	          if (_this.originalScrollPos) {
	            (0, _jquery2.default)('body').scrollTop(_this.originalScrollPos);
	            _this.originalScrollPos = null;
	          }
	        } else {
	          if ((0, _jquery2.default)('.reveal:visible').length === 0) {
	            (0, _jquery2.default)('body').removeClass('is-reveal-open');
	          }
	        }

	        _foundationUtil.Keyboard.releaseFocus(_this.$element);

	        _this.$element.attr('aria-hidden', true);

	        /**
	        * Fires when the modal is done closing.
	        * @event Reveal#closed
	        */
	        _this.$element.trigger('closed.zf.reveal');
	      }

	      /**
	      * Resets the modal content
	      * This prevents a running video to keep going in the background
	      */
	      if (this.options.resetOnClose) {
	        this.$element.html(this.$element.html());
	      }

	      this.isActive = false;
	      if (_this.options.deepLink) {
	        if (window.history.replaceState) {
	          window.history.replaceState('', document.title, window.location.href.replace('#' + this.id, ''));
	        } else {
	          window.location.hash = '';
	        }
	      }

	      this.$anchor.focus();
	    }

	    /**
	     * Toggles the open/closed state of a modal.
	     * @function
	     */

	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      if (this.isActive) {
	        this.close();
	      } else {
	        this.open();
	      }
	    }
	  }, {
	    key: '_destroy',


	    /**
	     * Destroys an instance of a modal.
	     * @function
	     */
	    value: function _destroy() {
	      if (this.options.overlay) {
	        this.$element.appendTo((0, _jquery2.default)(this.options.appendTo)); // move $element outside of $overlay to prevent error unregisterPlugin()
	        this.$overlay.hide().off().remove();
	      }
	      this.$element.hide().off();
	      this.$anchor.off('.zf');
	      (0, _jquery2.default)(window).off('.zf.reveal:' + this.id);
	    }
	  }]);

	  return Reveal;
	}(_foundation.Plugin);

	Reveal.defaults = {
	  /**
	   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
	   * @option
	   * @type {string}
	   * @default ''
	   */
	  animationIn: '',
	  /**
	   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
	   * @option
	   * @type {string}
	   * @default ''
	   */
	  animationOut: '',
	  /**
	   * Time, in ms, to delay the opening of a modal after a click if no animation used.
	   * @option
	   * @type {number}
	   * @default 0
	   */
	  showDelay: 0,
	  /**
	   * Time, in ms, to delay the closing of a modal after a click if no animation used.
	   * @option
	   * @type {number}
	   * @default 0
	   */
	  hideDelay: 0,
	  /**
	   * Allows a click on the body/overlay to close the modal.
	   * @option
	   * @type {boolean}
	   * @default true
	   */
	  closeOnClick: true,
	  /**
	   * Allows the modal to close if the user presses the `ESCAPE` key.
	   * @option
	   * @type {boolean}
	   * @default true
	   */
	  closeOnEsc: true,
	  /**
	   * If true, allows multiple modals to be displayed at once.
	   * @option
	   * @type {boolean}
	   * @default false
	   */
	  multipleOpened: false,
	  /**
	   * Distance, in pixels, the modal should push down from the top of the screen.
	   * @option
	   * @type {number|string}
	   * @default auto
	   */
	  vOffset: 'auto',
	  /**
	   * Distance, in pixels, the modal should push in from the side of the screen.
	   * @option
	   * @type {number|string}
	   * @default auto
	   */
	  hOffset: 'auto',
	  /**
	   * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
	   * @option
	   * @type {boolean}
	   * @default false
	   */
	  fullScreen: false,
	  /**
	   * Percentage of screen height the modal should push up from the bottom of the view.
	   * @option
	   * @type {number}
	   * @default 10
	   */
	  btmOffsetPct: 10,
	  /**
	   * Allows the modal to generate an overlay div, which will cover the view when modal opens.
	   * @option
	   * @type {boolean}
	   * @default true
	   */
	  overlay: true,
	  /**
	   * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
	   * @option
	   * @type {boolean}
	   * @default false
	   */
	  resetOnClose: false,
	  /**
	   * Allows the modal to alter the url on open/close, and allows the use of the `back` button to close modals. ALSO, allows a modal to auto-maniacally open on page load IF the hash === the modal's user-set id.
	   * @option
	   * @type {boolean}
	   * @default false
	   */
	  deepLink: false,
	  /**
	   * Update the browser history with the open modal
	   * @option
	   * @default false
	   */
	  updateHistory: false,
	  /**
	  * Allows the modal to append to custom div.
	  * @option
	  * @type {string}
	  * @default "body"
	  */
	  appendTo: "body",
	  /**
	   * Allows adding additional class names to the reveal overlay.
	   * @option
	   * @type {string}
	   * @default ''
	   */
	  additionalOverlayClasses: ''
	};

	function iPhoneSniff() {
	  return (/iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
	  );
	}

	function androidSniff() {
	  return (/Android/.test(window.navigator.userAgent)
	  );
	}

	function mobileSniff() {
	  return iPhoneSniff() || androidSniff();
	}

	exports.Reveal = Reveal;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Plugin = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundationUtil = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
	// {function} _setup (replaces previous constructor),
	// {function} _destroy (replaces previous destroy)
	var Plugin = function () {
	  function Plugin(element, options) {
	    _classCallCheck(this, Plugin);

	    this._setup(element, options);
	    var pluginName = getPluginName(this);
	    this.uuid = (0, _foundationUtil.GetYoDigits)(6, pluginName);

	    if (!this.$element.attr('data-' + pluginName)) {
	      this.$element.attr('data-' + pluginName, this.uuid);
	    }
	    if (!this.$element.data('zfPlugin')) {
	      this.$element.data('zfPlugin', this);
	    }
	    /**
	     * Fires when the plugin has initialized.
	     * @event Plugin#init
	     */
	    this.$element.trigger('init.zf.' + pluginName);
	  }

	  _createClass(Plugin, [{
	    key: 'destroy',
	    value: function destroy() {
	      this._destroy();
	      var pluginName = getPluginName(this);
	      this.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
	      /**
	       * Fires when the plugin has been destroyed.
	       * @event Plugin#destroyed
	       */
	      .trigger('destroyed.zf.' + pluginName);
	      for (var prop in this) {
	        this[prop] = null; //clean up script to prep for garbage collection.
	      }
	    }
	  }]);

	  return Plugin;
	}();

	// Convert PascalCase to kebab-case
	// Thank you: http://stackoverflow.com/a/8955580


	function hyphenate(str) {
	  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	function getPluginName(obj) {
	  if (typeof obj.constructor.name !== 'undefined') {
	    return hyphenate(obj.constructor.name);
	  } else {
	    return hyphenate(obj.className);
	  }
	}

	exports.Plugin = Plugin;

/***/ })
/******/ ]);