import {
    FindDiffFromSegments,
    FindWhat,
    ResultFromFindMultipleTranslationsFromSegments,
    FindMultipleTranslationsFromSegments,
    GroupBy,
} from "../src/index";
import { ISegment } from "localization-format";
import { FindWhichX } from "../src/QA/FindMultipleX";

// tslint:disable-next-line:max-line-length
// const res = FindNumbersFromSegment({FormatIndex: null, Props: null, Source: {Value: "test1", BeginOffSet: null}, Translation: {Value: "テスト2", BeginOffSet: null}});

// console.dir(res);

const segs: ISegment[] = [{Source: {Value: "test1 "}, Translation: {Value: "テスト2"}},
{Source: {Value: "test3 "}, Translation: {Value: " "}},
{Source: {Value: "test 3"}, Translation: {Value: " "}},
{Source: {Value: "test"}, Translation: {Value: "たろう"}},
{Source: {Value: "test"}, Translation: {Value: "テスト2"}}]

export const test = (async () => {
    // tslint:disable-next-line:max-line-length
    const res = await FindDiffFromSegments(segs, FindWhat.Spaces);
    console.dir(res);
});

export let ResultFindMultipleXFromSegments!: ResultFromFindMultipleTranslationsFromSegments[] | null;
export const testFindMultipleXFromSegments = (async () => {
    // tslint:disable-next-line:max-line-length
    ResultFindMultipleXFromSegments = await FindMultipleTranslationsFromSegments(segs, FindWhichX.MultipleTranslations);
});

export let testGroupByResult: any;
export const testGroupBy = (async () => {
    testGroupByResult = await GroupBy<ISegment>(segs, "Source");
});
