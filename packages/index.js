import SendRecord from './SendRecord';

//按需引入
export { SendRecord };

const components = [SendRecord];

const install = (App) => {
	components.forEach((item) => {
		App.component(item.__name, item);
	});
};

export default {
	install,
};
