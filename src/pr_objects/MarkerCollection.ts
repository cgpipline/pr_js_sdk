import {eval_on_this_object, eval_script_destroy_object} from "../utils/helper";
import {Marker} from "./Marker";

export class MarkerCollection {
    protected _premiere_id: string = '';

    constructor(markers_premiere_id: string) {
        this._init(markers_premiere_id);
    }

    public _init(markers_premiere_id: string): void {
        this._premiere_id = markers_premiere_id;
    }

    /**
     * 获取marker对象长度
     */
    get numMarkers(): string {
        return eval_on_this_object(this._premiere_id, 'numMarkers');
    }


    /**
     * 设置marker对象长度，只读属性不允许设置
     * @param numMarkers
     */
    set numMarkers(numMarkers: string) {
        throw new Error("ERROR: Attribute 'numMarkers' is read-only");
    }

    /**
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'markers');
        }
    }
}
