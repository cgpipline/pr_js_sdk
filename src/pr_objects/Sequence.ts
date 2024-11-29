import {eval_script_destroy_object, eval_on_this_object, format_object_to_es} from "../utils/helper";
import {TrackCollection} from "./TrackCollection";
import {SequenceCollection} from "./SequenceCollection";

export class Sequence {
    protected _premiere_id: string = ''

    private _audioTrackCollectionObject: TrackCollection | null = null

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
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'sequence');
        }

        if (this._audioTrackCollectionObject) {
            this._audioTrackCollectionObject.dispose();
        }
    }
}
