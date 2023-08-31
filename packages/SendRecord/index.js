import SendRecord from './src/send-record.vue';

SendRecord.install = (App) => {
  // name在script标签上，所以获取名字的形参是__name
	App.component(SendRecord.__name, SendRecord);
};

export default SendRecord;
