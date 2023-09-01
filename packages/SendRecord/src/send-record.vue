<script setup name="SendRecord" lang="ts">
import { reactive, computed, ref } from 'vue';
// @ts-ignore
import Recorder from 'js-audio-recorder';
const WILL_RECORD = 1; // 录制前
const RECORDING = 2; // 正在录制，点击可以停止
const RECORDED = 3; // 录制结束，可以其他操作

const recorder = reactive<any>(new Recorder());
const durationShow = computed(() => durationToStr(recorder.duration));
const curRecordStatus = ref(WILL_RECORD);

function startOrendRecord() {
  if (curRecordStatus.value === WILL_RECORD) {
    startRecord();
    return;
  }
  if (curRecordStatus.value === RECORDING) {
    endRecord();
    return;
  }
}
function startRecord() {
  console.log(recorder);
  recorder.start().then(
    () => {
      console.log('开始录音');
    },
    (error) => {
      console.log(`异常了,${error.name}:${error.message}`);
    }
  );
  curRecordStatus.value = RECORDING;
}

function endRecord() {
  recorder?.stop();
  console.log(recorder.file);
  curRecordStatus.value = RECORDED;
}
function playRecord() {
  recorder.play();
}

function pauseRecord() {
  recorder.pausePlay();
}

function resetRecord() {
  curRecordStatus.value = WILL_RECORD;
}
function downloadWAV() {
  console.log('wav: ', recorder.getWAVBlob());
  recorder.downloadWAV();
}
/**
 * 将秒数转换为时分秒: 2.1 => 00:02
 * @param duration 秒数 2
 * @returns {string} 00:02
 */
function durationToStr(duration: number) {
  const sumSeconds = Math.floor(duration);
  const minute = Math.floor(sumSeconds / 60);
  const second = sumSeconds % 60;
  return `${minute < 10 ? '0' + minute : minute}:${
    second < 10 ? '0' + second : second
  }`;
}
recorder.onprogress = (params) => {
  console.log('音频总数据：', params);
};
recorder.onplay = () => {
  console.log('%c回调监听，开始播放音频', 'color: #2196f3');
};
recorder.onpauseplay = () => {
  console.log('%c回调监听，暂停播放音频', 'color: #2196f3');
};
recorder.onresumeplay = () => {
  console.log('%c回调监听，恢复播放音频', 'color: #2196f3');
};
recorder.onstopplay = () => {
  console.log('%c回调监听，停止播放音频', 'color: #2196f3');
};
recorder.onplayend = () => {
  recorder.isplaying = false;
  console.log('%c回调监听，音频已经完成播放', 'color: #2196f3');
};

const audioEl = ref(new Audio());

async function playUploadedAudio(e) {
  const audioFile = e.target.files[0];
  if (audioFile.isLoaded) {
    audioEl.value.play();
    return;
  }
  await readyAudio(audioFile);
  audioEl.value.play();
}

function readyAudio(audioFile: any) {
  return new Promise((resolve, reject) => {
    var url = URL.createObjectURL(audioFile);
    var audioElement = new Audio(url);
    audioEl.value = audioElement;

    audioElement.addEventListener('loadedmetadata', () => {
      audioFile.isLoaded = true;
      resolve(audioElement);
    });
    // 出错就reject
    audioElement.addEventListener('error', reject);
  });
}
</script>

