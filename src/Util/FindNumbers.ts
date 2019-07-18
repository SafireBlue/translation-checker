import {ILocFormat, ISegment} from "localization-format";
import {FindNumbers, FoundResult} from "text-checker";

export class ResultFromSegment {
    public Segment!: ISegment;
    public Source!: FoundResult[];
    public Translation!: FoundResult[];
    public constructor(seg: ISegment) {
        this.Segment = seg;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ResultFromLocFormat {
    public LocFormat!: ILocFormat<ISegment>;
    public ResultsFromSegments!: ResultFromSegment[];
    public constructor(lf: ILocFormat<ISegment>) {
        this.LocFormat = lf;
    }
}

export async function FindNumbersFromSegment(seg: ISegment): Promise<ResultFromSegment> {
    const result = new ResultFromSegment(seg);
    const resSource = FindNumbers(seg.Source.Value).then((res) => result.Source = res);
    const resTranslation = FindNumbers(seg.Translation.Value).then((res) => result.Translation = res);
    await Promise.all([resSource, resTranslation]);
    return result;
}

export async function FindNumbersFromSegments(segs: ISegment[]): Promise<ResultFromSegment[]> {
    const result: ResultFromSegment[] = [];
    await Promise.all(segs.map((seg) => FindNumbersFromSegment(seg).then((res) => result.push(res))));
    return result;
}

// tslint:disable-next-line:max-line-length
export async function FindNumbersFromLocFormat(lf: ILocFormat<ISegment>): Promise<ResultFromLocFormat> {
    const result = new ResultFromLocFormat(lf);
    result.ResultsFromSegments = await FindNumbersFromSegments(lf.Segments!);
    return result;
}

// tslint:disable-next-line:max-line-length
export async function FindNumbersFromLocFormats(lfs: Array<ILocFormat<ISegment>>): Promise<ResultFromLocFormat[]> {
    const result: ResultFromLocFormat[] = [];
    await Promise.all(lfs.map((lf) => FindNumbersFromLocFormat(lf).then((res) => result.push(res))));
    return result;
}
