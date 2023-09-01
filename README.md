---
title: 怎么录制语音并播放
tags: vue
categories: vue
theme: vue-pro
highlight:
---

录制语音主要借助[js-audio-recorder](https://www.npmjs.com/package/js-audio-recorder)库。

## 需要的数据

录制的三种状态：录制前、录制中、录制后。
录制器实例

```js
import { ref, reactive } from 'vue';
// @ts-ignore
import Recorder from 'js-audio-recorder';
const WILL_RECORD = 1; // 录制前
const RECORDING = 2; // 正在录制，点击可以停止
const RECORDED = 3; // 录制结束，可以其他操作
const recordStatus = {
  WILL_RECORD,
  RECORDING,
  RECORDED,
};
const data = reactive({
   recorder:new Recorder()
})
```



## 开始录制

- 实例化录制器
- 开始录音
- 设置状态为 录制中
- 监听录制中，显示时间

```js
function startRecord() {
  const recorder = new Recorder();
  data.recorder = recorder;
  recorder.start().then(() => { console.log('开始录音'); }, (error) => { console.log(`异常了,${error.name}:${error.message}`); });
  data.curRecordStatus = RECORDING;
  recorder.onprogress = (params) => {
    const duration = Math.floor(params.duration);
    data.durationShow = durationToStr(duration);
    console.log('音频总数据：', params,params.duration?.toFixed());
  }

```

## 结束录制

- 
