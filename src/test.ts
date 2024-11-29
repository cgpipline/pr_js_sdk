import {Application} from "./pr_objects/Application";
import {SequenceCollection} from "./pr_objects/SequenceCollection";
import {check_premiere_is_alive} from "./utils/helper";

// 判断premiere是否启动
let pr_alive = check_premiere_is_alive()
console.log(pr_alive)

// 实例化 app 对象
const app: Application = new Application()
try {
    // 获取激活的 sequence 对象
    let active_sequence = app.project.activeSequence;

    // 获取所有 sequences 对象
    let sequences: SequenceCollection = app.project.sequences;

    // 获取单个 sequence 对象
    let seq_len: number = sequences.len;
    for (let i: number = 0; i < seq_len; i++) {
        let sequence_item = sequences[i];
    }

    // 获取sequences对象 audioDisplayFormat属性
    let audioDisplayFormat = sequences[0].audioDisplayFormat
    console.log('sequences audioDisplayFormat:' + audioDisplayFormat);

    // 获取sequences对象 end属性
    let seq_end = sequences[0].end
    console.log('sequences end:' + seq_end);

    // 获取所有 audioTracks 对象
    let audio_tracks = sequences[0].audioTracks;

    // 获取单个 audioTrack 对象
    let a_tracks_len: number = audio_tracks.len;
    for (let i: number = 0; i < a_tracks_len; i++) {
        let a_track_item = audio_tracks[i];
    }

    // 获取所有 videoTracks 对象
    let video_tracks = sequences[0].videoTracks;

    // 获取单个 videoTracks 对象
    let v_tracks_len: number = video_tracks.len;
    for (let i: number = 0; i < v_tracks_len; i++) {
        let v_track_item = video_tracks[i];
    }

} finally {
    app.dispose();
}



