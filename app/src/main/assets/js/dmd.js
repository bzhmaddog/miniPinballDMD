var DMD = function (oWidth, oHeight, cWidth, cHeight, pixelWidth, pixelHeight, xSpace, ySpace, pixelShape, canvas) {

	var context = canvas.getContext('2d'),
		xSpace = xSpace,
		ySpace = xSpace,
		pixelWidth = pixelWidth,
		pixelHeight = pixelHeight,
		pixelShape = pixelShape,
		layers = {},
		nbLayers = 0,
		width = oWidth,
		height = oHeight,
		dmdBuffer = new DMD.Buffer(cWidth, cHeight),
		frameBuffer = new DMD.Buffer(oWidth, oHeight);
		
	canvas.width = cWidth;
	canvas.height = cHeight;

	if (pixelShape !== 'square' && pixelShape !== 'circle') {
		pixelShape = 'square';
	}
	
	/**
	 * Get the index of the pixel at position X,Y in the Canvas
	 * @param x {integer} the column of the position
	 * @param y {integer} the row of the pixel
	 * @result {integer} index of the pixel in the data object
	 */
	function getResizedPixelIndex(x, y) {
		// (x - 1) * 4 = the first pixel doesn't have a space before
		return (x - 1) * pixelWidth * 4  + (x - 1) * xSpace * 4 + (y - 1) * canvas.width * 4 * (pixelHeight + ySpace) ;
	}

	function drawPixel(x, y, dataArray, red, green, blue, alpha) {
		var pIndex = getResizedPixelIndex(x, y),
			pOld = pIndex,
			r,
			g,
			b,
			a;

		for (var row = 0 ; row < pixelHeight ; row++) {
			for(var col = 0 ; col < pixelWidth ; col++) {
				r = red;
				g = green;
				b = blue;
				a = alpha;
			
				if (pixelShape === 'circle') {
					if ( (row === 0 && (col === 0 || col === pixelWidth -1)) || (row === pixelHeight -1 && (col === 0 || col === pixelWidth -1))) {
						r = 0;
						g = 0;
						b = 0;
						a = 255;
					}
				}
			
				dataArray[pIndex] = r;
				dataArray[pIndex+1] = g;
				dataArray[pIndex+2] = b;
				dataArray[pIndex+3] = a;
				
				pIndex += 4;
			}
			pIndex += canvas.width * 4 - pixelWidth * 4;
		}
	}

	function addLayer(name, type, src, mimeType, transparent, visible, extra) {
		var layer = new DMD.Layer(name, type, width, height, src, mimeType, transparent, visible, extra);
		layers[name] = layer;
		nbLayers++;
	}

	function removeLayer(name) {
		if (typeof layers[name] !== 'undefined') {
			delete layers[name];
			nbLayers--;
		}
	}

	function showLayer(name) {
		if (typeof layers[name] !== 'undefined') {
			layers[name].setVisibility(true);
		}
	}

	function hideLayer(name) {
		if (typeof layers[name] !== 'undefined') {
			console.log('hideLayer', name);
			layers[name].setVisibility(false);
		}
	}

	function renderDMD() {

		for (var name in layers) {
			if (layers.hasOwnProperty(name)) {
				var layer = layers[name];
			
				if (layer.isVisible() && layer.getType() !== 'text') {

					//console.log(layer.content.width);

					
					var dmdImageData = dmdBuffer.context.getImageData(0,0, dmdBuffer.width, dmdBuffer.height);
					var dmdData = dmdImageData.data;

					frameBuffer.context.drawImage(layer.content, 0, 0, frameBuffer.width, frameBuffer.height);
					
				}
			}
		}
		
		var frameImageData = frameBuffer.context.getImageData(0, 0,frameBuffer.width, frameBuffer.height);
		var frameData = frameImageData.data;
		
		var x = 1;
		var y = 1;

		for (var i = 0 ; i < frameBuffer.width * frameBuffer.height *4 ; i+=4) { // each pixel use 4 bytes (RGBA)
			// get the pixel from the current frame
			var r = frameData[i];
			var g = frameData[i+1];
			var b = frameData[i+2];
			var a = frameData[i+3];
			
			//console.log(a);

			//r = 255;
			//g = 255;
			//b = 255;

			drawPixel(x, y, dmdData, r, g, b, a);

			x++;
			if (x > frameBuffer.width) {
				x = 1;
				y++;
			}
		}
		
		dmdImageData.data = dmdData;
		
		// put the altered data back into the canvas context
		context.putImageData(dmdImageData, 0, 0);		
		
		requestAnimationFrame(renderDMD);
	}
	
	function waitForLayer() {
		if (nbLayers > 0) {
			renderDMD();
			return;
		}
		console.log('wait for layer');
		requestAnimationFrame(waitForLayer);
	}

	console.log(nbLayers);
	
	if (nbLayers === 0) {
		waitForLayer();
	} else {
		renderDMD();
	}
	//setInterval(renderDMD, 20);
	//setTimeout(renderDMD,1000);
	
	return {
		canvas : canvas,
		context : context,
		width : canvas.width,
		height : canvas.height,
		pixelWidth : pixelWidth,
		pixelHeight : pixelHeight,
		getResizedPixelIndex : getResizedPixelIndex,
		//drawPixel : drawPixel,
		addLayer : addLayer,
		removeLayer : removeLayer,
		showLayer : showLayer,
		hideLayer : hideLayer
	}
};