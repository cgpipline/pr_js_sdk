import {eval_script_destroy_object} from "../utils/helper";

export class Track {
    protected _premiere_id: string = ''


    constructor(tracks_premiere_id: string) {
        this._init(tracks_premiere_id);
    }

    public _init(tracks_premiere_id: string): void {
        this._premiere_id = tracks_premiere_id;
        console.log(`----生成track对象----:${this._premiere_id}`);
    }

    /**
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'track');
        }
    }
}
