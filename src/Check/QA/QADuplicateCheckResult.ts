import { ISegment } from "localization-format";
import CheckResult from "../CheckResult";
import { TargetValue } from "./QADuplicate";

export default class extends CheckResult {
    public DupllicatedValue!: string;
    public TargetValue!: TargetValue;
    public Segments: ISegment[];
    public constructor(duplicatedValue: string, targetValue: TargetValue, segments: ISegment[]) {
        super();
        this.Name = "QADupllicate";
        this.TargetValue = targetValue;
        this.DupllicatedValue = duplicatedValue;
        this.Segments = segments;
    }
}
