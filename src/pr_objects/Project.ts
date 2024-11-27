import {eval_script_destroy_object, eval_on_this_object, format_object_to_es} from "../utils/helper";
import {Sequence} from "./Sequence";
import {SequenceCollection} from "./SequenceCollection";

export class Project {
    protected _premiere_id: string = ''
    private _activeSequenceObject: Sequence | null = null
    private _sequenceCollectionObject: SequenceCollection | null = null

    constructor(app_premiere_id: string) {
        this._init(app_premiere_id);
    }

    /**
     * 初始化project对象
     * @param app_premiere_id
     */
    public _init(app_premiere_id: string): void {
        this._premiere_id = eval_on_this_object(app_premiere_id, 'project');
        console.log(`----生成project对象----:${this._premiere_id}`);
    }

    /**
     * 获取 activeSequence 对象
     */
    get activeSequence(): Sequence {
        let active_seq_premiere_id: string = eval_on_this_object(this._premiere_id, 'activeSequence');
        if (!this._activeSequenceObject) {
            this._activeSequenceObject = new Sequence(active_seq_premiere_id);
        }
        return this._activeSequenceObject;
    }

    /**
     * 设置 activeSequence 对象
     * @param active_sequence
     */
    set activeSequence(active_sequence: Sequence) {
        let active_seq_premiere_id: string = eval_on_this_object(this._premiere_id, `activeSequence = ${format_object_to_es(active_sequence)}`);
        this._activeSequenceObject = new Sequence(active_seq_premiere_id);
        // 销毁上一个对象
        active_sequence.dispose()
    }

    /**
     * 获取 sequences 对象
     */
    get sequences(): SequenceCollection {
        let sequences_premiere_id: string = eval_on_this_object(this._premiere_id, 'sequences');
        if (!this._sequenceCollectionObject) {
            this._sequenceCollectionObject = new SequenceCollection(sequences_premiere_id);
        }
        return this._sequenceCollectionObject;
    }

    /**
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'project');
            if (this._activeSequenceObject) {
                this._activeSequenceObject.dispose();
            }
            if (this._sequenceCollectionObject) {
                this._sequenceCollectionObject.dispose();
            }
        }
    }
}