<template>
  <div>
    <div ref="recorderIconBox" class="icon-box" @click="startOrendRecord">
      <svg width="20" height="20" t="1693473966123" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4112" > <path d="M827.246871 451.075419c-12.94994-0.588401-23.925922 9.432837-24.51637 22.382776-0.093121 2.062985-0.418532 6.353708-1.106194 12.542664-1.170662 10.54824-2.959402 22.35924-5.490038 35.106566-7.226588 36.413328-18.898419 72.794933-35.917024 106.534362-47.672766 94.508467-126.925784 150.334937-248.217245 150.71663-121.290437-0.381693-200.546525-56.208163-248.217245-150.71663-17.018605-33.739429-28.692482-70.120011-35.919071-106.534362-2.529613-12.747325-4.317329-24.558325-5.487991-35.106566-0.687662-6.188956-1.014096-10.479679-1.108241-12.542664-0.588401-12.94994-11.564383-22.971178-24.514323-22.382776-12.951987 0.588401-22.973224 11.564383-22.382776 24.51637 0.5137 11.339256 2.63092 30.394241 7.446599 54.654784 8.000208 40.316218 20.946055 80.665181 40.051181 118.537743 51.840692 102.776781 138.972145 167.127392 265.456884 175.017082l0 85.599563L291.185872 909.400962c-12.96529 0-23.473621 10.510378-23.473621 23.473621 0 12.96529 10.508331 23.473621 23.473621 23.473621l441.857477 0c12.963243 0 23.473621-10.508331 23.473621-23.473621 0-12.963243-10.510378-23.473621-23.473621-23.473621L534.272259 909.400962l0-85.454254c127.791501-7.209192 215.690434-71.734788 267.86063-175.162392 19.104103-37.872562 32.050973-78.221526 40.051181-118.537743 4.815679-24.260543 6.930853-43.315528 7.446599-54.654784C850.217025 462.639802 840.197834 451.66382 827.246871 451.075419zM510.171352 700.19215c106.568131 0 193.353706-86.506213 193.353706-193.220676L703.525058 260.871449c0-106.59269-86.567611-193.220676-193.353706-193.220676-106.570177 0-193.353706 86.508259-193.353706 193.220676l0 246.100024C316.817646 613.567233 403.385257 700.19215 510.171352 700.19215zM363.764887 260.871449c0-80.693834 65.674769-146.273435 146.407488-146.273435 80.8197 0 146.407488 65.570391 146.407488 146.273435l0 246.100024c0 80.69588-65.674769 146.273435-146.407488 146.273435-80.8197 0-146.407488-65.568345-146.407488-146.273435L363.764887 260.871449z" fill="#272636" p-id="4113" ></path> </svg>
    </div>
    <div>
      <span v-if="curRecordStatus === RECORDING || curRecordStatus === RECORDED" >{{ durationShow }}</span >
    </div>
    <div v-show="curRecordStatus === RECORDED" class="icon-box">
      <!-- 播放图标 -->
      <svg  @click="playRecord" v-if="!recorder.isplaying" width="20" height="20" t="1693477278174" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5083" > <path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z" fill="#515151" p-id="5084" ></path> <path d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z" fill="#515151" p-id="5085" ></path> </svg>
      <!-- 暂停图标 -->
      <svg v-else @click="pauseRecord" width="20" height="20" t="1693477687958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6103" > <path d="M511.474 884.11c-205.692 0-373.042-167.083-373.042-372.46 0-205.371 167.35-372.46 373.042-372.46 205.698 0 373.042 167.089 373.042 372.46 0 205.376-167.344 372.46-373.042 372.46m0-819.412c-246.84 0-447.649 200.496-447.649 446.951 0 246.457 200.809 446.951 447.649 446.951 246.842 0 447.649-200.494 447.649-446.951 0-246.455-200.808-446.951-447.649-446.951m127.768 580.701V378.6c0-20.573-16.701-37.247-37.301-37.247-20.606 0-37.307 16.675-37.307 37.247v266.799c0 20.574 16.701 37.249 37.307 37.249 20.601 0 37.301-16.675 37.301-37.249m-179.876 0V378.6c0-20.573-16.701-37.247-37.301-37.247-20.606 0-37.307 16.675-37.307 37.247v266.799c0 20.574 16.701 37.249 37.307 37.249 20.6 0 37.301-16.675 37.301-37.249" fill="#515151" p-id="6104" ></path> </svg>
      <button @click="downloadWAV">下载wav</button><br />
    </div>
    <div v-show="curRecordStatus === RECORDED" class="icon-box" @click="resetRecord" >
      <svg t="1693479917670" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7988" width="20" height="20" > <path d="M510.825 162c-98.288 0-187.097 40.292-250.839 105.148V182h-60.201v200h200.672v-60H291.104c53.349-61.229 131.967-100 219.721-100 160.7 0 290.974 129.837 290.974 290 0 160.162-130.274 290-290.974 290-147.075 0-268.592-108.777-288.152-250H162c19.926 174.451 168.456 310 348.825 310C704.773 862 862 705.3 862 512S704.773 162 510.825 162z" fill="#515151" p-id="7989" ></path> </svg>
    </div>
    <div style="margin-top: 300px">
      <input type="file" @change="playUploadedAudio" />
    </div>
  </div>
</template>

<style scoped>
.icon-box {
  padding: 10px;
}
</style>
