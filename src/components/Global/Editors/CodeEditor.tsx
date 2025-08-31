import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-twilight";
import {useEffect, useState} from "react";

export type CodeEditorProps = {
    code: string;
    setCode: (code: string) => void;
}

export const CodeEditor = ({code, setCode}: CodeEditorProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
    }, []);

    return (
        <AceEditor
            height="100%"
            width="100%"
            value={code}
            onChange={e => {setCode(e)}}
            theme={isDarkMode ? "twilight" : "dawn"}
            fontSize={16}
            highlightActiveLine={true}
            setOptions={{
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                tabSize: 2
            }}
        />
    );
}