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
		
		
//		dmd.addLayer('city', 'image', 'img/city-bg.png' , 'image/png', false, true);
		
//		dmd.addLayer('title', 'image', 'img/title.png' , 'image/png', true, true);

		
		
		dmd.addLayer('mainVideo', 'video', 'anim/extra-ball.webm', 'video/webm', true, true, {
			autoplay : true,
			loop : true
		});
  		
		
		//console.log(window.innerWidth + 'x' + window.innerHeight);
    },


};

app.initialize();