import {Application} from "./pr_objects/Application";
import {SequenceCollection} from "./pr_objects/SequenceCollection";

const app = new Application()
try {
    app.project.activeSequence
    let sequences:SequenceCollection = app.project.sequences
    let len: number = sequences.len

    for (let i: number = 0; i < len; i++) {
        let res = sequences[i]
    }
} finally {
    app.dispose();
}



