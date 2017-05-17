import Ember from 'ember';
import Base from 'ember-cli-analytics/integrations/base';
import canUseDOM from 'ember-cli-analytics/utils/can-use-dom';

export default Base.extend({
	oldViewURI: null,
	
	trackPage(options = {}) {
		//TODO: skip initial page
		//sc_clickstat_call negeert page view?
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		}
		let viewURI = window.location.origin + options.page;
			
		if (window.sc_clickstat_call) {
			//let _29 = ....
			let page_info = "&resolution=" + sc_width + "&h=" + sc_height + "&camefrom=" + escape(this.oldViewURI.substring(0, 600)) + "&u=" + escape(viewURI.substring(0, 600)) + "&t=" + sc_title + "&sc_snum=" + sc_script_num + sc_pageview_tag_string + "&sess=7a9eb4&p=0&invisible=1";
			let uri = sc_base_dir + "&sc_random=" + Math.random() + sc_unique_returning + page_info;
			
			let i = new Image();
			i.src = uri;
		}
		
		this.oldViewURI = viewURI;
	},

	trackEvent(options = {}) {
		//TODO: use sc_clickstat_call(uri, options)
	},
	
	insertTag: Ember.on('init', function() {
		const config = Ember.copy(Ember.get(this, 'config'));
		
		if (canUseDOM) {
			for (let i in config) {
				window[i] = config[i];
			}
			let scJsHost = (("https:" == document.location.protocol) ? "https://secure." : "http://www.");
			Ember.$('head').append('<script type="text/javascript" src="' + scJsHost + 'statcounter.com/counter/counter.js"></script>');
		}
	}),
	
	//can't really destroy statcounter, no global object.
	//removing the script tag also does nothing, the JS is already running/compiled	
//	removeTag: on('willDestroy', function() {
//	}),
});
