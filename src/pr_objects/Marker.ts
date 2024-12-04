import {eval_script_destroy_object} from "../utils/helper";

export class Marker {
    protected _premiere_id: string = ''

    constructor(markers_premiere_id: string) {
        this._init(markers_premiere_id);
    }

    public _init(markers_premiere_id: string): void {
        this._premiere_id = markers_premiere_id;
        console.log(`----生成marker对象----:${this._premiere_id}`);
    }

    /**
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'marker');
        }
    }
}
