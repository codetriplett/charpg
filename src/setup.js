import { patterns } from './draw-chunk.js';

export function setup () {
	const style = document.createElement('style');
	const buttons = document.createElement('div');
	const counterButton = document.createElement('button');
	const clockwiseButton = document.createElement('button');
	const loadLeftButton = document.createElement('button');
	const loadRightButton = document.createElement('button');
	const saveButton = document.createElement('button');
	const typeSelect = document.createElement('select');

	Object.assign(counterButton, { innerText: 'Rotate CCW', type: 'button' });
	Object.assign(clockwiseButton, { innerText: 'Rotate CW', type: 'button' });
	Object.assign(loadLeftButton, { innerText: 'Load Left', type: 'button' });
	Object.assign(loadRightButton, { innerText: 'Load Right', type: 'button' });
	Object.assign(saveButton, { innerText: 'Save', type: 'button', className: 'save' });
	
	buttons.className = 'controls';
	buttons.appendChild(counterButton);
	buttons.appendChild(loadLeftButton);
	buttons.appendChild(saveButton);
	buttons.appendChild(loadRightButton);
	buttons.appendChild(clockwiseButton);
	document.body.appendChild(buttons);

	Object.keys(patterns).forEach(type => {
		const option = document.createElement('option');
		Object.assign(option, { innerText: patterns[type][0], value: type });
		typeSelect.appendChild(option);
	});

	const instructions = document.createElement('p');
	
	instructions.appendChild(document.createTextNode('Click to place '));
	instructions.appendChild(typeSelect);
	instructions.appendChild(document.createTextNode(' block. Right click to remove block.'));
	document.body.appendChild(instructions);
	document.head.appendChild(style);

	style.innerHTML = `* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: monospace;
	}
	html, body { width: 100%; height: 100%; overflow: hidden; }
	body > pre, body > .frame {
		position: absolute;
		left: 50%;
		top: 50%;
		cursor: default;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		transform-origin: left top;
	}
	.frame pre { float: left; }
	pre.dirt { color: #310; }
	pre.dirt.above { background: #531; }
	pre.dirt.ahead { background: #420; }
	pre.dirt.after { background: #420; }
	pre.brick { color: #b87; }
	pre.brick.above { background: #a32; }
	pre.brick.ahead { background: #821; }
	pre.brick.after { background: #710; }
	pre.sand { color: #761; }
	pre.sand.above { background: #fb5; }
	pre.sand.ahead { background: #da4; }
	pre.sand.after { background: #b94; }
	pre.water { color: #98f; }
	pre.water.above { background: #33c; }
	pre.water.ahead { background: #22a; }
	pre.water.after { background: #118; }
	pre.tree { color: #444; }
	pre.tree.above { background: #cb6; color: #a72; }
	pre.tree.ahead { background: #997; }
	pre.tree.after { background: #886; }
	pre.leaf { color: #041; }
	pre.leaf.above { background: #392; }
	pre.leaf.ahead { background: #372; }
	pre.leaf.after { background: #262; }
	pre.ore { color: #ba5; }
	pre.ore.above { background: #775; }
	pre.ore.ahead { background: #665; }
	pre.ore.after { background: #654; }
	pre.glass { color: #578; }
	pre.glass.above { background: #9bd; }
	pre.glass.ahead { background: #89a; }
	pre.glass.after { background: #79b; }
	ul {
		list-style: none;
		display: none;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		padding: 15px;
		color: lightgreen;
		background-color: rgba(0, 0, 0, 0.75);
		overflow-y: scroll;
	}
	li + li { margin-top: 15px; }
	.controls {
		position: absolute;
		top: 0;
		width: 100%;
		text-align: center;
		z-index: 9;
	}
	button {
		width: 21vh;
		height: 6vh;
		border: 1px solid black;
		border-radius: 0.5vh;
		margin: 0.5vh;
		font-size: 3vh;
		background: white;
		cursor: pointer;
	}
	button:hover { background: lightgray; }
	button.save { width: 10vh; }
	p {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 1vh;
		font-size: 3vh;
		text-align: center;
		z-index: 9;
	}
	select { font-size: 3vh; }`;

	return {
		counterButton,
		clockwiseButton,
		loadLeftButton,
		loadRightButton,
		saveButton,
		typeSelect
	};
}
