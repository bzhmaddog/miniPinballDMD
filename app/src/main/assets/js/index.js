var app = {
    // Application Constructor
    initialize: function() {
        //document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('DOMContentLoaded', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
		dmd = new DMD(160, 96, 798, 478, 3, 3, 2, 2, 'square', document.getElementById('dmd'));
		
		dmd.addLayer('background', 'image', 'img/dmd-160x96-empty.png' , 'image/png', false, true);
		
		
		//dmd.addLayer('background', 'image', 'img/dmd-80x50-empty.png' , 'image/png', false, true);
		
		dmd.addLayer('background', 'image', 'img/tmnt-title.png' , 'image/png', true, true);
		//dmd.addLayer('background', 'image', 'img/tmnt-test-160x96-orange.png' , 'image/png', true, true);
		//dmd.addLayer('background', 'image', 'img/tmnt-test2.png' , 'image/png', true, true);

		
		
		
		/*dmd.addLayer('mainVideo', 'video', 'anim/scott_idle_128x64.mp4', 'video/mp4', false, true, {
			autoplay : true,
			loop : false
		});*/
  		
		
		//console.log(window.innerWidth + 'x' + window.innerHeight);
    },


};

app.initialize();