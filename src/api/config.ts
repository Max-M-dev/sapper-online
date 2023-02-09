export const host = {
	url: import.meta.env.VITE_URL_SERVER,
	protocol: import.meta.env.VITE_PROTOCOL_SERVER,

	urlSocket: import.meta.env.VITE_URL_SOCKET_SERVER,
	protocolSocket: import.meta.env.VITE_PROTOCOL_SOCKET_SERVER,

	toString: function () {
		return this.url;
	},
	get roominfo() {
		return `${this.protocol}://${this.url}/roominfo`;
	},
	get createroom() {
		return `${this.protocol}://${this.url}/createroom`;
	},
};
export const urlSocket = `${host.protocolSocket}://${host.urlSocket}/minesweeper-socket`;
