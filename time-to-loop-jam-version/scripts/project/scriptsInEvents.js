


const scriptsInEvents = {

	async ["Futilities🧰_Event8_Act1"](runtime, localVars)
	{
		runtime.setReturnValue(runtime.objects[localVars["name"]] ? 1 : 0)
	},

	async ["Moptions💾_Event9_Act3"](runtime, localVars)
	{
		runtime.globalVars[localVars.variable] = localVars.value
	},

	async ["Moptions💾_Event10_Act1"](runtime, localVars)
	{
		localVars.value = runtime.globalVars[localVars.variable]
	},

	async ["Moptions💾_Event16_Act2"](runtime, localVars)
	{
		localVars.value = runtime.globalVars[localVars.variable]
	},

	async ["Moptions💾_Event19_Act1"](runtime, localVars)
	{
		runtime.globalVars[localVars.variable] = localVars.value
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

