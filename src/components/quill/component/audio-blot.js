// 音频解析
import Quill from "quill";
const Base = Quill.import('blots/embed');

class AudioBlot extends Base {
	static create(value) {
		let node = super.create(value);
		node.setAttribute('src', value.url);
		node.setAttribute('controls', false);
		//外层套入div （不套入会产生无法删除乱起八糟的问题😀）
		let divNode = document.createElement("span");
		divNode.appendChild(node)
		return divNode;
	}

	// 添加value获取当前的audio元素。拿到audio元素的属性。
	static value(domNode) {
		const value = {
			url: '',
		};
		// 这里要加判断。不然会显示undefined
		if (domNode.getElementsByTagName('audio')[0] && domNode.getElementsByTagName('audio')[0].getAttribute('src')) {
			value.url = domNode.getElementsByTagName('audio')[0].getAttribute('src')
		}
		return value;
	}
	static update(mutations, context) {
		mutations.forEach((mutation) => {
			if (
				mutation.type === "childList" &&
				(Array.from(mutation.removedNodes).includes(this.leftGuard) ||
					Array.from(mutation.removedNodes).includes(this.rightGuard))
			) {
				let tag;
				if (mutation.previousSibling) {
					tag = mutation.previousSibling.innerText;
				} else if (mutation.nextSibling) {
					tag = mutation.nextSibling.innerText;
				}
				if (tag) {
					super.replaceWith("audio", tag);
				}
			}
		});
		super.update(mutations, context);
	}
}


AudioBlot.blotName = 'audio';
AudioBlot.tagName = 'audio';
export default AudioBlot;
