import {FindNoTranslationFromSegment} from "../src/index";

// tslint:disable-next-line:max-line-length
// const res = FindNumbersFromSegment({FormatIndex: null, Props: null, Source: {Value: "test1", BeginOffSet: null}, Translation: {Value: "テスト2", BeginOffSet: null}});

// console.dir(res);

export const test = (async () => {
    const res = await FindNoTranslationFromSegment({Source: {Value: "test1"}, Translation: {Value: "テスト2"}});
    console.dir(res);
    const res2 = await FindNoTranslationFromSegment({Source: {Value: "test3"}, Translation: {Value: ""}});
    console.dir(res2);
});
