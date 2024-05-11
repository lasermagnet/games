import pixelmatch from './vendor/mapbox/pixelmatch/pixelmatch-5.3.0.module.js';

import * as MaxRectsPacker from "./vendor/soimy/maxrects-packer/maxrects-packer-v2.1.0.js";

let packer;

function initPacker(width, height, padding) {
	packer = new MaxRectsPacker.MaxRectsPacker(width, height, padding, {
		smart: true,
		pot: true,
		square: false,
		allowRotation: true,
		tag: false,
		border: 0
	});
}

function packShapes(shapes) {
	packer.addArray(shapes);
	return packer.bins;
}



const scriptsInEvents = {

	async ["Ashapes🔻_Event5_Act3"](runtime, localVars)
	{
		initPacker(localVars.targetAreaWidth, localVars.targetAreaHeight, localVars.shapePadding);
		const shapeInstances = runtime.objects.Shapes.getPickedInstances()
		const request = [];
		for(const shapeInstance of shapeInstances) {
			const bb = shapeInstance.getBoundingBox();
			request.push({
				uid: shapeInstance.uid, // todo
				width: bb.width,
				height: bb.height
			});
		}
		
		const results = packShapes(request);
		
		if(results.length === 1) {
			localVars.isArrangementSuccesful = true;
			localVars.binWidth = results[0].width;
			localVars.binHeight = results[0].height;
			for(const result of results[0].rects) {
				const i = runtime.getInstanceByUid(result.uid)
				if(result.rot) {
					i.instVars.arrangedX = result.x + i.height / 2;
					i.instVars.arrangedY = result.y + i.width / 2;
					i.instVars.arrangedAngle = 90;
				} else {
					i.instVars.arrangedX = result.x + i.width / 2;
					i.instVars.arrangedY = result.y + i.height / 2;
					i.instVars.arrangedAngle = 0;
				}
			}
		}
	},

	async Pixelmatch_Event1_Act1(runtime, localVars)
	{
		try {
		const ci1 = runtime.getInstanceByUid(localVars.canvasUID1);
		const ci2 = runtime.getInstanceByUid(localVars.canvasUID2);
		
		const ipd1 = await ci1.getImagePixelData();
		const ipd2 = await ci2.getImagePixelData();
		
		const mpc = pixelmatch(ipd1.data, ipd2.data, null, ipd1.width, ipd1.height);
		
		runtime.callFunction(localVars.callbackFunctionName, mpc);
		
		} catch(error) {
			console.error("[PIXELMATCH_startComparison] Something went wrong:");
			console.error(error);
		}
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

