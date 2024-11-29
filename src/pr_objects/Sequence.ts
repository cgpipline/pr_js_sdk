import {eval_script_destroy_object, eval_on_this_object, format_object_to_es} from "../utils/helper";
import {TrackCollection} from "./TrackCollection";

export class Sequence {
    protected _premiere_id: string = ''

    // 所有 audio tracks 对象
    private _audioTrackCollectionObject: TrackCollection | null = null

    // 所有 video tracks 对象
    private _videoTrackCollectionObject: TrackCollection | null = null

    constructor(seq_premiere_id: string) {
        this._init(seq_premiere_id);
    }

    public _init(seq_premiere_id: string): void {
        this._premiere_id = seq_premiere_id;
        console.log(`----生成sequence对象----:${this._premiere_id}`);
    }

    /**
     * get Audio timecode display format.
     */
    get audioDisplayFormat(): string {
        return eval_on_this_object(this._premiere_id, 'audioDisplayFormat')
    }

    /**
     * set Audio timecode display format.
     * @param audioDisplayFormat
     */
    set audioDisplayFormat(audioDisplayFormat: any) {
        eval_on_this_object(this._premiere_id, `audioDisplayFormat = ${format_object_to_es(audioDisplayFormat)}`)
    }

    /**
     * get This is the ordinal assigned to the sequence upon creation. If this is the thirty-third sequence created within the project during a given Premiere Pro session, this value will be
     */
    get id(): number {
        return Number(eval_on_this_object(this._premiere_id, 'id'))
    }

    /**
     * set This is the ordinal assigned to the sequence upon creation. If this is the thirty-third sequence created within the project during a given Premiere Pro session, this value will be
     * @param id
     */
    set id(id: number) {
        throw new Error("ERROR: Attribute 'id' is read-only");
    }

    /**
     * get The time, in ticks, of the end of the sequence.
     */
    get end(): string {
        return eval_on_this_object(this._premiere_id, 'end')
    }

    /**
     * set The time, in ticks, of the end of the sequence.
     * @param end
     */
    set end(end: string) {
        throw new Error("ERROR: Attribute 'end' is read-only");
    }

    /**
     * get The horizontal frame size, or width, of the sequence.
     */
    get frameSizeHorizontal(): number {
        return Number(eval_on_this_object(this._premiere_id, 'frameSizeHorizontal'))
    }

    /**
     * set The horizontal frame size, or width, of the sequence.
     * Set this attribute with the Sequence.setSettings() method.
     * @param end
     */
    set frameSizeHorizontal(end: number) {
        throw new Error("ERROR: Attribute 'frameSizeHorizontal' is read-only");
    }

    /**
     * get The vertical frame size, or height, of the sequence.
     */
    get frameSizeVertical(): number {
        return Number(eval_on_this_object(this._premiere_id, 'frameSizeVertical'))
    }

    /**
     * set The vertical frame size, or height, of the sequence.
     * Set this attribute with the Sequence.setSettings() method.
     * @param end
     */
    set frameSizeVertical(end: number) {
        throw new Error("ERROR: Attribute 'frameSizeVertical' is read-only");
    }

    /**
     * get An array of audio Track objects in the sequence.
     */
    get audioTracks(): TrackCollection {
        let audio_track_premiere_id: string = eval_on_this_object(this._premiere_id, 'audioTracks');
        if (!this._audioTrackCollectionObject) {
            this._audioTrackCollectionObject = new TrackCollection(audio_track_premiere_id);
        }
        return this._audioTrackCollectionObject;
    }

    /**
     * set An array of audio Track objects in the sequence.
     * @param audioTracks
     */
    set audioTracks(audioTracks: TrackCollection) {
        throw new Error("ERROR: Attribute 'audioTracks' is read-only");
    }

    /**
     * get An array of video Track objects in the sequence.
     */
    get videoTracks(): TrackCollection {
        let video_track_premiere_id: string = eval_on_this_object(this._premiere_id, 'videoTracks');
        if (!this._videoTrackCollectionObject) {
            this._videoTrackCollectionObject = new TrackCollection(video_track_premiere_id);
        }
        return this._videoTrackCollectionObject;
    }

    /**
     * set An array of video Track objects in the sequence.
     * @param videoTracks
     */
    set videoTracks(videoTracks: TrackCollection) {
        throw new Error("ERROR: Attribute 'videoTracks' is read-only");
    }

    /**
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'sequence');
        }

        if (this._audioTrackCollectionObject) {
            this._audioTrackCollectionObject.dispose();
        }

        if (this._videoTrackCollectionObject) {
            this._videoTrackCollectionObject.dispose();
        }
    }
}
